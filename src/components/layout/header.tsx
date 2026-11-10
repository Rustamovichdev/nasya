
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const handleExcelExport = () => {
    // Excel eksport funksiyasi shu yerda ulanadi
  };

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

  const searchClass =
    "flex h-[43px] w-[min(38%,430px)] min-w-[140px] items-center gap-[9px] rounded-[11px] border border-[#e8edf3] bg-[#f7f8fb] px-3 text-[#71809f] max-[700px]:w-full max-[700px]:min-w-0";

  const actionClass =
    "inline-flex min-h-[42px] items-center justify-center gap-[6px] whitespace-nowrap rounded-[10px] px-[11px] text-[11px] font-semibold transition cursor-pointer max-[700px]:w-full max-[700px]:min-w-0 max-[700px]:whitespace-normal max-[700px]:px-1.5 max-[700px]:py-1.5 max-[700px]:text-[10px]";

  return (
    <>
      {/* XABARNOMALAR HEADER */}
      {isIncomeExpensePage ? (
        <header className="flex min-h-[76px] w-full min-w-0 items-center justify-between gap-[14px] rounded-[14px] border border-[#edf0f5] bg-white px-[18px] py-[10px] max-[1100px]:flex-wrap max-[700px]:items-stretch max-[700px]:gap-[9px] max-[700px]:p-[9px]">
          <label className={searchClass}>
            <span>🔍</span>
            <input
              type="search"
              placeholder="Mijoz ismi, telefon raqami..."
              className="w-full min-w-0 bg-transparent text-[13px] text-[#253451] outline-none"
            />
          </label>

          <div className="flex min-w-0 items-center justify-end gap-2 max-[1100px]:w-full max-[1100px]:flex-wrap max-[1100px]:justify-start max-[700px]:grid max-[700px]:grid-cols-2 max-[700px]:gap-[7px]">
            <button
              type="button"
              className={`${actionClass} border border-[#e5eaf1] bg-white text-[#34445f]`}
            >
              💳 Balansni to'ldirish (Payme / Click)
            </button>

            <button
              type="button"
              className={`${actionClass} border border-[#009e72] bg-[#009e72] text-white`}
            >
              + Yangi xabarnoma rejalashtirish
            </button>

            <button
              type="button"
              className="flex h-[42px] w-[42px] items-center justify-center rounded-[10px] border border-[#e5eaf1] bg-white text-[#52627c] max-[700px]:h-[38px] max-[700px]:w-full"
              aria-label="Bildirishnomalar"
            >
              🔔
            </button>

            <div className="flex min-w-0 items-center gap-2 border-l border-[#e5eaf1] pl-[10px] max-[700px]:justify-center max-[700px]:border-0 max-[700px]:p-0">
              <div className="flex h-[35px] w-[35px] shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#087f68] to-[#18b58b] font-bold text-white">
                B
              </div>
              <div className="min-w-0 max-[700px]:hidden">
                <h4 className="m-0 whitespace-nowrap text-xs font-bold text-[#172541]">
                  Baxtiyor Aliyev
                </h4>
                <span className="mt-[3px] block whitespace-nowrap text-[10px] text-[#8994ad]">
                  Do'kon egasi
                </span>
              </div>
            </div>
          </div>
        </header>
      ) : isCustomersPage ? (
        /* MIJOZLAR HEADER */
        <header className="flex min-h-[76px] w-full min-w-0 items-center justify-between gap-[14px] rounded-[14px] border border-[#edf0f5] bg-white px-[18px] py-[10px] max-[1100px]:flex-wrap max-[700px]:items-stretch max-[700px]:gap-[9px] max-[700px]:p-[9px]">
          <label className={searchClass}>
            <span>🔍</span>
            <input
              type="search"
              placeholder="Mijoz ismi, telefon yoki qarz izlash..."
              className="w-full min-w-0 bg-transparent text-[13px] text-[#253451] outline-none"
            />
          </label>

          <div className="flex min-w-0 items-center justify-end gap-2 max-[1100px]:w-full max-[1100px]:flex-wrap max-[1100px]:justify-start max-[700px]:grid max-[700px]:grid-cols-2 max-[700px]:gap-[7px]">
            <button
              type="button"
              className={`${actionClass} border border-[#e5eaf1] bg-white text-[#34445f]`}
              onClick={handleExcelExport}
            >
              📊 Excel (.xlsx)
            </button>

            <button
              type="button"
              className={`${actionClass} border border-[#e5eaf1] bg-white text-[#34445f]`}
            >
              💬 Ommaviy SMS eslatma
            </button>

            <button
              type="button"
              className={`${actionClass} border border-[#009e72] bg-[#009e72] text-white`}
              onClick={() => setIsModalOpen(true)}
            >
              + Yangi Nasiya Qo'shish
            </button>

            <button
              type="button"
              className="flex h-[42px] w-[42px] items-center justify-center rounded-[10px] border border-[#e5eaf1] bg-white text-[#52627c] max-[700px]:h-[38px] max-[700px]:w-full"
              aria-label="Bildirishnomalar"
            >
              🔔
            </button>

            <div className="flex min-w-0 items-center gap-2 border-l border-[#e5eaf1] pl-[10px] max-[700px]:justify-center max-[700px]:border-0 max-[700px]:p-0">
              <div className="flex h-[35px] w-[35px] shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#087f68] to-[#18b58b] font-bold text-white">
                B
              </div>
              <div className="min-w-0 max-[700px]:hidden">
                <h4 className="m-0 whitespace-nowrap text-xs font-bold text-[#172541]">
                  Baxtiyor Aliyev
                </h4>
                <span className="mt-[3px] block whitespace-nowrap text-[10px] text-[#8994ad]">
                  Do'kon egasi
                </span>
              </div>
            </div>
          </div>
        </header>
      ) : (
        /* ASOSIY HEADER */
        <header className="relative z-[1] flex min-h-[96px] w-full min-w-0 items-center gap-5 rounded-[17px] border border-[#edf0f5] bg-white px-[22px] py-4 shadow-[0_5px_25px_rgba(25,45,80,0.06)] max-[1100px]:gap-3 max-[1100px]:p-[14px] max-[700px]:grid max-[700px]:grid-cols-1 max-[700px]:gap-[10px] max-[700px]:p-3">
          {/* LOGO */}
          <div className="flex min-w-0 flex-[0_0_195px] items-center gap-3 max-[1100px]:flex-[0_0_175px] max-[1100px]:gap-[9px] max-[700px]:w-full max-[700px]:flex-auto max-[700px]:gap-[10px]">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[15px] bg-gradient-to-br from-[#06a77d] to-[#008b65] text-white max-[1100px]:h-12 max-[1100px]:w-12 max-[700px]:h-11 max-[700px]:w-11">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-[26px] w-[26px] max-[700px]:h-[22px] max-[700px]:w-[22px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>

            <div className="min-w-0">
              <h1 className="m-0 whitespace-nowrap text-[22px] font-extrabold leading-tight text-[#101d3b] max-[1100px]:text-[19px] max-[700px]:text-[19px] max-[380px]:text-[17px]">
                QarzDaftar
              </h1>
              <span className="mt-[5px] block whitespace-nowrap text-xs text-[#8490a9] max-[700px]:mt-[3px] max-[700px]:text-[11px] max-[380px]:hidden">
                Nasiya Boshqaruvi
              </span>
            </div>
          </div>

          {/* SEARCH */}
          <label className="flex h-[54px] min-w-0 max-w-[500px] flex-[1_1_180px] items-center gap-[10px] rounded-[28px] border border-transparent bg-[#f1f3f8] px-4 text-[#71809f] transition focus-within:border-[#00a779] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(0,167,121,0.08)] max-[700px]:h-[43px] max-[700px]:w-full max-[700px]:max-w-none max-[700px]:rounded-[11px] max-[700px]:px-3">
            <span>🔍</span>
            <input
              type="search"
              placeholder="Mijoz ismi, tel raqami..."
              className="w-full min-w-0 bg-transparent text-sm text-[#253451] outline-none placeholder:text-[#8994ad] max-[700px]:text-xs"
            />
          </label>

          {/* BUTTONS */}
          <div className="ml-auto flex min-w-0 flex-[0_0_auto] items-center justify-end gap-[10px] max-[1100px]:gap-[7px] max-[700px]:m-0 max-[700px]:w-full max-[700px]:justify-between max-[700px]:gap-[7px]">
            <button
              type="button"
              className="inline-flex min-h-[50px] items-center justify-center gap-2 whitespace-nowrap rounded-[13px] border border-[#e4e9f1] bg-white px-[14px] text-[13px] font-semibold text-[#263858] transition hover:bg-[#f5faf8] max-[1100px]:min-h-[46px] max-[1100px]:px-[10px] max-[1100px]:text-[11px] max-[700px]:hidden"
            >
              📊 <span>Excel yuklab olish</span>
            </button>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex min-h-[50px] items-center justify-center gap-2 whitespace-nowrap rounded-[13px] border border-[#00976c] bg-gradient-to-br from-[#08ae7d] to-[#00976c] px-[14px] text-[13px] font-semibold text-white transition hover:bg-[#00845f] max-[1100px]:min-h-[46px] max-[1100px]:px-[10px] max-[1100px]:text-[11px] max-[700px]:min-h-[39px] max-[700px]:flex-1 max-[700px]:rounded-[10px] max-[700px]:px-[10px] max-[700px]:text-[11px] max-[380px]:min-h-9 max-[380px]:px-[7px] max-[380px]:text-[10px]"
            >
              <span className="text-[19px] leading-none max-[700px]:text-base">+</span>
              <span>Yangi Nasiya Yozish</span>
            </button>

            <button
              type="button"
              className="flex h-[50px] w-[46px] shrink-0 items-center justify-center rounded-[13px] border border-[#e4e9f1] bg-white text-[#52627c] max-[700px]:h-[39px] max-[700px]:w-[39px] max-[700px]:rounded-[10px] max-[380px]:h-9 max-[380px]:w-[35px]"
              aria-label="Bildirishnomalar"
            >
              🔔
            </button>

            <div className="flex min-w-0 items-center gap-[9px] border-l border-[#e5eaf1] pl-[10px] max-[700px]:pl-[7px]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#087f68] to-[#18b58b] font-bold text-white max-[700px]:h-[37px] max-[700px]:w-[37px] max-[380px]:h-[34px] max-[380px]:w-[34px]">
                B
              </div>
              <div className="min-w-0 max-[700px]:hidden">
                <h4 className="m-0 whitespace-nowrap text-xs font-bold text-[#172541]">
                  Baxtiyor Aliyev
                </h4>
                <span className="mt-[3px] block whitespace-nowrap text-[10px] text-[#8994ad]">
                  Do'kon egasi
                </span>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* YANGI NASIYA MODAL */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100000] flex items-center justify-center overscroll-contain bg-slate-900/60 p-[18px] max-[700px]:p-3"
          onMouseDown={e => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            className="relative max-h-[min(90vh,850px)] w-full max-w-[500px] overflow-x-hidden overflow-y-auto rounded-[18px] bg-white p-7 shadow-[0_15px_50px_rgba(0,0,0,0.18)] max-[700px]:max-h-[90dvh] max-[700px]:rounded-[14px] max-[700px]:px-4 max-[700px]:py-[22px]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="debt-modal-title"
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-[14px] top-[10px] flex h-[34px] w-[34px] items-center justify-center rounded-lg border-0 bg-transparent text-[29px] text-[#8994ad] hover:bg-slate-100"
              aria-label="Yopish"
            >
              &times;
            </button>

            <h2
              id="debt-modal-title"
              className="mb-[22px] mr-[34px] text-[22px] font-bold text-[#172541] max-[700px]:text-[19px]"
            >
              Yangi nasiya yozish
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="debt-name" className="mb-[7px] block text-[13px] font-semibold text-[#34445f]">
                  Ism
                </label>
                <input
                  id="debt-name"
                  type="text"
                  value={ism}
                  onChange={handleIsmChange}
                  required
                  placeholder="Mijoz ismi"
                  className="w-full min-w-0 rounded-[9px] border border-[#dce2eb] bg-white px-[13px] py-3 text-sm text-[#253451] outline-none focus:border-[#009e72] focus:ring-[3px] focus:ring-emerald-100"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="debt-phone" className="mb-[7px] block text-[13px] font-semibold text-[#34445f]">
                  Telefon nomer
                </label>
                <input
                  id="debt-phone"
                  type="tel"
                  inputMode="numeric"
                  value={telfonNomer}
                  onChange={handlePhoneChange}
                  required
                  placeholder="+998 90 123 45 67"
                  className="w-full min-w-0 rounded-[9px] border border-[#dce2eb] bg-white px-[13px] py-3 text-sm text-[#253451] outline-none focus:border-[#009e72] focus:ring-[3px] focus:ring-emerald-100"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="debt-amount" className="mb-[7px] block text-[13px] font-semibold text-[#34445f]">
                  Qarzi
                </label>
                <div className="relative">
                  <input
                    id="debt-amount"
                    type="text"
                    inputMode="numeric"
                    value={qarzi}
                    onChange={handleQarziChange}
                    required
                    placeholder="0"
                    className="w-full min-w-0 rounded-[9px] border border-[#dce2eb] bg-white px-[13px] py-3 pr-[65px] text-sm text-[#253451] outline-none focus:border-[#009e72] focus:ring-[3px] focus:ring-emerald-100"
                  />
                  <span className="absolute right-[13px] top-1/2 -translate-y-1/2 text-xs font-semibold text-[#8994ad]">
                    so'm
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="debt-product" className="mb-[7px] block text-[13px] font-semibold text-[#34445f]">
                  Nima narsa olganligi
                </label>
                <textarea
                  id="debt-product"
                  value={nimaNarsaOlgani}
                  onChange={e => setNimaNarsaOlgani(e.target.value)}
                  required
                  rows={3}
                  placeholder="Olingan mahsulotlar..."
                  className="w-full min-w-0 resize-y rounded-[9px] border border-[#dce2eb] bg-white px-[13px] py-3 text-sm text-[#253451] outline-none focus:border-[#009e72] focus:ring-[3px] focus:ring-emerald-100"
                />
              </div>

              <div className="mt-[22px] flex justify-end gap-[10px] max-[700px]:flex-col-reverse">
                <button
                  type="button"
                  className="min-h-[42px] rounded-[9px] border border-[#dce2eb] bg-white px-[18px] text-[13px] font-semibold text-[#34445f] hover:bg-slate-50 max-[700px]:w-full"
                  onClick={closeModal}
                >
                  Bekor qilish
                </button>

                <button
                  type="submit"
                  className="min-h-[42px] rounded-[9px] border border-[#009e72] bg-[#009e72] px-[18px] text-[13px] font-semibold text-white hover:bg-[#00845f] max-[700px]:w-full"
                >
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
