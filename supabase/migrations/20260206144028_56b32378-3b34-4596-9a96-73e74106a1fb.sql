-- Create role enum for application roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table to store user roles
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check if user has a specific role
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Policy: Only admins can view user_roles
CREATE POLICY "Only admins can view user roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Drop old overly permissive policies on chat tables
DROP POLICY IF EXISTS "Anyone can read messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Anyone can read conversations" ON public.chat_conversations;

-- Create new restrictive policies for chat tables - only admins can read
CREATE POLICY "Only admins can read messages"
ON public.chat_messages FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can read conversations"
ON public.chat_conversations FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Drop old overly permissive policies on contact_submissions and audit_requests
DROP POLICY IF EXISTS "Authenticated users can read contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Authenticated users can read audit requests" ON public.audit_requests;

-- Create new restrictive policies - only admins can read
CREATE POLICY "Only admins can read contact submissions"
ON public.contact_submissions FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can read audit requests"
ON public.audit_requests FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));