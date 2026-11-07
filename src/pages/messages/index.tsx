
import { useMemo, useState, type FormEvent } from "react";
import {
  MessageSquare,
  Phone,
  TrendingUp,
  Plus,
  Search,
  Clock,
  CheckCircle2,
  AlertCircle,
  Pencil,
  Trash2,
  X,
  FileText,
  Send,
  RefreshCw,
  Wallet,
  Users,
  Settings2,
} from "lucide-react";
import "./index.css";

type Template = {
  id: number;
  title: string;
  message: string;
  type: "SMS" | "Ovozli";
  active: boolean;
};

type MessageStatus = "Kutilmoqda" | "Yetkazildi" | "Xatolik";

type MessageHistory = {
  id: number;
  phone: string;
  message: string;
  date: string;
  status: MessageStatus;
};

const initialTemplates: Template[] = [
  {
    id: 1,
    title: "Qarz haqida eslatma",
    message:
      "Assalomu alaykum, hurmatli mijoz! Sizda qarzdorlik mavjud. Iltimos, to'lovni amalga oshirishni unutmang.",
    type: "SMS",
    active: true,
  },
  {
    id: 2,
    title: "To'lov muddati o'tgan",
    message:
      "Hurmatli mijoz, qarzingizning to'lov muddati o'tdi. Iltimos, to'lovni amalga oshiring.",
    type: "SMS",
    active: true,
  },
];

const Message = () => {
  const [templates, setTemplates] =
    useState<Template[]>(initialTemplates);

  const [history, setHistory] =
    useState<MessageHistory[]>([]);

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("Barchasi");

  const [showModal, setShowModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);

  const [editingTemplate, setEditingTemplate] =
    useState<Template | null>(null);

  const [formTitle, setFormTitle] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formType, setFormType] =
    useState<"SMS" | "Ovozli">("SMS");
  const [formError, setFormError] = useState("");

  const [bulkNumbers, setBulkNumbers] = useState("");
  const [bulkMessage, setBulkMessage] = useState("");
  const [bulkError, setBulkError] = useState("");
  const [bulkSuccess, setBulkSuccess] = useState("");

  // Shablonlarni qidirish va filtrlash
  const filteredTemplates = useMemo(() => {
    return templates.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.message.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        activeFilter === "Barchasi" ||
        (activeFilter === "Faol" && item.active) ||
        (activeFilter === "Nofaol" && !item.active);

      return matchesSearch && matchesFilter;
    });
  }, [templates, search, activeFilter]);

  // Xabarlar tarixini qidirish
  const filteredHistory = history.filter((item) => {
    return (
      item.phone.includes(search) ||
      item.message.toLowerCase().includes(search.toLowerCase())
    );
  });

  // Yangi shablon ochish
  const openCreateModal = () => {
    setEditingTemplate(null);
    setFormTitle("");
    setFormMessage("");
    setFormType("SMS");
    setFormError("");
    setShowModal(true);
  };

  // Shablonni tahrirlash
  const openEditModal = (template: Template) => {
    setEditingTemplate(template);
    setFormTitle(template.title);
    setFormMessage(template.message);
    setFormType(template.type);
    setFormError("");
    setShowModal(true);
  };

  // Shablonni saqlash va validatsiya
  const saveTemplate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formTitle.trim()) {
      setFormError("Shablon nomini kiriting!");
      return;
    }

    if (formTitle.trim().length < 3) {
      setFormError("Shablon nomi kamida 3 ta belgidan iborat bo'lishi kerak.");
      return;
    }

    if (!formMessage.trim()) {
      setFormError("Xabar matnini kiriting!");
      return;
    }

    if (formMessage.trim().length < 5) {
      setFormError("Xabar matni juda qisqa!");
      return;
    }

    if (editingTemplate) {
      setTemplates((prev) =>
        prev.map((item) =>
          item.id === editingTemplate.id
            ? {
                ...item,
                title: formTitle.trim(),
                message: formMessage.trim(),
                type: formType,
              }
            : item
        )
      );
    } else {
      setTemplates((prev) => [
        {
          id: Date.now(),
          title: formTitle.trim(),
          message: formMessage.trim(),
          type: formType,
          active: true,
        },
        ...prev,
      ]);
    }

    setShowModal(false);
  };

  // Shablonni yoqish yoki o'chirish
  const toggleTemplate = (id: number) => {
    setTemplates((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item
      )
    );
  };

  // Shablonni o'chirish
  const deleteTemplate = (id: number) => {
    const confirmed = window.confirm(
      "Ushbu shablonni o'chirishni xohlaysizmi?"
    );

    if (!confirmed) return;

    setTemplates((prev) => prev.filter((item) => item.id !== id));
  };

  // Ommaviy SMS tayyorlash va raqamlarni tekshirish
  const sendBulkMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setBulkError("");
    setBulkSuccess("");

    const numbers = bulkNumbers
      .split(/[\n,;]+/)
      .map((number) => number.trim())
      .filter(Boolean);

    if (numbers.length === 0) {
      setBulkError("Telefon raqamlarini kiriting!");
      return;
    }

    const validNumbers = numbers.filter((number) => {
      const cleaned = number.replace(/[\s()-]/g, "");
      return /^\+?998\d{9}$/.test(cleaned);
    });

    const invalidNumbers = numbers.length - validNumbers.length;

    if (validNumbers.length === 0) {
      setBulkError(
        "To'g'ri telefon raqami topilmadi. Masalan: +998901234567"
      );
      return;
    }

    if (!bulkMessage.trim()) {
      setBulkError("SMS matnini kiriting!");
      return;
    }

    if (bulkMessage.trim().length < 5) {
      setBulkError("SMS matni kamida 5 ta belgidan iborat bo'lsin!");
      return;
    }

    const newHistory: MessageHistory[] = validNumbers.map(
      (phone, index) => ({
        id: Date.now() + index,
        phone,
        message: bulkMessage.trim(),
        date: new Date().toLocaleString("uz-UZ"),
        status: "Kutilmoqda",
      })
    );

    setHistory((prev) => [...newHistory, ...prev]);

    setBulkSuccess(
      `${validNumbers.length} ta raqam tekshirildi va yuborish navbatiga tayyorlandi. ${
        invalidNumbers > 0
          ? `${invalidNumbers} ta noto'g'ri raqam o'tkazib yuborildi.`
          : ""
      }`
    );

    setBulkNumbers("");
    setBulkMessage("");
  };

  const closeBulkModal = () => {
    setShowBulkModal(false);
    setBulkError("");
    setBulkSuccess("");
  };

  const activeCount = templates.filter((item) => item.active).length;

  return (
    <main className="sms-page">
      {/* HEADER */}
      <header className="sms-page-header">
        <div>
          <div className="sms-eyebrow">
            <span className="sms-eyebrow-dot" />
            AVTOMATLASHTIRILGAN ESLATMALAR MARKAZI
          </div>

          <h1>SMS xabarnomalar</h1>

          <p>
            SMS xabarlar, eslatmalar va mijozlarga yuboriladigan
            xabarlarni boshqarish markazi.
          </p>
        </div>

        <div className="sms-header-actions">
          <button
            className="sms-outline-button"
            onClick={() => setShowBulkModal(true)}
          >
            <Users size={17} />
            Ommaviy SMS
          </button>

          <button
            className="sms-primary-button"
            onClick={openCreateModal}
          >
            <Plus size={17} />
            Yangi shablon
          </button>
        </div>
      </header>

      {/* STATISTICS */}
      <section className="sms-stat-grid">
        <article className="sms-stat-card">
          <div className="sms-stat-heading">
            <span>SMS SHABLONLARI</span>
            <div className="sms-stat-icon green">
              <MessageSquare size={19} />
            </div>
          </div>

          <div className="sms-stat-value">{templates.length}</div>

          <div className="sms-stat-description">
            <FileText size={13} />
            Jami shablonlar
          </div>
        </article>

        <article className="sms-stat-card">
          <div className="sms-stat-heading">
            <span>FAOL SHABLONLAR</span>
            <div className="sms-stat-icon blue">
              <CheckCircle2 size={19} />
            </div>
          </div>

          <div className="sms-stat-value">{activeCount}</div>

          <div className="sms-stat-description">
            <CheckCircle2 size={13} />
            Ishlatishga tayyor
          </div>
        </article>

        <article className="sms-stat-card">
          <div className="sms-stat-heading">
            <span>JAMI XABARLAR</span>
            <div className="sms-stat-icon purple">
              <TrendingUp size={19} />
            </div>
          </div>

          <div className="sms-stat-value">{history.length}</div>

          <div className="sms-stat-description">
            <Send size={13} />
            Tayyorlangan xabarlar
          </div>
        </article>

        <article className="sms-stat-card">
          <div className="sms-stat-heading">
            <span>SMS HOLATI</span>
            <div className="sms-stat-icon orange">
              <Wallet size={19} />
            </div>
          </div>

          <div className="sms-stat-value">Demo</div>

          <div className="sms-stat-description">
            <AlertCircle size={13} />
            SMS API ulanmagan
          </div>
        </article>
      </section>

      {/* SMS TEMPLATES */}
      <section className="sms-content-section">
        <div className="sms-section-header">
          <div>
            <div className="sms-section-title">
              <FileText size={19} />
              <h2>SMS shablonlari</h2>
            </div>

            <p>Mijozlarga yuboriladigan xabar matnlarini boshqaring.</p>
          </div>

          <button
            className="sms-outline-button"
            onClick={openCreateModal}
          >
            <Plus size={15} />
            Shablon qo'shish
          </button>
        </div>

        <div className="sms-toolbar">
          <div className="sms-search">
            <Search size={17} />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Shablonlarni qidirish..."
            />

            {search && (
              <button onClick={() => setSearch("")}>
                <X size={15} />
              </button>
            )}
          </div>

          <div className="sms-filter-group">
            <Settings2 size={15} />

            {["Barchasi", "Faol", "Nofaol"].map((filter) => (
              <button
                key={filter}
                className={activeFilter === filter ? "selected" : ""}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {filteredTemplates.length > 0 ? (
          <div className="sms-template-grid">
            {filteredTemplates.map((template) => (
              <article className="sms-template-card" key={template.id}>
                <div className="sms-template-top">
                  <div className="sms-template-icon">
                    <MessageSquare size={18} />
                  </div>

                  <span
                    className={`sms-badge ${
                      template.active ? "active" : "inactive"
                    }`}
                  >
                    {template.active ? "Faol" : "Nofaol"}
                  </span>
                </div>

                <h3>{template.title}</h3>

                <p className="sms-template-body">
                  {template.message}
                </p>

                <div className="sms-template-meta">
                  <span>{template.type}</span>
                  <span>{template.message.length} belgi</span>
                </div>

                <div className="sms-template-actions">
                  <button onClick={() => openEditModal(template)}>
                    <Pencil size={14} />
                    Tahrirlash
                  </button>

                  <button onClick={() => toggleTemplate(template.id)}>
                    <RefreshCw size={14} />
                    {template.active ? "O'chirish" : "Yoqish"}
                  </button>

                  <button
                    className="delete"
                    onClick={() => deleteTemplate(template.id)}
                    aria-label="Shablonni o'chirish"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="sms-empty-state">
            <div className="sms-empty-icon">
              <FileText size={27} />
            </div>

            <h3>Shablon topilmadi</h3>

            <p>
              Qidiruv yoki filtr shartlarini o'zgartirib ko'ring.
            </p>

            <button
              className="sms-outline-button"
              onClick={() => {
                setSearch("");
                setActiveFilter("Barchasi");
              }}
            >
              Filtrlarni tozalash
            </button>
          </div>
        )}
      </section>

      {/* MESSAGE HISTORY */}
      <section className="sms-content-section sms-history-section">
        <div className="sms-section-header">
          <div>
            <div className="sms-section-title">
              <Clock size={19} />
              <h2>Xabarlar tarixi</h2>
            </div>

            <p>Ommaviy SMS oynasidan tayyorlangan xabarlar.</p>
          </div>
        </div>

        {filteredHistory.length > 0 ? (
          <div className="sms-table-wrapper">
            <table className="sms-table">
              <thead>
                <tr>
                  <th>Telefon</th>
                  <th>Xabar</th>
                  <th>Sana</th>
                  <th>Holati</th>
                </tr>
              </thead>

              <tbody>
                {filteredHistory.map((item) => (
                  <tr key={item.id}>
                    <td>{item.phone}</td>

                    <td className="sms-table-message">
                      {item.message}
                    </td>

                    <td>{item.date}</td>

                    <td>
                      <span className="sms-badge pending">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="sms-history-empty">
            <div className="sms-empty-icon">
              <Send size={25} />
            </div>

            <h3>Hozircha yuborilgan xabarlar yo'q</h3>

            <p>
              Ommaviy SMS orqali tayyorlangan xabarlar shu yerda
              ko'rinadi.
            </p>
          </div>
        )}
      </section>

      {/* CREATE / EDIT TEMPLATE MODAL */}
      {showModal && (
        <div
          className="sms-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setShowModal(false);
            }
          }}
        >
          <div className="sms-modal" role="dialog" aria-modal="true">
            <div className="sms-modal-header">
              <div>
                <h2>
                  {editingTemplate
                    ? "Shablonni tahrirlash"
                    : "Yangi SMS shabloni"}
                </h2>

                <p>Shablon ma'lumotlarini kiriting.</p>
              </div>

              <button
                className="sms-modal-close"
                onClick={() => setShowModal(false)}
                aria-label="Yopish"
              >
                <X size={19} />
              </button>
            </div>

            <form onSubmit={saveTemplate}>
              <label htmlFor="template-title">
                Shablon nomi
              </label>

              <input
                id="template-title"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="Masalan: Qarz haqida eslatma"
                maxLength={80}
              />

              <label htmlFor="template-type">
                Xabar turi
              </label>

              <select
                id="template-type"
                value={formType}
                onChange={(e) =>
                  setFormType(e.target.value as "SMS" | "Ovozli")
                }
              >
                <option value="SMS">SMS xabar</option>
                <option value="Ovozli">Ovozli qo'ng'iroq</option>
              </select>

              <label htmlFor="template-message">
                Xabar matni
              </label>

              <textarea
                id="template-message"
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
                placeholder="Xabar matnini kiriting..."
                rows={5}
                maxLength={1000}
              />

              <div className="sms-character-count">
                {formMessage.length} / 1000 belgi
              </div>

              {formError && (
                <div className="sms-error">
                  <AlertCircle size={16} />
                  {formError}
                </div>
              )}

              <div className="sms-modal-actions">
                <button
                  type="button"
                  className="sms-cancel-button"
                  onClick={() => setShowModal(false)}
                >
                  Bekor qilish
                </button>

                <button
                  type="submit"
                  className="sms-primary-button"
                >
                  {editingTemplate ? "Saqlash" : "Shablon yaratish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BULK SMS MODAL */}
      {showBulkModal && (
        <div
          className="sms-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeBulkModal();
            }
          }}
        >
          <div className="sms-modal sms-bulk-modal">
            <div className="sms-modal-header">
              <div>
                <h2>Ommaviy SMS yuborish</h2>
                <p>Bir nechta mijozga xabar tayyorlash.</p>
              </div>

              <button
                className="sms-modal-close"
                onClick={closeBulkModal}
                aria-label="Yopish"
              >
                <X size={19} />
              </button>
            </div>

            <form onSubmit={sendBulkMessage}>
              <label htmlFor="bulk-numbers">
                <Phone size={15} />
                Telefon raqamlari
              </label>

              <textarea
                id="bulk-numbers"
                value={bulkNumbers}
                onChange={(e) => setBulkNumbers(e.target.value)}
                placeholder={"+998901234567\n+998911234567"}
                rows={5}
              />

              <div className="sms-field-hint">
                Har bir raqamni yangi qatordan yoki vergul bilan
                kiriting. Format: +998901234567
              </div>

              <label htmlFor="bulk-message">
                <MessageSquare size={15} />
                SMS matni
              </label>

              <textarea
                id="bulk-message"
                value={bulkMessage}
                onChange={(e) => setBulkMessage(e.target.value)}
                placeholder="Mijozlarga yuboriladigan xabarni yozing..."
                rows={5}
                maxLength={1000}
              />

              <div className="sms-character-count">
                {bulkMessage.length} / 1000 belgi
              </div>

              {bulkError && (
                <div className="sms-error">
                  <AlertCircle size={16} />
                  {bulkError}
                </div>
              )}

              {bulkSuccess && (
                <div className="sms-success">
                  <CheckCircle2 size={16} />
                  {bulkSuccess}
                </div>
              )}

              <div className="sms-demo-warning">
                <AlertCircle size={16} />
                Bu demo rejim. Xabarlar tarixga qo'shiladi, lekin
                haqiqiy SMS yuborilmaydi. Buning uchun SMS API kerak.
              </div>

              <div className="sms-modal-actions">
                <button
                  type="button"
                  className="sms-cancel-button"
                  onClick={closeBulkModal}
                >
                  Yopish
                </button>

                <button
                  type="submit"
                  className="sms-primary-button"
                >
                  <Send size={16} />
                  Tekshirish va tayyorlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Message;
