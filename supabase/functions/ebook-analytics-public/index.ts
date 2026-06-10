import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const url = new URL(req.url);
    const from = url.searchParams.get('from');
    const to = url.searchParams.get('to');
    if (!from || !to) {
      return new Response(JSON.stringify({ error: 'from and to required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data, error } = await supabase
      .from('page_events')
      .select('session_id, event_type, event_data, created_at')
      .eq('page_url', '/amazon-fba-ebook')
      .gte('created_at', from)
      .lte('created_at', to)
      .order('created_at', { ascending: false })
      .limit(20000);

    if (error) throw error;

    // Also fetch ebook purchases count (paid)
    const { count: purchasesCount } = await supabase
      .from('ebook_purchases')
      .select('id', { count: 'exact', head: true })
      .eq('payment_status', 'paid')
      .gte('created_at', from)
      .lte('created_at', to);

    return new Response(JSON.stringify({ events: data ?? [], purchases: purchasesCount ?? 0 }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
