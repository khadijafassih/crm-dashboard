"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { X } from "lucide-react";
import { navItems, NavKey } from "./sidebar/NavItems";
import Logo from "./sidebar/Logo";
import NavLinkContent from "./sidebar/NavLinkContent";
import ProCard from "./sidebar/ProCard";
import UserProfile from "./sidebar/UserProfile";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";
import { useOnClickOutside } from "../hooks/useOnClickOutside";

const itemsWithChevron: NavKey[] = ["product", "customers", "income", "promote", "help"];

type MobileDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const [activeKey, setActiveKey] = useState<NavKey>("customers");
  const t = useTranslations();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem("sidebar-active-key") as NavKey | null;
    if (storedKey) setActiveKey(storedKey);
    setMounted(true);
  }, []);

  useLockBodyScroll(isOpen);

  useOnClickOutside(drawerRef, () => {
    if (isOpen) onClose();
  });

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  const handleSetActive = useCallback((key: NavKey) => {
    setActiveKey(key);
    localStorage.setItem("sidebar-active-key", key);
  }, []);

  const isActive = (key: NavKey) => mounted && key === activeKey;

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity lg:hidden"
        aria-hidden="true"
        onClick={onClose}
      />

      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={t("nav.ariaLabel")}
        className="fixed top-0 left-0 z-50 h-full w-[85%] max-w-[300px] bg-sidebar shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col"
      >
        <div className="flex flex-col flex-1 justify-between py-4 px-3 overflow-hidden">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <Logo />
              <button
                ref={closeButtonRef}
                onClick={onClose}
                aria-label={t("sidebar.closeAriaLabel")}
                className="p-0.5 rounded text-muted-foreground hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <X className="w-5 h-5" />
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
                    onClick={() => {
                      handleSetActive(item.key);
                      onClose();
                    }}
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
            <ProCard compact />
            <UserProfile />
          </div>
        </div>
      </div>
    </>
  );
}