"use client";

import { useTranslations } from "next-intl";

type PaginationProps = {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const t = useTranslations("pagination");
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const from = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const to = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalItems === 0) return null;

  const getPages = (): (number | "...")[] => {
    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | "...")[] = [1, 2, 3, 4, "...", totalPages];
    return pages;
  };

  const btnBase = "w-5 h-5 min-[550px]:w-6 min-[550px]:h-6 flex items-center justify-center text-[10px] min-[550px]:text-xs font-semibold rounded border border-border bg-surface-alt text-foreground hover:border-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary";
  const btnActive = "w-5 h-5 min-[550px]:w-6 min-[550px]:h-6 flex items-center justify-center text-[10px] min-[550px]:text-xs font-semibold rounded bg-primary text-primary-foreground border border-primary focus:outline-none";
  const btnDisabled = "opacity-40 cursor-not-allowed";

  return (
    <div className="flex justify-between items-center mt-4 px-2">
      <p className="text-[10px] min-[550px]:text-xs lg:text-sm font-medium text-muted-foreground">
        {t("showing")} {from} {t("to")} {to} {t("of")} {totalItems} {t("results")}
      </p>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label={t("previous")}
          className={`${btnBase} ${currentPage === 1 ? btnDisabled : ""}`}
        >
          {"<"}
        </button>

        {getPages().map((page, i) =>
          page === "..." ? (
            <span key={`ellipsis-${i}`} className="px-1 text-xs text-muted-foreground">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              aria-label={`${t("showing")} ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
              className={page === currentPage ? btnActive : btnBase}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label={t("next")}
          className={`${btnBase} ${currentPage === totalPages ? btnDisabled : ""}`}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}