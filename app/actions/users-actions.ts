"use server";

import { createClient } from "@/utils/supabase/server";
import { cache } from "react";

export const getUsers = cache(async () => {
  const supabase = await createClient();
  
  const { data: users, error } = await supabase
    .from("users")
    .select(`
      id,
      full_name,
      bio,
      phone,
      avatar_url,
      billing_address,
      payment_method,
      status,
      customer_id,
      subscription_id,
      role,
      embedding,
      created_at
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }

  return users || [];
});

export const getUserById = cache(async (id: string) => {
  const supabase = await createClient();
  
  const { data: user, error } = await supabase
    .from("users")
    .select(`
      id,
      full_name,
      bio,
      phone,
      avatar_url,
      billing_address,
      payment_method,
      status,
      customer_id,
      subscription_id,
      role,
      embedding,
      created_at
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error("Error fetching user:", error);
    return null;
  }

  return user;
});

export const getUserStats = cache(async () => {
  const supabase = await createClient();
  
  // Get total users
  const { count: totalUsers } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true });

  // Get users from last month for comparison
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  
  const { count: lastMonthUsers } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true })
    .lt('created_at', lastMonth.toISOString());

  // Get new users this month
  const thisMonth = new Date();
  thisMonth.setDate(1);
  thisMonth.setHours(0, 0, 0, 0);
  
  const { count: newUsersThisMonth } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true })
    .gte('created_at', thisMonth.toISOString());

  // Get active users (status = true)
  const { count: activeUsers } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true })
    .eq('status', true);

  // Get pending verifications (status = null or false with recent creation)
  const { count: pendingVerifications } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true })
    .is('status', null);

  const currentTotal = totalUsers || 0;
  const previousTotal = lastMonthUsers || 0;
  const growthRate = previousTotal > 0 ? ((currentTotal - previousTotal) / previousTotal) * 100 : 0;

  return {
    totalUsers: currentTotal,
    newUsers: newUsersThisMonth || 0,
    activeUsers: activeUsers || 0,
    pendingVerifications: pendingVerifications || 0,
    growthRate: Math.round(growthRate * 10) / 10,
  };
});
