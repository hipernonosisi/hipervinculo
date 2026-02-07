-- Create table for service proposals
CREATE TABLE public.service_proposals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Client information
  client_name TEXT NOT NULL,
  client_company TEXT NOT NULL,
  client_email TEXT,
  client_phone TEXT,
  
  -- Proposal details
  proposal_number TEXT NOT NULL,
  proposal_date DATE NOT NULL DEFAULT CURRENT_DATE,
  valid_until DATE,
  
  -- Services as JSONB array for flexibility
  -- Each service: { name, description, price, currency, isCustom }
  services JSONB NOT NULL DEFAULT '[]'::jsonb,
  
  -- Totals
  subtotal DECIMAL(12,2) NOT NULL DEFAULT 0,
  discount_percentage DECIMAL(5,2) DEFAULT 0,
  discount_amount DECIMAL(12,2) DEFAULT 0,
  total DECIMAL(12,2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'USD',
  
  -- Terms and notes
  payment_terms TEXT,
  notes TEXT,
  
  -- Status tracking
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'accepted', 'rejected', 'expired')),
  
  -- Created by admin
  created_by UUID REFERENCES auth.users(id)
);

-- Enable Row Level Security
ALTER TABLE public.service_proposals ENABLE ROW LEVEL SECURITY;

-- Only admins can manage proposals
CREATE POLICY "Only admins can view proposals" 
ON public.service_proposals 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can create proposals" 
ON public.service_proposals 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update proposals" 
ON public.service_proposals 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete proposals" 
ON public.service_proposals 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_service_proposals_updated_at
BEFORE UPDATE ON public.service_proposals
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for common queries
CREATE INDEX idx_service_proposals_status ON public.service_proposals(status);
CREATE INDEX idx_service_proposals_created_at ON public.service_proposals(created_at DESC);