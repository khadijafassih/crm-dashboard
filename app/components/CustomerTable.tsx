"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import type { CustomerStatus } from "@/types";
import { customers } from "@/data/customers";
import CustomerTableRow from "./CustomerTableRow";
import EmptyState from "./EmptyState";
import Pagination from "./Pagination";
import SearchInput from "./SearchInput";
import Dropdown from "./Dropdown";

const ITEMS_PER_PAGE = 8;
type FilterValue = CustomerStatus | "all";
type SortValue = "newest" | "oldest";

export default function CustomerTable() {
  const t = useTranslations("table");
  const tf = useTranslations("filter");
  const tc = useTranslations("customers");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterValue>("all");
  const [sort, setSort] = useState<SortValue>("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    let result = customers.filter((c) => {
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q);
      const matchesFilter = filter === "all" || c.status === filter;
      return matchesSearch && matchesFilter;
    });

    // Sort by createdAt date
    if (sort === "newest") {
      result = [...result].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else {
      result = [...result].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }

    return result;
  }, [search, filter, sort]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleFilter = (value: string) => {
    setFilter(value as FilterValue);
    setCurrentPage(1);
  };

  const handleSort = (value: string) => {
    setSort(value as SortValue);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setSearch("");
    setFilter("all");
    setSort("newest");
    setCurrentPage(1);
  };

  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const headers = ["name", "company", "phoneNumber", "email", "country", "status"] as const;

  const filterOptions = [
    { value: "all", label: tf("all") },
    { value: "active", label: tf("active") },
    { value: "inactive", label: tf("inactive") },
    { value: "pending", label: tf("pending") },
  ];

  const sortOptions = [
    { value: "newest", label: t("newest") },
    { value: "oldest", label: t("oldest") },
  ];

  return (
    <div className="bg-surface rounded-[30px] p-2 sm:p-4 lg:p-6 shadow-sm">
      {/* Card header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 lg:mb-6">
        <div>
          <h2 className="text-base min-[550px]:text-lg lg:text-xl font-bold text-foreground mb-1">
            {tc("allCustomers")}
          </h2>
          <p className="text-[10px] min-[550px]:text-xs font-normal text-success">
            {tc("activeMembers")}
          </p>
        </div>

        {/* Search + Filter + Sort */}
        <div className="flex items-center gap-3 flex-wrap">
          <SearchInput value={search} onChange={handleSearch} />
          
          <Dropdown
            value={filter}
            options={filterOptions}
            onChange={handleFilter}
            prefix={t("filterBy")}
            ariaLabel={t("filterLabel")}
          />

          <Dropdown
            value={sort}
            options={sortOptions}
            onChange={handleSort}
            prefix={t("sortBy")}
            ariaLabel={t("sortLabel")}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border">
              {headers.map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="px-4 lg:px-6 py-3 text-[10px] min-[550px]:text-xs lg:text-sm font-medium text-muted-foreground whitespace-nowrap"
                >
                  {t(h)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((customer) => (
              <CustomerTableRow key={customer.id} customer={customer} />
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <EmptyState onClear={handleClear} />}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={filtered.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}