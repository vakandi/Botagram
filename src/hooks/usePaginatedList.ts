import { useEffect, useMemo, useState } from "react";

export type PaginatedListOptions<T> = {
  items: T[];
  pageSize?: number;
  initialPage?: number;
  persistInQuery?: boolean;
};

export function usePaginatedList<T>({ items, pageSize = 9, initialPage = 1, persistInQuery = true }: PaginatedListOptions<T>) {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  // synchronize with URL ?page=
  useEffect(() => {
    if (!persistInQuery) return;
    const params = new URLSearchParams(window.location.search);
    const pageFromUrl = Number(params.get("page") || initialPage);
    if (!Number.isNaN(pageFromUrl) && pageFromUrl >= 1) {
      setCurrentPage(pageFromUrl);
    }
  }, [initialPage, persistInQuery]);

  useEffect(() => {
    if (!persistInQuery) return;
    const params = new URLSearchParams(window.location.search);
    params.set("page", String(currentPage));
    const url = `${window.location.pathname}?${params.toString()}${window.location.hash}`;
    window.history.replaceState({}, "", url);
  }, [currentPage, persistInQuery]);

  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const clampedPage = Math.min(Math.max(1, currentPage), totalPages);

  const pageItems = useMemo(() => {
    const start = (clampedPage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, clampedPage, pageSize]);

  const goToPage = (page: number) => setCurrentPage(Math.min(Math.max(1, page), totalPages));
  const nextPage = () => goToPage(clampedPage + 1);
  const prevPage = () => goToPage(clampedPage - 1);

  // prefetch neighboring pages (±1) by computing indices (useful when data is remote)
  const prefetch = useMemo(() => {
    const neighbors: { page: number; start: number; end: number }[] = [];
    const pushIfValid = (page: number) => {
      if (page >= 1 && page <= totalPages) {
        const start = (page - 1) * pageSize;
        neighbors.push({ page, start, end: Math.min(start + pageSize, totalItems) });
      }
    };
    pushIfValid(clampedPage - 1);
    pushIfValid(clampedPage + 1);
    return neighbors;
  }, [clampedPage, pageSize, totalItems, totalPages]);

  // window of pages around current (size 5)
  const windowPages = useMemo(() => {
    const windowSize = 5;
    const half = Math.floor(windowSize / 2);
    let start = Math.max(1, clampedPage - half);
    let end = Math.min(totalPages, start + windowSize - 1);
    start = Math.max(1, end - windowSize + 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [clampedPage, totalPages]);

  return {
    pageItems,
    totalItems,
    totalPages,
    currentPage: clampedPage,
    goToPage,
    nextPage,
    prevPage,
    windowPages,
    prefetch,
  };
}


