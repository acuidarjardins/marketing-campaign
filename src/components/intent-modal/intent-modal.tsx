"use client";

import { useLeadModal } from "@/contexts/lead-modal-context";
import { workWithUsLink } from "@/modules/constants";
import styles from "./intent-modal.module.css";

const IntentModal = () => {
  const { state, goToIntent, goToLeadForm, goToCaregiver, closeModal } = useLeadModal();

  if (state.step !== "intent" && state.step !== "caregiver") return null;

  const handleOverlayClick = () => closeModal();

  if (state.step === "caregiver") {
    return (
      <div className={styles.overlay} onClick={handleOverlayClick}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className={styles.close_button}
            onClick={closeModal}
            aria-label="Fechar"
          >
            &times;
          </button>

          <div className={styles.caregiver_content}>
            <div className={styles.caregiver_icon}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#78a046" strokeWidth="1.5">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>

            <h2 className={styles.title}>Processo Seletivo</h2>
            <p className={styles.caregiver_text}>
              Para participar do nosso processo seletivo, clique no botão abaixo
              e siga nosso processo de recrutamento.
            </p>

            <a
              href={workWithUsLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.caregiver_button}
              onClick={closeModal}
            >
              Participar do processo seletivo
            </a>

            <button
              type="button"
              className={styles.back_button}
              onClick={goToIntent}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Voltar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.close_button}
          onClick={closeModal}
          aria-label="Fechar"
        >
          &times;
        </button>

        <h2 className={styles.title}>Qual o seu objetivo?</h2>

        <div className={styles.cards}>
          <button
            type="button"
            className={styles.card}
            onClick={goToLeadForm}
          >
            <div className={styles.card_icon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#78a046" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <div className={styles.card_text}>
              <span className={styles.card_title}>Busco um cuidado</span>
              <span className={styles.card_subtitle}>
                Para um familiar ou para mim
              </span>
            </div>
            <svg className={styles.card_arrow} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <button
            type="button"
            className={styles.card}
            onClick={goToCaregiver}
          >
            <div className={styles.card_icon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#78a046" strokeWidth="1.5">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                <line x1="12" y1="12" x2="12" y2="16" />
                <line x1="10" y1="14" x2="14" y2="14" />
              </svg>
            </div>
            <div className={styles.card_text}>
              <span className={styles.card_title}>Sou cuidador(a)</span>
              <span className={styles.card_subtitle}>
                Busco oportunidades de trabalho
              </span>
            </div>
            <svg className={styles.card_arrow} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntentModal;
