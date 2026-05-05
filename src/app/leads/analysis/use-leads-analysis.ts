"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Lead, Filters } from "./types";

const STORAGE_KEY = "ADMIN_PASSWORD";
const PAGE_SIZE = 50;

export default function useLeadsAnalysis() {
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    source: "",
    neighborhood: "",
    dateFrom: "",
    dateTo: "",
  });

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setPassword(stored);
    } else {
      setAuthLoading(false);
    }
  }, []);

  const fetchLeads = useCallback(
    async (pwd: string, page: number, searchTerm: string, f: Filters) => {
      setLoading(true);
      const params = new URLSearchParams();
      params.set("page", String(page));
      if (searchTerm) params.set("search", searchTerm);
      if (f.source) params.set("source", f.source);
      if (f.neighborhood) params.set("neighborhood", f.neighborhood);
      if (f.dateFrom) params.set("date_from", f.dateFrom);
      if (f.dateTo) params.set("date_to", f.dateTo);

      const res = await fetch(`/api/leads?${params.toString()}`, {
        headers: { "x-admin-password": pwd },
      });

      if (res.status === 401) {
        setAuthenticated(false);
        setAuthError("Senha incorreta.");
        localStorage.removeItem(STORAGE_KEY);
        setLoading(false);
        setAuthLoading(false);
        return;
      }

      const json = await res.json();
      if (!res.ok) {
        setLoading(false);
        setAuthLoading(false);
        return;
      }

      setAuthenticated(true);
      setAuthError("");
      setLeads(json.data || []);
      setTotalCount(json.count || 0);
      setLoading(false);
      setAuthLoading(false);
    },
    []
  );

  useEffect(() => {
    if (password) {
      fetchLeads(password, currentPage, search, filters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password, currentPage, filters]);

  useEffect(() => {
    if (!password) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setCurrentPage(1);
      fetchLeads(password, 1, search, filters);
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleLogin = (pwd: string) => {
    localStorage.setItem(STORAGE_KEY, pwd);
    setPassword(pwd);
    setAuthLoading(true);
  };

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setCurrentPage(1);
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Deletar o lead "${name}"?`)) return;
    setDeletingId(id);

    const res = await fetch("/api/leads", {
      method: "DELETE",
      headers: {
        "x-admin-password": password,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setLeads((prev) => prev.filter((l) => l.id !== id));
      setTotalCount((prev) => prev - 1);
    }

    setDeletingId(null);
  };

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return {
    authenticated,
    authLoading,
    authError,
    leads,
    totalCount,
    currentPage,
    totalPages,
    loading,
    search,
    filters,
    deletingId,
    handleLogin,
    setSearch,
    handleFilterChange,
    handleDelete,
    setCurrentPage,
  };
}

export { PAGE_SIZE };
