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
    const insightFields = "ad_id,ad_name,campaign_name,adset_name,spend,impressions,clicks,ctr,cpc,cpm,actions,action_values,cost_per_action_type";
    const timeRange = `&time_range={"since":"${since}","until":"${until}"}`;
    const insightsUrl = `${META_BASE_URL}/act_${adAccountId}/insights?fields=${insightFields}${timeRange}&level=ad&access_token=${metaToken}&limit=500`;
    
    const insightsData = await fetchAllPages(insightsUrl);

    // 2. Get ads with creative info
    const adsUrl = `${META_BASE_URL}/act_${adAccountId}/ads?fields=id,name,status,effective_status,creative{id,name,title,body,image_url,thumbnail_url,object_story_spec}&access_token=${metaToken}&limit=500`;
    const adsData = await fetchAllPages(adsUrl);

    // Build a map of ad_id -> creative info
    const adCreativeMap: Record<string, any> = {};
    for (const ad of adsData) {
      adCreativeMap[ad.id] = {
        adName: ad.name,
        status: ad.effective_status || ad.status,
        creativeTitle: ad.creative?.title || ad.creative?.name || ad.name,
        creativeBody: ad.creative?.body || "",
        thumbnailUrl: ad.creative?.thumbnail_url || "",
        imageUrl: ad.creative?.image_url || ad.creative?.object_story_spec?.video_data?.image_url || "",
        isVideo: !!ad.creative?.object_story_spec?.video_data,
      };
    }

    // 3. Process insights: extract purchases, spend, CPA for each ad
    interface AdPerformance {
      adId: string;
      adName: string;
      campaignName: string;
      adsetName: string;
      spend: number;
      purchases: number;
      revenue: number;
      cpa: number;
      roas: number;
      impressions: number;
      clicks: number;
      ctr: number;
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
        impressions: parseInt(insight.impressions || "0"),
        clicks: parseInt(insight.clicks || "0"),
        ctr: parseFloat(insight.ctr || "0"),
        creative,
        dateRange: `${since} - ${until}`,
      });
    }

    // 4. Multi-metric weighted scoring (expert model)
    // Weights: 25% Purchases, 25% CPA efficiency, 20% ROAS, 15% CTR, 15% Spend efficiency
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

    for (const ad of adPerformances) {
      const purchaseScore = maxPurchases > 0 ? ad.purchases / maxPurchases : 0;
      const cpaScore = 1 - ((ad.cpa - minCpa) / cpaRange);
      const roasScore = maxRoas > 0 ? ad.roas / maxRoas : 0;
      const ctrScore = maxCtr > 0 ? ad.ctr / maxCtr : 0;
      // Spend as validated scale — higher spend with good metrics = battle-tested
      const spendScore = maxSpend > 0 ? ad.spend / maxSpend : 0;

      const weightedScore = 
        (purchaseScore * 0.25) + 
        (cpaScore * 0.25) + 
        (roasScore * 0.20) + 
        (ctrScore * 0.15) + 
        (spendScore * 0.15);

      (ad as any).weightedScore = weightedScore;
      (ad as any).scores = { purchaseScore, cpaScore, roasScore, ctrScore, spendScore };
    }

    // Sort by weighted score descending
    adPerformances.sort((a: any, b: any) => b.weightedScore - a.weightedScore);

    const topAds = adPerformances.slice(0, topN);

    return new Response(JSON.stringify({
      topAds,
      totalAdsAnalyzed: adPerformances.length,
      totalAdsInAccount: adsData.length,
      scoringMethod: "25% purchases + 25% CPA efficiency + 20% ROAS + 15% CTR + 15% spend (validated scale)",
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
