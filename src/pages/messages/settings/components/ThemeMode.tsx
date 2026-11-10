import { useState } from "react";
import { Sun, Moon, Monitor, Eye } from "lucide-react";

type ThemeMode = "classic" | "dark" | "system";

const ThemeModeSection = () => {
  const [mode, setMode] = useState<ThemeMode>("classic");
  const [eyeProtect, setEyeProtect] = useState(true);

  const modes = [
    {
      id: "classic" as ThemeMode,
      title: "Klassik rejim",
      desc: "Yorug' interfeys",
      icon: Sun,
    },
    {
      id: "dark" as ThemeMode,
      title: "Tungi rejim",
      desc: "Qorong'u interfeys",
      icon: Moon,
    },
    {
      id: "system" as ThemeMode,
      title: "Tizimga mos",
      desc: "Qurilma sozlamasi",
      icon: Monitor,
    },
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-[15px] font-semibold text-slate-800">
          Mavzu (Tungi va kunduzgi rejim)
        </h3>
        <p className="mt-1 text-[12.5px] text-slate-500">
          Ko'z charchog'ini kamaytirish va eng qulay interfeysni tanlang
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {modes.map((item) => {
          const Icon = item.icon;
          const active = mode === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setMode(item.id)}
              className={`flex flex-col items-start gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                active
                  ? "border-emerald-500 bg-emerald-50/80 shadow-sm"
                  : "border-slate-200 bg-slate-50/50 hover:border-slate-300"
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  active ? "bg-emerald-500 text-white" : "bg-white text-slate-500"
                }`}
              >
                <Icon size={18} />
              </div>
              <div>
                <p
                  className={`text-[13.5px] font-semibold ${
                    active ? "text-emerald-700" : "text-slate-700"
                  }`}
                >
                  {item.title}
                </p>
                <p className="mt-0.5 text-[11.5px] text-slate-500">{item.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm">
            <Eye size={16} />
          </div>
          <div>
            <p className="text-[13px] font-medium text-slate-700">
              Ko'z qorachig'ini himoya (Qorong'u kontrast)
            </p>
            <p className="text-[11.5px] text-slate-500">
              Tungi rejimda kontrastni avtomatik sozlaydi
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setEyeProtect((v) => !v)}
          className={`relative h-6 w-11 rounded-full transition-colors ${
            eyeProtect ? "bg-emerald-500" : "bg-slate-300"
          }`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
              eyeProtect ? "translate-x-5" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>
    </section>
  );
};

export default ThemeModeSection;
