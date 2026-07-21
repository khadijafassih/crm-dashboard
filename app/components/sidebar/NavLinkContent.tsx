import { useTranslations } from "next-intl";
import { ChevronRight } from "lucide-react";
import { NavKey, iconsWithBox } from "./NavItems";
import { MessageSquareHelp, IconWithBox } from "./SidebarIcons";

type NavLinkContentProps = {
  itemKey: NavKey;
  icon: React.ElementType;
  active: boolean;
  collapsed?: boolean;
  showChevron?: boolean; // ADD THIS
};

export default function NavLinkContent({ itemKey, icon: Icon, active, collapsed, showChevron }: NavLinkContentProps) {
  const t = useTranslations();
  const hasBox = iconsWithBox.includes(itemKey);

  const iconClass = "stroke-[1.5]";

  if (collapsed) {
    const iconEl =
      itemKey === "help" ? (
        <MessageSquareHelp className={`w-4 h-4 ${iconClass}`} />
      ) : hasBox ? (
        <IconWithBox
          icon={Icon}
          className={`w-3.5 h-3.5 ${iconClass}`}
          active={active}
        />
      ) : (
        <Icon className={`w-4 h-4 ${iconClass}`} />
      );

    return <>{iconEl}</>;
  }

  return (
    <div className="flex items-center justify-between w-full"> {/* ADD wrapper */}
      <div className="flex items-center gap-2">
        {itemKey === "help" ? (
          <MessageSquareHelp
            className={`w-3.5 h-3.5 stroke-[1.5] ${
              active
                ? "text-primary-foreground"
                : "text-muted-foreground group-hover:text-foreground"
            }`}
          />
        ) : hasBox ? (
          <IconWithBox
            icon={Icon}
            className={`w-3 h-3 stroke-[1.5] ${
              active
                ? "text-primary-foreground"
                : "text-muted-foreground group-hover:text-foreground"
            }`}
            active={active}
          />
        ) : (
          <Icon
            className={`w-3.5 h-3.5 stroke-[1.5] ${
              active
                ? "text-primary-foreground"
                : "text-muted-foreground group-hover:text-foreground"
            }`}
          />
        )}
        <span
          className={`text-[11px] font-medium ${
            active
              ? "text-primary-foreground"
              : "text-muted-foreground group-hover:text-foreground"
          }`}
        >
          {t(`nav.${itemKey}`)}
        </span>
      </div>
      {showChevron && (
        <ChevronRight
          className={`w-3 h-3 stroke-[2] ${
            active
              ? "text-primary-foreground"
              : "text-muted-foreground"
          }`}
        />
      )}
    </div>
  );
}