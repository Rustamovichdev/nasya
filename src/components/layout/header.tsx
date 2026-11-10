import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Header.css";

const Header: React.FC = () => {
  const location = useLocation();

  const isCustomersPage = location.pathname === "/debts-customers";
  const isIncomeExpensePage = location.pathname === "/messages";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ism, setIsm] = useState("");
  const [telfonNomer, setTelfonNomer] = useState("+998 ");
  const [qarzi, setQarzi] = useState("");
  const [nimaNarsaOlgani, setNimaNarsaOlgani] = useState("");

  const handleIsmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsm(e.target.value.replace(/[^a-zA-Zа-яА-Яo'O'g'G'ʻ`\s]/g, ""));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (!value.startsWith("+998")) value = "+998 ";

    const numbers = value.replace(/\D/g, "").slice(3, 12);

    let formatted = "+998";
    if (numbers.length > 0) formatted += " " + numbers.slice(0, 2);
    if (numbers.length > 2) formatted += " " + numbers.slice(2, 5);
    if (numbers.length > 5) formatted += " " + numbers.slice(5, 7);
    if (numbers.length > 7) formatted += " " + numbers.slice(7, 9);

    setTelfonNomer(formatted);
  };

  const handleQarziChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");

    setQarzi(
      rawValue
        ? Number(rawValue).toLocaleString("en-US").replace(/,/g, " ")
        : ""
    );
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      ism,
      telfonNomer,
      qarzi: qarzi.replace(/\s/g, ""),
      nimaNarsaOlgani,
    };

    console.log("Yangi nasiya:", data);

    setIsm("");
    setTelfonNomer("+998 ");
    setQarzi("");
    setNimaNarsaOlgani("");
    closeModal();
  };

  return (
    <>
      {isIncomeExpensePage ? (
        <header className="customers-header">
          <label className="customers-search">
            <span>🔍</span>
            <input
              type="search"
              placeholder="Mijoz ismi, telefon raqami..."
            />
          </label>

          <div className="customers-actions">
            <button type="button" className="compact-excel">
              💳 Balansni to'ldirish (Payme / Click)
            </button>

            <button type="button" className="compact-new-debt">
              + Yangi xabarnoma rejalashtirish
            </button>

            <button
              type="button"
              className="compact-notification"
              aria-label="Bildirishnomalar"
            >
              🔔
            </button>

            <div className="compact-profile">
              <div className="compact-avatar">B</div>
              <div className="compact-profile-info">
                <h4>Baxtiyor Aliyev</h4>
                <span>Do'kon egasi</span>
              </div>
            </div>
          </div>
        </header>
      ) : isCustomersPage ? (
        <header className="customers-header">
          <label className="customers-search">
            <span>🔍</span>
            <input
              type="search"
              placeholder="Mijoz ismi, telefon yoki qarz izlash..."
            />
          </label>

          <div className="customers-actions">
            <button type="button" className="compact-excel">
              📊 Excel (.xlsx)
            </button>

            <button type="button" className="compact-sms">
              💬 Ommaviy SMS eslatma
            </button>

            <button
              type="button"
              className="compact-new-debt"
              onClick={() => setIsModalOpen(true)}
            >
              + Yangi Nasiya Qo'shish
            </button>

            <button
              type="button"
              className="compact-notification"
              aria-label="Bildirishnomalar"
            >
              🔔
            </button>

            <div className="compact-profile">
              <div className="compact-avatar">B</div>
              <div className="compact-profile-info">
                <h4>Baxtiyor Aliyev</h4>
                <span>Do'kon egasi</span>
              </div>
            </div>
          </div>
        </header>
      ) : (
        <header className="main-header">
          <div className="header-logo">
            <div className="logo-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>

            <div className="logo-text">
              <h1>QarzDaftar</h1>
              <span>Nasiya Boshqaruvi</span>
            </div>
          </div>

          <label className="header-search">
            <span>🔍</span>
            <input
              type="search"
              placeholder="Mijoz ismi, tel raqami..."
            />
          </label>

          <div className="header-actions">
            <button type="button" className="excel-button">
              📊 <span>Excel yuklab olish</span>
            </button>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="new-debt-button"
            >
              <span className="new-debt-plus">+</span>
              <span>Yangi Nasiya Yozish</span>
            </button>

            <button
              type="button"
              className="notification-button"
              aria-label="Bildirishnomalar"
            >
              🔔
            </button>

            <div className="header-profile">
              <div className="header-avatar">B</div>
              <div className="header-profile-info">
                <h4>Baxtiyor Aliyev</h4>
                <span>Do'kon egasi</span>
              </div>
            </div>
          </div>
        </header>
      )}

      {isModalOpen && (
        <div
          className="debt-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            className="debt-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="debt-modal-title"
          >
            <button
              type="button"
              onClick={closeModal}
              className="debt-modal-close"
              aria-label="Yopish"
            >
              &times;
            </button>

            <h2 id="debt-modal-title">Yangi nasiya yozish</h2>

            <form onSubmit={handleSubmit}>
              <div className="debt-form-group">
                <label htmlFor="debt-name">Ism</label>
                <input
                  id="debt-name"
                  type="text"
                  value={ism}
                  onChange={handleIsmChange}
                  required
                  placeholder="Mijoz ismi"
                />
              </div>

              <div className="debt-form-group">
                <label htmlFor="debt-phone">Telefon nomer</label>
                <input
                  id="debt-phone"
                  type="tel"
                  inputMode="numeric"
                  value={telfonNomer}
                  onChange={handlePhoneChange}
                  required
                  placeholder="+998 90 123 45 67"
                />
              </div>

              <div className="debt-form-group">
                <label htmlFor="debt-amount">Qarzi</label>
                <div className="debt-amount-input">
                  <input
                    id="debt-amount"
                    type="text"
                    inputMode="numeric"
                    value={qarzi}
                    onChange={handleQarziChange}
                    required
                    placeholder="0"
                  />
                  <span>so'm</span>
                </div>
              </div>

              <div className="debt-form-group">
                <label htmlFor="debt-product">
                  Nima narsa olganligi
                </label>
                <textarea
                  id="debt-product"
                  value={nimaNarsaOlgani}
                  onChange={(e) =>
                    setNimaNarsaOlgani(e.target.value)
                  }
                  required
                  rows={3}
                  placeholder="Olingan mahsulotlar..."
                />
              </div>

              <div className="debt-form-buttons">
                <button
                  type="button"
                  className="debt-cancel"
                  onClick={closeModal}
                >
                  Bekor qilish
                </button>

                <button type="submit" className="debt-save">
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;