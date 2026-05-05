import CustomSelect from "@/components/custom-select/custom-select";
import DateInput from "./date-input";
import styles from "./leads-filters.module.css";

type FilterValues = {
  source: string;
  neighborhood: string;
  dateFrom: string;
  dateTo: string;
};

type SourceOption = {
  value: string;
  label: string;
};

type LeadsFiltersProps = {
  search: string;
  filters: FilterValues;
  sourceOptions: SourceOption[];
  onSearchChange: (value: string) => void;
  onFilterChange: (key: keyof FilterValues, value: string) => void;
};

const LeadsFilters = ({
  search,
  filters,
  sourceOptions,
  onSearchChange,
  onFilterChange,
}: LeadsFiltersProps) => (
  <div className={styles.container}>
    <div className={styles.search_wrapper}>
      <svg className={styles.search_icon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <input
        type="text"
        className={styles.search_input}
        placeholder="Buscar por nome..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>

    <div className={styles.filters_grid}>
      <div className={styles.filter_group}>
        <label className={styles.filter_label}>Source</label>
        <CustomSelect
          options={sourceOptions}
          value={filters.source}
          onChange={(val) => onFilterChange("source", val)}
          placeholder="Todos"
        />
      </div>

      <div className={styles.filter_group}>
        <label className={styles.filter_label}>Bairro</label>
        <input
          type="text"
          className={styles.input}
          placeholder="Filtrar bairro..."
          value={filters.neighborhood}
          onChange={(e) => onFilterChange("neighborhood", e.target.value)}
        />
      </div>

      <div className={styles.filter_group}>
        <label className={styles.filter_label}>Data inicial</label>
        <DateInput
          value={filters.dateFrom}
          onChange={(val) => onFilterChange("dateFrom", val)}
          placeholder="Início"
        />
      </div>

      <div className={styles.filter_group}>
        <label className={styles.filter_label}>Data final</label>
        <DateInput
          value={filters.dateTo}
          onChange={(val) => onFilterChange("dateTo", val)}
          placeholder="Fim"
        />
      </div>
    </div>
  </div>
);

export default LeadsFilters;
