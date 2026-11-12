import { useState } from "react";
import {
  Bell,
  FileText,
  Shield,
  Wallet,
  Download,
  Cloud,
  Database,
  RefreshCw,
  ChevronDown,
} from "lucide-react";

const AutoActionsAndSide = () => {
  const [reminders, setReminders] = useState(true);
  const [reports, setReports] = useState(true);
  const [adminAccess, setAdminAccess] = useState(false);

  const [currency, setCurrency] = useState("UZS");
  const [rate, setRate] = useState("12850");

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
      {/* Left: Automatic actions - spans 2 */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
        <div className="mb-4">
          <h3 className="text-[15px] font-semibold text-slate-800">
            Bot orqali avtomatik harakatlar
          </h3>
          <p className="mt-1 text-[12.5px] text-slate-500">
            Qaysi harakatlar bot orqali avtomatik bajarilishini tanlang
          </p>
        </div>

        <div className="space-y-3">
          {/* Toggle 1 */}
          <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3.5">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm">
                <Bell size={16} />
              </div>
              <div>
                <p className="text-[13.5px] font-medium text-slate-700">
                  Qarz to'lov eslatmalari bot orqali avtomatik yuborilsin
                </p>
                <p className="mt-0.5 text-[12px] text-slate-500">
                  To'lov muddati yaqinlashganda mijozga xabar yuboriladi
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setReminders((v) => !v)}
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                reminders ? "bg-emerald-500" : "bg-slate-300"
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  reminders ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {/* Toggle 2 */}
          <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3.5">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                <FileText size={16} />
              </div>
              <div>
                <p className="text-[13.5px] font-medium text-slate-700">
                  Mijozlarga hisobot chiqarish (PDF/Excel formatida)
                </p>
                <p className="mt-0.5 text-[12px] text-slate-500">
                  Oy oxirida yoki so'rov bo'yicha hisobot yuboriladi
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setReports((v) => !v)}
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                reports ? "bg-emerald-500" : "bg-slate-300"
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  reports ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {/* Toggle 3 */}
          <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3.5">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-amber-600 shadow-sm">
                <Shield size={16} />
              </div>
              <div>
                <p className="text-[13.5px] font-medium text-slate-700">
                  Admin bot orqali yangi kirishlar imkoniyati
                </p>
                <p className="mt-0.5 text-[12px] text-slate-500">
                  Bot orqali admin buyruqlarini ishlatish mumkin
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setAdminAccess((v) => !v)}
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                adminAccess ? "bg-emerald-500" : "bg-slate-300"
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  adminAccess ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 rounded-xl border border-amber-100 bg-amber-50/70 px-4 py-3 text-[12.5px] text-amber-800">
          <span className="font-medium">Eslatma:</span>
          Sozlamalar o'zgargandan so'ng Telegram botga qayta ulanish kerak.
        </div>
      </section>

      {/* Right column cards */}
      <div className="flex flex-col gap-5">
        {/* Valyuta & Hisob-kitob */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <Wallet size={16} />
            </div>
            <div>
              <h3 className="text-[14px] font-semibold text-slate-800">
                Valyuta & Hisob-kitob
              </h3>
              <p className="text-[11.5px] text-slate-500">Asosiy hisob valyutasi</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-[11.5px] text-slate-500">
                Valyuta
              </label>
              <div className="relative">
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 pr-8 text-[13px] text-slate-700 outline-none focus:border-emerald-400"
                >
                  <option value="UZS">UZS — O'zbek so'mi</option>
                  <option value="USD">USD — AQSh dollari</option>
                  <option value="EUR">EUR — Yevro</option>
                </select>
                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-[11.5px] text-slate-500">
                1 USD = ? so'm
              </label>
              <input
                type="text"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-[13px] text-slate-700 outline-none focus:border-emerald-400"
              />
            </div>
            <button
              type="button"
              className="w-full rounded-xl border border-slate-200 bg-white py-2 text-[12.5px] font-medium text-slate-600 transition hover:bg-slate-50"
            >
              Kursni yangilash
            </button>
          </div>
        </section>

        {/* Zaxira / Nusxa */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Cloud size={16} />
            </div>
            <div>
              <h3 className="text-[14px] font-semibold text-slate-800">
                Zaxira / Nusxa
              </h3>
              <p className="text-[11.5px] text-slate-500">Oxirgi zaxira: 2 soat oldin</p>
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-[12.5px]">
              <span className="text-slate-600">Ma'lumotlar hajmi</span>
              <span className="font-medium text-slate-800">34.2 MB</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-[12.5px]">
              <span className="text-slate-600">Yozuvlar soni</span>
              <span className="font-medium text-slate-800">12 458</span>
            </div>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800 py-2.5 text-[12.5px] font-medium text-white transition hover:bg-slate-900"
            >
              <Download size={14} />
              JSON / Excel yuklab olish
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-[12.5px] font-medium text-slate-600 transition hover:bg-slate-50"
            >
              <RefreshCw size={14} />
              Zaxira yaratish (Cloud)
            </button>
          </div>
        </section>

        {/* Ma'lumotlar (Bildirish) */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
              <Database size={16} />
            </div>
            <div>
              <h3 className="text-[14px] font-semibold text-slate-800">
                Ma'lumotlar (Bildirish)
              </h3>
            </div>
          </div>
          <p className="text-[12.5px] leading-relaxed text-slate-500">
            Bot orqali yuborilgan xabarlar va tizim loglari bu yerda saqlanadi.
            Kerak bo'lsa, sozlamalardan tozalashingiz mumkin.
          </p>
          <button
            type="button"
            className="mt-3 w-full rounded-xl border border-slate-200 py-2 text-[12.5px] font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Loglarni ko'rish
          </button>
        </section>
      </div>
    </div>
  );
};

export default AutoActionsAndSide;
