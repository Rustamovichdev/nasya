import { useState } from "react";
import type { Customer, Entry, EntryKind, TagKey, View } from "./turlar";
import { TAGS, fieldClass, primaryBtn, secondaryBtn } from "./konstantalar";
import { todayISO, addDays, formatDate, formatMoney, digitsOnly } from "./sana";
import { Icon } from "./ikonlar";
import { Field, FormButtons } from "./ui";

export function CustomerForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Customer;
  onSave: (
    form: { name: string; phone: string; tags: TagKey[]; telegram: boolean },
    firstDebt?: { amount: number; date: string; dueDate: string | null; items: string[] }
  ) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [phone, setPhone] = useState(initial?.phone ?? "+998 ");
  const [tags, setTags] = useState<TagKey[]>(initial?.tags ?? []);
  const [telegram, setTelegram] = useState(initial?.telegram ?? false);
  const [debtAmount, setDebtAmount] = useState("");
  const [debtDate, setDebtDate] = useState(todayISO());
  const [dueDate, setDueDate] = useState(addDays(todayISO(), 7));
  const [items, setItems] = useState("");

  const nameError = name.trim() ? "" : "Ism kiriting";
  const phoneError = digitsOnly(phone).length >= 9 ? "" : "Telefon raqamni to'liq kiriting";
  const amount = Math.floor(Number(debtAmount) || 0);
  const debtError = !initial && debtAmount !== "" && amount <= 0 ? "Summa 0 dan katta bo'lsin" : "";

  const toggleTag = (key: TagKey) => setTags((prev) => (prev.includes(key) ? prev.filter((t) => t !== key) : [...prev, key]));

  const submit = () => {
    const form = { name: name.trim(), phone: phone.trim(), tags, telegram };
    const firstDebt =
      !initial && amount > 0
        ? {
            amount,
            date: debtDate,
            dueDate: dueDate || null,
            items: items
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          }
        : undefined;
    onSave(form, firstDebt);
  };

  return (
    <div className="space-y-4">
      <Field label="Ism va familiya" error={name !== "" ? nameError : ""}>
        <input value={name} onChange={(e) => setName(e.target.value)} className={`${fieldClass} w-full`} placeholder="Masalan: Azizbek Rahimov" />
      </Field>
      <Field label="Telefon raqami" error={phone.trim() !== "+998" ? phoneError : ""}>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} className={`${fieldClass} w-full`} placeholder="+998 (90) 123-45-67" inputMode="tel" />
      </Field>

      <div className="space-y-1">
        <span className="text-xs font-medium text-gray-600">Teglar</span>
        <div className="flex flex-wrap gap-2">
          {TAGS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => toggleTag(t.key)}
              className={`rounded-full px-3 py-1 text-xs font-medium ring-1 transition ${
                tags.includes(t.key) ? "bg-blue-600 text-white ring-blue-600" : "bg-white text-gray-600 ring-gray-200 hover:bg-gray-50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input type="checkbox" checked={telegram} onChange={(e) => setTelegram(e.target.checked)} className="h-4 w-4 accent-blue-600" />
        Telegram bot ulangan
      </label>

      {!initial && (
        <>
          <div className="border-t border-gray-100 pt-3">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">Birinchi nasiya (ixtiyoriy)</p>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Summa" error={debtError}>
                <input
                  type="number"
                  value={debtAmount}
                  onChange={(e) => setDebtAmount(e.target.value)}
                  className={`${fieldClass} w-full`}
                  placeholder="0"
                  min={0}
                />
              </Field>
              <Field label="Sana">
                <input type="date" value={debtDate} onChange={(e) => setDebtDate(e.target.value)} className={`${fieldClass} w-full`} />
              </Field>
              <Field label="To'lov muddati">
                <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className={`${fieldClass} w-full`} />
              </Field>
            </div>
            <Field label="Mahsulotlar (vergul bilan)">
              <input value={items} onChange={(e) => setItems(e.target.value)} className={`${fieldClass} w-full`} placeholder="cola, non" />
            </Field>
          </div>
        </>
      )}

      <FormButtons onCancel={onCancel} onSave={submit} disabled={!!nameError || !!phoneError || !!debtError} />
    </div>
  );
}

export function PaymentForm({
  balance,
  onSave,
  onCancel,
}: {
  balance: number;
  onSave: (amount: number, date: string, note: string) => void;
  onCancel: () => void;
}) {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(todayISO());
  const [note, setNote] = useState("");
  const value = Math.floor(Number(amount) || 0);
  const error =
    amount === "" ? "" : value <= 0 ? "Summa 0 dan katta bo'lsin" : value > balance ? `Summa qoldiqdan (${formatMoney(balance)}) katta bo'lmasin` : "";

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Joriy qarz qoldig'i: <span className="font-semibold text-gray-900">{formatMoney(balance)}</span>
      </p>
      <Field label="To'lov summasi" error={error}>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className={`${fieldClass} w-full`} placeholder="0" min={0} />
      </Field>
      <Field label="Sana">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={`${fieldClass} w-full`} />
      </Field>
      <Field label="Izoh (ixtiyoriy)">
        <input value={note} onChange={(e) => setNote(e.target.value)} className={`${fieldClass} w-full`} placeholder="Masalan: naqd" />
      </Field>
      <FormButtons onCancel={onCancel} onSave={() => onSave(value, date, note.trim())} disabled={value <= 0 || !!error} />
    </div>
  );
}

export function DebtForm({
  onSave,
  onCancel,
}: {
  onSave: (amount: number, date: string, dueDate: string | null, items: string[]) => void;
  onCancel: () => void;
}) {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(todayISO());
  const [dueDate, setDueDate] = useState(addDays(todayISO(), 7));
  const [items, setItems] = useState("");
  const value = Math.floor(Number(amount) || 0);

  return (
    <div className="space-y-4">
      <Field label="Nasiya summasi">
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className={`${fieldClass} w-full`} placeholder="0" min={0} />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Sana">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={`${fieldClass} w-full`} />
        </Field>
        <Field label="To'lov muddati">
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className={`${fieldClass} w-full`} />
        </Field>
      </div>
      <Field label="Mahsulotlar (vergul bilan)">
        <input value={items} onChange={(e) => setItems(e.target.value)} className={`${fieldClass} w-full`} placeholder="cola, non" />
      </Field>
      <FormButtons
        onCancel={onCancel}
        onSave={() =>
          onSave(
            value,
            date,
            dueDate || null,
            items
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          )
        }
        disabled={value <= 0}
      />
    </div>
  );
}

export function MessageForm({ view, onSave, onCancel }: { view: View; onSave: (text: string) => void; onCancel: () => void }) {
  const defaultText =
    view.balance === 0
      ? `Assalomu alaykum, ${view.name}! Hisobingiz to'liq yopilgan. Rahmat!`
      : `Assalomu alaykum, ${view.name}! Sizning joriy nasiya qoldig'ingiz: ${formatMoney(view.balance)}.` +
        (view.dueDate ? ` To'lov muddati: ${formatDate(view.dueDate)}.` : "") +
        " Iltimos, o'z vaqtida to'lang. Rahmat!";
  const [text, setText] = useState(defaultText);
  const smsHref = `sms:+${digitsOnly(view.phone)}?body=${encodeURIComponent(text)}`;

  return (
    <div className="space-y-4">
      <Field label="Xabar matni">
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={5} className={`${fieldClass} w-full`} />
      </Field>
      <div className="flex flex-wrap gap-2">
        <a href={smsHref} className={`${secondaryBtn} inline-flex items-center gap-1.5`}>
          <Icon name="message" /> SMS ilovasida ochish
        </a>
        <button type="button" onClick={() => navigator.clipboard?.writeText(text)} className={secondaryBtn}>
          Nusxa olish
        </button>
      </div>
      <FormButtons onCancel={onCancel} onSave={() => onSave(text.trim())} disabled={!text.trim()} saveLabel="Tarixga saqlash" />
    </div>
  );
}

export function HistoryView({ entries, onEdit, onDelete }: { entries: Entry[]; onEdit: () => void; onDelete: () => void }) {
  const LABEL: Record<EntryKind, { text: string; cls: string }> = {
    debt: { text: "Nasiya", cls: "bg-red-50 text-red-600" },
    payment: { text: "To'lov", cls: "bg-emerald-50 text-emerald-700" },
    message: { text: "Xabar", cls: "bg-blue-50 text-blue-600" },
  };
  return (
    <div className="space-y-4">
      {entries.length === 0 ? (
        <p className="py-6 text-center text-sm text-gray-400">Yozuvlar yo'q</p>
      ) : (
        <ul className="max-h-80 divide-y divide-gray-100 overflow-y-auto">
          {entries.map((e) => (
            <li key={e.id} className="flex items-start justify-between gap-3 py-2.5 text-sm">
              <div className="min-w-0 space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${LABEL[e.kind].cls}`}>{LABEL[e.kind].text}</span>
                  <span className="text-xs text-gray-500">{formatDate(e.date)}</span>
                </div>
                {e.kind === "message" ? (
                  <p className="line-clamp-2 text-xs text-gray-600">{e.note}</p>
                ) : (
                  <p className="text-xs text-gray-500">
                    {e.dueDate ? `Muddat: ${formatDate(e.dueDate)}` : ""}
                    {e.note ? ` ${e.note}` : ""}
                  </p>
                )}
              </div>
              {e.kind !== "message" && (
                <span className={`shrink-0 font-semibold ${e.kind === "debt" ? "text-red-600" : "text-emerald-600"}`}>
                  {e.kind === "debt" ? "+" : "−"}
                  {formatMoney(e.amount)}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-between border-t border-gray-100 pt-3">
        <button type="button" onClick={onDelete} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
          <Icon name="trash" /> O'chirish
        </button>
        <button type="button" onClick={onEdit} className={`${secondaryBtn} inline-flex items-center gap-1.5`}>
          <Icon name="edit" /> Tahrirlash
        </button>
      </div>
    </div>
  );
}
