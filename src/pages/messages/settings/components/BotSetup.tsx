import { useState } from "react";
import {
  Bot,
  Send,
  RefreshCw,
  Key,
  CheckCircle2,
  AlertCircle,
  Copy,
  Eye,
  EyeOff,
} from "lucide-react";

const BotSetupSection = () => {
  const [botUsername] = useState("@qarz_daftari_official_bot");
  const [token, setToken] = useState("7123456789:AAHxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
  const [showToken, setShowToken] = useState(false);
  const [status, setStatus] = useState<"connected" | "error" | "idle">("connected");
  const [testing, setTesting] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleTest = () => {
    setTesting(true);
    setTimeout(() => {
      setTesting(false);
      setStatus("connected");
    }, 1200);
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setStatus("connected");
    }, 1000);
  };

  const copyToken = () => {
    navigator.clipboard?.writeText(token);
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm">
            <Bot size={18} />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-slate-800">
              TelegramBotni sozlash va o'zgartirish
            </h3>
            <p className="mt-0.5 text-[12.5px] text-slate-500">
              Mijozlar bilan gaplashish, avtomatik eslatmalar yuborish uchun botni ulang
            </p>
          </div>
        </div>
        <div
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11.5px] font-semibold ${
            status === "connected"
              ? "bg-emerald-50 text-emerald-700"
              : status === "error"
                ? "bg-red-50 text-red-600"
                : "bg-slate-100 text-slate-600"
          }`}
        >
          {status === "connected" ? (
            <CheckCircle2 size={13} />
          ) : (
            <AlertCircle size={13} />
          )}
          {status === "connected" ? "Ulangan" : status === "error" ? "Xatolik" : "Kutilmoqda"}
        </div>
      </div>

      {/* Bot username card */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3.5">
        <div>
          <p className="text-[11.5px] font-medium uppercase tracking-wide text-emerald-600/80">
            Bot foydalanuvchi nomi
          </p>
          <p className="mt-0.5 text-[15px] font-semibold text-emerald-800">
            {botUsername}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleTest}
            disabled={testing}
            className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-white px-3 py-2 text-[12.5px] font-medium text-emerald-700 shadow-sm transition hover:bg-emerald-50 disabled:opacity-60"
          >
            <Send size={14} className={testing ? "animate-pulse" : ""} />
            {testing ? "Yuborilmoqda..." : "Test xabar yuborish"}
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-[12.5px] font-medium text-white shadow-sm transition hover:bg-emerald-700"
          >
            <RefreshCw size={14} />
            Botni yangilash
          </button>
        </div>
      </div>

      {/* Token */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-[12.5px] font-medium text-slate-600">
          <Key size={14} />
          Telegram Bot API Token (BotFather dan)
        </label>
        <div className="relative">
          <input
            type={showToken ? "text" : "password"}
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="123456789:AAHxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-3.5 pr-20 text-[13px] text-slate-700 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
          />
          <div className="absolute right-2 top-1/2 flex -translate-y-1/2 gap-1">
            <button
              type="button"
              onClick={() => setShowToken((v) => !v)}
              className="rounded-md p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-600"
              title={showToken ? "Yashirish" : "Ko'rsatish"}
            >
              {showToken ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
            <button
              type="button"
              onClick={copyToken}
              className="rounded-md p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-600"
              title="Nusxa olish"
            >
              <Copy size={15} />
            </button>
          </div>
        </div>
        <p className="text-[11.5px] text-slate-500">
          Tokenni BotFather orqali oling. Tokenni hech kimga bermang.
        </p>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-60"
        >
          {saving ? (
            <>
              <RefreshCw size={15} className="animate-spin" />
              Saqlanmoqda...
            </>
          ) : (
            "O'zgarishlarni saqlash"
          )}
        </button>
      </div>
    </section>
  );
};

export default BotSetupSection;
