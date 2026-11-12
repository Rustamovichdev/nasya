import { useEffect, useState } from "react";
import { Sun, Moon, Monitor, Eye } from "lucide-react";

type ThemeMode = "classic" | "dark" | "system";

const applyTheme = (mode: ThemeMode) => {
  const root = document.documentElement;
  const body = document.body;

  const enableDark = () => {
    root.classList.add("dark");
    root.style.colorScheme = "dark";
    body.style.backgroundColor = "#0f172a";
    body.style.color = "#e2e8f0";
  };

  const enableLight = () => {
    root.classList.remove("dark");
    root.style.colorScheme = "light";
    body.style.backgroundColor = "";
    body.style.color = "";
  };

  if (mode === "dark") {
    enableDark();
  } else if (mode === "classic") {
    enableLight();
  } else {
    // system
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) enableDark();
    else enableLight();
  }
};

const ThemeModeSection = () => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem("theme-mode") as ThemeMode | null;
    return saved || "classic";
  });
  const [eyeProtect, setEyeProtect] = useState(() => {
    return localStorage.getItem("eye-protect") === "true";
  });

  // Apply theme on mount and when mode changes
  useEffect(() => {
    applyTheme(mode);
    localStorage.setItem("theme-mode", mode);
  }, [mode]);

  // Listen to system preference changes when in "system" mode
  useEffect(() => {
    if (mode !== "system") return;

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme("system");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [mode]);

  // Eye protection (softer contrast / warm filter)
  useEffect(() => {
    const root = document.documentElement;
    if (eyeProtect) {
      root.classList.add("eye-protect");
      localStorage.setItem("eye-protect", "true");
    } else {
      root.classList.remove("eye-protect");
      localStorage.setItem("eye-protect", "false");
    }
  }, [eyeProtect]);

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
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-4">
        <h3 className="text-[15px] font-semibold text-slate-800 dark:text-slate-100">
          Mavzu (Tungi va kunduzgi rejim)
        </h3>
        <p className="mt-1 text-[12.5px] text-slate-500 dark:text-slate-400">
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
              onClick={() => {
                setMode(item.id);
                applyTheme(item.id);
                localStorage.setItem("theme-mode", item.id);
              }}
              className={`flex flex-col items-start gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                active
                  ? "border-emerald-500 bg-emerald-50/80 shadow-sm dark:bg-emerald-900/30 dark:border-emerald-500"
                  : "border-slate-200 bg-slate-50/50 hover:border-slate-300 dark:border-slate-600 dark:bg-slate-700/50 dark:hover:border-slate-500"
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  active
                    ? "bg-emerald-500 text-white"
                    : "bg-white text-slate-500 dark:bg-slate-600 dark:text-slate-300"
                }`}
              >
                <Icon size={18} />
              </div>
              <div>
                <p
                  className={`text-[13.5px] font-semibold ${
                    active
                      ? "text-emerald-700 dark:text-emerald-400"
                      : "text-slate-700 dark:text-slate-200"
                  }`}
                >
                  {item.title}
                </p>
                <p className="mt-0.5 text-[11.5px] text-slate-500 dark:text-slate-400">
                  {item.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3 dark:border-slate-600 dark:bg-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm dark:bg-slate-600 dark:text-slate-300">
            <Eye size={16} />
          </div>
          <div>
            <p className="text-[13px] font-medium text-slate-700 dark:text-slate-200">
              Ko'z qorachig'ini himoya (Qorong'u kontrast)
            </p>
            <p className="text-[11.5px] text-slate-500 dark:text-slate-400">
              Tungi rejimda kontrastni yumshatadi, ko'zni charchatmaydi
            </p>
          </div>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={eyeProtect}
          onClick={() => setEyeProtect((v) => !v)}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 ${
            eyeProtect ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-500"
          }`}
        >
          <span
            className={`inline-block h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-200 ease-in-out ${
              eyeProtect ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </section>
  );
};

export default ThemeModeSection;
