import { getAuthUser } from "@/app/actions/auth-actions";
import SignOutButton from "@/components/auth/sign-out-button";
import { redirect } from "next/navigation";

export default async function DashboardPage() {

  const user = await getAuthUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div>DashboardPage
      <SignOutButton />
    </div>
  )
}
