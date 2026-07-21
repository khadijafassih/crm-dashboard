"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";

export default function LanguageSwitcher() {
  const t = useTranslations("language");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");
    startTransition(() => {
      router.replace(newPath);
    });
  };

  return (
    <div 
      className="flex items-center gap-1 border border-border rounded-sm p-1 bg-surface mr-2" 
      aria-label={t("label")}
    >
      <button
        onClick={() => switchLocale("en")}
        disabled={isPending}
        aria-pressed={locale === "en"}
        className={`p-1.5 rounded-sm text-[10px] sm:text-xs lg:text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          locale === "en"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {t("en")}
      </button>
      <button
        onClick={() => switchLocale("sv")}
        disabled={isPending}
        aria-pressed={locale === "sv"}
        className={`p-1.5 rounded-sm text-[10px] sm:text-xs lg:text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          locale === "sv"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {t("sv")}
      </button>
    </div>
  );
}