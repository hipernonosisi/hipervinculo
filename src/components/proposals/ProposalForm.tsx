import { useState, useEffect } from 'react';
import { X, Plus, Trash2, Building, Mail, Phone, Calendar, DollarSign, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { predefinedServices, serviceCategories, defaultPaymentTerms, type ServiceItem } from './data/proposalServices';

export interface ProposalService {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  type: 'one-time' | 'monthly';
  isCustom: boolean;
}

export interface ProposalFormData {
  client_name: string;
  client_company: string;
  client_email: string;
  client_phone: string;
  proposal_number: string;
  proposal_date: string;
  valid_until: string;
  services: ProposalService[];
  subtotal: number;
  discount_percentage: number;
  discount_amount: number;
  total: number;
  currency: string;
  payment_terms: string;
  notes: string;
}

interface ProposalFormProps {
  initialData?: ProposalFormData;
  onSubmit: (data: ProposalFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const generateProposalNumber = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `HV-${year}-${random}`;
};

const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};

export function ProposalForm({ initialData, onSubmit, onCancel, isLoading }: ProposalFormProps) {
  const [formData, setFormData] = useState<ProposalFormData>(() => {
    if (initialData) return initialData;
    
    const today = new Date();
    const validUntil = new Date(today);
    validUntil.setDate(validUntil.getDate() + 30);
    
    return {
      client_name: '',
      client_company: '',
      client_email: '',
      client_phone: '',
      proposal_number: generateProposalNumber(),
      proposal_date: formatDate(today),
      valid_until: formatDate(validUntil),
      services: [],
      subtotal: 0,
      discount_percentage: 0,
      discount_amount: 0,
      total: 0,
      currency: 'USD',
      payment_terms: defaultPaymentTerms.en,
      notes: '',
    };
  });

  const [showServicePicker, setShowServicePicker] = useState(false);
  const [customService, setCustomService] = useState({
    name: '',
    description: '',
    price: 0,
    type: 'one-time' as 'one-time' | 'monthly',
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Recalculate totals when services or discount changes
  useEffect(() => {
    const subtotal = formData.services.reduce((acc, service) => acc + service.price, 0);
    const discountAmount = subtotal * (formData.discount_percentage / 100);
    const total = subtotal - discountAmount;
    
    setFormData(prev => ({
      ...prev,
      subtotal,
      discount_amount: discountAmount,
      total,
    }));
  }, [formData.services, formData.discount_percentage]);

  const handleInputChange = (field: keyof ProposalFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addPredefinedService = (service: ServiceItem) => {
    const newService: ProposalService = {
      id: `${service.id}-${Date.now()}`,
      name: service.name.en,
      description: service.description.en,
      price: service.basePrice,
      currency: service.currency,
      type: service.type,
      isCustom: false,
    };
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, newService],
    }));
  };

  const addCustomService = () => {
    if (!customService.name || customService.price <= 0) return;
    
    const newService: ProposalService = {
      id: `custom-${Date.now()}`,
      name: customService.name,
      description: customService.description,
      price: customService.price,
      currency: formData.currency,
      type: customService.type,
      isCustom: true,
    };
    
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, newService],
    }));
    
    setCustomService({ name: '', description: '', price: 0, type: 'one-time' });
  };

  const removeService = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter(s => s.id !== serviceId),
    }));
  };

  const updateServicePrice = (serviceId: string, newPrice: number) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.map(s => 
        s.id === serviceId ? { ...s, price: newPrice } : s
      ),
    }));
  };

  const filteredServices = selectedCategory === 'all' 
    ? predefinedServices 
    : predefinedServices.filter(s => s.category === selectedCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Client Information */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2" style={{ color: '#2d4a2d' }}>
            <Building className="w-5 h-5" />
            Client Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client_name">Contact Name *</Label>
              <Input
                id="client_name"
                value={formData.client_name}
                onChange={e => handleInputChange('client_name', e.target.value)}
                placeholder="John Smith"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client_company">Company Name *</Label>
              <Input
                id="client_company"
                value={formData.client_company}
                onChange={e => handleInputChange('client_company', e.target.value)}
                placeholder="Acme Corporation"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client_email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="client_email"
                  type="email"
                  value={formData.client_email}
                  onChange={e => handleInputChange('client_email', e.target.value)}
                  placeholder="john@acme.com"
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="client_phone">Phone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="client_phone"
                  type="tel"
                  value={formData.client_phone}
                  onChange={e => handleInputChange('client_phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Proposal Details */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2" style={{ color: '#2d4a2d' }}>
            <Calendar className="w-5 h-5" />
            Proposal Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="proposal_number">Proposal Number</Label>
              <Input
                id="proposal_number"
                value={formData.proposal_number}
                onChange={e => handleInputChange('proposal_number', e.target.value)}
                placeholder="HV-2024-0001"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="proposal_date">Date</Label>
              <Input
                id="proposal_date"
                type="date"
                value={formData.proposal_date}
                onChange={e => handleInputChange('proposal_date', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="valid_until">Valid Until</Label>
              <Input
                id="valid_until"
                type="date"
                value={formData.valid_until}
                onChange={e => handleInputChange('valid_until', e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select value={formData.currency} onValueChange={v => handleInputChange('currency', v)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Services */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2" style={{ color: '#2d4a2d' }}>
              <DollarSign className="w-5 h-5" />
              Services
            </CardTitle>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={() => setShowServicePicker(!showServicePicker)}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Service
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Service Picker */}
          {showServicePicker && (
            <Card className="border bg-gray-50">
              <CardContent className="pt-4 space-y-4">
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  <Badge 
                    variant={selectedCategory === 'all' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory('all')}
                  >
                    All
                  </Badge>
                  {serviceCategories.map(cat => (
                    <Badge 
                      key={cat}
                      variant={selectedCategory === cat ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>
                
                {/* Predefined Services */}
                <ScrollArea className="h-48">
                  <div className="space-y-2">
                    {filteredServices.map(service => (
                      <div 
                        key={service.id}
                        className="flex items-center justify-between p-3 bg-white rounded-lg border hover:border-accent transition-colors"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-sm">{service.name.en}</p>
                          <p className="text-xs text-muted-foreground">{service.description.en}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="font-semibold text-sm">${service.basePrice}</p>
                            <Badge variant="secondary" className="text-xs">
                              {service.type === 'monthly' ? '/mo' : 'one-time'}
                            </Badge>
                          </div>
                          <Button 
                            type="button" 
                            size="icon" 
                            variant="ghost"
                            onClick={() => addPredefinedService(service)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <Separator />

                {/* Custom Service */}
                <div className="space-y-3">
                  <p className="text-sm font-medium">Or add a custom service:</p>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <Input
                      placeholder="Service name"
                      value={customService.name}
                      onChange={e => setCustomService(prev => ({ ...prev, name: e.target.value }))}
                    />
                    <Input
                      placeholder="Description"
                      value={customService.description}
                      onChange={e => setCustomService(prev => ({ ...prev, description: e.target.value }))}
                    />
                    <Input
                      type="number"
                      placeholder="Price"
                      value={customService.price || ''}
                      onChange={e => setCustomService(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                    />
                    <div className="flex gap-2">
                      <Select 
                        value={customService.type} 
                        onValueChange={(v: 'one-time' | 'monthly') => setCustomService(prev => ({ ...prev, type: v }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="one-time">One-time</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button type="button" onClick={addCustomService} size="icon">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Selected Services */}
          {formData.services.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <DollarSign className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p>No services added yet</p>
              <p className="text-sm">Click "Add Service" to get started</p>
            </div>
          ) : (
            <div className="space-y-2">
              {formData.services.map(service => (
                <div 
                  key={service.id}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">{service.name}</p>
                      {service.isCustom && (
                        <Badge variant="outline" className="text-xs">Custom</Badge>
                      )}
                      <Badge variant="secondary" className="text-xs">
                        {service.type === 'monthly' ? '/mo' : 'one-time'}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{service.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Input
                      type="number"
                      value={service.price}
                      onChange={e => updateServicePrice(service.id, parseFloat(e.target.value) || 0)}
                      className="w-28 text-right"
                    />
                    <Button 
                      type="button" 
                      size="icon" 
                      variant="ghost"
                      onClick={() => removeService(service.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Totals */}
          {formData.services.length > 0 && (
            <div className="pt-4 border-t space-y-3">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-medium">{formData.currency === 'USD' ? '$' : '€'}{formData.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Percent className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Discount</span>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={formData.discount_percentage}
                    onChange={e => handleInputChange('discount_percentage', parseFloat(e.target.value) || 0)}
                    className="w-20 text-right"
                    min={0}
                    max={100}
                  />
                  <span className="text-sm">%</span>
                  {formData.discount_amount > 0 && (
                    <span className="text-sm text-muted-foreground">
                      (-{formData.currency === 'USD' ? '$' : '€'}{formData.discount_amount.toFixed(2)})
                    </span>
                  )}
                </div>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold" style={{ color: '#2d4a2d' }}>
                <span>Total</span>
                <span>{formData.currency === 'USD' ? '$' : '€'}{formData.total.toFixed(2)}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Terms & Notes */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg" style={{ color: '#2d4a2d' }}>
            Terms & Notes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="payment_terms">Payment Terms</Label>
            <Textarea
              id="payment_terms"
              value={formData.payment_terms}
              onChange={e => handleInputChange('payment_terms', e.target.value)}
              rows={5}
              className="font-mono text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={e => handleInputChange('notes', e.target.value)}
              rows={3}
              placeholder="Any additional information for the client..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isLoading || formData.services.length === 0 || !formData.client_name || !formData.client_company}
          style={{ backgroundColor: '#8BC34A' }}
          className="hover:opacity-90"
        >
          {isLoading ? 'Saving...' : 'Save Proposal'}
        </Button>
      </div>
    </form>
  );
}
