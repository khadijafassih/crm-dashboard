import DashboardLayout from "../components/DashboardLayout";
import Header from "../components/Header";
import MetricCardsRow from "../components/MetricCardsRow";
import CustomerTable from "../components/CustomerTable";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 bg-background min-h-screen flex flex-col">
        <Header />
        <div className="px-4 sm:px-6 lg:px-9 pb-4 sm:pb-6 lg:pb-9 flex flex-col gap-y-6">
          <MetricCardsRow />
          <CustomerTable />
        </div>
      </div>
    </DashboardLayout>
  );
}