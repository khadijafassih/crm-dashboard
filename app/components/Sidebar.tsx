"use client";

import { useState, useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { navItems, NavKey } from "./sidebar/NavItems";
import Logo from "./sidebar/Logo";
import NavLinkContent from "./sidebar/NavLinkContent";
import ProCard from "./sidebar/ProCard";
import UserProfile from "./sidebar/UserProfile";
import { HexagonLogo } from "./sidebar/SidebarIcons";

const itemsWithChevron: NavKey[] = ["product", "customers", "income", "promote", "help"];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeKey, setActiveKey] = useState<NavKey>("customers");
  const t = useTranslations();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedCollapsed = localStorage.getItem("sidebar-collapsed") === "true";
    const storedKey = localStorage.getItem("sidebar-active-key") as NavKey | null;
    setCollapsed(storedCollapsed);
    if (storedKey) setActiveKey(storedKey);
    setMounted(true);
  }, []);

  const handleCollapse = useCallback((value: boolean) => {
    setCollapsed(value);
    localStorage.setItem("sidebar-collapsed", String(value));
  }, []);

  const handleSetActive = useCallback((key: NavKey) => {
    setActiveKey(key);
    localStorage.setItem("sidebar-active-key", key);
  }, []);

  const isActive = (key: NavKey) => mounted && key === activeKey;

  if (collapsed) {
    return (
      <aside className="hidden lg:flex flex-col h-screen bg-sidebar shrink-0 sticky top-0 w-[76px] py-5 px-2 items-center gap-y-4">
        <HexagonLogo className="w-6 h-6 stroke-[1.5] text-foreground" />

        <button
          onClick={() => handleCollapse(false)}
          aria-label={t("sidebar.expandAriaLabel")}
          className="flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <nav
          className="flex flex-col gap-y-2 w-full items-center"
          aria-label={t("nav.ariaLabel")}
        >
          {navItems.map((item) => {
            const active = isActive(item.key);
            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => handleSetActive(item.key)}
                title={t(`nav.${item.key}`)}
                aria-current={active ? "page" : undefined}
                className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  active
                    ? "bg-primary text-primary-foreground shadow-nav-active"
                    : "text-muted-foreground hover:bg-sidebar-hover hover:text-foreground"
                }`}
              >
                <NavLinkContent
                  itemKey={item.key}
                  icon={item.icon}
                  active={active}
                  collapsed
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex-1" />

        <div className="pb-2 flex justify-center">
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-border">
            <Image
              src="https://i.pravatar.cc/150?u=evano"
              alt={t("user.name")}
              width={36}
              height={36}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="hidden lg:flex flex-col h-screen bg-sidebar shrink-0 sticky top-0 w-[220px] justify-between select-none overflow-hidden py-4 px-3">
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <Logo />
          <button
            onClick={() => handleCollapse(true)}
            aria-label={t("sidebar.collapseAriaLabel")}
            className="p-0.5 rounded text-muted-foreground hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <nav
          className="flex flex-col gap-y-1.5 mt-6"
          aria-label={t("nav.ariaLabel")}
        >
          {navItems.map((item) => {
            const active = isActive(item.key);
            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => handleSetActive(item.key)}
                aria-current={active ? "page" : undefined}
                className={`w-full h-8 flex items-center px-4 rounded-md transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  active
                    ? "bg-primary text-primary-foreground shadow-nav-active"
                    : "text-muted-foreground hover:bg-sidebar-hover hover:text-foreground"
                }`}
              >
                <NavLinkContent
                  itemKey={item.key}
                  icon={item.icon}
                  active={active}
                  showChevron={itemsWithChevron.includes(item.key)}
                />
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-y-5 mt-auto">
        <ProCard />
        <UserProfile />
      </div>
    </aside>
  );
}