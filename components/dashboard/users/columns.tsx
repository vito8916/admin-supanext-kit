"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/users";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal, Shield, Crown, User as UserIcon, ShieldCheck, Calculator } from "lucide-react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

function getRoleIcon(role: string) {
  switch (role.toLowerCase()) {
    case 'admin':
      return <Shield className="h-3 w-3" />;
    case 'superadmin':
      return <Crown className="h-3 w-3" />;
    case 'manager':
      return <ShieldCheck className="h-3 w-3" />;
    case 'cashier':
      return <Calculator className="h-3 w-3" />;
    default:
      return <UserIcon className="h-3 w-3" />;
  }
}

function ActionCell({ user }: { user: User }) {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => router.push(`/dashboard/users/${user.id}`)}>
          View details
        </DropdownMenuItem>
        <DropdownMenuItem>
          Edit user
        </DropdownMenuItem>
        <DropdownMenuItem>
          Send invitation
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive">
          Suspend user
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "full_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium"
        >
          Name
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-1 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-1 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-1 h-4 w-4 opacity-40" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const fullName = row.getValue("full_name") as string | null;
      const user = row.original;
      
      return (
        <div className="flex flex-col">
          <div className="font-medium">
            {fullName || "Unknown User"}
          </div>
          <div className="text-sm text-muted-foreground">
            {fullName ? fullName.toLowerCase().replace(/\s+/g, '.') + '@example.com' : user.id.slice(0, 8) + '@example.com'}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium"
        >
          Phone Number
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-1 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-1 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-1 h-4 w-4 opacity-40" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const phone = row.getValue("phone") as string | null;
      return phone || "-";
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium"
        >
          Registered Date
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-1 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-1 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-1 h-4 w-4 opacity-40" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("created_at") as string;
      return format(new Date(date), "dd MMM, yyyy");
    },
  },
  {
    id: "last_login",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column?.toggleSorting(column?.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium"
        >
          Last Login Date
          {column?.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-1 h-4 w-4" />
          ) : column?.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-1 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-1 h-4 w-4 opacity-40" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      // Generate deterministic date based on user ID to avoid hydration issues
      const user = row.original;
      const userIdHash = user.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const daysAgo = (userIdHash % 30) + 1; // 1-30 days ago
      
      const lastLogin = new Date();
      lastLogin.setDate(lastLogin.getDate() - daysAgo);
      return format(lastLogin, "dd MMM, yyyy");
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium"
        >
          Status
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-1 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-1 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-1 h-4 w-4 opacity-40" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      
      const statusConfig = {
        active: { variant: "default" as const, color: "bg-green-100 text-green-800", label: "Active" },
        invited: { variant: "secondary" as const, color: "bg-blue-100 text-blue-800", label: "Invited" },
        suspended: { variant: "destructive" as const, color: "bg-red-100 text-red-800", label: "Suspended" },
        inactive: { variant: "outline" as const, color: "bg-gray-100 text-gray-800", label: "Inactive" },
        pending: { variant: "outline" as const, color: "bg-yellow-100 text-yellow-800", label: "Pending" },
      };

      const config = statusConfig[status as keyof typeof statusConfig];
      
      return (
        <Badge variant={config.variant} className={config.color}>
          {config.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium"
        >
          Role
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-1 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-1 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-1 h-4 w-4 opacity-40" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      return (
        <div className="flex items-center gap-2">
          {getRoleIcon(role)}
          <span className="capitalize">{role}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionCell user={row.original} />,
  },
];
