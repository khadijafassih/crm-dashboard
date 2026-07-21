import { useTranslations } from "next-intl";
import type { CustomerStatus } from "@/types";

type StatusBadgeProps = {
  status: CustomerStatus;
};

const statusStyles: Record<CustomerStatus, string> = {
  active: "bg-success-bg text-success border border-success",
  inactive: "bg-destructive-bg text-destructive border border-destructive",
  pending: "bg-warning-bg text-warning border border-warning",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const t = useTranslations("status");

  return (
    <span
      className={`inline-block w-16 min-[550px]:w-20 text-center text-[10px] min-[550px]:text-xs font-medium p-1 rounded-sm ${statusStyles[status]}`}
    >
      {t(status)}
    </span>
  );
}