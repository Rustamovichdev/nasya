import { useEffect, useState } from "react";
import { Globe, Hash, ChevronDown, CheckCircle2 } from "lucide-react";

const LanguageCurrencySection = () => {
  const [lang, setLang] = useState(
    () => localStorage.getItem("app-lang") || "uz"
  );
  const [numberFormat, setNumberFormat] = useState(
    () => localStorage.getItem("number-format") || "uz"
  );
  const [currencyFormat, setCurrencyFormat] = useState(
    () => localStorage.getItem("currency-format") || "uzs"
  );
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    localStorage.setItem("app-lang", lang);
    localStorage.setItem("number-format", numberFormat);
    localStorage.setItem("currency-format", currencyFormat);
    setSaved(true);
    const t = setTimeout(() => setSaved(false), 1500);
    return () => clearTimeout(t);
  }, [lang, numberFormat, currencyFormat]);

  const preview =
    currencyFormat === "usd"
      ? "$12,450.00"
      : currencyFormat === "eur"
        ? "€12 450,00"
        : numberFormat === "en"
          ? "12,450,000 so'm"
          : "12 450 000 so'm";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400">
            <Globe size={16} />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-slate-800 dark:text-slate-100">
              Bova til (Tilni o'zgartirish)
            </h3>
            <p className="mt-0.5 text-[12.5px] text-slate-500 dark:text-slate-400">
              Interfeys tilini va sonlar / valyuta ko'rinishini sozlang
            </p>
          </div>
        </div>
        {saved && (
          <span className="inline-flex items-center gap-1 text-[11.5px] font-medium text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 size={13} />
            Saqlandi
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-slate-600 dark:text-slate-300">
            Interfeys tili
          </label>
          <div className="relative">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 pr-9 text-[13px] text-slate-700 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:focus:border-emerald-500"
            >
              <option value="uz">O'zbekcha (Lotin)</option>
              <option value="uz-cyrl">Ўзбекча (Кирил)</option>
              <option value="ru">Русский</option>
              <option value="en">English</option>
            </select>
            <ChevronDown
              size={15}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-slate-600 dark:text-slate-300">
            Raqam formati
          </label>
          <div className="relative">
            <select
              value={numberFormat}
              onChange={(e) => setNumberFormat(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 pr-9 text-[13px] text-slate-700 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:focus:border-emerald-500"
            >
              <option value="uz">1 234 567,89 (O'zbek)</option>
              <option value="en">1,234,567.89 (International)</option>
              <option value="ru">1 234 567,89 (Rus)</option>
            </select>
            <ChevronDown
              size={15}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-600 dark:bg-slate-700/50">
        <div className="mb-3 flex items-center gap-2">
          <Hash size={14} className="text-slate-500 dark:text-slate-400" />
          <p className="text-[13px] font-medium text-slate-700 dark:text-slate-200">
            Raqamlar va valyuta ko'rinishi
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-[11.5px] text-slate-500 dark:text-slate-400">
              Valyuta belgisi
            </label>
            <select
              value={currencyFormat}
              onChange={(e) => setCurrencyFormat(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-700 outline-none focus:border-emerald-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="uzs">so'm (UZS)</option>
              <option value="usd">$ (USD)</option>
              <option value="eur">€ (EUR)</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-[11.5px] text-slate-500 dark:text-slate-400">
              Namuna
            </label>
            <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] font-medium text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100">
              {preview}
            </div>
          </div>
          <div>
            <label className="mb-1 block text-[11.5px] text-slate-500 dark:text-slate-400">
              Kasr qismi
            </label>
            <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100">
              2 xona
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LanguageCurrencySection;
