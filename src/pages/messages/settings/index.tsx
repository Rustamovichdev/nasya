import { useState } from "react";
import {
  Settings2,
  Bot,
  Shield,
  Bell,
  Cloud,
  Save,
} from "lucide-react";
import ThemeModeSection from "./components/ThemeMode";
import LanguageCurrencySection from "./components/LanguageCurrency";
import BotSetupSection from "./components/BotSetup";
import AutoActionsAndSide from "./components/AutoActionsAndSide";

type TabId =
  | "general"
  | "telegram"
  | "security"
  | "notifications"
  | "backup";

const tabs: { id: TabId; label: string; icon: typeof Settings2 }[] = [
  { id: "general", label: "Umumiy sozlamalar", icon: Settings2 },
  { id: "telegram", label: "Telegram Bot Integratsiyasi", icon: Bot },
  { id: "security", label: "Xavfsizlik & PIN-kod", icon: Shield },
  { id: "notifications", label: "Bildirishnomalar (SMS & Bot)", icon: Bell },
  { id: "backup", label: "Zaxira nusxa (Backup)", icon: Cloud },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState<TabId>("telegram");

  return (
    <div className="min-h-full bg-[#f5f7fb] p-5 md:p-6">
      {/* Page header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold tracking-tight text-slate-800 md:text-[24px]">
            Tizim Sozlamalari
          </h1>
          <p className="mt-1 max-w-2xl text-[13px] leading-relaxed text-slate-500">
            Qarz daftari, Telegram bildirishnomalari, Bot, Virtual valyuta va
            Hisob-kitob qoidalarini sozlang
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm transition hover:bg-emerald-700"
        >
          <Save size={15} />
          O'zgarishlarni saqlash
        </button>
      </div>

      {/* Tabs */}
      <div className="mb-6 overflow-x-auto">
        <div className="inline-flex min-w-full gap-1 rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-2 text-[12.5px] font-medium transition ${
                  active
                    ? "bg-emerald-50 text-emerald-700 shadow-sm"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      {activeTab === "telegram" && (
        <div className="space-y-5">
          {/* 1-qism: Mavzu */}
          <ThemeModeSection />

          {/* 2-qism: Til va valyuta */}
          <LanguageCurrencySection />

          {/* 3-qism: Bot sozlash (alohida TSX) */}
          <BotSetupSection />

          {/* 4-qism: Avtomatik harakatlar + yon panel */}
          <AutoActionsAndSide />
        </div>
      )}

      {activeTab === "general" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <Settings2 className="mx-auto mb-3 text-slate-300" size={36} />
          <h3 className="text-[15px] font-semibold text-slate-700">
            Umumiy sozlamalar
          </h3>
          <p className="mt-1 text-[13px] text-slate-500">
            Bu bo'lim tez orada to'ldiriladi.
          </p>
        </div>
      )}

      {activeTab === "security" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <Shield className="mx-auto mb-3 text-slate-300" size={36} />
          <h3 className="text-[15px] font-semibold text-slate-700">
            Xavfsizlik & PIN-kod
          </h3>
          <p className="mt-1 text-[13px] text-slate-500">
            PIN-kod va xavfsizlik sozlamalari tez orada qo'shiladi.
          </p>
        </div>
      )}

      {activeTab === "notifications" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <Bell className="mx-auto mb-3 text-slate-300" size={36} />
          <h3 className="text-[15px] font-semibold text-slate-700">
            Bildirishnomalar (SMS & Bot)
          </h3>
          <p className="mt-1 text-[13px] text-slate-500">
            SMS va bot bildirishnomalari sozlamalari tez orada qo'shiladi.
          </p>
        </div>
      )}

      {activeTab === "backup" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <Cloud className="mx-auto mb-3 text-slate-300" size={36} />
          <h3 className="text-[15px] font-semibold text-slate-700">
            Zaxira nusxa (Backup)
          </h3>
          <p className="mt-1 text-[13px] text-slate-500">
            Zaxira nusxa olish va tiklash funksiyalari tez orada qo'shiladi.
          </p>
        </div>
      )}
    </div>
  );
};

export default Settings;
