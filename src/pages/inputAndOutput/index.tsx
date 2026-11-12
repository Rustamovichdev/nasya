import React, { useState, useMemo } from 'react';

// Интерфейс транзакции
interface Transaction {
  id: string;
  time: string;
  type: 'Kirim' | 'Chiqim';
  categoryInfo: string;
  description: string;
  paymentMethod: string;
  responsible: string;
  role: string;
  phone?: string;
  amount: number;
  status: 'Qabul qilindi' | "To'landi" | 'Inkassatsiya' | 'Bajarildi';
}



export const InputandOutput: React.FC = () => {
  // 1. Состояние списка транзакций
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '#TR-1092',
      time: '14:12',
      type: 'Kirim',
      categoryInfo: 'Nasiya qaytarildi',
      description: "Fevral oyidagi do'kon qarzi to'liq yopildi",
      paymentMethod: 'Naqd pul',
      responsible: 'Azizbek Rahimov',
      role: 'MIJOZ (#86)',
      phone: '91.2--14-22',
      amount: 1850000,
      status: 'Qabul qilindi',
    },
    {
      id: '#TR-1091',
      time: '13:35',
      type: 'Chiqim',
      categoryInfo: 'Distributor: Coca-Cola Ichimliklari',
      description: '48 blok 1.5L ichimliklar partiyasi xaridi',
      paymentMethod: 'Humo / Uzcard',
      responsible: 'Optomchi Jamshid',
      role: 'Hisobchi: Baxtiyor A.',
      amount: -2400000,
      status: "To'landi",
    },
    {
      id: '#TR-1090',
      time: '11:02',
      type: 'Kirim',
      categoryInfo: 'Kunlik kassa savdosi',
      description: "Tushlikkacha bo'lgan chakana tovar tushumi",
      paymentMethod: 'Naqd pul',
      responsible: 'Kassir Dilshod',
      role: 'Kassa #1',
      amount: 3350000,
      status: 'Inkassatsiya',
    },
  ]);

  // 2. Фильтрация и поиск
  const [activeTab, setActiveTab] = useState<'All' | 'Kirim' | 'Chiqim' | 'Nasiya'>('All');
  const [selectedPaymentMethod ] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // 3. Пагинация
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 4. Модальное окно создания транзакции
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'Kirim' | 'Chiqim'>('Kirim');
  const [formData, setFormData] = useState({
    categoryInfo: '',
    description: '',
    paymentMethod: 'Naqd pul',
    responsible: '',
    role: 'Kassir',
    amount: '',
  });

  const [formErrors, setFormErrors] = useState({
    categoryInfo: '',
    amount: '',
    responsible: '',
  });

  // Расчет статистики
  const stats = useMemo(() => {
    let kirimSum = 0;
    let chiqimSum = 0;

    transactions.forEach((tx) => {
      if (tx.amount > 0) kirimSum += tx.amount;
      else chiqimSum += Math.abs(tx.amount);
    });

    return {
      totalKirim: kirimSum,
      totalChiqim: chiqimSum,
      balance: kirimSum - chiqimSum,
    };
  }, [transactions]);

  // Фильтрация данных
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      if (activeTab === 'Kirim' && tx.type !== 'Kirim') return false;
      if (activeTab === 'Chiqim' && tx.type !== 'Chiqim') return false;
      if (activeTab === 'Nasiya' && !tx.categoryInfo.toLowerCase().includes('nasiya')) return false;

      if (selectedPaymentMethod !== 'All' && !tx.paymentMethod.toLowerCase().includes(selectedPaymentMethod.toLowerCase())) {
        return false;
      }

      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesId = tx.id.toLowerCase().includes(query);
        const matchesCat = tx.categoryInfo.toLowerCase().includes(query);
        const matchesResp = tx.responsible.toLowerCase().includes(query);
        const matchesDesc = tx.description.toLowerCase().includes(query);
        return matchesId || matchesCat || matchesResp || matchesDesc;
      }

      return true;
    });
  }, [transactions, activeTab, selectedPaymentMethod, searchQuery]);

  // Пагинация
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage) || 1;
  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(start, start + itemsPerPage);
  }, [filteredTransactions, currentPage]);

  const handleOpenModal = (type: 'Kirim' | 'Chiqim') => {
    setModalType(type);
    setFormData({
      categoryInfo: '',
      description: '',
      paymentMethod: 'Naqd pul',
      responsible: '',
      role: 'Kassir',
      amount: '',
    });
    setFormErrors({ categoryInfo: '', amount: '', responsible: '' });
    setIsModalOpen(true);
  };

  // Валидация полей в реальном времени
  const handleFormChange = (field: string, value: string) => {
    if (field === 'categoryInfo' || field === 'responsible') {
      const lettersOnlyRegex = /^[a-zA-Zа-яА-ЯёЁoʻgʻOʻGʻ\s]*$/;
      if (!lettersOnlyRegex.test(value)) {
        setFormErrors((prev) => ({
          ...prev,
          [field]: 'Разрешены только буквы и пробелы!',
        }));
        return;
      } else {
        setFormErrors((prev) => ({ ...prev, [field]: '' }));
      }
    }

    if (field === 'amount') {
      const numbersOnlyRegex = /^[0-9]*$/;
      if (!numbersOnlyRegex.test(value)) {
        setFormErrors((prev) => ({
          ...prev,
          amount: 'Разрешены только цифры!',
        }));
        return;
      } else {
        setFormErrors((prev) => ({ ...prev, amount: '' }));
      }
    }

    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Создание транзакции
  const handleCreateTransaction = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.categoryInfo.trim() || !formData.amount.trim() || !formData.responsible.trim()) {
      alert("Iltimos, barcha majburiy maydonlarni to'ldiring!");
      return;
    }

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const numAmount = parseFloat(formData.amount);

    const newTx: Transaction = {
      id: `#TR-${Math.floor(1000 + Math.random() * 9000)}`,
      time: timeStr,
      type: modalType,
      categoryInfo: formData.categoryInfo,
      description: formData.description || 'Izohsiz',
      paymentMethod: formData.paymentMethod,
      responsible: formData.responsible,
      role: modalType === 'Kirim' ? 'MIJOZ / KASSA' : formData.role,
      amount: modalType === 'Kirim' ? Math.abs(numAmount) : -Math.abs(numAmount),
      status: modalType === 'Kirim' ? 'Qabul qilindi' : "To'landi",
    };

    setTransactions([newTx, ...transactions]);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Ushbu operatsiyani o'chirishni tasdiqlaysizmi?")) {
      setTransactions(transactions.filter((tx) => tx.id !== id));
    }
  };

  const handleExportExcel = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ["ID,Vaqt,Turi,Toifa,To'lov usuli,Mas'ul,Summa"]
        .concat(
          filteredTransactions.map(
            (t) => `${t.id},${t.time},${t.type},"${t.categoryInfo}",${t.paymentMethod},"${t.responsible}",${t.amount}`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Kassa_Hisoboti_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCloseShift = () => {
    alert(`Z-Hisobot yaratildi!\n\nJami Sof Qoldiq: ${stats.balance.toLocaleString()} UZS\nBugungi Kirim: ${stats.totalKirim.toLocaleString()} UZS\nBugungi Chiqim: ${stats.totalChiqim.toLocaleString()} UZS`);
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen text-slate-800 font-sans">
      {/* Шапка */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">
            <span className="bg-emerald-100 px-2 py-0.5 rounded text-[10px]">KASSA JURNALI</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">Boshqaruv & Moliyaviy Audit</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Kirim & Chiqim Daftari</h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleCloseShift}
            className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 text-amber-700 rounded-lg text-sm font-medium hover:bg-amber-100 transition shadow-sm"
          >
            <span>🔒</span> Smenani Yopish
          </button>
          <button
            onClick={handleExportExcel}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-100 transition shadow-sm"
          >
            <span>📥</span> Excel Hisobot
          </button>
          <button
            onClick={() => handleOpenModal('Chiqim')}
            className="flex items-center gap-2 px-4 py-2 bg-rose-50 border border-rose-200 text-rose-600 rounded-lg text-sm font-medium hover:bg-rose-100 transition shadow-sm"
          >
            <span>🔴</span> Chiqim Qilish
          </button>
          <button
            onClick={() => handleOpenModal('Kirim')}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition shadow-sm"
          >
            <span>🟢</span> + Kirim Qo'shish
          </button>
        </div>
      </div>

      {/* Карточки статистики */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Jami Sof Kassa Qoldig'i</span>
          <div className="text-2xl font-black text-slate-900 mt-2">{stats.balance.toLocaleString()} so'm</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bugungi Jami Kirim</span>
          <div className="text-2xl font-black text-emerald-600 mt-2">+{stats.totalKirim.toLocaleString()} so'm</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bugungi Chiqim</span>
          <div className="text-2xl font-black text-rose-600 mt-2">-{stats.totalChiqim.toLocaleString()} so'm</div>
        </div>
      </div>

      {/* Табы и поиск */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm mb-6 p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setActiveTab('All'); setCurrentPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${activeTab === 'All' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600'}`}
          >
            Barchasi ({transactions.length})
          </button>
          <button
            onClick={() => { setActiveTab('Kirim'); setCurrentPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${activeTab === 'Kirim' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}
          >
            🟢 Kirimlar
          </button>
          <button
            onClick={() => { setActiveTab('Chiqim'); setCurrentPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${activeTab === 'Chiqim' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600'}`}
          >
            🔴 Chiqimlar
          </button>
        </div>

        <div className="relative flex-1 max-w-xs">
          <input
            type="text"
            placeholder="Qidirish..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Таблица транзакций */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
                <th className="py-3 px-4">ID & Vaqt</th>
                <th className="py-3 px-4">Turi</th>
                <th className="py-3 px-4">Toifa & Izoh</th>
                <th className="py-3 px-4">To'lov Usuli</th>
                <th className="py-3 px-4">Mas'ul</th>
                <th className="py-3 px-4">Summa</th>
                <th className="py-3 px-4 text-center">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {paginatedTransactions.length > 0 ? (
                paginatedTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4 font-semibold">{tx.id} <div className="text-[10px] text-slate-400">{tx.time}</div></td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${tx.type === 'Kirim' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold">{tx.categoryInfo} <div className="text-[11px] text-slate-500 font-normal">{tx.description}</div></td>
                    <td className="py-3 px-4">{tx.paymentMethod}</td>
                    <td className="py-3 px-4">{tx.responsible}</td>
                    <td className={`py-3 px-4 font-black ${tx.amount > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {tx.amount > 0 ? `+${tx.amount.toLocaleString()}` : tx.amount.toLocaleString()} so'm
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button onClick={() => handleDelete(tx.id)} className="text-slate-400 hover:text-rose-600">🗑️</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">Ma'lumot topilmadi</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Пагинация */}
        <div className="p-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
          <span>Sahifa {currentPage} / {totalPages}</span>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="px-3 py-1 bg-slate-100 rounded disabled:opacity-50"
            >
              Oldingi
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="px-3 py-1 bg-slate-100 rounded disabled:opacity-50"
            >
              Keyingi
            </button>
          </div>
        </div>
      </div>

      {/* Модальное окно */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h3 className="font-bold text-slate-900 text-lg">
                {modalType === 'Kirim' ? "🟢 Kirim Qo'shish" : '🔴 Chiqim Qilish'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">✖</button>
            </div>

            <form onSubmit={handleCreateTransaction} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Toifa / Nomi *</label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Nasiya to'lov"
                  value={formData.categoryInfo}
                  onChange={(e) => handleFormChange('categoryInfo', e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-emerald-500"
                />
                {formErrors.categoryInfo && <p className="text-red-500 text-[10px] mt-1">{formErrors.categoryInfo}</p>}
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Summa (UZS) *</label>
                <input
                  type="text"
                  required
                  placeholder="100000"
                  value={formData.amount}
                  onChange={(e) => handleFormChange('amount', e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-emerald-500"
                />
                {formErrors.amount && <p className="text-red-500 text-[10px] mt-1">{formErrors.amount}</p>}
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">To'lov Usuli</label>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-emerald-500"
                >
                  <option value="Naqd pul">Naqd pul</option>
                  <option value="Humo / Uzcard">Humo / Uzcard</option>
                  <option value="Click Up">Click Up</option>
                  <option value="Payme Business">Payme Business</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Mas'ul Shaxs / Mijoz *</label>
                <input
                  type="text"
                  required
                  placeholder="Ism Familiya"
                  value={formData.responsible}
                  onChange={(e) => handleFormChange('responsible', e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-emerald-500"
                />
                {formErrors.responsible && <p className="text-red-500 text-[10px] mt-1">{formErrors.responsible}</p>}
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Izoh</label>
                <textarea
                  placeholder="Qo'shimcha..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-emerald-500"
                  rows={2}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-100 rounded-lg">Bekor qilish</button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg">Saqlash</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputandOutput;