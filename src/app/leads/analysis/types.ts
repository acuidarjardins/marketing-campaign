export type Lead = {
  id: string;
  created_at: string;
  source: number;
  full_name: string;
  phone: string;
  email: string | null;
  neighborhood: string;
  need: string;
};

export type Filters = {
  source: string;
  neighborhood: string;
  dateFrom: string;
  dateTo: string;
};
