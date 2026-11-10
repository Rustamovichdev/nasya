
import { useEffect, useState, type FormEvent } from "react";
import { NavLink } from "react-router-dom";
import {
  BookOpen, LayoutDashboard, Users, Wallet, MessageSquare,
  PhoneCall, Settings, Plus, Store, X, MapPin, User, Phone,
  ChevronDown, Check, AlertCircle, CheckCircle2, Map,
} from "lucide-react";

import {
  MapContainer, TileLayer, Marker, useMapEvents,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

interface StoreData {
  id: number;
  name: string;
  owner: string;
  phone: string;
  address: string;
  type: string;
  latitude: number | null;
  longitude: number | null;
}

interface StoreForm {
  name: string;
  owner: string;
  phone: string;
  address: string;
  type: string;
}

type FormErrors = Partial<Record<keyof StoreForm, string>>;

const initialForm: StoreForm = {
  name: "", owner: "", phone: "", address: "", type: "",
};

const menuItems = [
  { title: "Boshqaruv paneli", path: "/dashboard", icon: LayoutDashboard },
  { title: "Mijozlar & Qarzdorlar", path: "/debts-customers", icon: Users },
  { title: "Kirim & Chiqim", path: "/cashflow", icon: Wallet },
  { title: "SMS Xabarnomalar", path: "/messages", icon: MessageSquare },
  { title: "Ovozli qo'ng'iroqlar", path: "/voice-calls", icon: PhoneCall },
  { title: "Sozlamalar & Bot", path: "/settings", icon: Settings },
];

const normalizePhone = (value: string) => {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("998")) digits = digits.slice(3);
  return digits.slice(0, 9);
};

const formatPhone = (value: string) => {
  const digits = normalizePhone(value);
  if (!digits) return "";

  return `+998 ${digits.slice(0, 2)}${
    digits.length > 2 ? " " + digits.slice(2, 5) : ""
  }${digits.length > 5 ? " " + digits.slice(5, 7) : ""}${
    digits.length > 7 ? " " + digits.slice(7, 9) : ""
  }`;
};

interface MapPickerProps {
  position: [number, number] | null;
  onPick: (lat: number, lng: number) => void;
}

const MapPicker = ({ position, onPick }: MapPickerProps) => {
  useMapEvents({
    click(event) {
      onPick(event.latlng.lat, event.latlng.lng);
    },
  });

  return position ? <Marker position={position} /> : null;
};

const Sidebar = () => {
  const [stores, setStores] = useState<StoreData[]>(() => {
    try {
      const saved = localStorage.getItem("qarzdaftar_stores");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedStore, setSelectedStore] = useState<number | null>(() => {
    const saved = localStorage.getItem("qarzdaftar_selected_store");
    return saved ? Number(saved) : null;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [mapLoading, setMapLoading] = useState(false);
  const [form, setForm] = useState<StoreForm>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [mapPosition, setMapPosition] =
    useState<[number, number] | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  const currentStore = stores.find(
    (store) => store.id === selectedStore
  );

  useEffect(() => {
    localStorage.setItem("qarzdaftar_stores", JSON.stringify(stores));
  }, [stores]);

  useEffect(() => {
    if (
      selectedStore !== null &&
      stores.some((store) => store.id === selectedStore)
    ) {
      localStorage.setItem(
        "qarzdaftar_selected_store",
        String(selectedStore)
      );
    } else {
      localStorage.removeItem("qarzdaftar_selected_store");
    }
  }, [selectedStore, stores]);

  const closeModal = () => {
    setIsModalOpen(false);
    setMapOpen(false);
    setForm(initialForm);
    setErrors({});
    setSubmitted(false);
    setMapPosition(null);
  };

  useEffect(() => {
    if (!isModalOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (mapOpen) setMapOpen(false);
        else closeModal();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isModalOpen, mapOpen]);

  const validateField = (
    field: keyof StoreForm,
    value: string
  ): string => {
    const clean = value.trim();

    switch (field) {
      case "name":
        if (!clean) return "Magazin nomini kiriting";
        if (clean.length < 2) return "Kamida 2 ta belgi kiriting";
        if (clean.length > 50) return "50 ta belgidan oshmasin";
        if (stores.some(s => s.name.toLowerCase() === clean.toLowerCase()))
          return "Bu nomdagi magazin mavjud";
        return "";

      case "owner":
        if (!clean) return "Magazin egasining ismini kiriting";
        if (clean.length < 3) return "Kamida 3 ta belgi kiriting";
        if (!/^[\p{L}\s'-]+$/u.test(clean))
          return "Faqat harflardan foydalaning";
        return "";

      case "phone":
        if (!clean) return "Telefon raqamini kiriting";
        if (normalizePhone(clean).length !== 9)
          return "Telefon raqami 9 ta raqamdan iborat bo‘lsin";
        return "";

      case "address":
        if (!clean) return "Magazin manzilini kiriting";
        if (clean.length < 5) return "Manzil juda qisqa";
        if (clean.length > 120) return "120 ta belgidan oshmasin";
        return "";

      case "type":
        if (!clean) return "Magazin turini tanlang";
        return "";

      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    (Object.keys(form) as (keyof StoreForm)[]).forEach(field => {
      const error = validateField(field, form[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof StoreForm, value: string) => {
    if (field === "phone") value = normalizePhone(value);
    if (field === "owner")
      value = value.replace(/[^\p{L}\s'-]/gu, "");

    setForm(prev => ({ ...prev, [field]: value }));

    if (submitted || errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: validateField(field, value),
      }));
    }
  };

  const selectMapLocation = async (lat: number, lng: number) => {
    setMapPosition([lat, lng]);
    setMapLoading(true);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );

      if (!response.ok) throw new Error("Manzil topilmadi");

      const data = await response.json();
      const address =
        data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;

      handleChange("address", address.slice(0, 120));
    } catch {
      handleChange("address", `${lat.toFixed(6)}, ${lng.toFixed(6)}`);
    } finally {
      setMapLoading(false);
    }
  };

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    if (!validateForm()) return;

    const newStore: StoreData = {
      id: Date.now(),
      name: form.name.trim(),
      owner: form.owner.trim(),
      phone: formatPhone(form.phone),
      address: form.address.trim(),
      type: form.type,
      latitude: mapPosition?.[0] ?? null,
      longitude: mapPosition?.[1] ?? null,
    };

    setStores(prev => [...prev, newStore]);
    setSelectedStore(newStore.id);
    closeModal();
    setSuccessMessage("Magazin muvaffaqiyatli qo‘shildi!");

    window.setTimeout(() => setSuccessMessage(""), 3000);
  };

  const renderInput = (
    field: keyof StoreForm,
    label: string,
    placeholder: string,
    Icon: typeof Store,
    maxLength?: number
  ) => {
    const hasError = Boolean(errors[field]);
    const isValid =
      submitted && !hasError && Boolean(form[field].trim());

    return (
      <div className="mb-[18px] flex flex-col gap-[9px]">
        <label
          htmlFor={`store-${field}`}
          className="text-[13px] font-semibold text-[#40516c]"
        >
          {label}
        </label>

        <div className={`flex h-[46px] w-full items-center gap-[10px] rounded-[10px] border px-3 transition ${
          hasError
            ? "border-red-500 bg-red-50"
            : isValid
            ? "border-emerald-500 bg-emerald-50"
            : "border-[#dfe6ef] bg-white focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100"
        }`}>
          <Icon size={18} className="shrink-0 text-[#8995aa]" />

          <input
            id={`store-${field}`}
            type="text"
            value={field === "phone" ? formatPhone(form.phone) : form[field]}
            placeholder={placeholder}
            maxLength={maxLength}
            aria-invalid={hasError}
            onChange={e => handleChange(field, e.target.value)}
            className="h-full min-w-0 flex-1 bg-transparent text-sm text-[#26364f] outline-none placeholder:text-[#a1aabc]"
          />

          {hasError && <AlertCircle size={17} className="text-red-500" />}
          {isValid && <CheckCircle2 size={17} className="text-emerald-500" />}
        </div>

        {hasError && (
          <span className="text-[11px] text-red-500">
            {errors[field]}
          </span>
        )}
      </div>
    );
  };

  return (
    <aside className="sticky top-0 z-10 flex h-screen w-[285px] min-w-[285px] flex-col overflow-hidden border-r border-[#edf0f5] bg-white px-4 py-[22px] font-[Inter,Arial,sans-serif] max-[900px]:w-[245px] max-[900px]:min-w-[245px] max-[600px]:w-[75px] max-[600px]:min-w-[75px] max-[600px]:px-[10px] max-[600px]:py-[15px]">

      {/* LOGO */}
      <div className="flex items-center gap-3 px-[10px] pb-[25px] pt-[5px] max-[600px]:justify-center max-[600px]:px-0">
        <div className="flex h-[47px] w-[47px] shrink-0 items-center justify-center rounded-[13px] bg-gradient-to-br from-[#09ac7c] to-[#008a64] text-white shadow-[0_5px_12px_#009d6f30]">
          <BookOpen size={25} />
        </div>

        <div className="max-[600px]:hidden">
          <h2 className="m-0 text-xl font-extrabold text-[#142344]">
            QarzDaftar
          </h2>
          <span className="mt-[3px] block text-[11px] text-[#8994aa]">
            Nasiya Boshqaruvi
          </span>
        </div>
      </div>

      {/* MAGAZIN */}
      <div className="mb-[25px] min-h-[54px] rounded-[13px] border border-[#e9eef4] bg-[#f7f9fc] p-[10px] max-[600px]:hidden">
        {currentStore ? (
          <div className="flex items-center gap-[7px]">
            <div className="flex min-w-0 flex-1 items-center gap-[9px]">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] bg-[#e4f7ef] text-[#009b70]">
                <Store size={19} />
              </div>
              <div className="flex min-w-0 flex-col gap-[3px]">
                <span className="text-[10px] text-[#8995aa]">
                  Tanlangan magazin
                </span>
                <strong className="truncate text-xs text-[#243653]">
                  {currentStore.name}
                </strong>
              </div>
            </div>

            <div className="relative flex h-[30px] w-[25px] shrink-0 items-center justify-center">
              <select
                value={selectedStore ?? ""}
                onChange={e => setSelectedStore(Number(e.target.value))}
                aria-label="Magazinni almashtirish"
                className="absolute inset-0 z-[2] h-full w-full cursor-pointer opacity-0"
              >
                {stores.map(store => (
                  <option key={store.id} value={store.id}>
                    {store.name}
                  </option>
                ))}
              </select>
              <ChevronDown size={15} className="pointer-events-none text-[#52627c]" />
            </div>

            <button
              className="flex h-8 w-8 min-w-8 items-center justify-center rounded-lg border-0 bg-[#e8f8f1] text-[#009b70] hover:bg-[#d5f3e6]"
              onClick={() => setIsModalOpen(true)}
              title="Yangi magazin qo‘shish"
            >
              <Plus size={19} />
            </button>
          </div>
        ) : (
          <button
            className="flex min-h-[42px] w-full items-center justify-start gap-[9px] rounded-[9px] bg-transparent px-[5px] text-[13px] font-semibold text-[#243653] hover:bg-[#eaf8f3] hover:text-[#009b70]"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={20} />
            Magazin qo‘shish
          </button>
        )}
      </div>

      {successMessage && (
        <div className="mb-[15px] flex items-center gap-2 rounded-[10px] border border-emerald-200 bg-emerald-50 p-[11px] text-xs text-emerald-700 max-[600px]:hidden">
          <CheckCircle2 size={17} />
          {successMessage}
        </div>
      )}

      {/* MENU */}
      <div className="mb-3 px-3 text-[11px] font-bold tracking-[0.5px] text-[#a0a9b9] max-[600px]:hidden">
        ASOSIY BO' LIMLAR
      </div>

      <nav className="flex flex-col gap-[7px]">
        {menuItems.map(item => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex min-h-12 w-full items-center gap-3 rounded-[11px] px-3 text-sm font-medium no-underline transition-all max-[600px]:justify-center max-[600px]:px-0 ${
                  isActive
                    ? "bg-gradient-to-r from-[#0aa77b] to-[#008d67] font-semibold text-white shadow-[0_5px_12px_#009b7026]"
                    : "text-[#465776] hover:translate-x-[3px] hover:bg-[#effaf5] hover:text-[#009b70]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={20}
                    className={isActive ? "shrink-0 text-white" : "shrink-0 text-[#8998b2]"}
                  />
                  <span className="flex-1 whitespace-nowrap max-[600px]:hidden">
                    {item.title}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* DECORATION */}
      <div className="pointer-events-none absolute -bottom-[55px] -left-[45px] -z-10 h-[180px] w-[330px]">
        <div className="absolute bottom-0 left-0 h-[150px] w-[280px] rotate-[42deg] rounded-t-full bg-[#e8faf3]" />
        <div className="absolute -bottom-[35px] -left-[45px] h-[150px] w-[280px] rotate-[42deg] rounded-t-full bg-gradient-to-br from-[#c5f5e4] to-[#e6faf3]" />
      </div>

      {/* MAGAZIN MODAL */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[99999] flex h-full w-full items-center justify-center bg-slate-900/55 p-4 backdrop-blur-[3px]"
          onMouseDown={e => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-[500px] overflow-x-hidden overflow-y-auto rounded-[19px] bg-white p-[27px] shadow-[0_20px_60px_rgba(0,0,0,0.18)] max-[500px]:p-5 max-[600px]:max-h-[92vh]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="store-modal-title"
          >
            <div className="mb-[25px] flex items-start justify-between">
              <div>
                <div className="mb-[13px] flex h-[43px] w-[43px] items-center justify-center rounded-xl bg-[#e8f8f1] text-[#009b70]">
                  <Store size={22} />
                </div>
                <h2 id="store-modal-title" className="m-0 text-[22px] font-extrabold text-[#172b4d] max-[500px]:text-[19px]">
                  Yangi magazin qo‘shish
                </h2>
                <p className="mt-[6px] text-xs text-[#8994aa]">
                  Magazin ma’lumotlarini to‘ldiring
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="flex h-[34px] w-[34px] items-center justify-center rounded-lg border-0 bg-transparent text-[#26364f] hover:bg-slate-100"
                aria-label="Yopish"
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSave} noValidate>
              {renderInput("name", "Magazin nomi", "Masalan: Baraka Market", Store, 50)}
              {renderInput("owner", "Magazin egasining ismi", "Egasining to‘liq ismi", User, 60)}
              {renderInput("phone", "Telefon raqami", "+998 90 123 45 67", Phone)}
              {renderInput("address", "Magazin manzili", "Magazin joylashgan manzil", MapPin, 120)}

              <button
                type="button"
                onClick={() => setMapOpen(true)}
                className="mb-[18px] -mt-[7px] flex min-h-11 w-full items-center justify-center gap-[9px] rounded-[10px] border border-dashed border-[#00a77b] bg-[#f0fbf6] text-[13px] font-semibold text-[#009b70] transition hover:bg-[#dcf8ec]"
              >
                <Map size={18} />
                Xaritadan manzil tanlash
              </button>

              {mapPosition && (
                <p className="-mt-[10px] mb-4 flex items-center gap-[6px] text-xs text-emerald-600">
                  <CheckCircle2 size={15} />
                  Xarita orqali joy tanlandi
                </p>
              )}

              <div className="mb-[18px] flex flex-col gap-[9px]">
                <label htmlFor="store-type" className="text-[13px] font-semibold text-[#40516c]">
                  Magazin turi
                </label>

                <div className={`flex h-[46px] items-center gap-[10px] rounded-[10px] border px-3 ${
                  errors.type ? "border-red-500 bg-red-50" :
                  submitted && form.type ? "border-emerald-500 bg-emerald-50" :
                  "border-[#dfe6ef] bg-white"
                }`}>
                  <Store size={18} className="shrink-0 text-[#8995aa]" />
                  <select
                    id="store-type"
                    value={form.type}
                    onChange={e => handleChange("type", e.target.value)}
                    className="h-full min-w-0 flex-1 cursor-pointer appearance-none bg-transparent text-sm text-[#26364f] outline-none"
                  >
                    <option value="">Magazin turini tanlang</option>
                    <option value="Oziq-ovqat">Oziq-ovqat</option>
                    <option value="Kiyim-kechak">Kiyim-kechak</option>
                    <option value="Elektronika">Elektronika</option>
                    <option value="Qurilish mollari">Qurilish mollari</option>
                    <option value="Maishiy texnika">Maishiy texnika</option>
                    <option value="Boshqa">Boshqa</option>
                  </select>
                  <ChevronDown size={16} className="text-[#8995aa]" />
                </div>

                {errors.type && (
                  <span className="text-[11px] text-red-500">{errors.type}</span>
                )}
              </div>

              <div className="mt-7 flex justify-end gap-[10px] max-[600px]:flex-col-reverse">
                <button
                  type="button"
                  onClick={closeModal}
                  className="min-h-11 rounded-[10px] border border-[#dfe6ef] bg-white px-[19px] text-[13px] font-semibold text-[#40516c] hover:bg-slate-50 max-[600px]:w-full"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="flex min-h-11 items-center justify-center gap-[7px] rounded-[10px] border border-[#00a77b] bg-[#00a77b] px-[19px] text-[13px] font-semibold text-white hover:bg-[#008e68] max-[600px]:w-full"
                >
                  <Check size={17} />
                  Saqlash
                </button>
              </div>
            </form>

            {/* XARITA MODAL */}
            {mapOpen && (
              <div className="absolute inset-0 z-[50] flex items-center justify-center rounded-[19px] bg-slate-900/65 p-[14px]">
                <div className="w-full rounded-2xl bg-white p-5 shadow-[0_15px_45px_#0002] max-[600px]:p-3">
                  <div className="mb-[15px] flex items-start justify-between">
                    <div>
                      <h3 className="m-0 text-[17px] font-extrabold text-[#172b4d]">
                        Magazin joylashuvini tanlang
                      </h3>
                      <p className="mt-[5px] text-xs text-[#8994aa]">
                        Xaritadagi kerakli joyni bosing
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setMapOpen(false)}
                      className="flex h-[34px] w-[34px] items-center justify-center rounded-lg bg-slate-100"
                    >
                      <X size={21} />
                    </button>
                  </div>

                  <MapContainer
                    key={mapPosition ? mapPosition.join(",") : "default"}
                    center={mapPosition || [41.2995, 69.2401]}
                    zoom={mapPosition ? 16 : 12}
                    className="h-[350px] w-full rounded-xl max-[600px]:h-[300px]"
                    scrollWheelZoom
                  >
                    <TileLayer
                      attribution='&copy; OpenStreetMap contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapPicker position={mapPosition} onPick={selectMapLocation} />
                  </MapContainer>

                  {mapPosition && (
                    <p className="mt-3 flex items-center gap-[7px] text-xs text-[#009b70]">
                      <MapPin size={15} />
                      {mapPosition[0].toFixed(6)}, {mapPosition[1].toFixed(6)}
                    </p>
                  )}

                  <div className="mt-7 flex justify-end gap-[10px] max-[600px]:flex-wrap">
                    <button
                      type="button"
                      onClick={() => setMapOpen(false)}
                      className="min-h-11 rounded-[10px] border border-[#dfe6ef] bg-white px-[19px] text-[13px] font-semibold text-[#40516c]"
                    >
                      Bekor qilish
                    </button>
                    <button
                      type="button"
                      disabled={!mapPosition || mapLoading}
                      onClick={() => setMapOpen(false)}
                      className="flex min-h-11 items-center justify-center gap-[7px] rounded-[10px] border border-[#00a77b] bg-[#00a77b] px-[19px] text-[13px] font-semibold text-white hover:bg-[#008e68] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Check size={17} />
                      {mapLoading ? "Manzil olinmoqda..." : "Joyni tasdiqlash"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
