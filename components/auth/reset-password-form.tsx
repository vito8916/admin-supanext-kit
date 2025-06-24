"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { UpdatePasswordFormValues, updatePasswordSchema } from "@/lib/validations-schemas/auth";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { updatePassword } from "@/app/actions/auth-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function ResetPasswordForm({ className, ...props }: React.ComponentProps<"div">) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    // 1. Define your form.
    const form = useForm<UpdatePasswordFormValues>({
        resolver: zodResolver(updatePasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(data: UpdatePasswordFormValues) {
        setIsLoading(true);
        setError(null);
        setSuccess(false);
        
        try {
            const formData = new FormData();  
            formData.append("password", data.password);
            formData.append("confirmPassword", data.confirmPassword);
            
            const result = await updatePassword(formData);
            
            if (result.error) {
                toast.error(result.error);
                setError(result.error);
                return;
            }
            
            if (result.status === "success") {
                toast.success(result.message || "Password updated successfully!");
                setSuccess(true);
                form.reset(); // Clear the form on success
                
                // Redirect to the specified page or default to pricings
                setTimeout(() => {
                    router.push(result.redirect || "/pricings");
                }, 2000);
            } else {
                toast.error(result.message || "Something went wrong");
                setError(result.message || "Something went wrong");
            }
        } catch {
            toast.error("Something went wrong. Please try again.");
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Reset Password</CardTitle>
                    <CardDescription>
                        {success 
                            ? "Password updated successfully!"
                            : "Enter your new password"
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {success ? (
                        <div className="space-y-4">
                            <div className="p-4 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
                                Your password has been updated successfully! You will be redirected shortly.
                            </div>
                            <div className="text-center">
                                <Link 
                                    href="/login" 
                                    className="text-sm text-muted-foreground hover:text-primary underline underline-offset-4"
                                >
                                    Back to login
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                {error && (
                                    <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                                        {error}
                                    </div>
                                )}
                                
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>New Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="Enter your new password"
                                                        disabled={isLoading}
                                                        {...field}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        disabled={isLoading}
                                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                                                        ) : (
                                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                                        )}
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm New Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        placeholder="Confirm your new password"
                                                        disabled={isLoading}
                                                        {...field}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        disabled={isLoading}
                                                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                                    >
                                                        {showConfirmPassword ? (
                                                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                                                        ) : (
                                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                                        )}
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                
                                <Button 
                                    type="submit" 
                                    className="w-full" 
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Updating...
                                        </>
                                    ) : (
                                        "Update Password"
                                    )}
                                </Button>
                            </form>
                        </Form>
                    )}
                </CardContent>
            </Card>
            <div className="text-center text-xs text-muted-foreground">
                Remember your password?{" "}
                <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                    Back to login
                </Link>
            </div>
        </div>
    );
} 