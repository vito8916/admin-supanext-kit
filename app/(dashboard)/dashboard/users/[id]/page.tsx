import { getUserById } from "@/app/actions/users-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Crown, 
  ShieldCheck, 
  Calculator,
  ArrowLeft,
  Edit,
  UserX,
  MailIcon,
  Activity,
  CreditCard
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { notFound } from "next/navigation";

interface UserDetailPageProps {
  params: {
    id: string;
  };
}

function getRoleIcon(role: string) {
  switch (role.toLowerCase()) {
    case 'admin':
      return <Shield className="h-4 w-4" />;
    case 'superadmin':
      return <Crown className="h-4 w-4" />;
    case 'manager':
      return <ShieldCheck className="h-4 w-4" />;
    case 'cashier':
      return <Calculator className="h-4 w-4" />;
    default:
      return <User className="h-4 w-4" />;
  }
}

function getStatusBadge(status: boolean | null, subscription_id: string | null) {
  if (status === null) {
    return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
  }
  if (status === false) {
    return <Badge variant="outline" className="bg-gray-100 text-gray-800">Inactive</Badge>;
  }
  if (subscription_id) {
    return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>;
  }
  return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Invited</Badge>;
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const user = await getUserById(params.id);

  if (!user) {
    notFound();
  }

  const userInitials = user.full_name 
    ? user.full_name.split(' ').map(n => n[0]).join('').toUpperCase()
    : user.id.slice(0, 2).toUpperCase();

  const userEmail = user.full_name 
    ? user.full_name.toLowerCase().replace(/\s+/g, '.') + '@example.com'
    : user.id.slice(0, 8) + '@example.com';

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Header with Back Button */}
      <Link href="/dashboard/users">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Users
          </Button>
        </Link>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">User Details</h1>
          <p className="text-muted-foreground">View and manage user information</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <MailIcon className="h-4 w-4 mr-2" />
            Send Email
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit User
          </Button>
          <Button variant="destructive" size="sm">
            <UserX className="h-4 w-4 mr-2" />
            Suspend
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* User Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar_url || undefined} />
                <AvatarFallback className="text-2xl">{userInitials}</AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-xl">{user.full_name || "Unknown User"}</CardTitle>
            <div className="flex items-center justify-center gap-2">
              {getRoleIcon(user.role)}
              <span className="text-sm text-muted-foreground capitalize">{user.role}</span>
            </div>
            <div className="flex justify-center">
              {getStatusBadge(user.status, user.subscription_id)}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{userEmail}</span>
            </div>
            {user.phone && (
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.phone}</span>
              </div>
            )}
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Joined {format(new Date(user.created_at), "MMM dd, yyyy")}</span>
            </div>
            {user.billing_address && (
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="text-sm">
                  {[
                    user.billing_address.street,
                    user.billing_address.city,
                    user.billing_address.state,
                    user.billing_address.postal_code,
                    user.billing_address.country
                  ].filter(Boolean).join(", ")}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* User Details and Activity */}
        <div className="md:col-span-2 space-y-6">
          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-muted-foreground">User ID</label>
                <p className="font-mono text-sm">{user.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Customer ID</label>
                <p className="font-mono text-sm">{user.customer_id || "Not set"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Subscription ID</label>
                <p className="font-mono text-sm">{user.subscription_id || "No subscription"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Account Status</label>
                <div className="mt-1">
                  {getStatusBadge(user.status, user.subscription_id)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          {user.payment_method && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Payment Method</label>
                  <p className="capitalize">{user.payment_method.type || "Not specified"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Card Brand</label>
                  <p className="capitalize">{user.payment_method.brand || "Not specified"}</p>
                </div>
                {user.payment_method.last_four && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Last Four Digits</label>
                    <p className="font-mono">****{user.payment_method.last_four}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Bio Section */}
          {user.bio && (
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{user.bio}</p>
              </CardContent>
            </Card>
          )}

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Account created</p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(user.created_at), "MMM dd, yyyy 'at' h:mm a")}
                    </p>
                  </div>
                </div>
                
                {user.subscription_id && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Subscription activated</p>
                      <p className="text-xs text-muted-foreground">Subscription ID: {user.subscription_id}</p>
                    </div>
                  </div>
                )}

                {user.status === true && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Account verified</p>
                      <p className="text-xs text-muted-foreground">Account status is active</p>
                    </div>
                  </div>
                )}

                {user.payment_method && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Payment method added</p>
                      <p className="text-xs text-muted-foreground">
                        {user.payment_method.brand} ending in {user.payment_method.last_four}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
