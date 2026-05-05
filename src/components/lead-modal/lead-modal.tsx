"use client";

import { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useLeadModal } from "@/contexts/lead-modal-context";
import { createClient } from "@/utils/supabase/client";
import { buildWhatsAppUrl } from "@/modules/constants";
import CustomSelect from "@/components/custom-select/custom-select";
import styles from "./lead-modal.module.css";

type LeadFormData = {
  fullName: string;
  phone: string;
  email: string;
  neighborhood: string;
  need: string;
};

const needOptions = [
  { value: "Obter um orçamento", label: "Obter um orçamento" },
  { value: "Tirar dúvidas", label: "Tirar dúvidas" },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const formatPhoneInput = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const LeadModal = () => {
  const { state, ctaMode, closeModal } = useLeadModal();
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const isSimplified = ctaMode === "lead-only";

  const supabase = useMemo(() => createClient(), []);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<LeadFormData>();

  const onSubmit = async (data: LeadFormData) => {
    setLoading(true);
    setSubmitError("");

    const { error } = await supabase.from("leads").insert({
      source: state.source,
      full_name: data.fullName,
      phone: data.phone,
      email: isSimplified ? null : data.email || null,
      neighborhood: isSimplified ? "Não informado" : data.neighborhood,
      need: isSimplified ? "Obter um orçamento" : data.need,
    });

    if (error) {
      setSubmitError("Erro ao enviar. Por favor, tente novamente.");
      setLoading(false);
      return;
    }

    let whatsappUrl: string;
    if (isSimplified) {
      whatsappUrl = buildWhatsAppUrl(
        "Olá, Gostaria de mais informações sobre os serviços da Acuidar"
      );
    } else {
      whatsappUrl = buildWhatsAppUrl(
        `Olá, meu nome é ${data.fullName} e gostaria de informações sobre os serviços da Acuidar`
      );
    }

    setLoading(false);
    reset();
    window.open(whatsappUrl, "_blank");
    closeModal();
  };

  const handleClose = () => {
    if (loading) return;
    reset();
    setSubmitError("");
    closeModal();
  };

  if (state.step !== "lead-form") return null;

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.close_button}
          onClick={handleClose}
          aria-label="Fechar"
        >
          &times;
        </button>

        <h2 className={styles.title}>Fale conosco</h2>
        <p className={styles.subtitle}>
          Preencha seus dados para entrarmos em contato
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="fullName">Nome Completo *</label>
            <input
              id="fullName"
              type="text"
              placeholder="Seu nome completo"
              className={errors.fullName ? styles.input_error : ""}
              {...register("fullName", { required: "Nome é obrigatório" })}
            />
            {errors.fullName && (
              <span className={styles.error}>{errors.fullName.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="phone">WhatsApp / Telefone *</label>
            <Controller
              name="phone"
              control={control}
              rules={{
                required: "Telefone é obrigatório",
                validate: (val) => {
                  const digits = val.replace(/\D/g, "");
                  return digits.length >= 10 || "Formato inválido. Ex: (11) 99999-9999";
                },
              }}
              render={({ field }) => (
                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="(11) 99999-9999"
                  className={errors.phone ? styles.input_error : ""}
                  value={field.value || ""}
                  onChange={(e) => field.onChange(formatPhoneInput(e.target.value))}
                />
              )}
            />
            {errors.phone && (
              <span className={styles.error}>{errors.phone.message}</span>
            )}
          </div>

          {!isSimplified && (
            <>
              <div className={styles.field}>
                <label htmlFor="email">E-mail</label>
                <input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="seu@email.com"
                  className={errors.email ? styles.input_error : ""}
                  {...register("email", {
                    pattern: {
                      value: EMAIL_PATTERN,
                      message: "E-mail inválido",
                    },
                  })}
                />
                {errors.email && (
                  <span className={styles.error}>{errors.email.message}</span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="neighborhood">Bairro *</label>
                <input
                  id="neighborhood"
                  type="text"
                  placeholder="Seu bairro"
                  className={errors.neighborhood ? styles.input_error : ""}
                  {...register("neighborhood", {
                    required: "Bairro é obrigatório",
                  })}
                />
                {errors.neighborhood && (
                  <span className={styles.error}>
                    {errors.neighborhood.message}
                  </span>
                )}
              </div>

              <div className={styles.field}>
                <label>Necessidade *</label>
                <Controller
                  name="need"
                  control={control}
                  rules={{ required: "Selecione uma opção" }}
                  render={({ field }) => (
                    <CustomSelect
                      options={needOptions}
                      value={field.value || ""}
                      onChange={field.onChange}
                      placeholder="Selecione..."
                      hasError={!!errors.need}
                    />
                  )}
                />
                {errors.need && (
                  <span className={styles.error}>{errors.need.message}</span>
                )}
              </div>
            </>
          )}

          {submitError && (
            <p className={styles.submit_error}>{submitError}</p>
          )}

          <button
            type="submit"
            className={styles.submit_button}
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar e ir para WhatsApp"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeadModal;
