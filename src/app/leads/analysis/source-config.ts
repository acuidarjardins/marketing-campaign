import { FormSources } from "@/modules/constants";

const SOURCE_DISPLAY: Record<string, string> = {
  TESTES: "Testes",
  REDE_DE_PESQUISA: "Rede de Pesquisa",
  P_MAX: "P-Max",
};

export const sourceLabels: Record<number, string> = Object.fromEntries(
  Object.entries(FormSources).map(([key, value]) => [value, SOURCE_DISPLAY[key] || key])
);

export const sourceOptions = Object.entries(FormSources).map(([key, value]) => ({
  value: String(value),
  label: SOURCE_DISPLAY[key] || key,
}));

export const sourceColorMap: Record<number, { color: string; background: string }> = {
  [FormSources.TESTES]: { color: "#6b7280", background: "#f3f4f6" },
  [FormSources.REDE_DE_PESQUISA]: { color: "#1d4ed8", background: "#eff6ff" },
  [FormSources.P_MAX]: { color: "#7c3aed", background: "#f5f3ff" },
};
