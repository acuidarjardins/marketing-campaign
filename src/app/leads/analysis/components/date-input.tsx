import DatePicker, { registerLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./date-input.module.css";

registerLocale("pt-BR", ptBR);

type DateInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const DateInput = ({ value, onChange, placeholder = "dd/mm/aaaa" }: DateInputProps) => {
  const selected = value ? new Date(value + "T00:00:00") : null;

  const handleChange = (date: Date | null) => {
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      onChange(`${year}-${month}-${day}`);
    } else {
      onChange("");
    }
  };

  return (
    <div className={styles.wrapper}>
      <DatePicker
        selected={selected}
        onChange={handleChange}
        locale="pt-BR"
        dateFormat="dd/MM/yyyy"
        placeholderText={placeholder}
        className={styles.input}
        isClearable
        showPopperArrow={false}
      />
      <svg className={styles.icon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    </div>
  );
};

export default DateInput;
