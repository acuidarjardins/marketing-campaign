import { sourceColorMap, sourceLabels } from "../source-config";
import { formatPhone, formatDate } from "../utils";
import type { Lead } from "../types";
import Spinner from "./spinner";
import styles from "./leads-table.module.css";

type LeadsTableProps = {
  leads: Lead[];
  loading: boolean;
  deletingId: string | null;
  onDelete: (id: string, name: string) => void;
};

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const LeadsTable = ({
  leads,
  loading,
  deletingId,
  onDelete,
}: LeadsTableProps) => (
  <div className={styles.wrapper}>
    {loading && (
      <div className={styles.overlay}>
        <Spinner size="md" />
      </div>
    )}

    <table className={styles.table}>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Telefone</th>
          <th>E-mail</th>
          <th>Bairro</th>
          <th>Necessidade</th>
          <th>Source</th>
          <th>Data</th>
          <th className={styles.actions_header}>Ações</th>
        </tr>
      </thead>
      <tbody>
        {leads.map((lead) => (
          <tr key={lead.id}>
            <td data-label="Nome" className={styles.name_cell}>{lead.full_name}</td>
            <td data-label="Telefone" className={styles.phone_cell}>
              {(() => {
                const parsed = formatPhone(lead.phone);
                if (parsed) {
                  return (
                    <a
                      href={parsed.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.phone_link}
                      title="Abrir WhatsApp"
                    >
                      {parsed.formatted}
                    </a>
                  );
                }
                return <span>{lead.phone}</span>;
              })()}
            </td>
            <td data-label="E-mail" className={styles.email_cell}>{lead.email || "—"}</td>
            <td data-label="Bairro">{lead.neighborhood}</td>
            <td data-label="Necessidade">{lead.need}</td>
            <td data-label="Source">
              <span
                className={styles.source_badge}
                style={sourceColorMap[lead.source] || undefined}
              >
                {sourceLabels[lead.source] || lead.source}
              </span>
            </td>
            <td data-label="Data" className={styles.date_cell}>{formatDate(lead.created_at)}</td>
            <td data-label="Ações">
              <button
                type="button"
                className={styles.delete_button}
                disabled={deletingId === lead.id}
                onClick={() => onDelete(lead.id, lead.full_name)}
                title="Deletar lead"
              >
                <TrashIcon />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {leads.length === 0 && !loading && (
      <div className={styles.empty}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="1.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="9" y1="15" x2="15" y2="15" />
        </svg>
        <h3 className={styles.empty_title}>Nenhum lead encontrado</h3>
        <p className={styles.empty_subtitle}>Tente ajustar os filtros ou a busca</p>
      </div>
    )}
  </div>
);

export default LeadsTable;
