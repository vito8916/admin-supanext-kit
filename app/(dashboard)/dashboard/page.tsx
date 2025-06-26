import { getAuthUser } from "@/app/actions/auth-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { capitalizeText, formatDate, getInitials } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Mail, Shield } from "lucide-react";
import { redirect } from "next/navigation";

export default async function DashboardPage() {

  const user = await getAuthUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
    <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

    <Card className="max-w-2xl">
        <CardHeader className="pb-4">
            <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                    <AvatarImage src={user?.user_metadata?.avatar_url} />
                    <AvatarFallback className="text-lg font-semibold bg-primary/10">
                        {getInitials(user?.user_metadata?.full_name)}
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">
                        Welcome back, {capitalizeText(user?.user_metadata.full_name)}
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs">
                        Active User
                    </Badge>
                </div>
            </div>
        </CardHeader>
        
        <Separator />
        
        <CardContent className="pt-6">
            <div className="grid gap-4">
                <div className="flex items-center space-x-3 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium">{user?.email}</span>
                </div>
                
                <div className="flex items-center space-x-3 text-sm">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">User ID:</span>
                    <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                        {user?.id}
                    </code>
                </div>
                
                <div className="flex items-center space-x-3 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Member since:</span>
                    <span className="font-medium">
                        {user?.created_at ? formatDate(user.created_at) : 'N/A'}
                    </span>
                </div>
                
                <div className="flex items-center space-x-3 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Last active:</span>
                    <span className="font-medium">
                        {user?.last_sign_in_at ? formatDate(user.last_sign_in_at) : 'N/A'}
                    </span>
                </div>
            </div>
        </CardContent>
    </Card>
</div>
  )
}
