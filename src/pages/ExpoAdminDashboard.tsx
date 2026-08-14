import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { useNavigate, Link } from "react-router-dom";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Building2, GraduationCap, Mic2, Users, Shield, CheckCircle, Clock, XCircle } from "lucide-react";
import { format } from "date-fns";

interface ExpoAccessRequest {
  id: string;
  email: string;
  company_name: string;
  status: string;
  notes: string | null;
  requested_at: string;
  reviewed_at: string | null;
  reviewed_by: string | null;
}

const StatusBadge = ({ status }: { status: string }) => {
  if (status === "approved") return <Badge className="bg-primary/10 text-primary border-primary/30"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
  if (status === "rejected") return <Badge className="bg-destructive/10 text-destructive border-destructive/30"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
  return <Badge className="bg-secondary text-secondary-foreground border-secondary/50"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
};

const EmptyState = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
  <div className="text-center py-16">
    <Icon className="h-14 w-14 text-muted-foreground/40 mx-auto mb-4" />
    <p className="text-muted-foreground font-medium">No {label} registered yet</p>
    <p className="text-sm text-muted-foreground/60 mt-1">Entries will appear here once registrations come in.</p>
  </div>
);

const ExpoAdminDashboard = () => {
  const [accessRequests, setAccessRequests] = useState<ExpoAccessRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin, loading: adminLoading } = useIsAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      navigate("/ecd-expo-2026");
    }
  }, [isAdmin, adminLoading, navigate]);

  useEffect(() => {
    if (isAdmin) fetchData();
  }, [isAdmin]);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from("expo_access_requests")
        .select("*")
        .order("requested_at", { ascending: false });
      if (error) throw error;
      setAccessRequests(data || []);
    } catch (err) {
      console.error("Error fetching expo data:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    const { error } = await supabase
      .from("expo_access_requests")
      .update({ status, reviewed_at: new Date().toISOString() })
      .eq("id", id);
    if (!error) {
      setAccessRequests(prev => prev.map(r => r.id === id ? { ...r, status, reviewed_at: new Date().toISOString() } : r));
    }
  };

  if (adminLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) return null;

  const pendingCount = accessRequests.filter(r => r.status === "pending").length;
  const approvedCount = accessRequests.filter(r => r.status === "approved").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-6 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/ecd-expo-2026" className="flex items-center gap-2 text-primary-foreground hover:opacity-80 transition-opacity">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Expo</span>
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <span className="font-semibold">Expo Admin Dashboard</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">ECD Coding & Robotics Expo</h1>
          <p className="text-muted-foreground">Manage all expo participants — sponsors, exhibitors, speakers, and delegates.</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-primary/20">
            <CardContent className="pt-5 text-center">
              <Building2 className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{accessRequests.length}</p>
              <p className="text-sm text-muted-foreground">Access Requests</p>
            </CardContent>
          </Card>
          <Card className="border-primary/20">
            <CardContent className="pt-5 text-center">
              <CheckCircle className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{approvedCount}</p>
              <p className="text-sm text-muted-foreground">Approved</p>
            </CardContent>
          </Card>
          <Card className="border-secondary/30">
            <CardContent className="pt-5 text-center">
              <Clock className="h-8 w-8 text-secondary-foreground mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
              <p className="text-sm text-muted-foreground">Pending Review</p>
            </CardContent>
          </Card>
          <Card className="border-secondary/30">
            <CardContent className="pt-5 text-center">
              <Users className="h-8 w-8 text-secondary-foreground mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">—</p>
              <p className="text-sm text-muted-foreground">Total Delegates</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="access-requests">
          <TabsList className="mb-6 flex-wrap h-auto gap-1">
            <TabsTrigger value="access-requests" className="gap-1.5">
              <Shield className="h-4 w-4" /> Access Requests
              {pendingCount > 0 && (
                <Badge className="ml-1 bg-secondary text-secondary-foreground text-xs px-1.5 py-0">{pendingCount}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="sponsors" className="gap-1.5">
              <Building2 className="h-4 w-4" /> Sponsors
            </TabsTrigger>
            <TabsTrigger value="exhibitors" className="gap-1.5">
              <GraduationCap className="h-4 w-4" /> Exhibitors
            </TabsTrigger>
            <TabsTrigger value="speakers" className="gap-1.5">
              <Mic2 className="h-4 w-4" /> Speakers
            </TabsTrigger>
            <TabsTrigger value="delegates" className="gap-1.5">
              <Users className="h-4 w-4" /> Delegates
            </TabsTrigger>
          </TabsList>

          {/* Access Requests Tab */}
          <TabsContent value="access-requests">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Expo Access Requests
                </CardTitle>
                <CardDescription>
                  Professionals who have requested access to the ECD Expo page.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {accessRequests.length === 0 ? (
                  <EmptyState icon={Shield} label="access requests" />
                ) : (
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead>Company / Organisation</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Requested</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {accessRequests.map((req) => (
                          <TableRow key={req.id} className="hover:bg-muted/30">
                            <TableCell className="font-medium">{req.company_name}</TableCell>
                            <TableCell className="text-muted-foreground">{req.email}</TableCell>
                            <TableCell><StatusBadge status={req.status} /></TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {format(new Date(req.requested_at), "MMM dd, yyyy")}
                            </TableCell>
                            <TableCell>
                              {req.status === "pending" && (
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline" className="border-primary/40 text-primary hover:bg-primary/10"
                                    onClick={() => updateStatus(req.id, "approved")}>
                                    Approve
                                  </Button>
                                  <Button size="sm" variant="outline" className="border-destructive/40 text-destructive hover:bg-destructive/10"
                                    onClick={() => updateStatus(req.id, "rejected")}>
                                    Reject
                                  </Button>
                                </div>
                              )}
                              {req.status !== "pending" && (
                                <span className="text-xs text-muted-foreground italic">
                                  {req.reviewed_at ? `Reviewed ${format(new Date(req.reviewed_at), "MMM dd")}` : "—"}
                                </span>
                              )}
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

          {/* Sponsors Tab */}
          <TabsContent value="sponsors">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Sponsor Applications
                </CardTitle>
                <CardDescription>
                  All sponsor applications submitted through the expo registration form.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EmptyState icon={Building2} label="sponsors" />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Exhibitors Tab */}
          <TabsContent value="exhibitors">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  Exhibitor Registrations
                </CardTitle>
                <CardDescription>
                  All exhibitor booth applications submitted for the expo.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EmptyState icon={GraduationCap} label="exhibitors" />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Speakers Tab */}
          <TabsContent value="speakers">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic2 className="h-5 w-5 text-primary" />
                  Speaker Applications
                </CardTitle>
                <CardDescription>
                  All keynote and workshop speaker applications submitted.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EmptyState icon={Mic2} label="speakers" />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Delegates Tab */}
          <TabsContent value="delegates">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Delegate Registrations
                </CardTitle>
                <CardDescription>
                  All registered delegates and attendees for the expo.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EmptyState icon={Users} label="delegates" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="mt-12 py-6 px-6 border-t border-border bg-card/50">
        <p className="text-center text-sm text-muted-foreground">
          Copyright © ECD Coding and Robotics Expo. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default ExpoAdminDashboard;
