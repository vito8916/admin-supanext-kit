import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserX, ArrowLeft } from "lucide-react";

export default function UserNotFound() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/users">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Users
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <UserX className="h-16 w-16 text-muted-foreground" />
            </div>
            <CardTitle className="text-xl">User Not Found</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              The user you&apos;re looking for doesn&apos;t exist or may have been deleted.
            </p>
            <Link href="/dashboard/users">
              <Button className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Users List
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 