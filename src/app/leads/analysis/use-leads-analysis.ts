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
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [filters, setFilters] = useState<Filters>({
    source: "",
    neighborhood: "",
    dateFrom: "",
    dateTo: "",
  });

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const fetchLeads = useCallback(
    async (
      pwd: string,
      page: number,
      searchTerm: string,
      f: Filters,
      options?: { authCheck?: boolean }
    ) => {
      const isAuthCheck = options?.authCheck ?? false;
      setLoading(true);
      if (isAuthCheck) setAuthLoading(true);

      try {
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
          setPassword("");
          return;
        }

        let json: { data?: Lead[]; count?: number; error?: string };
        try {
          json = await res.json();
        } catch {
          setAuthenticated(false);
          setAuthError("Resposta inválida do servidor.");
          return;
        }

        if (!res.ok) {
          setAuthenticated(false);
          setAuthError(json.error || "Erro ao carregar leads.");
          return;
        }

        setAuthenticated(true);
        setAuthError("");
        setPassword(pwd);
        setLeads(json.data || []);
        setTotalCount(json.count || 0);
      } catch {
        setAuthenticated(false);
        setAuthError("Erro de conexão. Tente novamente.");
      } finally {
        setLoading(false);
        if (isAuthCheck) setAuthLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)?.trim();
    if (stored) {
      void fetchLeads(
        stored,
        1,
        "",
        { source: "", neighborhood: "", dateFrom: "", dateTo: "" },
        { authCheck: true }
      );
    } else {
      setAuthLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!password || !authenticated) return;
    void fetchLeads(password, currentPage, search, filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, currentPage, filters]);

  useEffect(() => {
    if (!password || !authenticated) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setCurrentPage(1);
      void fetchLeads(password, 1, search, filters);
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleLogin = (pwd: string) => {
    const trimmed = pwd.trim();
    if (!trimmed) return;
    localStorage.setItem(STORAGE_KEY, trimmed);
    setAuthError("");
    void fetchLeads(trimmed, 1, search, filters, { authCheck: true });
  };

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setCurrentPage(1);
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const requestDelete = (id: string, name: string) => {
    setDeleteTarget({ id, name });
  };

  const cancelDelete = () => {
    setDeleteTarget(null);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const { id } = deleteTarget;
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
    setDeleteTarget(null);
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
    deleteTarget,
    handleLogin,
    setSearch,
    handleFilterChange,
    requestDelete,
    cancelDelete,
    confirmDelete,
    setCurrentPage,
  };
}

export { PAGE_SIZE };
