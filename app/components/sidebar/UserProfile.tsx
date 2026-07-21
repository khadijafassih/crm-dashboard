import { useTranslations } from "next-intl";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function UserProfile() {
  const t = useTranslations();

  return (
    <div className="flex items-center justify-between pt-2.5 border-t border-border">
      <div className="flex items-center gap-2">
        <Image
          src="https://i.pravatar.cc/150?u=evano"
          alt={t("user.name")}
          width={28}
          height={28}
          className="w-7 h-7 rounded-full object-cover"
        />
        <div className="flex flex-col text-left">
          <span className="text-[11px] font-semibold text-foreground leading-none mb-0.5">
            {t("user.name")}
          </span>
          <span className="text-[9px] font-normal text-muted-foreground">
            {t("user.role")}
          </span>
        </div>
      </div>
      <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
    </div>
  );
}