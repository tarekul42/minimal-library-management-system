import {
  type LucideIcon,
  Home,
  BookOpen,
  Users,
  Info,
  LayoutDashboard,
  Newspaper,
  BookMarked,
  Clock,
  Heart,
  DollarSign,
  Bell,
  User,
  Settings,
  BarChart3,
  FileText,
  Tags,
  BookCopy,
  ShieldCheck,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon?: LucideIcon;
  requiresAuth?: boolean;
  requiresAdmin?: boolean;
  description?: string;
  children?: NavItem[];
}

export const siteConfig = {
  name: "Athenaeum",
  shortName: "Athenaeum",
  description: "Modern library management system — borrow, reserve, and discover books.",
  url: "https://library.example.com",
  email: "hello@library.example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Library Street, Booktown, BK 12345",
  social: {
    twitter: "https://twitter.com/library",
    github: "https://github.com/tarekul42/minimal-library-management-system",
    facebook: "https://facebook.com/library",
    linkedin: "https://linkedin.com/company/library",
    instagram: "https://instagram.com/library",
  },
} as const;

export const publicNavItems: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Books", href: "/books", icon: BookOpen },
  { label: "Authors", href: "/authors", icon: Users },
  { label: "About", href: "/about", icon: Info },
];

export const authedNavItems: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Books", href: "/books", icon: BookOpen },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Authors", href: "/authors", icon: Users },
  { label: "Blog", href: "/blog", icon: Newspaper },
];

export const userDashboardNav: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Borrows", href: "/dashboard/my-borrows", icon: BookMarked },
  { label: "Reservations", href: "/dashboard/my-reservations", icon: Clock },
  { label: "Wishlist", href: "/dashboard/wishlist", icon: Heart },
  { label: "Fines", href: "/dashboard/fines", icon: DollarSign },
  { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { label: "Profile", href: "/dashboard/profile", icon: User },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export const staffDashboardNav: NavItem[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Manage Books", href: "/admin/books", icon: BookCopy },
  { label: "Manage Authors", href: "/admin/authors", icon: Users },
  { label: "Categories", href: "/admin/categories", icon: Tags },
  { label: "Borrows", href: "/admin/borrows", icon: BookMarked },
  { label: "Fines", href: "/admin/fines", icon: DollarSign },
  { label: "Reports", href: "/admin/reports", icon: FileText },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export const adminOnlyDashboardNav: NavItem[] = [
  { label: "Manage Users", href: "/admin/users", icon: ShieldCheck },
];

export const footerNavGroups: { title: string; items: NavItem[] }[] = [
  {
    title: "Explore",
    items: [
      { label: "Books", href: "/books" },
      { label: "Authors", href: "/authors" },
      { label: "Borrow Summary", href: "/borrow-summary" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Help & Support", href: "/help" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];
