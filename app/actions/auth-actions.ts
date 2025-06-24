'use server'

import { forgotPasswordSchema, resendConfirmationEmailSchema, signInSchema, signUpSchema, updatePasswordSchema } from "@/lib/validations-schemas/auth";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { cache } from "react";

export const getAuthUser = cache(async () => {
    const supabase = await createClient();
  
    const { data: { user }, error } = await supabase.auth.getUser();
    if (!user) return null;
  
    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  
    return user;
  });
  
export const signUpAction = async (formData: FormData) => {
    const validatedFields = signUpSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
        fullName: formData.get("fullName"),
    });

    if (!validatedFields.success) {
        return { error: "Invalid fields" };
    }

    const { email, password, fullName } = validatedFields.data;

    const supabase = await createClient();
  
    if (!email || !password || !fullName) {
      return {
        status: "error",
        redirect: "/sign-up",
        message: "Email, password and full name are required",
      };
    }
  
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/confirm`,
      },
    });

    if (error) {
        return {
            status: "error",
            redirect: "/sign-up",
            message: error.message,
        };
    }

    return {
        status: "success",
        redirect: "/sign-up-success",
        message: "Account created successfully!",
    };
}

export async function signIn(formData: FormData) {
    const validatedFields = signInSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!validatedFields.success) {
        return { error: "Invalid fields" };
    }

    const { email, password } = validatedFields.data;

    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return { error: error.message };
    }

    return { success: true, redirect: "/pricings", message: "Signed in successfully." };
}

export async function resendConfirmationEmail(formData: FormData) {

    const validatedFields = resendConfirmationEmailSchema.safeParse({
        email: formData.get("email"),
    });

    if (!validatedFields.success) {
        return { error: "Invalid fields" };
    }

    const { email } = validatedFields.data;
    const supabase = await createClient();

    const { error } = await supabase.auth.resend({
        type: "signup",
        email: email!
    });

    if (error) {
        return { status: "error", message: error.message };
    }

    return { status: "success", message: "Confirmation email sent. Please check your email." };
}

export async function forgotPassword(formData: FormData) {
    const headersList = await headers();
    const host = headersList.get("host");
    const protocol = headersList.get("x-forwarded-proto") || "http";
    const redirectTo = `${protocol}://${host}/reset-password`;

    const validatedFields = forgotPasswordSchema.safeParse({
        email: formData.get("email"),
    });

    if (!validatedFields.success) {
        return { error: "Invalid fields" };
    }

    const { email } = validatedFields.data;
    const supabase = await createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email!, {
        redirectTo: redirectTo,
    });

    if (error) {
        return { status: "error", message: error.message };
    }

    return { status: "success", message: "Password reset email sent. Please check your email." };
}

export async function updatePassword(formData: FormData) {
    const validatedFields = updatePasswordSchema.safeParse({
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
    });

    if (!validatedFields.success) {
        return { error: "Invalid fields" };
    }

    const { password, confirmPassword } = validatedFields.data;

    if (password !== confirmPassword) {
        return { error: "Passwords do not match" };
    }

    const supabase = await createClient();

    const { error } = await supabase.auth.updateUser({
        password: password,
    });

    if (error) {
        return { status: "error", message: error.message };
    }

    return { status: "success", message: "Password updated successfully.", redirect: "/pricings" };
}

export async function signOut() {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
        return { status: "error", message: error.message };
    }

    return { status: "success", message: "Signed out successfully.", redirect: "/login" };
}