import type { Customer } from "@/types";
import StatusBadge from "./StatusBadge";

type CustomerTableRowProps = {
  customer: Customer;
};

export default function CustomerTableRow({ customer }: CustomerTableRowProps) {
  return (
    <tr className="border-b border-border last:border-none">
      <td className="px-4 lg:px-6 py-3 text-xs min-[550px]:text-sm font-medium text-foreground whitespace-nowrap">
        {customer.name}
      </td>
      <td className="px-4 lg:px-6 py-3 text-xs min-[550px]:text-sm font-medium text-foreground whitespace-nowrap">
        {customer.company}
      </td>
      <td className="px-4 lg:px-6 py-3 text-xs min-[550px]:text-sm font-medium text-foreground whitespace-nowrap">
        {customer.phoneNumber}
      </td>
      <td className="px-4 lg:px-6 py-3 text-xs min-[550px]:text-sm font-medium text-foreground whitespace-nowrap">
        {customer.email}
      </td>
      <td className="px-4 lg:px-6 py-3 text-xs min-[550px]:text-sm font-medium text-foreground whitespace-nowrap">
        {customer.country}
      </td>
      <td className="px-4 lg:px-6 py-3">
        <StatusBadge status={customer.status} />
      </td>
    </tr>
  );
}