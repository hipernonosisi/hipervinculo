import { useRef, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { shopifyAgencyContent } from '@/data/shopifyAgencyContent';
import { shopifyAuditPayload } from '@/lib/shopifyAudit';
import { localizedPath } from '@/lib/seoRoutes';

export function ShopifyAuditForm({ defaultHelp = [] }: { defaultHelp?: readonly string[] }) {
  const { language } = useLanguage();
  const c = shopifyAgencyContent[language];
  const navigate = useNavigate();
  const openedAt = useRef(Date.now());
  const [help, setHelp] = useState<string[]>(() => [...defaultHelp]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const data = new FormData(event.currentTarget);
    if (data.get('company_website') || Date.now() - openedAt.current < 3000) return;
    if (!help.length) { setError(c.helpError); return; }
    setBusy(true);
    setError('');
    const payload = shopifyAuditPayload({
      name: String(data.get('name') ?? ''), email: String(data.get('email') ?? ''),
      website: String(data.get('website') ?? ''), revenue: String(data.get('revenue') ?? ''),
      help, message: String(data.get('message') ?? ''),
    });
    try {
      const { error: insertError } = await supabase.from('audit_requests').insert(payload);
      if (insertError) throw insertError;
      // Same notification and conversion destination as /audit; ad spend is not collected here.
      supabase.functions.invoke('send-notification', { body: {
        type: 'audit', source: 'shopify-audit', language, companyName: payload.company_name, email: payload.email,
        websiteUrl: payload.website_url, businessType: payload.business_type,
        monthlyRevenue: payload.monthly_revenue, monthlyAdSpend: '', growthGoals: payload.growth_goals,
      } }).catch(() => undefined);
      navigate(localizedPath('/thank-you/audit', language));
    } catch {
      setError(c.error);
    } finally { setBusy(false); }
  }

  return <form onSubmit={submit} className="space-y-6">
    <div className="hidden" aria-hidden="true"><label>Company website<input name="company_website" tabIndex={-1} autoComplete="off" /></label></div>
    <div className="grid gap-6 sm:grid-cols-2">
      {(['name', 'email', 'website'] as const).map((name, i) => <div key={name} className={name === 'website' ? 'sm:col-span-2' : ''}>
        <Label htmlFor={`shopify-${name}`}>{c.fields[i]}</Label>
        <Input id={`shopify-${name}`} name={name} type={name === 'email' ? 'email' : name === 'website' ? 'url' : 'text'} autoComplete={name === 'name' ? 'name' : name === 'email' ? 'email' : 'url'} required maxLength={name === 'website' ? 500 : name === 'name' ? 200 : 320} className="mt-2 h-12 bg-background" />
      </div>)}
      <div className="sm:col-span-2">
        <Label htmlFor="shopify-revenue">{c.fields[3]}</Label>
        <select id="shopify-revenue" name="revenue" required defaultValue="" className="mt-2 flex h-12 w-full rounded-md border border-input bg-background px-3 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
          <option value="" disabled>{c.choose}</option>
          {c.revenue.map((label, i) => <option key={label} value={shopifyAgencyContent.en.revenue[i]}>{label}</option>)}
        </select>
      </div>
    </div>
    <fieldset><legend className="text-sm font-medium mb-3">{c.fields[4]}</legend>
      <div className="grid gap-4 sm:grid-cols-2">{c.help.map((label, i) => <div key={label} className="flex items-center gap-3 min-h-11">
        <Checkbox id={`shopify-help-${i}`} checked={help.includes(shopifyAgencyContent.en.help[i])} onCheckedChange={checked => {
          const value = shopifyAgencyContent.en.help[i];
          setHelp(old => checked === true ? [...old, value] : old.filter(item => item !== value));
        }} /><Label htmlFor={`shopify-help-${i}`} className="cursor-pointer leading-relaxed">{label}</Label>
      </div>)}</div>
    </fieldset>
    <div><Label htmlFor="shopify-message">{c.fields[5]}</Label><Textarea id="shopify-message" name="message" rows={4} maxLength={4000} className="mt-2 bg-background" /></div>
    {error && <p role="alert" className="text-destructive">{error}</p>}
    <Button type="submit" disabled={busy} size="lg" className="h-auto min-h-12 whitespace-normal bg-primary text-primary-foreground px-6 py-3">{busy ? c.sending : c.submit}<ArrowRight className="ml-2 h-4 w-4 shrink-0" /></Button>
  </form>;
}