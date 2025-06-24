"use client"

import { resendConfirmationEmail } from "@/app/actions/auth-actions";
import { ResendConfirmationEmailFormValues, resendConfirmationEmailSchema } from "@/lib/validations-schemas/auth";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export default function ResendConfirmationEmailForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [showResendConfirmationEmailButton, setShowResendConfirmationEmailButton] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const form = useForm<ResendConfirmationEmailFormValues>({
        resolver: zodResolver(resendConfirmationEmailSchema),
        defaultValues: {
            email: "",
        },
    });

    useEffect(() => {
        // Only access localStorage on the client side
        if (typeof window !== "undefined") {
            const storedEmail = localStorage.getItem("userEmail") || "";
            // Update form default value
            form.setValue("email", storedEmail);
        }
        setShowResendConfirmationEmailButton(true);
    }, [form]);

    useEffect(() => {
        if (countdown > 0) {
            const interval = setInterval(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [countdown]);

    const onSubmit = async (values: ResendConfirmationEmailFormValues) => {
        setIsLoading(true);
        
        const formData = new FormData();
        formData.append("email", values.email);

        try {
            const result = await resendConfirmationEmail(formData);
            if (result.status === "success") {
                toast.success(result.message || "Confirmation email sent. Please check your email.");
                setCountdown(60); // Reset countdown after successful send
            } else {
                toast.error(result.message || "Something went wrong");
            }
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} type="hidden" />
                            </FormControl>
                        </FormItem>
                    )}
                />
                {showResendConfirmationEmailButton && (
                    <Button 
                        className="w-full" 
                        type="submit" 
                        disabled={isLoading || countdown > 0}
                        variant={countdown > 0 ? "secondary" : "default"}
                    >
                        {isLoading 
                            ? "Sending..." 
                            : countdown > 0 
                                ? `Resend in ${countdown}s` 
                                : "Resend confirmation email"
                        }
                    </Button>
                )}
            </form>
        </Form>
    );
}
