
import { useEffect, useState, type FormEvent } from "react";
import { NavLink } from "react-router-dom";
import {
  BookOpen,
  LayoutDashboard,
  Users,
  Wallet,
  MessageSquare,
  PhoneCall,
  Settings,
  Plus,
  Store,
  X,
  MapPin,
  User,
  Phone,
  ChevronDown,
  Check,
  AlertCircle,
  CheckCircle2,
  Map,
} from "lucide-react";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./Sidebar.css";

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
  name: "",
  owner: "",
  phone: "",
  address: "",
  type: "",
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

  if (digits.startsWith("998")) {
    digits = digits.slice(3);
  }

  return digits.slice(0, 9);
};

const formatPhone = (value: string) => {
  const digits = normalizePhone(value);

  if (!digits) return "";

  const first = digits.slice(0, 2);
  const second = digits.slice(2, 5);
  const third = digits.slice(5, 7);
  const fourth = digits.slice(7, 9);

  return `+998 ${first}${second ? " " + second : ""}${
    third ? " " + third : ""
  }${fourth ? " " + fourth : ""}`;
};

// Xarita bosilganda koordinatani olish
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

  // Ma'lumotlarni saqlash
  useEffect(() => {
    localStorage.setItem(
      "qarzdaftar_stores",
      JSON.stringify(stores)
    );
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

  // Modal ochiq paytda ESC tugmasi
  useEffect(() => {
    if (!isModalOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (mapOpen) {
          setMapOpen(false);
        } else {
          closeModal();
        }
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isModalOpen, mapOpen]);

  // Maydonlarni tekshirish
  const validateField = (
    field: keyof StoreForm,
    value: string
  ): string => {
    const clean = value.trim();

    switch (field) {
      case "name": {
        if (!clean) return "Magazin nomini kiriting";
        if (clean.length < 2) return "Kamida 2 ta belgi kiriting";
        if (clean.length > 50) return "50 ta belgidan oshmasin";

        if (
          stores.some(
            (store) =>
              store.name.toLowerCase() === clean.toLowerCase()
          )
        ) {
          return "Bu nomdagi magazin mavjud";
        }

        return "";
      }

      case "owner": {
        if (!clean) return "Magazin egasining ismini kiriting";
        if (clean.length < 3) return "Kamida 3 ta belgi kiriting";
        if (!/^[\p{L}\s'-]+$/u.test(clean)) {
          return "Faqat harflardan foydalaning";
        }
        return "";
      }

      case "phone": {
        if (!clean) return "Telefon raqamini kiriting";
        if (normalizePhone(clean).length !== 9) {
          return "Telefon raqami 9 ta raqamdan iborat bo‘lsin";
        }
        return "";
      }

      case "address": {
        if (!clean) return "Magazin manzilini kiriting";
        if (clean.length < 5) return "Manzil juda qisqa";
        if (clean.length > 120) return "120 ta belgidan oshmasin";
        return "";
      }

      case "type": {
        if (!clean) return "Magazin turini tanlang";
        return "";
      }

      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    (Object.keys(form) as (keyof StoreForm)[]).forEach((field) => {
      const error = validateField(field, form[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Input qiymatini o'zgartirish
  const handleChange = (
    field: keyof StoreForm,
    value: string
  ) => {
    if (field === "phone") {
      value = normalizePhone(value);
    }

    if (field === "owner") {
      value = value.replace(/[^\p{L}\s'-]/gu, "");
    }

    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (submitted || errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: validateField(field, value),
      }));
    }
  };

  // Xaritadan manzil olish
  const selectMapLocation = async (lat: number, lng: number) => {
    setMapPosition([lat, lng]);
    setMapLoading(true);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );

      if (!response.ok) {
        throw new Error("Manzil topilmadi");
      }

      const data = await response.json();

      const address =
        data.display_name ||
        `${lat.toFixed(6)}, ${lng.toFixed(6)}`;

      handleChange("address", address.slice(0, 120));
    } catch {
      handleChange(
        "address",
        `${lat.toFixed(6)}, ${lng.toFixed(6)}`
      );
    } finally {
      setMapLoading(false);
    }
  };

  // Magazin saqlash
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

    setStores((prev) => [...prev, newStore]);
    setSelectedStore(newStore.id);

    closeModal();

    setSuccessMessage("Magazin muvaffaqiyatli qo‘shildi!");

    window.setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMapOpen(false);
    setForm(initialForm);
    setErrors({});
    setSubmitted(false);
    setMapPosition(null);
  };

  // Input yaratish
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
      <div className="store-form-group">
        <label htmlFor={`store-${field}`}>{label}</label>

        <div
          className={`store-input-wrapper ${
            hasError ? "input-error" : ""
          } ${isValid ? "input-valid" : ""}`}
        >
          <Icon size={18} />

          <input
            id={`store-${field}`}
            type="text"
            value={
              field === "phone"
                ? formatPhone(form.phone)
                : form[field]
            }
            placeholder={placeholder}
            maxLength={maxLength}
            aria-invalid={hasError}
            onChange={(event) =>
              handleChange(field, event.target.value)
            }
          />

          {hasError && <AlertCircle size={17} />}
          {isValid && <CheckCircle2 size={17} />}
        </div>

        {hasError && (
          <span className="store-field-error">
            {errors[field]}
          </span>
        )}
      </div>
    );
  };

  return (
    <aside className="sidebar">
      {/* LOGO */}
      <div className="sidebar-brand">
        <div className="sidebar-logo">
          <BookOpen size={25} />
        </div>

        <div className="sidebar-brand-text">
          <h2>QarzDaftar</h2>
          <span>Nasiya Boshqaruvi</span>
        </div>
      </div>

      {/* MAGAZIN */}
      <div className="store-card">
        {currentStore ? (
          <div className="store-selected">
            <div className="store-selected-info">
              <div className="store-selected-icon">
                <Store size={19} />
              </div>

              <div className="store-selected-text">
                <span>Tanlangan magazin</span>
                <strong>{currentStore.name}</strong>
              </div>
            </div>

            <div className="store-switcher-wrap">
              <select
                value={selectedStore ?? ""}
                onChange={(event) =>
                  setSelectedStore(Number(event.target.value))
                }
                aria-label="Magazinni almashtirish"
              >
                {stores.map((store) => (
                  <option key={store.id} value={store.id}>
                    {store.name}
                  </option>
                ))}
              </select>

              <ChevronDown size={15} />
            </div>

            <button
              className="add-store-button store-add-small"
              onClick={() => setIsModalOpen(true)}
              title="Yangi magazin qo‘shish"
              aria-label="Yangi magazin qo‘shish"
            >
              <Plus size={19} />
            </button>
          </div>
        ) : (
          <button
            className="add-store-button store-add-first"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={20} />
            <span>Magazin qo‘shish</span>
          </button>
        )}
      </div>

      {successMessage && (
        <div className="store-success-message" role="status">
          <CheckCircle2 size={17} />
          {successMessage}
        </div>
      )}

      {/* MENU */}
      <div className="sidebar-section-title">
        ASOSIY BO'LIMLAR
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-menu-item ${isActive ? "active" : ""}`
              }
            >
              <Icon size={20} className="menu-icon" />
              <span className="menu-title">{item.title}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-decoration">
        <div className="decoration-shape shape-one"></div>
        <div className="decoration-shape shape-two"></div>
      </div>

      {/* MAGAZIN QO'SHISH MODALI */}
      {isModalOpen && (
        <div
          className="store-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            className="store-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="store-modal-title"
          >
            <div className="store-modal-header">
              <div>
                <div className="store-modal-icon">
                  <Store size={22} />
                </div>

                <h2 id="store-modal-title">
                  Yangi magazin qo‘shish
                </h2>

                <p>Magazin ma’lumotlarini to‘ldiring</p>
              </div>

              <button
                type="button"
                className="store-modal-close"
                onClick={closeModal}
                aria-label="Yopish"
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSave} noValidate>
              {renderInput(
                "name",
                "Magazin nomi",
                "Masalan: Baraka Market",
                Store,
                50
              )}

              {renderInput(
                "owner",
                "Magazin egasining ismi",
                "Egasining to‘liq ismi",
                User,
                60
              )}

              {renderInput(
                "phone",
                "Telefon raqami",
                "+998 90 123 45 67",
                Phone
              )}

              {renderInput(
                "address",
                "Magazin manzili",
                "Magazin joylashgan manzil",
                MapPin,
                120
              )}

              <button
                type="button"
                className="choose-map-button"
                onClick={() => setMapOpen(true)}
              >
                <Map size={18} />
                Xaritadan manzil tanlash
              </button>

              {mapPosition && (
                <p className="map-selected-info">
                  <CheckCircle2 size={15} />
                  Xarita orqali joy tanlandi
                </p>
              )}

              <div className="store-form-group">
                <label htmlFor="store-type">Magazin turi</label>

                <div
                  className={`store-input-wrapper store-select-wrapper ${
                    errors.type ? "input-error" : ""
                  } ${
                    submitted && !errors.type && form.type
                      ? "input-valid"
                      : ""
                  }`}
                >
                  <Store size={18} />

                  <select
                    id="store-type"
                    value={form.type}
                    onChange={(event) =>
                      handleChange("type", event.target.value)
                    }
                  >
                    <option value="">Magazin turini tanlang</option>
                    <option value="Oziq-ovqat">Oziq-ovqat</option>
                    <option value="Kiyim-kechak">Kiyim-kechak</option>
                    <option value="Elektronika">Elektronika</option>
                    <option value="Qurilish mollari">
                      Qurilish mollari
                    </option>
                    <option value="Maishiy texnika">
                      Maishiy texnika
                    </option>
                    <option value="Boshqa">Boshqa</option>
                  </select>

                  <ChevronDown size={16} />
                </div>

                {errors.type && (
                  <span className="store-field-error">
                    {errors.type}
                  </span>
                )}
              </div>

              <div className="store-modal-actions">
                <button
                  type="button"
                  className="store-cancel"
                  onClick={closeModal}
                >
                  Bekor qilish
                </button>

                <button type="submit" className="store-save">
                  <Check size={17} />
                  Saqlash
                </button>
              </div>
            </form>

            {/* XARITA */}
            {mapOpen && (
              <div className="map-modal-overlay">
                <div className="map-modal">
                  <div className="map-modal-header">
                    <div>
                      <h3>Magazin joylashuvini tanlang</h3>
                      <p>Xaritadagi kerakli joyni bosing</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setMapOpen(false)}
                    >
                      <X size={21} />
                    </button>
                  </div>

                  <MapContainer
                    key={mapPosition ? mapPosition.join(",") : "default"}
                    center={mapPosition || [41.2995, 69.2401]}
                    zoom={mapPosition ? 16 : 12}
                    className="store-map"
                    scrollWheelZoom
                  >
                    <TileLayer
                      attribution='&copy; OpenStreetMap contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <MapPicker
                      position={mapPosition}
                      onPick={selectMapLocation}
                    />
                  </MapContainer>

                  {mapPosition && (
                    <p className="map-coordinates">
                      <MapPin size={15} />
                      {mapPosition[0].toFixed(6)},{" "}
                      {mapPosition[1].toFixed(6)}
                    </p>
                  )}

                  <div className="store-modal-actions">
                    <button
                      type="button"
                      className="store-cancel"
                      onClick={() => setMapOpen(false)}
                    >
                      Bekor qilish
                    </button>

                    <button
                      type="button"
                      className="store-save"
                      disabled={!mapPosition || mapLoading}
                      onClick={() => setMapOpen(false)}
                    >
                      <Check size={17} />
                      {mapLoading
                        ? "Manzil olinmoqda..."
                        : "Joyni tasdiqlash"}
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
