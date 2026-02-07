import { useState, useEffect } from 'react';
import { Plus, FileText, Download, Eye, Trash2, Edit2, Calendar, Building, DollarSign, RefreshCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ProposalForm, type ProposalFormData, type ProposalService } from './ProposalForm';
import { generateProposalPDF, downloadProposalPDF, type ProposalPDFData } from './ProposalPDF';

interface ServiceProposal {
  id: string;
  created_at: string;
  updated_at: string;
  client_name: string;
  client_company: string;
  client_email: string | null;
  client_phone: string | null;
  proposal_number: string;
  proposal_date: string;
  valid_until: string | null;
  services: ProposalService[];
  subtotal: number;
  discount_percentage: number;
  discount_amount: number;
  total: number;
  currency: string;
  payment_terms: string | null;
  notes: string | null;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  created_by: string | null;
}

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-700',
  sent: 'bg-blue-100 text-blue-700',
  accepted: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
  expired: 'bg-yellow-100 text-yellow-700',
};

export function ProposalGenerator() {
  const { toast } = useToast();
  const [proposals, setProposals] = useState<ServiceProposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProposal, setEditingProposal] = useState<ServiceProposal | null>(null);
  const [selectedProposal, setSelectedProposal] = useState<ServiceProposal | null>(null);
  const [generatingPDF, setGeneratingPDF] = useState<string | null>(null);
  const [savingProposal, setSavingProposal] = useState(false);

  const fetchProposals = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('service_proposals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Parse JSONB services field and cast to correct types
      const parsedData = (data || []).map(p => ({
        ...p,
        services: typeof p.services === 'string' ? JSON.parse(p.services) : (p.services || []),
        subtotal: Number(p.subtotal),
        discount_percentage: Number(p.discount_percentage || 0),
        discount_amount: Number(p.discount_amount || 0),
        total: Number(p.total),
      })) as ServiceProposal[];
      
      setProposals(parsedData);
    } catch (error) {
      console.error('Error fetching proposals:', error);
      toast({
        title: 'Error',
        description: 'Failed to load proposals',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  const handleSubmit = async (formData: ProposalFormData) => {
    setSavingProposal(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Convert services to JSON-compatible format for Supabase
      const servicesJson = formData.services.map(s => ({
        id: s.id,
        name: s.name,
        description: s.description,
        price: s.price,
        currency: s.currency,
        type: s.type,
        isCustom: s.isCustom,
      }));
      
      const proposalData = {
        client_name: formData.client_name,
        client_company: formData.client_company,
        client_email: formData.client_email || null,
        client_phone: formData.client_phone || null,
        proposal_number: formData.proposal_number,
        proposal_date: formData.proposal_date,
        valid_until: formData.valid_until || null,
        services: servicesJson,
        subtotal: formData.subtotal,
        discount_percentage: formData.discount_percentage,
        discount_amount: formData.discount_amount,
        total: formData.total,
        currency: formData.currency,
        payment_terms: formData.payment_terms || null,
        notes: formData.notes || null,
        status: 'draft' as const,
        created_by: user?.id || null,
      };

      if (editingProposal) {
        const { error } = await supabase
          .from('service_proposals')
          .update(proposalData)
          .eq('id', editingProposal.id);

        if (error) throw error;
        
        toast({
          title: 'Proposal updated',
          description: `Proposal ${formData.proposal_number} has been updated.`,
        });
      } else {
        const { error } = await supabase
          .from('service_proposals')
          .insert([proposalData]);

        if (error) throw error;
        
        toast({
          title: 'Proposal created',
          description: `Proposal ${formData.proposal_number} has been saved.`,
        });
      }

      setShowForm(false);
      setEditingProposal(null);
      fetchProposals();
    } catch (error) {
      console.error('Error saving proposal:', error);
      toast({
        title: 'Error',
        description: 'Failed to save proposal',
        variant: 'destructive',
      });
    } finally {
      setSavingProposal(false);
    }
  };

  const handleDelete = async (proposal: ServiceProposal) => {
    if (!confirm(`Are you sure you want to delete proposal ${proposal.proposal_number}?`)) return;
    
    try {
      const { error } = await supabase
        .from('service_proposals')
        .delete()
        .eq('id', proposal.id);

      if (error) throw error;
      
      toast({
        title: 'Proposal deleted',
        description: `Proposal ${proposal.proposal_number} has been deleted.`,
      });
      
      fetchProposals();
    } catch (error) {
      console.error('Error deleting proposal:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete proposal',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateStatus = async (proposal: ServiceProposal, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('service_proposals')
        .update({ status: newStatus })
        .eq('id', proposal.id);

      if (error) throw error;
      
      fetchProposals();
      setSelectedProposal(prev => prev ? { ...prev, status: newStatus as ServiceProposal['status'] } : null);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDownloadPDF = async (proposal: ServiceProposal) => {
    setGeneratingPDF(proposal.id);
    try {
      const pdfData: ProposalPDFData = {
        client_name: proposal.client_name,
        client_company: proposal.client_company,
        client_email: proposal.client_email || undefined,
        client_phone: proposal.client_phone || undefined,
        proposal_number: proposal.proposal_number,
        proposal_date: proposal.proposal_date,
        valid_until: proposal.valid_until || undefined,
        services: proposal.services,
        subtotal: proposal.subtotal,
        discount_percentage: proposal.discount_percentage,
        discount_amount: proposal.discount_amount,
        total: proposal.total,
        currency: proposal.currency,
        payment_terms: proposal.payment_terms || undefined,
        notes: proposal.notes || undefined,
      };

      const blob = await generateProposalPDF(pdfData);
      const filename = `${proposal.proposal_number}_${proposal.client_company.replace(/\s+/g, '_')}.pdf`;
      downloadProposalPDF(blob, filename);
      
      toast({
        title: 'PDF generated',
        description: `${filename} has been downloaded.`,
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate PDF',
        variant: 'destructive',
      });
    } finally {
      setGeneratingPDF(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number, currency: string) => {
    const symbol = currency === 'USD' ? '$' : '€';
    return `${symbol}${amount.toFixed(2)}`;
  };

  const convertToFormData = (proposal: ServiceProposal): ProposalFormData => ({
    client_name: proposal.client_name,
    client_company: proposal.client_company,
    client_email: proposal.client_email || '',
    client_phone: proposal.client_phone || '',
    proposal_number: proposal.proposal_number,
    proposal_date: proposal.proposal_date,
    valid_until: proposal.valid_until || '',
    services: proposal.services,
    subtotal: proposal.subtotal,
    discount_percentage: proposal.discount_percentage,
    discount_amount: proposal.discount_amount,
    total: proposal.total,
    currency: proposal.currency,
    payment_terms: proposal.payment_terms || '',
    notes: proposal.notes || '',
  });

  if (showForm) {
    return (
      <Card className="border-0 shadow-lg rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl" style={{ color: '#2d4a2d' }}>
                {editingProposal ? 'Edit Proposal' : 'Create New Proposal'}
              </CardTitle>
              <CardDescription>
                {editingProposal ? `Editing ${editingProposal.proposal_number}` : 'Fill in the details below'}
              </CardDescription>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => { setShowForm(false); setEditingProposal(null); }}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ProposalForm
            initialData={editingProposal ? convertToFormData(editingProposal) : undefined}
            onSubmit={handleSubmit}
            onCancel={() => { setShowForm(false); setEditingProposal(null); }}
            isLoading={savingProposal}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="border-0 shadow-lg rounded-2xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-xl" style={{ color: '#2d4a2d' }}>Service Proposals</CardTitle>
              <CardDescription>Create and manage client proposals</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fetchProposals}
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button 
                size="sm" 
                onClick={() => setShowForm(true)}
                style={{ backgroundColor: '#8BC34A' }}
                className="hover:opacity-90"
              >
                <Plus className="w-4 h-4 mr-1" />
                New Proposal
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-12 text-center">
              <RefreshCw className="w-8 h-8 mx-auto animate-spin text-muted-foreground" />
            </div>
          ) : proposals.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No proposals yet</p>
              <p className="text-sm text-muted-foreground mb-4">Create your first proposal to get started</p>
              <Button 
                onClick={() => setShowForm(true)}
                style={{ backgroundColor: '#8BC34A' }}
                className="hover:opacity-90"
              >
                <Plus className="w-4 h-4 mr-1" />
                Create Proposal
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Date</TableHead>
                    <TableHead>Number</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {proposals.map((proposal) => (
                    <TableRow 
                      key={proposal.id} 
                      className="cursor-pointer hover:bg-accent/5"
                      onClick={() => setSelectedProposal(proposal)}
                    >
                      <TableCell className="whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {formatDate(proposal.proposal_date)}
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{proposal.proposal_number}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{proposal.client_company}</p>
                          <p className="text-sm text-muted-foreground">{proposal.client_name}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold" style={{ color: '#2d4a2d' }}>
                        {formatCurrency(proposal.total, proposal.currency)}
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[proposal.status]}>
                          {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1" onClick={e => e.stopPropagation()}>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => { setEditingProposal(proposal); setShowForm(true); }}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDownloadPDF(proposal)}
                            disabled={generatingPDF === proposal.id}
                          >
                            {generatingPDF === proposal.id ? (
                              <RefreshCw className="w-4 h-4 animate-spin" />
                            ) : (
                              <Download className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(proposal)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Proposal Detail Dialog */}
      <Dialog open={!!selectedProposal} onOpenChange={() => setSelectedProposal(null)}>
        <DialogContent className="max-w-3xl rounded-2xl max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold" style={{ color: '#2d4a2d' }}>
              Proposal Details
            </DialogTitle>
          </DialogHeader>
          {selectedProposal && (
            <ScrollArea className="flex-1">
              <div className="space-y-6 p-1">
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <p className="font-mono text-lg font-semibold">{selectedProposal.proposal_number}</p>
                    <p className="text-sm text-muted-foreground">{formatDate(selectedProposal.proposal_date)}</p>
                    {selectedProposal.valid_until && (
                      <p className="text-sm text-muted-foreground">
                        Valid until: {formatDate(selectedProposal.valid_until)}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Select 
                      value={selectedProposal.status} 
                      onValueChange={(v) => handleUpdateStatus(selectedProposal, v)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="sent">Sent</SelectItem>
                        <SelectItem value="accepted">Accepted</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="expired">Expired</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownloadPDF(selectedProposal)}
                      disabled={generatingPDF === selectedProposal.id}
                    >
                      {generatingPDF === selectedProposal.id ? (
                        <RefreshCw className="w-4 h-4 animate-spin mr-1" />
                      ) : (
                        <Download className="w-4 h-4 mr-1" />
                      )}
                      PDF
                    </Button>
                  </div>
                </div>

                {/* Client Info */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="w-4 h-4 text-muted-foreground" />
                    <p className="font-semibold">{selectedProposal.client_company}</p>
                  </div>
                  <p className="text-sm">{selectedProposal.client_name}</p>
                  {selectedProposal.client_email && (
                    <p className="text-sm text-muted-foreground">{selectedProposal.client_email}</p>
                  )}
                  {selectedProposal.client_phone && (
                    <p className="text-sm text-muted-foreground">{selectedProposal.client_phone}</p>
                  )}
                </div>

                {/* Services */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Services
                  </h4>
                  <div className="space-y-2">
                    {selectedProposal.services.map((service) => (
                      <div key={service.id} className="flex justify-between items-start p-3 bg-white border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{service.name}</p>
                          <p className="text-xs text-muted-foreground">{service.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatCurrency(service.price, selectedProposal.currency)}</p>
                          <Badge variant="secondary" className="text-xs">
                            {service.type === 'monthly' ? '/mo' : 'one-time'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Totals */}
                <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatCurrency(selectedProposal.subtotal, selectedProposal.currency)}</span>
                  </div>
                  {selectedProposal.discount_percentage > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Discount ({selectedProposal.discount_percentage}%)</span>
                      <span>-{formatCurrency(selectedProposal.discount_amount, selectedProposal.currency)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg pt-2 border-t" style={{ color: '#2d4a2d' }}>
                    <span>Total</span>
                    <span>{formatCurrency(selectedProposal.total, selectedProposal.currency)}</span>
                  </div>
                </div>

                {/* Terms */}
                {selectedProposal.payment_terms && (
                  <div>
                    <h4 className="font-semibold mb-2">Payment Terms</h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{selectedProposal.payment_terms}</p>
                  </div>
                )}

                {/* Notes */}
                {selectedProposal.notes && (
                  <div>
                    <h4 className="font-semibold mb-2">Notes</h4>
                    <p className="text-sm text-muted-foreground">{selectedProposal.notes}</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
