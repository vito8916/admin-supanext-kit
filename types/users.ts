export interface User {
  id: string;
  full_name: string | null;
  bio: string | null;
  phone: string | null;
  avatar_url: string | null;
  billing_address: {
    street?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  } | null;
  payment_method: {
    type?: string;
    last_four?: string;
    brand?: string;
  } | null;
  status: boolean | null;
  customer_id: string | null;
  subscription_id: string | null;
  role: string;
  embedding: number[] | null; // vector type
  created_at: string;
}

export type Users = User[];

export interface UserStats {
  totalUsers: number;
  newUsers: number;
  activeUsers: number;
  pendingVerifications: number;
  growthRate: number;
}

export type UserStatus = 'active' | 'inactive' | 'invited' | 'suspended' | 'pending';
export type UserRole = 'admin' | 'superadmin' | 'user' | 'manager' | 'cashier';
