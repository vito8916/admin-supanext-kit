import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ResendConfirmationEmailForm from "@/components/auth/resend-confirmation-email-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function SignUpSuccessPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Thank you for signing up!</CardTitle>
                <CardDescription>Check your email to confirm</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">
                    You&apos;ve successfully signed up. Please check your email to confirm your account and continue to
                    the app.
                </p>
                <Alert className="mt-4">
                    <AlertCircle />
                    <AlertDescription>
                    Note: If you don&apos;t see the email, check your spam folder or resend the confirmation email.
                    </AlertDescription>
                </Alert>
                <ResendConfirmationEmailForm />
            </CardContent>
        </Card>
    );
}
