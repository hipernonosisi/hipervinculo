import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, FileText, RefreshCw, Calendar, Building, Globe, DollarSign, Target, LogOut, MessageCircle, Presentation, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { AnimatedSection } from '@/components/ui/motion';
import { LeadGenPresentation } from '@/components/presentations/LeadGenPresentation';
import { ProposalGenerator } from '@/components/proposals/ProposalGenerator';
import { useToast } from '@/hooks/use-toast';
import { User } from '@supabase/supabase-js';
import { cn } from '@/lib/utils';

interface ContactSubmission {
  id: string;
  full_name: string;
  email: string;
  company_name: string | null;
  inquiry_type: string | null;
  message: string;
  created_at: string;
}

interface AuditRequest {
  id: string;
  company_name: string;
  email: string;
  website_url: string | null;
  business_type: string | null;
  monthly_revenue: string | null;
  monthly_ad_spend: string | null;
  growth_goals: string | null;
  created_at: string;
}

interface ChatConversation {
  id: string;
  session_id: string;
  visitor_language: string | null;
  created_at: string;
  updated_at: string;
  message_count?: number;
}

interface ChatMessage {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export default function Admin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [auditRequests, setAuditRequests] = useState<AuditRequest[]>([]);
  const [chatConversations, setChatConversations] = useState<ChatConversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const [selectedAudit, setSelectedAudit] = useState<AuditRequest | null>(null);
  const [selectedChat, setSelectedChat] = useState<ChatConversation | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Check authentication
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
      
      if (!session) {
        navigate('/auth');
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
      
      if (!session) {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [contactRes, auditRes, chatRes] = await Promise.all([
        supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }),
        supabase.from('audit_requests').select('*').order('created_at', { ascending: false }),
        supabase.from('chat_conversations').select('*').order('updated_at', { ascending: false })
      ]);

      if (contactRes.data) setContactSubmissions(contactRes.data);
      if (auditRes.data) setAuditRequests(auditRes.data);
      if (chatRes.data) {
        // Get message counts for each conversation
        const conversationsWithCounts = await Promise.all(
          chatRes.data.map(async (conv) => {
            const { count } = await supabase
              .from('chat_messages')
              .select('*', { count: 'exact', head: true })
              .eq('conversation_id', conv.id);
            return { ...conv, message_count: count || 0 };
          })
        );
        setChatConversations(conversationsWithCounts);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchChatMessages = async (conversationId: string) => {
    setLoadingMessages(true);
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      setChatMessages((data || []) as ChatMessage[]);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    if (selectedChat) {
      fetchChatMessages(selectedChat.id);
    } else {
      setChatMessages([]);
    }
  }, [selectedChat]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: 'Logged out',
      description: 'You have been signed out successfully.',
    });
    navigate('/auth');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#f8f9f5] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f8f9f5]">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <Link to="/" className="p-2 hover:bg-gray-100 rounded-lg transition-colors shrink-0">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-bold truncate" style={{ color: '#2d4a2d' }}>Admin Dashboard</h1>
                <p className="text-xs sm:text-sm text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button 
                onClick={fetchData} 
                variant="outline" 
                size="sm"
                className="gap-2"
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button 
                onClick={handleLogout} 
                variant="ghost" 
                size="sm"
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container px-4 py-6 sm:py-8">
        {/* Stats Cards */}
        <AnimatedSection className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg rounded-2xl">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Contact Submissions</CardTitle>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#8BC34A' }}>
                  <Mail className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold" style={{ color: '#2d4a2d' }}>{contactSubmissions.length}</p>
              <p className="text-sm text-muted-foreground">Total inquiries received</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg rounded-2xl">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Audit Requests</CardTitle>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#8BC34A' }}>
                  <FileText className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold" style={{ color: '#2d4a2d' }}>{auditRequests.length}</p>
              <p className="text-sm text-muted-foreground">Free audit requests</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg rounded-2xl">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Chat Conversations</CardTitle>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#8BC34A' }}>
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold" style={{ color: '#2d4a2d' }}>{chatConversations.length}</p>
              <p className="text-sm text-muted-foreground">AI chatbot conversations</p>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Tabs */}
        <AnimatedSection delay={0.1}>
          <Tabs defaultValue="contact" className="w-full">
            <TabsList className="mb-6 bg-white shadow-sm rounded-xl p-1 w-full grid grid-cols-3 sm:grid-cols-5 h-auto gap-1">
              <TabsTrigger value="contact" className="rounded-lg px-2 sm:px-4 py-2 text-xs sm:text-sm data-[state=active]:bg-accent data-[state=active]:text-white">
                <Mail className="w-3.5 h-3.5 sm:hidden mr-1" />
                <span className="hidden sm:inline">Contact</span>
                <span className="sm:hidden">Contact</span>
                <span className="ml-1">({contactSubmissions.length})</span>
              </TabsTrigger>
              <TabsTrigger value="audit" className="rounded-lg px-2 sm:px-4 py-2 text-xs sm:text-sm data-[state=active]:bg-accent data-[state=active]:text-white">
                <FileText className="w-3.5 h-3.5 sm:hidden mr-1" />
                <span className="hidden sm:inline">Audits</span>
                <span className="sm:hidden">Audits</span>
                <span className="ml-1">({auditRequests.length})</span>
              </TabsTrigger>
              <TabsTrigger value="chat" className="rounded-lg px-2 sm:px-4 py-2 text-xs sm:text-sm data-[state=active]:bg-accent data-[state=active]:text-white">
                <MessageCircle className="w-3.5 h-3.5 sm:hidden mr-1" />
                <span className="hidden sm:inline">Chats</span>
                <span className="sm:hidden">Chats</span>
                <span className="ml-1">({chatConversations.length})</span>
              </TabsTrigger>
              <TabsTrigger value="proposals" className="rounded-lg px-2 sm:px-4 py-2 text-xs sm:text-sm data-[state=active]:bg-accent data-[state=active]:text-white gap-1">
                <Receipt className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Proposals</span>
                <span className="sm:hidden">Props.</span>
              </TabsTrigger>
              <TabsTrigger value="presentations" className="rounded-lg px-2 sm:px-4 py-2 text-xs sm:text-sm data-[state=active]:bg-accent data-[state=active]:text-white gap-1">
                <Presentation className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Presentations</span>
                <span className="sm:hidden">Present.</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Contact Submissions Tab */}
            <TabsContent value="contact">
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader>
                  <CardTitle>Contact Form Submissions</CardTitle>
                  <CardDescription>All inquiries from the Get in Touch page</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {contactSubmissions.length === 0 ? (
                    <div className="p-12 text-center">
                      <Mail className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                      <p className="text-muted-foreground">No contact submissions yet</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead>Date</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="max-w-[300px]">Message</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {contactSubmissions.map((submission) => (
                            <TableRow 
                              key={submission.id} 
                              className="cursor-pointer hover:bg-accent/5"
                              onClick={() => setSelectedContact(submission)}
                            >
                              <TableCell className="whitespace-nowrap">
                                <div className="flex items-center gap-2 text-sm">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  {formatDate(submission.created_at)}
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">{submission.full_name}</TableCell>
                              <TableCell>
                                <span className="text-accent">
                                  {submission.email}
                                </span>
                              </TableCell>
                              <TableCell>
                                {submission.company_name ? (
                                  <div className="flex items-center gap-2">
                                    <Building className="h-4 w-4 text-muted-foreground" />
                                    {submission.company_name}
                                  </div>
                                ) : '-'}
                              </TableCell>
                              <TableCell>
                                {submission.inquiry_type && (
                                  <Badge variant="secondary" className="rounded-full">
                                    {submission.inquiry_type}
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell className="max-w-[300px]">
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {submission.message}
                                </p>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Audit Requests Tab */}
            <TabsContent value="audit">
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader>
                  <CardTitle>Free Audit Requests</CardTitle>
                  <CardDescription>All requests from the Get Free Audit wizard</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {auditRequests.length === 0 ? (
                    <div className="p-12 text-center">
                      <FileText className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                      <p className="text-muted-foreground">No audit requests yet</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead>Date</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Website</TableHead>
                            <TableHead>Business Type</TableHead>
                            <TableHead>Monthly Revenue</TableHead>
                            <TableHead>Ad Spend</TableHead>
                            <TableHead className="max-w-[200px]">Goals</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {auditRequests.map((request) => (
                            <TableRow 
                              key={request.id}
                              className="cursor-pointer hover:bg-accent/5"
                              onClick={() => setSelectedAudit(request)}
                            >
                              <TableCell className="whitespace-nowrap">
                                <div className="flex items-center gap-2 text-sm">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  {formatDate(request.created_at)}
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                  <Building className="h-4 w-4 text-muted-foreground" />
                                  {request.company_name}
                                </div>
                              </TableCell>
                              <TableCell>
                                <span className="text-accent">
                                  {request.email}
                                </span>
                              </TableCell>
                              <TableCell>
                                {request.website_url ? (
                                  <div className="flex items-center gap-2 text-accent">
                                    <Globe className="h-4 w-4" />
                                    {request.website_url.replace(/^https?:\/\//, '').substring(0, 20)}...
                                  </div>
                                ) : '-'}
                              </TableCell>
                              <TableCell>
                                {request.business_type && (
                                  <Badge variant="secondary" className="rounded-full">
                                    {request.business_type}
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell>
                                {request.monthly_revenue && (
                                  <div className="flex items-center gap-2">
                                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                                    {request.monthly_revenue}
                                  </div>
                                )}
                              </TableCell>
                              <TableCell>
                                {request.monthly_ad_spend && (
                                  <div className="flex items-center gap-2">
                                    <Target className="h-4 w-4 text-muted-foreground" />
                                    {request.monthly_ad_spend}
                                  </div>
                                )}
                              </TableCell>
                              <TableCell className="max-w-[200px]">
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {request.growth_goals || '-'}
                                </p>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Chat Conversations Tab */}
            <TabsContent value="chat">
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader>
                  <CardTitle>AI Chatbot Conversations</CardTitle>
                  <CardDescription>All conversations from the website chatbot</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {chatConversations.length === 0 ? (
                    <div className="p-12 text-center">
                      <MessageCircle className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                      <p className="text-muted-foreground">No chat conversations yet</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead>Date</TableHead>
                            <TableHead>Session ID</TableHead>
                            <TableHead>Language</TableHead>
                            <TableHead>Messages</TableHead>
                            <TableHead>Last Activity</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {chatConversations.map((conversation) => (
                            <TableRow 
                              key={conversation.id}
                              className="cursor-pointer hover:bg-accent/5"
                              onClick={() => setSelectedChat(conversation)}
                            >
                              <TableCell className="whitespace-nowrap">
                                <div className="flex items-center gap-2 text-sm">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  {formatDate(conversation.created_at)}
                                </div>
                              </TableCell>
                              <TableCell className="font-mono text-xs">
                                {conversation.session_id.substring(0, 8)}...
                              </TableCell>
                              <TableCell>
                                <Badge variant="secondary" className="rounded-full uppercase">
                                  {conversation.visitor_language || 'en'}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                                  {conversation.message_count || 0}
                                </div>
                              </TableCell>
                              <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                                {formatDate(conversation.updated_at)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Proposals Tab */}
            <TabsContent value="proposals" className="mt-0">
              <ProposalGenerator />
            </TabsContent>
            
            {/* Presentations Tab */}
            <TabsContent value="presentations" className="mt-0">
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardContent className="p-0" style={{ height: 'calc(100vh - 380px)', minHeight: '600px' }}>
                  <LeadGenPresentation />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </AnimatedSection>
      </div>

      {/* Contact Submission Detail Dialog */}
      <Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
        <DialogContent className="max-w-2xl rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold" style={{ color: '#2d4a2d' }}>
              Contact Submission Details
            </DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-6 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Full Name</p>
                  <p className="font-medium">{selectedContact.full_name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <a href={`mailto:${selectedContact.email}`} className="font-medium text-accent hover:underline">
                    {selectedContact.email}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Company</p>
                  <p className="font-medium">{selectedContact.company_name || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Inquiry Type</p>
                  {selectedContact.inquiry_type ? (
                    <Badge variant="secondary" className="rounded-full">
                      {selectedContact.inquiry_type}
                    </Badge>
                  ) : '-'}
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground mb-1">Date</p>
                  <p className="font-medium">{formatDate(selectedContact.created_at)}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Message</p>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button 
                  className="rounded-full"
                  style={{ backgroundColor: '#8BC34A' }}
                  onClick={() => window.open(`mailto:${selectedContact.email}`, '_blank')}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Reply via Email
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Audit Request Detail Dialog */}
      <Dialog open={!!selectedAudit} onOpenChange={() => setSelectedAudit(null)}>
        <DialogContent className="max-w-2xl rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold" style={{ color: '#2d4a2d' }}>
              Audit Request Details
            </DialogTitle>
          </DialogHeader>
          {selectedAudit && (
            <div className="space-y-6 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Company Name</p>
                  <p className="font-medium">{selectedAudit.company_name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <a href={`mailto:${selectedAudit.email}`} className="font-medium text-accent hover:underline">
                    {selectedAudit.email}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Website</p>
                  {selectedAudit.website_url ? (
                    <a 
                      href={selectedAudit.website_url.startsWith('http') ? selectedAudit.website_url : `https://${selectedAudit.website_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-accent hover:underline flex items-center gap-1"
                    >
                      <Globe className="h-4 w-4" />
                      {selectedAudit.website_url}
                    </a>
                  ) : '-'}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Business Type</p>
                  {selectedAudit.business_type ? (
                    <Badge variant="secondary" className="rounded-full">
                      {selectedAudit.business_type}
                    </Badge>
                  ) : '-'}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Monthly Revenue</p>
                  <p className="font-medium flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    {selectedAudit.monthly_revenue || '-'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Monthly Ad Spend</p>
                  <p className="font-medium flex items-center gap-1">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    {selectedAudit.monthly_ad_spend || '-'}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground mb-1">Date</p>
                  <p className="font-medium">{formatDate(selectedAudit.created_at)}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Growth Goals</p>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm whitespace-pre-wrap">{selectedAudit.growth_goals || 'No goals specified'}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button 
                  className="rounded-full"
                  style={{ backgroundColor: '#8BC34A' }}
                  onClick={() => window.open(`mailto:${selectedAudit.email}`, '_blank')}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Reply via Email
                </Button>
                {selectedAudit.website_url && (
                  <Button 
                    variant="outline"
                    className="rounded-full"
                    onClick={() => window.open(
                      selectedAudit.website_url?.startsWith('http') ? selectedAudit.website_url : `https://${selectedAudit.website_url}`,
                      '_blank'
                    )}
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    Visit Website
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Chat Conversation Detail Dialog */}
      <Dialog open={!!selectedChat} onOpenChange={() => setSelectedChat(null)}>
        <DialogContent className="max-w-2xl rounded-2xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold" style={{ color: '#2d4a2d' }}>
              Chat Conversation
            </DialogTitle>
          </DialogHeader>
          {selectedChat && (
            <div className="flex flex-col flex-1 min-h-0 pt-4">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Session ID</p>
                  <p className="font-mono text-xs">{selectedChat.session_id.substring(0, 16)}...</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Language</p>
                  <Badge variant="secondary" className="rounded-full uppercase">
                    {selectedChat.visitor_language || 'en'}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Started</p>
                  <p className="text-sm">{formatDate(selectedChat.created_at)}</p>
                </div>
              </div>
              
              <ScrollArea className="flex-1 border rounded-xl p-4 bg-gray-50">
                {loadingMessages ? (
                  <div className="flex items-center justify-center py-8">
                    <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : chatMessages.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No messages in this conversation</p>
                ) : (
                  <div className="space-y-4">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex gap-3",
                          message.role === 'user' && "justify-end"
                        )}
                      >
                        {message.role === 'assistant' && (
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <MessageCircle className="w-4 h-4 text-primary" />
                          </div>
                        )}
                        <div
                          className={cn(
                            "rounded-2xl p-3 max-w-[80%] text-sm",
                            message.role === 'user'
                              ? "bg-primary text-primary-foreground rounded-tr-sm"
                              : "bg-white rounded-tl-sm shadow-sm"
                          )}
                        >
                          <p className="whitespace-pre-wrap">{message.content}</p>
                          <p className={cn(
                            "text-xs mt-1 opacity-60",
                            message.role === 'user' ? "text-right" : ""
                          )}>
                            {new Date(message.created_at).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
