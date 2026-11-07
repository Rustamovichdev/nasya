import type { TagKey, Tone } from "./turlar";

export const STORAGE_KEY = "qarz-daftar:mijozlar:v1";
export const PAGE_SIZE = 7;

export const TAGS: { key: TagKey; label: string; item: string }[] = [
  { key: "cola", label: "Cola / ichimlik", item: "cola" },
  { key: "oziq", label: "Oziq-ovqat", item: "oziq-ovqat" },
  { key: "sigaret", label: "Sigaretlar", item: "sigaret" },
  { key: "un", label: "Un & Yog'", item: "un-yog'" },
  { key: "gosht", label: "Go'sht mahsulotlari", item: "go'sht" },
];

export const TONE: Record<Tone, string> = {
  green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  red: "bg-red-50 text-red-600 ring-red-200",
  amber: "bg-amber-50 text-amber-700 ring-amber-200",
  gray: "bg-gray-100 text-gray-600 ring-gray-200",
};

export const AVATAR_COLORS = [
  "bg-amber-100 text-amber-700",
  "bg-sky-100 text-sky-700",
  "bg-violet-100 text-violet-700",
  "bg-rose-100 text-rose-700",
  "bg-emerald-100 text-emerald-700",
];

export const MONTHS = ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr"];

export const fieldClass =
  "rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100";
export const primaryBtn =
  "rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40";
export const secondaryBtn =
  "rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50";
