import { getUsers, getUserStats } from "@/app/actions/users-actions";
import { DataTable } from "@/components/dashboard/users/data-table";
import { columns } from "@/components/dashboard/users/columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Users, UserPlus, UserCheck, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function UsersPage() {
  try {
    const [users, stats] = await Promise.all([
      getUsers(),
      getUserStats()
    ]);

    return (
      <div className="flex flex-1 flex-col gap-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User List</h1>
          </div>
          <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <UserPlus className="mr-2 h-4 w-4" />
            Invite User
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
        </div>
        
        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+{stats.growthRate}%</span> than last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Users</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{stats.newUsers}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+10%</span> vs last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingVerifications}</div>
              <p className="text-xs text-muted-foreground">
                {stats.totalUsers > 0 ? Math.round((stats.pendingVerifications / stats.totalUsers) * 100) : 0}% of users
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {stats.totalUsers > 0 ? Math.round((stats.activeUsers / stats.totalUsers) * 100) : 0}% of all users
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Users Table */}
        <DataTable columns={columns} data={users} />
      </div>
    );
  } catch {
    return (
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User List</h1>
          </div>
        </div>
        
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load users. Please check your database connection and try again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
}