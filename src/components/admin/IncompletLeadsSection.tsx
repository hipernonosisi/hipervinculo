import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar, Phone, Mail, Globe, DollarSign, Trash2, UserX } from 'lucide-react';
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

export function IncompleteLeadsSection() {
  const { toast } = useToast();
  const [leads, setLeads] = useState<IncompleteLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<IncompleteLead | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('incomplete_leads')
      .select('*')
      .eq('completed', false)
      .order('updated_at', { ascending: false });
    
    if (data) setLeads(data as IncompleteLead[]);
    if (error) console.error('Error fetching incomplete leads:', error);
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
    const colors = step <= 1 ? 'bg-red-100 text-red-700' : step <= 3 ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700';
    return <Badge className={cn('rounded-full text-xs', colors)}>{`Dropped at: ${label}`}</Badge>;
  };

  return (
    <>
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
                  <TableRow className="bg-gray-50">
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
                          className="h-8 w-8 text-muted-foreground hover:text-red-600"
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
                        i < selectedLead.current_step ? 'bg-accent' : i === selectedLead.current_step ? 'bg-yellow-400' : 'bg-gray-200'
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
