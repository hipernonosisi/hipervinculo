import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const META_API_VERSION = "v21.0";
const META_BASE_URL = `https://graph.facebook.com/${META_API_VERSION}`;

async function fetchAllPages(url: string) {
  let allData: any[] = [];
  let nextUrl: string | null = url;
  
  while (nextUrl) {
    const resp = await fetch(nextUrl);
    const json = await resp.json();
    if (json.data) {
      allData = allData.concat(json.data);
    }
    nextUrl = json.paging?.next || null;
    // Safety: max 10 pages
    if (allData.length > 5000) break;
  }
  return allData;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const metaToken = Deno.env.get("META_ACCESS_TOKEN");
    if (!metaToken) {
      return new Response(JSON.stringify({ error: "Meta access token not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { adAccountId, since, until, topN = 10 } = await req.json();

    if (!adAccountId) {
      return new Response(JSON.stringify({ error: "adAccountId required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 1. Get ad-level insights for the full period
    const insightFields = "ad_id,ad_name,campaign_name,adset_name,spend,impressions,reach,frequency,clicks,ctr,cpc,cpm,actions,action_values,cost_per_action_type";
    const timeRange = `&time_range={"since":"${since}","until":"${until}"}`;
    const insightsUrl = `${META_BASE_URL}/act_${adAccountId}/insights?fields=${insightFields}${timeRange}&level=ad&access_token=${metaToken}&limit=500`;
    
    const insightsData = await fetchAllPages(insightsUrl);

    // 2. Get ads with creative info (request image_hash for full-size lookup)
    const adsUrl = `${META_BASE_URL}/act_${adAccountId}/ads?fields=id,name,status,effective_status,creative{id,name,title,body,image_url,image_hash,thumbnail_url,object_story_spec,asset_feed_spec}&access_token=${metaToken}&limit=500`;
    const adsData = await fetchAllPages(adsUrl);

    // 3. Collect image hashes to fetch full-size URLs
    const imageHashes = new Set<string>();
    for (const ad of adsData) {
      const hash = ad.creative?.image_hash;
      if (hash) imageHashes.add(hash);
    }

    // Batch fetch full-size image URLs from ad images endpoint
    const fullSizeMap: Record<string, string> = {};
    if (imageHashes.size > 0) {
      try {
        const hashArray = Array.from(imageHashes);
        // Fetch in batches of 50
        for (let i = 0; i < hashArray.length; i += 50) {
          const batch = hashArray.slice(i, i + 50);
          const hashFilter = JSON.stringify(batch);
          const imgUrl = `${META_BASE_URL}/act_${adAccountId}/adimages?hashes=${hashFilter}&fields=hash,url,url_128,url_256&access_token=${metaToken}`;
          const imgResp = await fetch(imgUrl);
          const imgJson = await imgResp.json();
          if (imgJson.data) {
            for (const img of imgJson.data) {
              // url is the full-size original image
              fullSizeMap[img.hash] = img.url || img.url_256 || img.url_128 || "";
            }
          }
        }
      } catch (e) {
        console.error("Error fetching full-size images:", e);
      }
    }

    // Build a map of ad_id -> creative info
    const adCreativeMap: Record<string, any> = {};
    for (const ad of adsData) {
      const hash = ad.creative?.image_hash;
      const fullSizeUrl = hash ? fullSizeMap[hash] : "";
      // For videos, get the best available image from video_data
      const videoImage = ad.creative?.object_story_spec?.video_data?.image_url || "";
      // For carousels, try to get first child image
      const carouselImage = ad.creative?.asset_feed_spec?.images?.[0]?.url || "";
      
      // Priority: full-size from hash > creative image_url > video thumbnail > carousel > thumbnail
      const bestImageUrl = fullSizeUrl 
        || ad.creative?.image_url 
        || videoImage 
        || carouselImage 
        || "";

      adCreativeMap[ad.id] = {
        adName: ad.name,
        status: ad.effective_status || ad.status,
        creativeTitle: ad.creative?.title || ad.creative?.name || ad.name,
        creativeBody: ad.creative?.body || "",
        thumbnailUrl: ad.creative?.thumbnail_url || "",
        imageUrl: bestImageUrl,
        isVideo: !!ad.creative?.object_story_spec?.video_data,
      };
    }

    // 3. Process insights: extract purchases, spend, CPA for each ad
    interface AdPerformance {
      adId: string;
      adName: string;
      campaignName: string;
      adsetName: string;
      adStatus: string;
      spend: number;
      purchases: number;
      revenue: number;
      cpa: number;
      roas: number;
      impressions: number;
      reach: number;
      frequency: number;
      clicks: number;
      ctr: number;
      cpc: number;
      cpm: number;
      addToCart: number;
      initiateCheckout: number;
      conversionRate: number;
      costPerATC: number;
      costPerIC: number;
      creative: any;
      dateRange: string;
    }

    const adPerformances: AdPerformance[] = [];

    for (const insight of insightsData) {
      const purchases = insight.actions?.find((a: any) => 
        a.action_type === "purchase" || a.action_type === "omni_purchase"
      );
      const purchaseCount = purchases ? parseFloat(purchases.value) : 0;
      
      if (purchaseCount === 0) continue; // Skip ads with no purchases
      
      const revenue = insight.action_values?.find((a: any) => 
        a.action_type === "purchase" || a.action_type === "omni_purchase"
      );
      const revenueValue = revenue ? parseFloat(revenue.value) : 0;
      
      const spend = parseFloat(insight.spend || "0");
      const cpa = purchaseCount > 0 ? spend / purchaseCount : 999999;
      const roas = spend > 0 ? revenueValue / spend : 0;
      const clicks = parseInt(insight.clicks || "0");
      const impressions = parseInt(insight.impressions || "0");
      const reach = parseInt(insight.reach || "0");
      const frequency = parseFloat(insight.frequency || "0");
      const ctr = parseFloat(insight.ctr || "0");
      const cpc = parseFloat(insight.cpc || "0");
      const cpm = parseFloat(insight.cpm || "0");

      // Funnel metrics
      const atcAction = insight.actions?.find((a: any) => a.action_type === "add_to_cart" || a.action_type === "omni_add_to_cart");
      const addToCart = atcAction ? parseFloat(atcAction.value) : 0;
      const icAction = insight.actions?.find((a: any) => a.action_type === "initiate_checkout" || a.action_type === "omni_initiated_checkout");
      const initiateCheckout = icAction ? parseFloat(icAction.value) : 0;
      const conversionRate = clicks > 0 ? (purchaseCount / clicks) * 100 : 0;
      const costPerATC = addToCart > 0 ? spend / addToCart : 0;
      const costPerIC = initiateCheckout > 0 ? spend / initiateCheckout : 0;

      const creative = adCreativeMap[insight.ad_id] || {
        adName: insight.ad_name,
        creativeTitle: insight.ad_name,
        creativeBody: "",
        thumbnailUrl: "",
        imageUrl: "",
        isVideo: false,
      };

      adPerformances.push({
        adId: insight.ad_id,
        adName: insight.ad_name,
        campaignName: insight.campaign_name,
        adsetName: insight.adset_name,
        adStatus: creative.status || "UNKNOWN",
        spend,
        purchases: purchaseCount,
        revenue: revenueValue,
        cpa,
        roas,
        impressions,
        reach,
        frequency,
        clicks,
        ctr,
        cpc,
        cpm,
        addToCart,
        initiateCheckout,
        conversionRate,
        costPerATC,
        costPerIC,
        creative,
        dateRange: `${since} - ${until}`,
      });
    }

    // 4. Multi-metric weighted scoring (CPA-first model)
    // Weights: 35% CPA efficiency, 25% Purchases, 20% ROAS, 10% CTR, 10% Spend scale
    // CPA is the most sensitive metric for operations — penalize high CPA ads
    if (adPerformances.length === 0) {
      return new Response(JSON.stringify({ topAds: [], totalAds: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const maxPurchases = Math.max(...adPerformances.map(a => a.purchases));
    const minCpa = Math.min(...adPerformances.map(a => a.cpa));
    const maxCpa = Math.max(...adPerformances.map(a => a.cpa));
    const cpaRange = maxCpa - minCpa || 1;
    const maxRoas = Math.max(...adPerformances.map(a => a.roas));
    const maxCtr = Math.max(...adPerformances.map(a => a.ctr));
    const maxSpend = Math.max(...adPerformances.map(a => a.spend));

    // Calculate median CPA for penalty threshold
    const sortedCpas = adPerformances.map(a => a.cpa).sort((a, b) => a - b);
    const medianCpa = sortedCpas[Math.floor(sortedCpas.length / 2)];

    for (const ad of adPerformances) {
      const purchaseScore = maxPurchases > 0 ? ad.purchases / maxPurchases : 0;
      // CPA: inverted — lower CPA = higher score
      const cpaScore = 1 - ((ad.cpa - minCpa) / cpaRange);
      const roasScore = maxRoas > 0 ? ad.roas / maxRoas : 0;
      const ctrScore = maxCtr > 0 ? ad.ctr / maxCtr : 0;
      const spendScore = maxSpend > 0 ? ad.spend / maxSpend : 0;

      // Penalty: if CPA is more than 1.5x the median, apply diminishing multiplier
      let cpaPenalty = 1.0;
      if (ad.cpa > medianCpa * 1.5) {
        cpaPenalty = Math.max(0.3, medianCpa / ad.cpa); // floors at 0.3x
      }

      const rawScore = 
        (cpaScore * 0.35) + 
        (purchaseScore * 0.25) + 
        (roasScore * 0.20) + 
        (ctrScore * 0.10) + 
        (spendScore * 0.10);

      const weightedScore = rawScore * cpaPenalty;

      (ad as any).weightedScore = weightedScore;
      (ad as any).cpaPenalty = cpaPenalty;
      (ad as any).scores = { cpaScore, purchaseScore, roasScore, ctrScore, spendScore };
    }

    // Sort by weighted score descending
    adPerformances.sort((a: any, b: any) => b.weightedScore - a.weightedScore);

    const topAds = adPerformances.slice(0, topN);

    return new Response(JSON.stringify({
      topAds,
      totalAdsAnalyzed: adPerformances.length,
      totalAdsInAccount: adsData.length,
      medianCPA: medianCpa,
      scoringMethod: "35% CPA efficiency + 25% purchases + 20% ROAS + 10% CTR + 10% spend | CPA penalty if >1.5x median",
      period: `${since} to ${until}`,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Top Creatives API error:", error);
    return new Response(JSON.stringify({ error: error.message || "Internal server error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
