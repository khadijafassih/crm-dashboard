import { useTranslations } from "next-intl";
import Image from "next/image";

type MetricCardProps = {
  labelKey: "totalCustomers" | "members" | "activeNow";
  value: string;
  change: string;
  changeDirection: "up" | "down";
  icon: React.ReactNode;
  iconBgClass: string;
  iconTextClass: string;
  avatars?: string[];
};

export default function MetricCard({
  labelKey,
  value,
  change,
  changeDirection,
  icon,
  iconBgClass,
  iconTextClass,
  avatars,
}: MetricCardProps) {
  const t = useTranslations("metrics");

  return (
    <div className="flex flex-col min-[400px]:flex-row items-center gap-3 min-[550px]:gap-5 px-4 py-3 lg:py-0">

      {/* Icon circle */}
      <div className={`w-11 h-11 min-[550px]:w-16 min-[550px]:h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center shrink-0 ${iconBgClass}`}>
        <div className={`${iconTextClass} [&>svg]:w-6 [&>svg]:h-6 min-[550px]:[&>svg]:w-8 min-[550px]:[&>svg]:h-8 lg:[&>svg]:w-10 lg:[&>svg]:h-10`}>
          {icon}
        </div>
      </div>

      {/* Text content */}
      <div className="flex flex-col items-center min-[400px]:items-start">

        {/* Label */}
        <span className="text-[10px] min-[550px]:text-xs lg:text-sm text-muted-foreground font-medium tracking-wide mb-1">
          {t(labelKey)}
        </span>

        {/* Value */}
        <span className="text-base min-[550px]:text-xl lg:text-2xl font-bold text-foreground leading-none mb-1">
          {value}
        </span>

        {avatars ? (
          <div className="flex -space-x-2 mt-1">
            {avatars.map((src, i) => (
              <div key={i} className="w-5 h-5 min-[550px]:w-6 min-[550px]:h-6 rounded-full overflow-hidden border-2 border-surface">
                <Image
                  src={src}
                  alt={`${t("activeUser")} ${i + 1}`}
                  width={24}
                  height={24}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <span className="text-[10px] min-[550px]:text-xs flex items-center gap-1">
            <span className={`font-bold ${changeDirection === "up" ? "text-success" : "text-destructive"}`}>
              {changeDirection === "up" ? "↑" : "↓"} {change}
            </span>
            <span className="text-muted-foreground">{t("thisMonth")}</span>
          </span>
        )}
      </div>
    </div>
  );
}