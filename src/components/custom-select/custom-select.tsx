import { useEffect, useRef, useState } from "react";
import styles from "./custom-select.module.css";

type Option = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hasError?: boolean;
};

const CustomSelect = ({
  options,
  value,
  onChange,
  placeholder = "Selecionar...",
  hasError = false,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((o) => o.value === value)?.label || placeholder;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optValue: string) => {
    onChange(optValue);
    setIsOpen(false);
  };

  const triggerClass = [
    styles.trigger,
    isOpen ? styles.trigger_open : "",
    hasError ? styles.trigger_error : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        type="button"
        className={triggerClass}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? styles.trigger_text : styles.trigger_placeholder}>
          {selectedLabel}
        </span>
        <svg
          className={`${styles.chevron} ${isOpen ? styles.chevron_open : ""}`}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`${styles.option} ${opt.value === value ? styles.option_selected : ""}`}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
