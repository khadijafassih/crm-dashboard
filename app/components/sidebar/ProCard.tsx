import { useTranslations } from "next-intl";

export default function ProCard({ compact = false }: { compact?: boolean }) {
  const t = useTranslations();

  return (
    <div className={`rounded-[14px] text-center text-primary-foreground bg-pro-card flex flex-col items-center gap-y-2.5 shadow-sm ${compact ? "p-4" : "p-5"}`}>
      <p className="text-[10px] font-semibold leading-relaxed px-1">
        {t("proCard.title")}
      </p>
      <button className="w-full bg-surface text-primary font-bold text-[10px] py-1.5 px-2 rounded-full shadow-sm hover:opacity-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground">
        {t("proCard.cta")}
      </button>
    </div>
  );
}