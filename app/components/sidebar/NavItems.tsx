import {
  KeyRound,
  Box,
  UserRound,
  Wallet,
  BadgePercent,
  MessageSquare,
} from "lucide-react";

export type NavKey = "dashboard" | "product" | "customers" | "income" | "promote" | "help";

export type NavItem = {
  key: NavKey;
  href: string;
  icon: React.ElementType;
};

export const navItems: NavItem[] = [
  { key: "dashboard", href: "/", icon: KeyRound },
  { key: "product", href: "/", icon: Box },
  { key: "customers", href: "/", icon: UserRound },
  { key: "income", href: "/", icon: Wallet },
  { key: "promote", href: "/", icon: BadgePercent },
  { key: "help", href: "/", icon: MessageSquare },
];

export const iconsWithBox: NavKey[] = ["dashboard", "product", "customers"];