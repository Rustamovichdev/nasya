
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Header.css";

export const Header: React.FC = () => {
  const location = useLocation();

  const isCustomersPage =
    location.pathname === "/debts-customers";

  const isIncomeExpensePage =
    location.pathname === "/messages";

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [ism, setIsm] = useState("");
  const [telfonNomer, setTelfonNomer] = useState("+998 ");
  const [qarzi, setQarzi] = useState("");
  const [nimaNarsaOlgani, setNimaNarsaOlgani] = useState("");

  const handleIsmChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setIsm(value.replace(/[^a-zA-Zа-яА-Яo'O'g'G'ʻ`\s]/g, ""));
  };

  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = e.target.value;

    if (!value.startsWith("+998")) {
      value = "+998 ";
    }

    const numbers = value.replace(/\D/g, "").slice(3, 12);

    let formatted = "+998";

    if (numbers.length > 0) formatted += " " + numbers.slice(0, 2);
    if (numbers.length > 2) formatted += " " + numbers.slice(2, 5);
    if (numbers.length > 5) formatted += " " + numbers.slice(5, 7);
    if (numbers.length > 7) formatted += " " + numbers.slice(7, 9);

    setTelfonNomer(formatted);
  };

  const handleQarziChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const rawValue = e.target.value.replace(/\D/g, "");

    if (!rawValue) {
      setQarzi("");
    } else {
      setQarzi(
        Number(rawValue).toLocaleString("en-US").replace(/,/g, " ")
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
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
    setIsModalOpen(false);
  };

  return (
    <>
      {/* KIRIM VA CHIQIM HEADER */}
      {isIncomeExpensePage ? (
        <header className="customers-header">

          <div className="customers-search">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Mijoz ismi, telefon raqami..."
            />
          </div>

          <div className="customers-actions">

            <button className="compact-excel">
              💳 Balansni to'ldirish (Payme / Click)
            </button>

            <button className="compact-new-debt">
              <span>+</span> Yangi xabarnoma rejalashtirish
            </button>

            <button className="compact-notification">
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

        /* MIJOZLAR HEADER */
        <header className="customers-header">

          <div className="customers-search">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Mijoz ismi, telefon yoki qarz izlash..."
            />
          </div>

          <div className="customers-actions">

            <button className="compact-excel">
              📊 Excel (.xlsx)
            </button>

            <button className="compact-sms">
              💬 Ommaviy SMS eslatma
            </button>

            <button
              className="compact-new-debt"
              onClick={() => setIsModalOpen(true)}
            >
              <span>+</span> Yangi Nasiya Qo'shish
            </button>

            <button className="compact-notification">
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

        /* BOSHQA SAHIFALAR HEADER */
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between w-full">

          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 text-white p-2.5 rounded-xl flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>

            <div>
              <h1 className="font-bold text-gray-900 text-lg leading-tight">
                QarzDaftar
              </h1>
              <span className="text-xs text-gray-400">
                Nasiya Boshqaruvi
              </span>
            </div>
          </div>

          <div className="relative w-72">
            <input
              type="text"
              placeholder="Mijoz ismi, tel raqami..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-4 pr-4 py-2 text-sm outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-4">

            <button className="flex items-center gap-2 border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-xl text-sm font-medium text-gray-700">
              📊 Excel yuklab olish
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold"
            >
              + Yangi Nasiya Yozish
            </button>

            <button className="p-2.5 border border-gray-200 rounded-xl">
              🔔
            </button>

            <div className="flex items-center gap-3 pl-2 border-l border-gray-200">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center">
                B
              </div>

              <div>
                <h4 className="text-sm font-bold text-gray-800">
                  Baxtiyor Aliyev
                </h4>
                <span className="text-xs text-gray-400">
                  Do'kon egasi
                </span>
              </div>
            </div>

          </div>
        </header>
      )}

      {/* YANGI NASIYA MODAL */}
      {isModalOpen && (
        <div className="debt-modal-overlay">
          <div className="debt-modal">

            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="debt-modal-close"
            >
              &times;
            </button>

            <h2>Yangi nasiya yozish</h2>

            <form onSubmit={handleSubmit}>

              <div className="debt-form-group">
                <label>Ism</label>
                <input
                  type="text"
                  value={ism}
                  onChange={handleIsmChange}
                  required
                  placeholder="Mijoz ismi"
                />
              </div>

              <div className="debt-form-group">
                <label>Telefon nomer</label>
                <input
                  type="tel"
                  inputMode="numeric"
                  value={telfonNomer}
                  onChange={handlePhoneChange}
                  required
                  placeholder="+998 90 123 45 67"
                />
              </div>

              <div className="debt-form-group">
                <label>Qarzi</label>

                <div className="debt-amount-input">
                  <input
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
                <label>Nima narsa olganligi</label>
                <textarea
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
                  onClick={() => setIsModalOpen(false)}
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
