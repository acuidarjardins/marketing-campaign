"use client";

import Link from "next/link";
import { sourceOptions } from "./source-config";
import useLeadsAnalysis, { PAGE_SIZE } from "./use-leads-analysis";
import AuthGate from "./components/auth-gate";
import LeadsFilters from "./components/leads-filters";
import LeadsTable from "./components/leads-table";
import DeleteLeadModal from "./components/delete-lead-modal";
import Pagination from "./components/pagination";
import styles from "./page.module.css";

export default function LeadsAnalysisPage() {
  const {
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
  } = useLeadsAnalysis();

  if (!authenticated) {
    return (
      <AuthGate
        onSubmit={handleLogin}
        error={authError}
        loading={authLoading}
      />
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.header_left}>
          <h1 className={styles.title}>Análise de Leads</h1>
          <span className={styles.count}>{totalCount} leads encontrados</span>
        </div>
        <Link href="/" className={styles.landing_link}>
          Ir para a landing page
        </Link>
      </header>

      <LeadsFilters
        search={search}
        filters={filters}
        sourceOptions={sourceOptions}
        onSearchChange={setSearch}
        onFilterChange={handleFilterChange}
      />

      <div className={styles.table_scroll}>
        <LeadsTable
          leads={leads}
          loading={loading}
          deletingId={deletingId}
          onDelete={requestDelete}
        />
      </div>

      {deleteTarget && (
        <DeleteLeadModal
          name={deleteTarget.name}
          deleting={deletingId === deleteTarget.id}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalCount={totalCount}
        pageSize={PAGE_SIZE}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
