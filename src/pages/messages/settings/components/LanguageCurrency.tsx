import { useState } from "react";
import { Globe, Hash, ChevronDown } from "lucide-react";

const LanguageCurrencySection = () => {
  const [lang, setLang] = useState("uz");
  const [numberFormat, setNumberFormat] = useState("uz");
  const [currencyFormat, setCurrencyFormat] = useState("uzs");

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
          <Globe size={16} />
        </div>
        <div>
          <h3 className="text-[15px] font-semibold text-slate-800">
            Bova til (Tilni o'zgartirish)
          </h3>
          <p className="mt-0.5 text-[12.5px] text-slate-500">
            Interfeys tilini va sonlar / valyuta ko'rinishini sozlang
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Til */}
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-slate-600">
            Interfeys tili
          </label>
          <div className="relative">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 pr-9 text-[13px] text-slate-700 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
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

        {/* Raqam formati */}
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-slate-600">
            Raqam formati
          </label>
          <div className="relative">
            <select
              value={numberFormat}
              onChange={(e) => setNumberFormat(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 pr-9 text-[13px] text-slate-700 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
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

      {/* Raqamlar va valyuta formati */}
      <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50/70 p-4">
        <div className="mb-3 flex items-center gap-2">
          <Hash size={14} className="text-slate-500" />
          <p className="text-[13px] font-medium text-slate-700">
            Raqamlar va valyuta ko'rinishi
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-[11.5px] text-slate-500">
              Valyuta belgisi
            </label>
            <select
              value={currencyFormat}
              onChange={(e) => setCurrencyFormat(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-700 outline-none focus:border-emerald-400"
            >
              <option value="uzs">so'm (UZS)</option>
              <option value="usd">$ (USD)</option>
              <option value="eur">€ (EUR)</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-[11.5px] text-slate-500">
              Namuna
            </label>
            <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] font-medium text-slate-700">
              12 450 000 so'm
            </div>
          </div>
          <div>
            <label className="mb-1 block text-[11.5px] text-slate-500">
              Kasr qismi
            </label>
            <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-700">
              2 xona
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LanguageCurrencySection;
