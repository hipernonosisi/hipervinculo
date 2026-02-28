const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the client IP from headers (Supabase forwards it)
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('cf-connecting-ip') ||
      req.headers.get('x-real-ip') ||
      '';

    if (!ip || ip === '127.0.0.1' || ip === '::1') {
      return new Response(
        JSON.stringify({ city: 'Unknown', country: 'Unknown', region: 'Unknown', ip }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Use ip-api.com free tier (no key needed, HTTP only for free tier)
    const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,regionName,city,isp,query`);
    const geo = await geoRes.json();

    if (geo.status !== 'success') {
      return new Response(
        JSON.stringify({ city: 'Unknown', country: 'Unknown', region: 'Unknown', ip }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        city: geo.city || 'Unknown',
        country: geo.country || 'Unknown',
        region: geo.regionName || 'Unknown',
        isp: geo.isp || 'Unknown',
        ip: geo.query || ip,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Geolocate error:', error);
    return new Response(
      JSON.stringify({ city: 'Unknown', country: 'Unknown', region: 'Unknown', error: 'lookup_failed' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
