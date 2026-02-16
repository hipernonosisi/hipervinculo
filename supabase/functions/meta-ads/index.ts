import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const META_API_VERSION = "v21.0";
const META_BASE_URL = `https://graph.facebook.com/${META_API_VERSION}`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify admin auth
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing authorization" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const {
      data: { user },
      error: authError,
    } = await userClient.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const adminClient = createClient(supabaseUrl, supabaseServiceKey);
    const { data: isAdmin } = await adminClient.rpc("has_role", {
      _user_id: user.id,
      _role: "admin",
    });

    if (!isAdmin) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const metaToken = Deno.env.get("META_ACCESS_TOKEN");
    if (!metaToken) {
      return new Response(
        JSON.stringify({ error: "Meta access token not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { action, adAccountId, since, until, fields, level, time_increment } = await req.json();

    let url: string;
    let result: unknown;

    switch (action) {
      case "list_accounts": {
        // List ad accounts accessible by the System User
        url = `${META_BASE_URL}/me/adaccounts?fields=name,account_id,account_status,currency,timezone_name,amount_spent&access_token=${metaToken}&limit=100`;
        const resp = await fetch(url);
        result = await resp.json();
        break;
      }

      case "account_insights": {
        if (!adAccountId) {
          return new Response(
            JSON.stringify({ error: "adAccountId is required" }),
            {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }

        const insightFields =
          fields ||
          "spend,impressions,clicks,ctr,cpc,cpm,reach,frequency,actions,action_values,cost_per_action_type";
        const timeRange =
          since && until
            ? `&time_range={"since":"${since}","until":"${until}"}`
            : "&date_preset=last_30d";
        const breakdown = level === "campaign" ? "&level=campaign" : level === "adset" ? "&level=adset" : level === "ad" ? "&level=ad" : "";
        const timeInc = time_increment ? `&time_increment=${time_increment}` : "";

        url = `${META_BASE_URL}/act_${adAccountId}/insights?fields=${insightFields}${timeRange}${breakdown}${timeInc}&access_token=${metaToken}&limit=500`;
        const resp = await fetch(url);
        result = await resp.json();
        break;
      }

      case "campaigns": {
        if (!adAccountId) {
          return new Response(
            JSON.stringify({ error: "adAccountId is required" }),
            {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }

        const campaignFields =
          fields || "name,status,objective,daily_budget,lifetime_budget,start_time,stop_time";
        
        url = `${META_BASE_URL}/act_${adAccountId}/campaigns?fields=${campaignFields}&access_token=${metaToken}&limit=100`;
        const resp = await fetch(url);
        result = await resp.json();
        break;
      }

      case "campaign_insights": {
        if (!adAccountId) {
          return new Response(
            JSON.stringify({ error: "adAccountId is required" }),
            {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }

        const cInsightFields =
          fields ||
          "campaign_name,campaign_id,spend,impressions,clicks,ctr,cpc,cpm,reach,frequency,actions,action_values,cost_per_action_type";
        const cTimeRange =
          since && until
            ? `&time_range={"since":"${since}","until":"${until}"}`
            : "&date_preset=last_30d";
        const cTimeInc = time_increment ? `&time_increment=${time_increment}` : "";

        url = `${META_BASE_URL}/act_${adAccountId}/insights?fields=${cInsightFields}${cTimeRange}&level=campaign${cTimeInc}&access_token=${metaToken}&limit=500`;
        const resp = await fetch(url);
        result = await resp.json();
        break;
      }

      default:
        return new Response(
          JSON.stringify({
            error: "Invalid action",
            validActions: [
              "list_accounts",
              "account_insights",
              "campaigns",
              "campaign_insights",
            ],
          }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Meta Ads API error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
