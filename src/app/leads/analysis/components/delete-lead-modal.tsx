"use client";

import { useEffect } from "react";
import styles from "./delete-lead-modal.module.css";

type DeleteLeadModalProps = {
  name: string;
  deleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const DeleteLeadModal = ({
  name,
  deleting,
  onConfirm,
  onCancel,
}: DeleteLeadModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !deleting) onCancel();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onCancel, deleting]);

  return (
    <div
      className={styles.overlay}
      onClick={deleting ? undefined : onCancel}
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-lead-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="delete-lead-title" className={styles.title}>
          Deletar lead?
        </h2>
        <p className={styles.message}>
          Deletar o lead &quot;{name}&quot;? Esta ação não pode ser desfeita.
        </p>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancel_button}
            onClick={onCancel}
            disabled={deleting}
          >
            Cancelar
          </button>
          <button
            type="button"
            className={styles.confirm_button}
            onClick={onConfirm}
            disabled={deleting}
          >
            {deleting ? "Deletando..." : "Deletar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteLeadModal;
