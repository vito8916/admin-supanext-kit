"use client";

import { signOut } from "@/app/actions/auth-actions";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignOutButton() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSignOut = async () => {
        setIsLoading(true);
        const result = await signOut();
        if (result.status === "success") {
            router.push(result.redirect ?? "/login");
            setIsLoading(false);
        }
    }

    return (
        <Button onClick={handleSignOut} disabled={isLoading}>
            {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
                <LogOut className="w-4 h-4 mr-2" />
            )}
            Sign Out
        </Button>
    );
}
