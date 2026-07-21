import { useTranslations } from "next-intl";
import { HexagonLogo } from "./SidebarIcons";

export default function Logo() {
  const t = useTranslations();

  return (
    <div className="flex items-center gap-1 text-foreground">
      <HexagonLogo className="w-5 h-5 stroke-[1.5] text-foreground" />
      <span className="text-[15px] font-bold tracking-tight">
        {t("brand.name")}
      </span>
      <span className="text-[7px] font-medium text-muted-foreground self-end mb-0.5 ml-0.5">
        {t("brand.version")}
      </span>
    </div>
  );
}