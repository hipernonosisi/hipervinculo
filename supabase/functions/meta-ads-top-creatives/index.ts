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

    // 2. Process insights first to find ads with purchases
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
      
      if (purchaseCount === 0) continue;

      const spend = parseFloat(insight.spend || "0");
      // Exclude ads with less than $100 spend
      if (spend < 100) continue;
      
      const revenue = insight.action_values?.find((a: any) => 
        a.action_type === "purchase" || a.action_type === "omni_purchase"
      );
      const revenueValue = revenue ? parseFloat(revenue.value) : 0;
      
      // spend already computed above
      const cpa = purchaseCount > 0 ? spend / purchaseCount : 999999;
      const roas = spend > 0 ? revenueValue / spend : 0;
      const clicks = parseInt(insight.clicks || "0");
      const impressions = parseInt(insight.impressions || "0");
      const reach = parseInt(insight.reach || "0");
      const frequency = parseFloat(insight.frequency || "0");
      const ctr = parseFloat(insight.ctr || "0");
      const cpc = parseFloat(insight.cpc || "0");
      const cpm = parseFloat(insight.cpm || "0");

      const atcAction = insight.actions?.find((a: any) => a.action_type === "add_to_cart" || a.action_type === "omni_add_to_cart");
      const addToCart = atcAction ? parseFloat(atcAction.value) : 0;
      const icAction = insight.actions?.find((a: any) => a.action_type === "initiate_checkout" || a.action_type === "omni_initiated_checkout");
      const initiateCheckout = icAction ? parseFloat(icAction.value) : 0;
      const conversionRate = clicks > 0 ? (purchaseCount / clicks) * 100 : 0;
      const costPerATC = addToCart > 0 ? spend / addToCart : 0;
      const costPerIC = initiateCheckout > 0 ? spend / initiateCheckout : 0;

      adPerformances.push({
        adId: insight.ad_id,
        adName: insight.ad_name,
        campaignName: insight.campaign_name,
        adsetName: insight.adset_name,
        adStatus: "UNKNOWN",
        spend, purchases: purchaseCount, revenue: revenueValue, cpa, roas,
        impressions, reach, frequency, clicks, ctr, cpc, cpm,
        addToCart, initiateCheckout, conversionRate, costPerATC, costPerIC,
        creative: { creativeTitle: insight.ad_name, creativeBody: "", thumbnailUrl: "", imageUrl: "", isVideo: false },
        dateRange: `${since} - ${until}`,
      });
    }

    if (adPerformances.length === 0) {
      return new Response(JSON.stringify({ topAds: [], totalAdsAnalyzed: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 3. Score and rank FIRST, then only fetch creatives for top N
    const maxPurchases = Math.max(...adPerformances.map(a => a.purchases));
    const minCpa = Math.min(...adPerformances.map(a => a.cpa));
    const maxCpa = Math.max(...adPerformances.map(a => a.cpa));
    const cpaRange = maxCpa - minCpa || 1;
    const maxRoas = Math.max(...adPerformances.map(a => a.roas));
    const maxCtr = Math.max(...adPerformances.map(a => a.ctr));
    const maxSpend = Math.max(...adPerformances.map(a => a.spend));
    const sortedCpas = adPerformances.map(a => a.cpa).sort((a, b) => a - b);
    const medianCpa = sortedCpas[Math.floor(sortedCpas.length / 2)];

    for (const ad of adPerformances) {
      const purchaseScore = maxPurchases > 0 ? ad.purchases / maxPurchases : 0;
      const cpaScore = 1 - ((ad.cpa - minCpa) / cpaRange);
      const roasScore = maxRoas > 0 ? ad.roas / maxRoas : 0;
      const ctrScore = maxCtr > 0 ? ad.ctr / maxCtr : 0;
      const spendScore = maxSpend > 0 ? ad.spend / maxSpend : 0;

      let cpaPenalty = 1.0;
      if (ad.cpa > medianCpa * 1.5) {
        cpaPenalty = Math.max(0.3, medianCpa / ad.cpa);
      }

      const rawScore = (cpaScore * 0.35) + (purchaseScore * 0.25) + (roasScore * 0.20) + (ctrScore * 0.10) + (spendScore * 0.10);
      (ad as any).weightedScore = rawScore * cpaPenalty;
      (ad as any).cpaPenalty = cpaPenalty;
      (ad as any).scores = { cpaScore, purchaseScore, roasScore, ctrScore, spendScore };
    }

    adPerformances.sort((a: any, b: any) => b.weightedScore - a.weightedScore);
    const topAds = adPerformances.slice(0, topN);

    // 4. Fetch creative details ONLY for top N ads (parallel batch)
    const adIds = topAds.map(a => a.adId);
    console.log(`Fetching creative details for ${adIds.length} top ads...`);
    
    // Batch fetch: get ad details with creative info for top ads only
    const adDetailPromises = adIds.map(async (adId) => {
      try {
        const url = `${META_BASE_URL}/${adId}?fields=id,effective_status,creative{id,thumbnail_url,image_url,image_hash,object_story_spec}&access_token=${metaToken}`;
        const resp = await fetch(url);
        const json = await resp.json();
        return { adId, data: json };
      } catch (e) {
        console.error(`Error fetching ad ${adId}:`, e);
        return { adId, data: null };
      }
    });

    const adDetails = await Promise.all(adDetailPromises);

    // Collect image hashes for full-size lookup
    const imageHashes = new Set<string>();
    for (const detail of adDetails) {
      const hash = detail.data?.creative?.image_hash;
      if (hash) imageHashes.add(hash);
    }

    // Fetch full-size images from hashes
    const fullSizeMap: Record<string, string> = {};
    if (imageHashes.size > 0) {
      try {
        const hashArray = Array.from(imageHashes);
        const hashFilter = JSON.stringify(hashArray);
        const imgUrl = `${META_BASE_URL}/act_${adAccountId}/adimages?hashes=${hashFilter}&fields=hash,url,url_128,url_256&access_token=${metaToken}`;
        const imgResp = await fetch(imgUrl);
        const imgJson = await imgResp.json();
        if (imgJson.data) {
          for (const img of imgJson.data) {
            fullSizeMap[img.hash] = img.url || img.url_256 || img.url_128 || "";
          }
        }
      } catch (e) {
        console.error("Error fetching full-size images:", e);
      }
    }

    // Map creative info back to top ads
    for (const ad of topAds) {
      const detail = adDetails.find(d => d.adId === ad.adId);
      if (!detail?.data) continue;

      const creative = detail.data.creative;
      const status = detail.data.effective_status;
      if (status) ad.adStatus = status;

      if (!creative) continue;

      const hash = creative.image_hash;
      const fullSizeUrl = hash ? fullSizeMap[hash] : "";
      const videoImage = creative.object_story_spec?.video_data?.image_url || "";
      const videoThumb = creative.object_story_spec?.video_data?.call_to_action?.value?.link || "";

      // For link ads, get the picture from the link_data
      const linkImage = creative.object_story_spec?.link_data?.picture || 
                        creative.object_story_spec?.link_data?.image_hash || "";
      // For link_data child_attachments (carousel)
      const carouselImage = creative.object_story_spec?.link_data?.child_attachments?.[0]?.picture || "";

      const bestImageUrl = fullSizeUrl 
        || creative.image_url 
        || videoImage
        || linkImage
        || carouselImage
        || creative.thumbnail_url
        || "";

      ad.creative = {
        adName: ad.adName,
        creativeTitle: ad.adName,
        creativeBody: creative.object_story_spec?.link_data?.message || "",
        thumbnailUrl: creative.thumbnail_url || "",
        imageUrl: bestImageUrl,
        isVideo: !!(creative.object_story_spec?.video_data),
        status,
      };
    }

    return new Response(JSON.stringify({
      topAds,
      totalAdsAnalyzed: adPerformances.length,
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
