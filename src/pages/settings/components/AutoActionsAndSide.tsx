import { useEffect, useState } from "react";
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
  CheckCircle2,
} from "lucide-react";

const AutoActionsAndSide = () => {
  const [reminders, setReminders] = useState(
    () => localStorage.getItem("bot-reminders") !== "false"
  );
  const [reports, setReports] = useState(
    () => localStorage.getItem("bot-reports") !== "false"
  );
  const [adminAccess, setAdminAccess] = useState(
    () => localStorage.getItem("bot-admin") === "true"
  );

  const [currency, setCurrency] = useState(
    () => localStorage.getItem("main-currency") || "UZS"
  );
  const [rate, setRate] = useState(
    () => localStorage.getItem("usd-rate") || "12850"
  );
  const [rateMsg, setRateMsg] = useState("");
  const [backupMsg, setBackupMsg] = useState("");

  useEffect(() => {
    localStorage.setItem("bot-reminders", String(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem("bot-reports", String(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem("bot-admin", String(adminAccess));
  }, [adminAccess]);

  useEffect(() => {
    localStorage.setItem("main-currency", currency);
  }, [currency]);

  const updateRate = () => {
    localStorage.setItem("usd-rate", rate);
    setRateMsg("Kurs yangilandi ✓");
    setTimeout(() => setRateMsg(""), 2000);
  };

  const downloadBackup = () => {
    setBackupMsg("Yuklab olish boshlandi...");
    setTimeout(() => setBackupMsg("Zaxira tayyor ✓"), 1500);
    setTimeout(() => setBackupMsg(""), 3500);
  };

  const createCloudBackup = () => {
    setBackupMsg("Cloud zaxira yaratilmoqda...");
    setTimeout(() => setBackupMsg("Cloud zaxira saqlandi ✓"), 1800);
    setTimeout(() => setBackupMsg(""), 4000);
  };

  return (
    <div className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-3">
      {/* Left: Automatic actions */}
      <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 dark:border-slate-700 dark:bg-slate-800 xl:col-span-2">
        <div className="mb-4">
          <h3 className="text-[15px] font-semibold text-slate-800 dark:text-slate-100">
            Bot orqali avtomatik harakatlar
          </h3>
          <p className="mt-1 text-[12.5px] text-slate-500 dark:text-slate-400">
            Qaysi harakatlar bot orqali avtomatik bajarilishini tanlang
          </p>
        </div>

        <div className="space-y-3 overflow-hidden">
          {/* Toggle 1 */}
          <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-3.5 sm:px-4 dark:border-slate-600 dark:bg-slate-700/50">
            <div className="flex min-w-0 flex-1 items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm dark:bg-slate-600 dark:text-emerald-400">
                <Bell size={16} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium leading-snug text-slate-700 sm:text-[13.5px] dark:text-slate-200">
                  Qarz to'lov eslatmalari bot orqali avtomatik yuborilsin
                </p>
                <p className="mt-0.5 text-[11.5px] leading-snug text-slate-500 sm:text-[12px] dark:text-slate-400">
                  To'lov muddati yaqinlashganda mijozga xabar yuboriladi
                </p>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={reminders}
              onClick={() => setReminders((v) => !v)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 ${
                reminders ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-500"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-200 ease-in-out ${
                  reminders ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Toggle 2 */}
          <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-3.5 sm:px-4 dark:border-slate-600 dark:bg-slate-700/50">
            <div className="flex min-w-0 flex-1 items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm dark:bg-slate-600 dark:text-blue-400">
                <FileText size={16} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium leading-snug text-slate-700 sm:text-[13.5px] dark:text-slate-200">
                  Mijozlarga hisobot chiqarish (PDF/Excel formatida)
                </p>
                <p className="mt-0.5 text-[11.5px] leading-snug text-slate-500 sm:text-[12px] dark:text-slate-400">
                  Oy oxirida yoki so'rov bo'yicha hisobot yuboriladi
                </p>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={reports}
              onClick={() => setReports((v) => !v)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 ${
                reports ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-500"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-200 ease-in-out ${
                  reports ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Toggle 3 */}
          <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-3.5 sm:px-4 dark:border-slate-600 dark:bg-slate-700/50">
            <div className="flex min-w-0 flex-1 items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-amber-600 shadow-sm dark:bg-slate-600 dark:text-amber-400">
                <Shield size={16} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium leading-snug text-slate-700 sm:text-[13.5px] dark:text-slate-200">
                  Admin bot orqali yangi kirishlar imkoniyati
                </p>
                <p className="mt-0.5 text-[11.5px] leading-snug text-slate-500 sm:text-[12px] dark:text-slate-400">
                  Bot orqali admin buyruqlarini ishlatish mumkin
                </p>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={adminAccess}
              onClick={() => setAdminAccess((v) => !v)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 ${
                adminAccess ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-500"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-200 ease-in-out ${
                  adminAccess ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 rounded-xl border border-amber-100 bg-amber-50/70 px-4 py-3 text-[12.5px] text-amber-800 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-300">
          <span className="font-medium">Eslatma:</span>
          Sozlamalar o'zgargandan so'ng Telegram botga qayta ulanish kerak.
        </div>
      </section>

      {/* Right column */}
      <div className="flex flex-col gap-5">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="mb-4 flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400">
              <Wallet size={16} />
            </div>
            <div>
              <h3 className="text-[14px] font-semibold text-slate-800 dark:text-slate-100">
                Valyuta & Hisob-kitob
              </h3>
              <p className="text-[11.5px] text-slate-500 dark:text-slate-400">
                Asosiy hisob valyutasi
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-[11.5px] text-slate-500 dark:text-slate-400">
                Valyuta
              </label>
              <div className="relative">
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 pr-8 text-[13px] text-slate-700 outline-none focus:border-emerald-400 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
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
              <label className="mb-1 block text-[11.5px] text-slate-500 dark:text-slate-400">
                1 USD = ? so'm
              </label>
              <input
                type="text"
                value={rate}
                onChange={(e) => setRate(e.target.value.replace(/[^\d]/g, ""))}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-[13px] text-slate-700 outline-none focus:border-emerald-400 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
              />
            </div>
            <button
              type="button"
              onClick={updateRate}
              className="w-full rounded-xl border border-slate-200 bg-white py-2 text-[12.5px] font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
            >
              Kursni yangilash
            </button>
            {rateMsg && (
              <p className="flex items-center gap-1 text-[12px] font-medium text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 size={13} />
                {rateMsg}
              </p>
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="mb-4 flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
              <Cloud size={16} />
            </div>
            <div>
              <h3 className="text-[14px] font-semibold text-slate-800 dark:text-slate-100">
                Zaxira / Nusxa
              </h3>
              <p className="text-[11.5px] text-slate-500 dark:text-slate-400">
                Oxirgi zaxira: 2 soat oldin
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-[12.5px] dark:bg-slate-700/60">
              <span className="text-slate-600 dark:text-slate-300">Ma'lumotlar hajmi</span>
              <span className="font-medium text-slate-800 dark:text-slate-100">34.2 MB</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-[12.5px] dark:bg-slate-700/60">
              <span className="text-slate-600 dark:text-slate-300">Yozuvlar soni</span>
              <span className="font-medium text-slate-800 dark:text-slate-100">12 458</span>
            </div>
            <button
              type="button"
              onClick={downloadBackup}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800 py-2.5 text-[12.5px] font-medium text-white transition hover:bg-slate-900 dark:bg-slate-600 dark:hover:bg-slate-500"
            >
              <Download size={14} />
              JSON / Excel yuklab olish
            </button>
            <button
              type="button"
              onClick={createCloudBackup}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-[12.5px] font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
            >
              <RefreshCw size={14} />
              Zaxira yaratish (Cloud)
            </button>
            {backupMsg && (
              <p className="flex items-center gap-1 text-[12px] font-medium text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 size={13} />
                {backupMsg}
              </p>
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="mb-3 flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400">
              <Database size={16} />
            </div>
            <div>
              <h3 className="text-[14px] font-semibold text-slate-800 dark:text-slate-100">
                Ma'lumotlar (Bildirish)
              </h3>
            </div>
          </div>
          <p className="text-[12.5px] leading-relaxed text-slate-500 dark:text-slate-400">
            Bot orqali yuborilgan xabarlar va tizim loglari bu yerda saqlanadi.
            Kerak bo'lsa, sozlamalardan tozalashingiz mumkin.
          </p>
          <button
            type="button"
            className="mt-3 w-full rounded-xl border border-slate-200 py-2 text-[12.5px] font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            Loglarni ko'rish
          </button>
        </section>
      </div>
    </div>
  );
};

export default AutoActionsAndSide;
