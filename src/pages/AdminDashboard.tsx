import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ArrowLeft, Users, DollarSign, Mail, UserX, CheckCircle } from "lucide-react";
import { format, isAfter, isBefore, addDays } from "date-fns";
import { toast } from "sonner";

interface UserProfile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  username: string;
  registration_type: string;
  country: string;
  state: string;
  institution?: string;
  created_at: string;
  profile_image_url?: string;
}

interface SubscriptionPayment {
  id: string;
  user_id: string;
  subscription_type: string;
  amount: number;
  payment_status: "active" | "pending" | "overdue" | "cancelled";
  last_payment_date: string | null;
  next_payment_due: string;
  is_active: boolean;
  notes?: string;
}

interface UserWithPayment extends UserProfile {
  payment?: SubscriptionPayment;
}

const AdminDashboard = () => {
  const [usersWithPayments, setUsersWithPayments] = useState<UserWithPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionUser, setActionUser] = useState<UserWithPayment | null>(null);
  const [actionType, setActionType] = useState<"remind" | "deregister" | "mark-paid" | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsersWithPayments();
  }, []);

  const fetchUsersWithPayments = async () => {
    try {
      // Fetch profiles
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (profilesError) throw profilesError;

      // Fetch all subscription payments
      const { data: payments, error: paymentsError } = await supabase
        .from("subscription_payments")
        .select("*")
        .eq("is_active", true);

      if (paymentsError) throw paymentsError;

      // Merge data with proper typing
      const usersWithPaymentData: UserWithPayment[] = (profiles || []).map((profile) => {
        const payment = payments?.find((p) => p.user_id === profile.user_id);
        return { 
          ...profile, 
          payment: payment ? {
            ...payment,
            payment_status: payment.payment_status as "active" | "pending" | "overdue" | "cancelled"
          } : undefined
        };
      });

      setUsersWithPayments(usersWithPaymentData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load user data");
    } finally {
      setLoading(false);
    }
  };

  const getRegistrationTypeBadge = (type: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      parent: "default",
      "ecd-manager": "secondary",
      "tech-teacher": "outline",
    };
    return (
      <Badge variant={variants[type] || "default"} className="capitalize">
        {type.replace("-", " ")}
      </Badge>
    );
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getPaymentStatusBadge = (payment?: SubscriptionPayment) => {
    if (!payment) {
      return <Badge variant="outline" className="bg-gray-100">No Subscription</Badge>;
    }

    const now = new Date();
    const dueDate = new Date(payment.next_payment_due);
    const isOverdue = isAfter(now, dueDate);
    const isDueSoon = isBefore(now, dueDate) && isAfter(dueDate, now) && isAfter(addDays(now, 7), dueDate);

    if (payment.payment_status === "active") {
      return <Badge className="bg-green-500">Active</Badge>;
    } else if (payment.payment_status === "cancelled") {
      return <Badge variant="destructive">Cancelled</Badge>;
    } else if (isOverdue) {
      return <Badge variant="destructive" className="bg-red-600">Overdue</Badge>;
    } else if (isDueSoon) {
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Due Soon</Badge>;
    } else if (payment.payment_status === "pending") {
      return <Badge variant="outline" className="bg-blue-100 text-blue-800">Pending</Badge>;
    }
    return <Badge variant="outline">{payment.payment_status}</Badge>;
  };

  const handleAction = async () => {
    if (!actionUser || !actionType) return;

    try {
      if (actionType === "mark-paid") {
        // Update payment status to active and extend next payment date
        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);

        const { error } = await supabase
          .from("subscription_payments")
          .update({
            payment_status: "active",
            last_payment_date: new Date().toISOString(),
            next_payment_due: nextMonth.toISOString(),
          })
          .eq("user_id", actionUser.user_id);

        if (error) throw error;
        toast.success("Payment marked as paid");
      } else if (actionType === "deregister") {
        // Mark payment as cancelled
        const { error } = await supabase
          .from("subscription_payments")
          .update({
            payment_status: "cancelled",
            is_active: false,
          })
          .eq("user_id", actionUser.user_id);

        if (error) throw error;
        toast.success("User deregistered successfully");
      } else if (actionType === "remind") {
        // In a real app, this would send an email
        toast.success(`Reminder sent to ${actionUser.first_name} ${actionUser.last_name}`);
      }

      setActionUser(null);
      setActionType(null);
      fetchUsersWithPayments();
    } catch (error) {
      console.error("Error performing action:", error);
      toast.error("Action failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading profiles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>

        <Card className="border-2 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
                <CardDescription>
                  View all registered users and their profiles
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="mb-4 flex items-center justify-between flex-wrap gap-4">
              <p className="text-sm text-muted-foreground">
                Total Users: <span className="font-semibold text-foreground">{usersWithPayments.length}</span>
              </p>
              <div className="flex gap-4 text-sm">
                <span className="text-green-600 font-medium">
                  Active: {usersWithPayments.filter(u => u.payment?.payment_status === "active").length}
                </span>
                <span className="text-red-600 font-medium">
                  Overdue: {usersWithPayments.filter(u => {
                    const now = new Date();
                    const dueDate = u.payment ? new Date(u.payment.next_payment_due) : null;
                    return dueDate && isAfter(now, dueDate);
                  }).length}
                </span>
                <span className="text-gray-600 font-medium">
                  No Subscription: {usersWithPayments.filter(u => !u.payment).length}
                </span>
              </div>
            </div>

            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-[80px]">Avatar</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead>Subscription</TableHead>
                    <TableHead>Next Due</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usersWithPayments.map((user) => (
                    <TableRow key={user.id} className="hover:bg-muted/30">
                      <TableCell>
                        <Avatar>
                          <AvatarImage src={user.profile_image_url} />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {getInitials(user.first_name, user.last_name)}
                          </AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {user.first_name} {user.last_name}
                        </div>
                        <div className="text-xs text-muted-foreground">@{user.username}</div>
                      </TableCell>
                      <TableCell>
                        {getRegistrationTypeBadge(user.registration_type)}
                      </TableCell>
                      <TableCell>
                        {getPaymentStatusBadge(user.payment)}
                      </TableCell>
                      <TableCell className="text-sm">
                        {user.payment ? (
                          <span className="capitalize">{user.payment.subscription_type.replace("_", " ")}</span>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell className="text-sm">
                        {user.payment ? (
                          <div>
                            <div>{format(new Date(user.payment.next_payment_due), "MMM dd, yyyy")}</div>
                            {user.payment.last_payment_date && (
                              <div className="text-xs text-muted-foreground">
                                Last: {format(new Date(user.payment.last_payment_date), "MMM dd")}
                              </div>
                            )}
                          </div>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell className="text-sm font-medium">
                        {user.payment ? `R${user.payment.amount.toFixed(2)}` : "-"}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {user.payment && user.payment.payment_status !== "active" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-1"
                              onClick={() => {
                                setActionUser(user);
                                setActionType("mark-paid");
                              }}
                            >
                              <CheckCircle className="h-3 w-3" />
                              Mark Paid
                            </Button>
                          )}
                          {user.payment && user.payment.payment_status !== "cancelled" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-1"
                              onClick={() => {
                                setActionUser(user);
                                setActionType("remind");
                              }}
                            >
                              <Mail className="h-3 w-3" />
                              Remind
                            </Button>
                          )}
                          {user.payment && user.payment.is_active && (
                            <Button
                              size="sm"
                              variant="destructive"
                              className="gap-1"
                              onClick={() => {
                                setActionUser(user);
                                setActionType("deregister");
                              }}
                            >
                              <UserX className="h-3 w-3" />
                              Deregister
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {usersWithPayments.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No registered users yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={!!actionUser} onOpenChange={() => setActionUser(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {actionType === "mark-paid" && "Mark Payment as Paid"}
              {actionType === "remind" && "Send Payment Reminder"}
              {actionType === "deregister" && "Deregister User"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {actionType === "mark-paid" &&
                `Mark the payment for ${actionUser?.first_name} ${actionUser?.last_name} as paid and extend their subscription for another month?`}
              {actionType === "remind" &&
                `Send a payment reminder email to ${actionUser?.first_name} ${actionUser?.last_name}?`}
              {actionType === "deregister" &&
                `Are you sure you want to deregister ${actionUser?.first_name} ${actionUser?.last_name}? This will cancel their subscription.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleAction}>
              {actionType === "mark-paid" && "Mark as Paid"}
              {actionType === "remind" && "Send Reminder"}
              {actionType === "deregister" && "Deregister"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;
