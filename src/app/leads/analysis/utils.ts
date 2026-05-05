export const formatPhone = (raw: string): { formatted: string; whatsappUrl: string } | null => {
  const digits = raw.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 13) return null;

  const national = digits.startsWith("55") ? digits.slice(2) : digits;
  if (national.length < 10 || national.length > 11) return null;

  const ddd = national.slice(0, 2);
  const number = national.slice(2);
  const formatted =
    number.length === 9
      ? `(${ddd}) ${number.slice(0, 5)}-${number.slice(5)}`
      : `(${ddd}) ${number.slice(0, 4)}-${number.slice(4)}`;

  return { formatted, whatsappUrl: `https://wa.me/55${national}` };
};

export const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
