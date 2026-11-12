export type TagKey = "cola" | "oziq" | "sigaret" | "un" | "gosht";
export type Tone = "green" | "red" | "amber" | "gray";
export type StatusKey = "all" | "active" | "overdue" | "soon" | "closed";
export type SortKey = "balance-desc" | "balance-asc" | "due";

export type Customer = {
  id: number;
  name: string;
  phone: string;
  tags: TagKey[];
  items: string[];
  telegram: boolean;
};

export type EntryKind = "debt" | "payment" | "message";

export type Entry = {
  id: number;
  customerId: number;
  kind: EntryKind;
  amount: number;
  date: string; // YYYY-MM-DD
  dueDate: string | null; // faqat nasiyada
  note: string;
};

export type Store = { customers: Customer[]; entries: Entry[] };

export type View = Customer & {
  balance: number;
  totalPaid: number;
  lastDate: string | null;
  dueDate: string | null;
  dueDays: number | null; // manfiy = kechikkan
};

export type ModalState =
  | { kind: "customer"; id?: number }
  | { kind: "payment" | "debt" | "message" | "history"; id: number }
  | null;
