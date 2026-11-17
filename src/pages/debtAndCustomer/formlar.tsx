import { useMemo, useState } from "react";
import type { Customer, Entry, EntryKind, TagKey, View } from "./turlar";
import { TAGS, fieldClass, secondaryBtn, MAX_AMOUNT } from "./konstantalar";
import {
  todayISO,
  addDays,
  formatDate,
  formatMoney,
  digitsOnly,
  formatPhoneInput,
  isValidMobile,
  extractMobileDigits,
  formatAmountInput,
} from "./sana";
import { Icon } from "./ikonlar";
import { Field, FormButtons } from "./ui";

/* ============================ Telegram bot handler (DB keyin ulanadi) ============================ */

/**
 * Telegram botga mijozni ulash / ulanishni o'zgartirish.
 * Hozircha local state bilan ishlaydi — keyin API/DB ga ulang.
 *
 * @param customerId - mijoz id
 * @param enabled - bot ulanganmi
 * @param phone - tozalangan telefon (+998XXXXXXXXX)
 */
export async function handleTelegramBotLink(
  customerId: number | undefined,
  enabled: boolean,
  phone: string
): Promise<{ ok: boolean; message?: string }> {
  // TODO: DB / API ulanishi
  // misol:
  // return await api.post('/telegram/link', { customerId, enabled, phone });
  void customerId;
  void enabled;
  void phone;
  return { ok: true };
}

/* ============================ CustomerForm ============================ */

export function CustomerForm({
  initial,
  existingCustomers = [],
  onSave,
  onCancel,
}: {
  initial?: Customer;
  /** Telefon takrorlanishini tekshirish uchun */
  existingCustomers?: Customer[];
  onSave: (
    form: { name: string; phone: string; tags: TagKey[]; telegram: boolean },
    firstDebt?: { amount: number; date: string; dueDate: string | null; items: string[] }
  ) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [phone, setPhone] = useState(initial?.phone ? formatPhoneInput(initial.phone) : "+998 ");
  const [tags, setTags] = useState<TagKey[]>(initial?.tags ?? []);
  const [telegram, setTelegram] = useState(initial?.telegram ?? false);
  const [debtAmount, setDebtAmount] = useState("");
  const [debtDate, setDebtDate] = useState(todayISO());
  const [dueDate, setDueDate] = useState(addDays(todayISO(), 7));
  const [items, setItems] = useState("");

  const nameError = name.trim().length === 0 ? "Ism kiriting" : "";
  const mobileDigits = extractMobileDigits(phone);
  const phoneError =
    mobileDigits.length === 0
      ? ""
      : mobileDigits.length < 9
        ? "Telefon raqamni to'liq kiriting (9 raqam)"
        : "";

  const duplicateCustomer = useMemo(() => {
    if (mobileDigits.length < 9) return null;
    return (
      existingCustomers.find(
        (c) => extractMobileDigits(c.phone) === mobileDigits && c.id !== initial?.id
      ) ?? null
    );
  }, [mobileDigits, existingCustomers, initial?.id]);

  const amount = Math.floor(Number(debtAmount) || 0);
  const debtError =
    !initial && debtAmount !== "" && amount <= 0
      ? "Summa 0 dan katta bo'lsin"
      : amount > MAX_AMOUNT
        ? `Maksimal summa: ${formatMoney(MAX_AMOUNT)}`
        : "";

  const toggleTag = (key: TagKey) =>
    setTags((prev) => (prev.includes(key) ? prev.filter((t) => t !== key) : [...prev, key]));

  const onPhoneChange = (raw: string) => {
    setPhone(formatPhoneInput(raw));
  };

  const onAmountChange = (raw: string) => {
    setDebtAmount(formatAmountInput(raw, MAX_AMOUNT));
  };

  const submit = async () => {
    if (nameError || phoneError || !isValidMobile(phone) || debtError) return;

    const form = {
      name: name.trim(),
      phone: phone.trim(),
      tags,
      telegram,
    };

    // Telegram bot ulash handler (DB keyin ulanadi)
    await handleTelegramBotLink(initial?.id, telegram, `+998${mobileDigits}`);

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
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`${fieldClass} w-full`}
          placeholder="Masalan: Azizbek Rahimov"
          // 2–3 so'z cheklovi yo'q — istalgancha so'z yoziladi
        />
      </Field>

      <Field
        label="Telefon raqami"
        error={phone.trim() !== "+998" && phone.trim() !== "+998 " ? phoneError : ""}
        hint={
          duplicateCustomer
            ? `Bu raqam allaqachon mavjud: ${duplicateCustomer.name}`
            : undefined
        }
      >
        <input
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
          className={`${fieldClass} w-full ${duplicateCustomer ? "border-amber-400 focus:border-amber-500 focus:ring-amber-100" : ""}`}
          placeholder="+998 93 642 00 14"
          inputMode="tel"
          autoComplete="tel"
        />
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
                tags.includes(t.key)
                  ? "bg-emerald-600 text-white ring-emerald-600"
                  : "bg-white text-gray-600 ring-gray-200 hover:bg-gray-50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={telegram}
          onChange={(e) => setTelegram(e.target.checked)}
          className="h-4 w-4 accent-emerald-600"
        />
        Telegram bot ulangan
      </label>

      {!initial && (
        <>
          <div className="border-t border-gray-100 pt-3">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
              Birinchi nasiya (ixtiyoriy)
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="Summa" error={debtError}>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={debtAmount}
                    onChange={(e) => onAmountChange(e.target.value)}
                    className={`${fieldClass} w-full pr-12`}
                    placeholder="0"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                    so'm
                  </span>
                </div>
              </Field>

              {/* Olingan sana va to'lov muddati bir qatorda */}
              <Field label="Olingan sana">
                <input
                  type="date"
                  value={debtDate}
                  onChange={(e) => setDebtDate(e.target.value)}
                  className={`${fieldClass} w-full`}
                />
              </Field>
              <Field label="To'lov muddati">
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className={`${fieldClass} w-full`}
                />
              </Field>
            </div>
            <div className="mt-3">
              <Field label="Mahsulotlar (vergul bilan)">
                <input
                  value={items}
                  onChange={(e) => setItems(e.target.value)}
                  className={`${fieldClass} w-full`}
                  placeholder="cola, non"
                />
              </Field>
            </div>
          </div>
        </>
      )}

      <FormButtons
        onCancel={onCancel}
        onSave={submit}
        disabled={!!nameError || !isValidMobile(phone) || !!debtError}
      />
    </div>
  );
}

/* ============================ PaymentForm ============================ */

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
    amount === ""
      ? ""
      : value <= 0
        ? "Summa 0 dan katta bo'lsin"
        : value > balance
          ? `Summa qoldiqdan (${formatMoney(balance)}) katta bo'lmasin`
          : value > MAX_AMOUNT
            ? `Maksimal summa: ${formatMoney(MAX_AMOUNT)}`
            : "";

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Joriy qarz qoldig'i: <span className="font-semibold text-gray-900">{formatMoney(balance)}</span>
      </p>
      <Field label="To'lov summasi" error={error}>
        <div className="relative">
          <input
            type="text"
            inputMode="numeric"
            value={amount}
            onChange={(e) => setAmount(formatAmountInput(e.target.value, Math.min(balance, MAX_AMOUNT)))}
            className={`${fieldClass} w-full pr-12`}
            placeholder="0"
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
            so'm
          </span>
        </div>
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

/* ============================ DebtForm ============================ */

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
  const amountError =
    amount !== "" && value <= 0
      ? "Summa 0 dan katta bo'lsin"
      : value > MAX_AMOUNT
        ? `Maksimal summa: ${formatMoney(MAX_AMOUNT)}`
        : "";

  return (
    <div className="space-y-4">
      <Field label="Nasiya summasi" error={amountError}>
        <div className="relative">
          <input
            type="text"
            inputMode="numeric"
            value={amount}
            onChange={(e) => setAmount(formatAmountInput(e.target.value, MAX_AMOUNT))}
            className={`${fieldClass} w-full pr-12`}
            placeholder="0"
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
            so'm
          </span>
        </div>
      </Field>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Olingan sana">
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
        disabled={value <= 0 || !!amountError}
      />
    </div>
  );
}

/* ============================ MessageForm ============================ */

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

/* ============================ HistoryView ============================ */

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
        <ul className="max-h-72 space-y-2 overflow-y-auto">
          {entries.map((e) => (
            <li key={e.id} className="flex items-start justify-between gap-3 rounded-lg border border-gray-100 px-3 py-2">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${LABEL[e.kind].cls}`}>{LABEL[e.kind].text}</span>
                  <span className="text-xs text-gray-500">{formatDate(e.date)}</span>
                  {e.kind !== "message" && <span className="text-sm font-medium text-gray-800">{formatMoney(e.amount)}</span>}
                </div>
                {e.note && <p className="mt-1 truncate text-xs text-gray-500">{e.note}</p>}
                {e.dueDate && <p className="mt-0.5 text-xs text-gray-400">Muddat: {formatDate(e.dueDate)}</p>}
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-end gap-2 border-t border-gray-100 pt-3">
        <button type="button" onClick={onEdit} className={secondaryBtn}>
          Tahrirlash
        </button>
        <button type="button" onClick={onDelete} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
          O'chirish
        </button>
      </div>
    </div>
  );
}
