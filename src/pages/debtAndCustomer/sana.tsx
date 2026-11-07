import type { Customer, Entry, Store, TagKey, Tone, View, StatusKey } from "./turlar";
import { STORAGE_KEY, TAGS, MONTHS } from "./konstantalar";

export const pad = (n: number) => String(n).padStart(2, "0");
export const toISO = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const todayISO = () => toISO(new Date());

export function addDays(iso: string, n: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  return toISO(new Date(y, m - 1, d + n));
}

/** a - b, kunlarda */
export function diffDays(a: string, b: string): number {
  const [ay, am, ad] = a.split("-").map(Number);
  const [by, bm, bd] = b.split("-").map(Number);
  return Math.round((Date.UTC(ay, am - 1, ad) - Date.UTC(by, bm - 1, bd)) / 86400000);
}

export function formatDate(iso: string | null): string {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-").map(Number);
  return `${d}-${MONTHS[m - 1]}, ${y}`;
}

export const formatMoney = (n: number) => `${n.toLocaleString("en-US").replace(/,/g, " ")} so'm`;

export const initials = (name: string) =>
  name
    .split(" ")
    .filter((w) => /^[A-Za-zʻ']/.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

export const digitsOnly = (s: string) => s.replace(/\D/g, "");
export const telHref = (phone: string) => `tel:+${digitsOnly(phone)}`;

export const nextId = (list: { id: number }[]) => list.reduce((m, x) => Math.max(m, x.id), 0) + 1;

/* ============================ Ma'lumot qatlami ============================ */

function buildSeed(): Store {
  const today = todayISO();
  const customers: Customer[] = [];
  const entries: Entry[] = [];

  const add = (
    name: string,
    phone: string,
    tags: TagKey[],
    items: string[],
    telegram: boolean,
    balance: number,
    paid: number,
    dueDays: number | null,
    daysAgo: number
  ) => {
    const customerId = customers.length + 1;
    customers.push({ id: customerId, name, phone, tags, items, telegram });
    const debtDate = addDays(today, -daysAgo);
    entries.push({
      id: entries.length + 1,
      customerId,
      kind: "debt",
      amount: balance + paid,
      date: debtDate,
      dueDate: balance > 0 && dueDays !== null ? addDays(today, dueDays) : null,
      note: "",
    });
    if (paid > 0) {
      entries.push({
        id: entries.length + 1,
        customerId,
        kind: "payment",
        amount: paid,
        date: debtDate,
        dueDate: null,
        note: "",
      });
    }
  };

  add("Azizbek Rahimov", "+998 (90) 843-12-88", ["cola", "oziq"], ["cola", "oziq-ovqat"], true, 1850000, 3400000, -12, 40);
  add("Dilshod Saidov", "+998 (90) 512-33-44", ["sigaret", "oziq"], ["sigaret", "non"], true, 750000, 1150000, 1, 5);
  add("Malika Narziyeva (Mahalla qo'shni)", "+998 (99) 441-28-19", ["un", "oziq"], ["un-yog'", "shakar"], false, 420000, 890000, 9, 3);
  add("Javohir Oripov (Optom Cafe)", "+998 (97) 710-99-80", ["cola", "gosht"], ["cola optom", "go'sht"], true, 4600000, 18200000, 14, 6);
  add("Sherzod Qobilov", "+998 (91) 338-76-54", ["oziq"], ["oziq-ovqat"], false, 0, 650000, null, 10);
  add("Umid Tolipov", "+998 (90) 225-91-18", ["un", "sigaret"], ["un-yog'", "sigaret"], true, 980000, 2100000, 5, 8);
  add("Nigora Karimova", "+998 (94) 628-80-77", ["oziq"], ["oziq-ovqat"], false, 1250000, 500000, -6, 20);

  const FIRST = ["Sardor", "Nodira", "Otabek", "Gulnoza", "Jasur", "Malika", "Bekzod", "Feruza", "Shaxzod", "Dilnoza", "Rustam", "Sevara"];
  const LAST = ["Yusupov", "Ismoilova", "Abdullayev", "Qodirova", "Tursunov", "Sobirova", "Karimov", "Hakimova"];
  const TAG_SETS: TagKey[][] = [["cola"], ["oziq"], ["sigaret", "oziq"], ["un"], ["gosht"], ["un", "sigaret"], ["cola", "gosht"]];
  const CODES = [90, 91, 93, 94, 97, 99];

  for (let i = 0; i < 41; i++) {
    const tags = TAG_SETS[i % TAG_SETS.length];
    const balance = i % 9 === 0 ? 0 : ((i * 7919) % 40 + 1) * 25000;
    const paid = ((i % 12) + 1) * 150000;
    const dueDays = balance === 0 ? null : (i % 6) - 2;
    const phone = `+998 (${CODES[i % CODES.length]}) ${100 + ((i * 37) % 900)}-${10 + ((i * 13) % 90)}-${10 + ((i * 29) % 90)}`;
    const items = tags.map((t) => TAGS.find((x) => x.key === t)!.item);
    add(`${FIRST[i % FIRST.length]} ${LAST[(i * 3) % LAST.length]}`, phone, tags, items, i % 4 !== 0, balance, paid, dueDays, 2 + (i % 30));
  }

  return { customers, entries };
}

export function loadStore(): Store {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Store;
  } catch {
    /* buzilgan ma'lumot bo'lsa, yangidan boshlanadi */
  }
  return buildSeed();
}

export function buildViews(customers: Customer[], entries: Entry[], today: string): View[] {
  const byCustomer = new Map<number, Entry[]>();
  for (const e of entries) {
    const list = byCustomer.get(e.customerId);
    if (list) list.push(e);
    else byCustomer.set(e.customerId, [e]);
  }

  return customers.map((c) => {
    const list = byCustomer.get(c.id) ?? [];
    const debts = list.filter((e) => e.kind === "debt").sort((a, b) => a.date.localeCompare(b.date));
    const payments = list.filter((e) => e.kind === "payment");
    const balance = debts.reduce((s, e) => s + e.amount, 0) - payments.reduce((s, e) => s + e.amount, 0);
    const totalPaid = payments.reduce((s, e) => s + e.amount, 0);
    const lastDate = debts.length ? debts[debts.length - 1].date : null;
    const latestDue = [...debts].reverse().find((d) => d.dueDate)?.dueDate ?? null;
    const dueDate = balance > 0 ? latestDue : null;
    const dueDays = dueDate ? diffDays(dueDate, today) : null;
    return { ...c, balance, totalPaid, lastDate, dueDate, dueDays };
  });
}

export function matchesStatus(v: View, s: StatusKey): boolean {
  switch (s) {
    case "all":
      return true;
    case "active":
      return v.balance > 0;
    case "closed":
      return v.balance === 0;
    case "overdue":
      return v.balance > 0 && v.dueDays !== null && v.dueDays < 0;
    case "soon":
      return v.balance > 0 && v.dueDays !== null && v.dueDays >= 0 && v.dueDays <= 1;
  }
}

export function dueInfo(v: View): { tone: Tone; text: string } {
  if (v.balance === 0) return { tone: "green", text: "✓ Yopilgan" };
  if (v.dueDays === null) return { tone: "gray", text: "Muddat yo'q" };
  if (v.dueDays < 0) return { tone: "red", text: `${-v.dueDays} kun kechikdi` };
  if (v.dueDays === 0) return { tone: "amber", text: "Bugun" };
  if (v.dueDays === 1) return { tone: "amber", text: "Ertaga" };
  return { tone: "gray", text: formatDate(v.dueDate) };
}

export function pageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "...")[] = [1];
  if (current > 3) pages.push("...");
  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) pages.push(p);
  if (current < total - 2) pages.push("...");
  pages.push(total);
  return pages;
}
