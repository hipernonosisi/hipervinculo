import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar, Phone, Mail, Globe, DollarSign, Trash2, UserX, AlertTriangle, TrendingDown, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface IncompleteLead {
  id: string;
  session_id: string;
  current_step: number;
  website_url: string | null;
  contact_name: string | null;
  phone: string | null;
  email: string | null;
  monthly_budget: string | null;
  language: string | null;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

const STEP_LABELS = [
  'Website URL',
  'Full Name',
  'Phone',
  'Email',
  'Budget',
  'Pricing',
];

const STEP_SHORT = ['URL', 'Name', 'Phone', 'Email', 'Budget', 'Pricing'];

function DropoffAnalytics({ leads, completedCount }: { leads: IncompleteLead[]; completedCount: number }) {
  const analysis = useMemo(() => {
    const total = leads.length + completedCount;
    if (total === 0) return null;

    // Count drop-offs per step
    const stepCounts = Array(6).fill(0);
    leads.forEach(l => {
      if (l.current_step >= 0 && l.current_step < 6) stepCounts[l.current_step]++;
    });

    // Find the worst step (highest drop-off)
    const maxDropStep = stepCounts.indexOf(Math.max(...stepCounts));
    const maxDropCount = stepCounts[maxDropStep];
    const maxDropPct = total > 0 ? Math.round((maxDropCount / total) * 100) : 0;

    // Completion rate
    const completionRate = total > 0 ? Math.round((completedCount / total) * 100) : 0;

    // Detect patterns
    const patterns: string[] = [];

    // Pattern: most people drop at a specific step
    if (maxDropPct >= 30 && maxDropCount >= 3) {
      const stepName = STEP_LABELS[maxDropStep];
      patterns.push(`${maxDropPct}% of all visitors abandon at the "${stepName}" step. This is the biggest bottleneck in your funnel.`);
      
      if (maxDropStep === 0) {
        patterns.push('People are leaving before even entering their website. Consider making the first question less committal or more engaging.');
      } else if (maxDropStep === 2) {
        patterns.push('Phone number is a friction point. Many users hesitate to share their phone early. Consider moving it after email or making it optional.');
      } else if (maxDropStep === 3) {
        patterns.push('Email step is causing drop-offs. Users may feel this is where "sales pressure" begins.');
      } else if (maxDropStep === 5) {
        patterns.push('People drop at the pricing step. They may feel the investment is too high, or the pricing info may create hesitation before submitting.');
      }
    }

    // Pattern: very low completion
    if (completionRate < 5 && total >= 10) {
      patterns.push(`Only ${completionRate}% completion rate across ${total} visitors. The funnel has significant friction that needs addressing.`);
    }

    // Pattern: early vs late drop-off
    const earlyDrops = stepCounts[0] + stepCounts[1];
    const lateDrops = stepCounts[3] + stepCounts[4] + stepCounts[5];
    if (earlyDrops > lateDrops * 2 && earlyDrops >= 5) {
      patterns.push('Most abandonment happens in the first 2 steps. The landing page may not be building enough interest before asking questions.');
    } else if (lateDrops > earlyDrops * 2 && lateDrops >= 5) {
      patterns.push('People engage early but leave late. They are interested but something in the final steps (contact info or pricing) creates resistance.');
    }

    // Pattern: language split
    const enLeads = leads.filter(l => l.language !== 'es').length;
    const esLeads = leads.filter(l => l.language === 'es').length;
    if (enLeads > 0 && esLeads > 0) {
      const enDropRate = Math.round((enLeads / (enLeads + esLeads)) * 100);
      if (enDropRate > 70) {
        patterns.push(`${enDropRate}% of incomplete leads are English-speaking. Check if the English copy is as compelling as the Spanish version.`);
      } else if (enDropRate < 30) {
        patterns.push(`${100 - enDropRate}% of incomplete leads are Spanish-speaking. Check if the Spanish copy is as compelling as the English version.`);
      }
    }

    return { stepCounts, maxDropStep, maxDropCount, maxDropPct, completionRate, total, patterns };
  }, [leads, completedCount]);

  if (!analysis || analysis.total === 0) return null;

  const { stepCounts, maxDropStep, completionRate, total, patterns } = analysis;
  const maxCount = Math.max(...stepCounts, 1);

  return (
    <div className="space-y-4 mb-6">
      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border-0 shadow-sm rounded-xl">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{total}</p>
            <p className="text-xs text-muted-foreground">Total Started</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm rounded-xl">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{leads.length}</p>
            <p className="text-xs text-muted-foreground">Incomplete</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm rounded-xl">
          <CardContent className="p-4 text-center">
            <p className={cn('text-2xl font-bold', completionRate < 10 ? 'text-destructive' : completionRate < 30 ? 'text-yellow-600' : 'text-accent')}>
              {completionRate}%
            </p>
            <p className="text-xs text-muted-foreground">Completion Rate</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm rounded-xl">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-destructive">{STEP_SHORT[maxDropStep]}</p>
            <p className="text-xs text-muted-foreground">Worst Step</p>
          </CardContent>
        </Card>
      </div>

      {/* Drop-off funnel chart */}
      <Card className="border-0 shadow-sm rounded-xl">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-sm font-semibold">Drop-off by Step</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="space-y-2">
            {STEP_LABELS.map((label, i) => {
              const count = stepCounts[i];
              const pct = total > 0 ? Math.round((count / total) * 100) : 0;
              const barWidth = maxCount > 0 ? (count / maxCount) * 100 : 0;
              const isWorst = i === maxDropStep && count > 0;
              return (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-20 text-right shrink-0">{label}</span>
                  <div className="flex-1 h-6 bg-secondary/50 rounded-md overflow-hidden relative">
                    <div
                      className={cn(
                        'h-full rounded-md transition-all',
                        isWorst ? 'bg-destructive/80' : 'bg-accent/60'
                      )}
                      style={{ width: `${barWidth}%` }}
                    />
                    {count > 0 && (
                      <span className="absolute inset-y-0 left-2 flex items-center text-xs font-medium">
                        {count} ({pct}%)
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Pattern insights */}
      {patterns.length > 0 && (
        <Card className="border-0 shadow-sm rounded-xl border-l-4 border-l-yellow-400">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <CardTitle className="text-sm font-semibold">Pattern Insights</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pb-4">
            <ul className="space-y-2">
              {patterns.map((pattern, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <TrendingDown className="h-4 w-4 text-yellow-600 mt-0.5 shrink-0" />
                  <span>{pattern}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export function IncompleteLeadsSection() {
  const { toast } = useToast();
  const [leads, setLeads] = useState<IncompleteLead[]>([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<IncompleteLead | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    const [incompleteRes, completedRes] = await Promise.all([
      supabase
        .from('incomplete_leads')
        .select('*')
        .eq('completed', false)
        .order('updated_at', { ascending: false }),
      supabase
        .from('incomplete_leads')
        .select('*', { count: 'exact', head: true })
        .eq('completed', true),
    ]);
    
    if (incompleteRes.data) setLeads(incompleteRes.data as IncompleteLead[]);
    if (incompleteRes.error) console.error('Error fetching incomplete leads:', incompleteRes.error);
    setCompletedCount(completedRes.count || 0);
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this incomplete lead?')) return;
    const { error } = await supabase.from('incomplete_leads').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: 'Could not delete.', variant: 'destructive' });
    } else {
      setLeads(prev => prev.filter(l => l.id !== id));
      setSelectedLead(null);
      toast({ title: 'Deleted', description: 'Incomplete lead removed.' });
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
    });

  const getStepBadge = (step: number) => {
    const label = STEP_LABELS[step] || `Step ${step}`;
    const colors = step <= 1 ? 'bg-destructive/10 text-destructive' : step <= 3 ? 'bg-yellow-100 text-yellow-700' : 'bg-accent/10 text-accent';
    return <Badge className={cn('rounded-full text-xs', colors)}>{`Dropped at: ${label}`}</Badge>;
  };

  return (
    <>
      {/* Analytics Section */}
      {!loading && <DropoffAnalytics leads={leads} completedCount={completedCount} />}

      {/* Leads Table */}
      <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
        <CardHeader>
          <CardTitle>Incomplete Preview Leads</CardTitle>
          <CardDescription>
            People who started the preview form but didn't finish — see where they dropped off
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-12 text-center text-muted-foreground">Loading...</div>
          ) : leads.length === 0 ? (
            <div className="p-12 text-center">
              <UserX className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No incomplete leads yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead>Date</TableHead>
                    <TableHead>Dropped At</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Website</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow
                      key={lead.id}
                      className="cursor-pointer hover:bg-accent/5"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <TableCell className="whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {formatDate(lead.updated_at)}
                        </div>
                      </TableCell>
                      <TableCell>{getStepBadge(lead.current_step)}</TableCell>
                      <TableCell className="font-medium">{lead.contact_name || '—'}</TableCell>
                      <TableCell>
                        {lead.phone ? (
                          <a href={`tel:${lead.phone}`} className="text-accent hover:underline" onClick={e => e.stopPropagation()}>
                            {lead.phone}
                          </a>
                        ) : '—'}
                      </TableCell>
                      <TableCell>
                        {lead.email ? (
                          <a href={`mailto:${lead.email}`} className="text-accent hover:underline" onClick={e => e.stopPropagation()}>
                            {lead.email}
                          </a>
                        ) : '—'}
                      </TableCell>
                      <TableCell>
                        {lead.website_url && lead.website_url !== 'no-website' ? (
                          <a href={`https://${lead.website_url}`} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline" onClick={e => e.stopPropagation()}>
                            {lead.website_url}
                          </a>
                        ) : lead.website_url === 'no-website' ? (
                          <span className="text-muted-foreground text-xs">No website</span>
                        ) : '—'}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={(e) => { e.stopPropagation(); handleDelete(lead.id); }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Incomplete Lead Details</DialogTitle>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {getStepBadge(selectedLead.current_step)}
                <Badge variant="outline" className="rounded-full text-xs">
                  {selectedLead.language === 'es' ? 'Spanish' : 'English'}
                </Badge>
              </div>

              {/* Progress visualization */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Form Progress</p>
                <div className="grid grid-cols-6 gap-1">
                  {STEP_LABELS.map((label, i) => (
                    <div key={i} className="text-center">
                      <div className={cn(
                        'h-2 rounded-full mb-1',
                        i < selectedLead.current_step ? 'bg-accent' : i === selectedLead.current_step ? 'bg-yellow-400' : 'bg-secondary'
                      )} />
                      <span className="text-[10px] text-muted-foreground leading-tight block">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data collected */}
              <div className="space-y-3 pt-2">
                {selectedLead.website_url && (
                  <div className="flex items-start gap-3">
                    <Globe className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Website</p>
                      <p className="text-sm">{selectedLead.website_url === 'no-website' ? 'No website yet' : selectedLead.website_url}</p>
                    </div>
                  </div>
                )}
                {selectedLead.contact_name && (
                  <div className="flex items-start gap-3">
                    <UserX className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Name</p>
                      <p className="text-sm">{selectedLead.contact_name}</p>
                    </div>
                  </div>
                )}
                {selectedLead.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <a href={`tel:${selectedLead.phone}`} className="text-sm text-accent hover:underline">{selectedLead.phone}</a>
                    </div>
                  </div>
                )}
                {selectedLead.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <a href={`mailto:${selectedLead.email}`} className="text-sm text-accent hover:underline">{selectedLead.email}</a>
                    </div>
                  </div>
                )}
                {selectedLead.monthly_budget && (
                  <div className="flex items-start gap-3">
                    <DollarSign className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Budget</p>
                      <p className="text-sm">{selectedLead.monthly_budget}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Contact actions */}
              <div className="flex gap-2 pt-2">
                {selectedLead.phone && (
                  <Button size="sm" variant="outline" asChild className="gap-2">
                    <a href={`https://wa.me/${selectedLead.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                      <Phone className="h-3.5 w-3.5" /> WhatsApp
                    </a>
                  </Button>
                )}
                {selectedLead.email && (
                  <Button size="sm" variant="outline" asChild className="gap-2">
                    <a href={`mailto:${selectedLead.email}`}>
                      <Mail className="h-3.5 w-3.5" /> Email
                    </a>
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="destructive"
                  className="gap-2 ml-auto"
                  onClick={() => handleDelete(selectedLead.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                Started: {formatDate(selectedLead.created_at)} · Last activity: {formatDate(selectedLead.updated_at)}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
