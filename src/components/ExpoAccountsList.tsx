import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Settings, Pencil, Trash2, Eye, Building2, Award, Mic2, Users } from "lucide-react";
import { toast } from "sonner";

type AccountType = "sponsor" | "exhibitor" | "speaker" | "delegate";

interface Account {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  tier?: string;
  status: "active" | "pending" | "inactive";
  type: AccountType;
}

const SAMPLE_ACCOUNTS: Record<AccountType, Account[]> = {
  sponsor: [
    { id: "s1", name: "Thabo Molefe", email: "thabo@techcorp.co.za", phone: "+27 11 234 5678", company: "TechCorp SA", tier: "Platinum Sponsor", status: "active", type: "sponsor" },
    { id: "s2", name: "Naledi Khumalo", email: "naledi@innovateafrica.com", phone: "+27 21 345 6789", company: "Innovate Africa", tier: "Gold Sponsor", status: "active", type: "sponsor" },
    { id: "s3", name: "James van Wyk", email: "james@edutech.co.za", phone: "+27 12 456 7890", company: "EduTech Solutions", tier: "Silver Sponsor", status: "pending", type: "sponsor" },
    { id: "s4", name: "Amina Osei", email: "amina@globallearn.ng", phone: "+234 801 234 5678", company: "Global Learn Nigeria", tier: "Bronze Sponsor", status: "active", type: "sponsor" },
  ],
  exhibitor: [
    { id: "e1", name: "Sipho Dlamini", email: "sipho@roboticsza.co.za", phone: "+27 11 567 8901", company: "Robotics ZA", status: "active", type: "exhibitor" },
    { id: "e2", name: "Fatima Hassan", email: "fatima@stemkits.com", phone: "+27 21 678 9012", company: "STEM Kits International", status: "active", type: "exhibitor" },
    { id: "e3", name: "David Nkosi", email: "david@codingblocks.co.za", phone: "+27 31 789 0123", company: "Coding Blocks SA", status: "pending", type: "exhibitor" },
  ],
  speaker: [
    { id: "sp1", name: "Dr. Lindiwe Mazibuko", email: "lindiwe@uct.ac.za", phone: "+27 21 890 1234", company: "University of Cape Town", status: "active", type: "speaker" },
    { id: "sp2", name: "Prof. Kwame Asante", email: "kwame@accra-tech.edu.gh", phone: "+233 20 123 4567", company: "Accra Tech University", status: "active", type: "speaker" },
    { id: "sp3", name: "Sarah Mitchell", email: "sarah@futureskills.uk", phone: "+44 20 7946 0958", company: "Future Skills UK", status: "pending", type: "speaker" },
  ],
  delegate: [
    { id: "d1", name: "Nomsa Cele", email: "nomsa@brightstart.co.za", phone: "+27 11 901 2345", company: "Bright Start ECD Centre", status: "active", type: "delegate" },
    { id: "d2", name: "Peter Mokoena", email: "peter@littlestars.co.za", phone: "+27 12 012 3456", company: "Little Stars Academy", status: "active", type: "delegate" },
    { id: "d3", name: "Grace Muthoni", email: "grace@kenyaecd.ke", phone: "+254 712 345 678", company: "Kenya ECD Network", status: "active", type: "delegate" },
    { id: "d4", name: "Tumelo Radebe", email: "tumelo@parent.co.za", phone: "+27 83 456 7890", status: "pending", type: "delegate" },
  ],
};

const TYPE_CONFIG: Record<AccountType, { icon: React.ReactNode; label: string; color: string }> = {
  sponsor: { icon: <Award className="h-4 w-4" />, label: "Sponsors", color: "text-yellow-600" },
  exhibitor: { icon: <Building2 className="h-4 w-4" />, label: "Exhibitors", color: "text-blue-600" },
  speaker: { icon: <Mic2 className="h-4 w-4" />, label: "Speakers", color: "text-purple-600" },
  delegate: { icon: <Users className="h-4 w-4" />, label: "Delegates", color: "text-green-600" },
};

interface ExpoAccountsListProps {
  type: AccountType;
}

const ExpoAccountsList = ({ type }: ExpoAccountsListProps) => {
  const [accounts, setAccounts] = useState<Account[]>(SAMPLE_ACCOUNTS[type]);
  const [viewAccount, setViewAccount] = useState<Account | null>(null);
  const [editAccount, setEditAccount] = useState<Account | null>(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", phone: "", company: "" });
  const config = TYPE_CONFIG[type];

  const handleView = (account: Account) => setViewAccount(account);

  const handleEdit = (account: Account) => {
    setEditAccount(account);
    setEditForm({ name: account.name, email: account.email, phone: account.phone, company: account.company || "" });
  };

  const handleSaveEdit = () => {
    if (!editAccount) return;
    setAccounts(prev => prev.map(a => a.id === editAccount.id ? { ...a, ...editForm } : a));
    setEditAccount(null);
    toast.success("Account updated successfully!");
  };

  const handleDelete = (id: string) => {
    setAccounts(prev => prev.filter(a => a.id !== id));
    toast.success("Account removed.");
  };

  return (
    <>
      <Card className="mb-6" style={{ backgroundColor: '#2a2d34' }}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            {config.icon}
            Registered {config.label} ({accounts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {accounts.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No registered {config.label.toLowerCase()} yet.</p>
          ) : (
            <div className="space-y-2">
              {accounts.map((account) => (
                <div key={account.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border/50 hover:bg-muted transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary`}>
                      {account.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">{account.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{account.company || account.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {account.tier && (
                      <Badge variant="secondary" className="text-[10px] hidden sm:inline-flex">{account.tier}</Badge>
                    )}
                    <Badge variant={account.status === "active" ? "default" : "outline"} className="text-[10px]">
                      {account.status}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleView(account)}>
                          <Eye className="h-3.5 w-3.5 mr-2" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(account)}>
                          <Pencil className="h-3.5 w-3.5 mr-2" /> Edit Account
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(account.id)} className="text-destructive focus:text-destructive">
                          <Trash2 className="h-3.5 w-3.5 mr-2" /> Delete Account
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={!!viewAccount} onOpenChange={() => setViewAccount(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Account Details</DialogTitle>
            <DialogDescription>Viewing {config.label.slice(0, -1).toLowerCase()} account information</DialogDescription>
          </DialogHeader>
          {viewAccount && (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">
                  {viewAccount.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p className="font-semibold">{viewAccount.name}</p>
                  <Badge variant={viewAccount.status === "active" ? "default" : "outline"}>{viewAccount.status}</Badge>
                </div>
              </div>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between p-2 bg-muted rounded"><span className="text-muted-foreground">Email</span><span>{viewAccount.email}</span></div>
                <div className="flex justify-between p-2 bg-muted rounded"><span className="text-muted-foreground">Phone</span><span>{viewAccount.phone}</span></div>
                {viewAccount.company && <div className="flex justify-between p-2 bg-muted rounded"><span className="text-muted-foreground">Company</span><span>{viewAccount.company}</span></div>}
                {viewAccount.tier && <div className="flex justify-between p-2 bg-muted rounded"><span className="text-muted-foreground">Tier</span><span>{viewAccount.tier}</span></div>}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editAccount} onOpenChange={() => setEditAccount(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Account</DialogTitle>
            <DialogDescription>Update {config.label.slice(0, -1).toLowerCase()} account details</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Phone</label>
              <Input value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Company/Organization</label>
              <Input value={editForm.company} onChange={(e) => setEditForm({ ...editForm, company: e.target.value })} />
            </div>
            <Button onClick={handleSaveEdit} className="w-full">Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExpoAccountsList;
