import { useTranslations } from "next-intl";
import MetricCard from "./MetricCard";
import { TotalCustomersIcon, MembersIcon, ActiveNowIcon } from "./icons/MetricIcons";

const stackedAvatars = [
  "https://i.pravatar.cc/150?u=av1",
  "https://i.pravatar.cc/150?u=av2",
  "https://i.pravatar.cc/150?u=av3",
  "https://i.pravatar.cc/150?u=av4",
  "https://i.pravatar.cc/150?u=av5",
];

const metricsData = {
  totalCustomers: { value: "5,423", change: "16%", direction: "up" as const },
  members: { value: "1,893", change: "1%", direction: "down" as const },
  activeNow: { value: "189", change: "", direction: "up" as const },
};

export default function MetricCardsRow() {
  return (
    <div className="bg-surface rounded-[30px] p-3 sm:p-4 lg:p-6 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-border">
        
        <MetricCard
          labelKey="totalCustomers"
          value={metricsData.totalCustomers.value}
          change={metricsData.totalCustomers.change}
          changeDirection={metricsData.totalCustomers.direction}
          icon={<TotalCustomersIcon className="w-10 h-10" />}
          iconBgClass="bg-success-light/60"
          iconTextClass="text-success"
        />

        <MetricCard
          labelKey="members"
          value={metricsData.members.value}
          change={metricsData.members.change}
          changeDirection={metricsData.members.direction}
          icon={<MembersIcon className="w-10 h-10" />}
          iconBgClass="bg-success-light/60"
          iconTextClass="text-success"
        />

        <MetricCard
          labelKey="activeNow"
          value={metricsData.activeNow.value}
          change={metricsData.activeNow.change}
          changeDirection={metricsData.activeNow.direction}
          icon={<ActiveNowIcon className="w-10 h-10" />}
          iconBgClass="bg-success-light/60"
          iconTextClass="text-success"
          avatars={stackedAvatars}
        />

      </div>
    </div>
  );
}