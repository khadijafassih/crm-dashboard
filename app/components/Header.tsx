"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileDrawer from "./MobileDrawer";

export default function Header() {
  const t = useTranslations();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* Desktop header */}
      <header className="hidden lg:flex items-center justify-between border-[23px] border-background bg-background">
        <h1 className="text-xl lg:text-2xl font-semibold text-foreground px-3 lg:px-6">
          {t("greeting", { name: t("user.name") })}
        </h1>
        <LanguageSwitcher />
      </header>

      {/* Mobile/Tablet header */}
      <header className="lg:hidden flex items-center justify-between border-[15px] border-background bg-background">
        {/* Hamburger on left */}
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label={t("sidebar.openAriaLabel")}
          aria-expanded={drawerOpen}
          aria-controls="mobile-drawer"
          className="flex items-center justify-center w-10 h-10 rounded-xl text-muted-foreground hover:text-foreground hover:bg-sidebar-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Greeting in center */}
        <h1 className="text-base sm:text-lg font-semibold text-foreground">
          {t("greeting", { name: t("user.name") })}
        </h1>

        {/* Language switcher on right */}
        <LanguageSwitcher />
      </header>

      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}