import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, ArrowLeftRight, MessageSquare, PhoneCall, Settings, 
  Search, FileSpreadsheet, Plus, Bell, ShieldCheck, TrendingUp, 
  ChevronDown, Calendar, RefreshCw, Send, CheckCircle2, AlertTriangle, 
  FileText, ArrowUpRight, ArrowDownLeft, ChevronLeft, ChevronRight, Check
} from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterAction, setFilterAction] = useState('Barcha amallar');

  // Данные для таблиц и графиков
  const operations = [
    { id: 1, name: 'Anvar Soliyev', phone: '+998 90 876-54-32', type: 'Oziq-ovqat', date: 'Bugun 15:47', action: 'Qarz berildi', amount: '-450,000 so\'m', status: 'Qoldiqda', statusColor: 'bg-orange-100 text-orange-700' },
    { id: 2, name: 'Murod aka (Usta)', phone: '+998 93 112-33-31', type: 'To\'liq qaytarish', date: 'Bugun 14:10', action: 'Qaytarildi (Kirim)', amount: '+1,280,000 so\'m', status: 'Yopildi', statusColor: 'bg-emerald-100 text-emerald-700' },
    { id: 3, name: 'Rustam Qosimov', phone: '+998 90 123-46-67', type: 'Katta savdo', date: '21 Mart, Maxsus o\'sdi', action: 'Nasiya', amount: '-4,880,000 so\'m', status: 'Muddati o\'tgan', statusColor: 'bg-rose-100 text-rose-700' },
    { id: 4, name: 'Nodira opa', phone: '+998 91 987-46-43', type: 'Kiyim-kechak', date: 'Bugun 11:05', action: 'Qisman to\'lov', amount: '+150,000 so\'m', status: 'Qoldiqda', statusColor: 'bg-orange-100 text-orange-700' },
    { id: 5, name: 'Sardor Milliy Taomlar', phone: '+998 98 644-12-89', type: 'Yog\', Un, Durach', date: 'Bugun 09:18', action: 'Qarz berildi', amount: '-1,650,000 so\'m', status: 'Qoldiqda', statusColor: 'bg-orange-100 text-orange-700' },
  ];

  const topDebtors = [
    { rank: 1, name: 'Rustam Qosimov', amount: '4,880,000 so\'m', phone: '+998 90 123-46-67', days: '5 kun qoldi', status: 'Muddati yaqinlashgan' },
    { rank: 2, name: 'Jamshid Karimov', amount: '2,250,000 so\'m', phone: '+998 93 656-78-90', days: '3 kun qoldi', status: 'Muddati yaqinlashgan' },
    { rank: 3, name: 'Malika Umarova', amount: '2,100,000 so\'m', phone: '+998 97 759-00-23', days: 'Muddati kelib qoldi', status: 'Tezkor to\'lov' },
    { rank: 4, name: 'Farrux Xoliqov', amount: '1,850,000 so\'m', phone: '+998 99 220-44-09', days: '3 kundan keyin', status: 'Normal' },
    { rank: 5, name: 'Otabek Jo\'rayev', amount: '1,500,000 so\'m', phone: '+998 91 654-98-72', days: ' Kechikib yotibcha', status: 'Kechikkan' },
  ];

  const weeklyChart = [
    { day: 'Dush', qarz: 65, tolov: 45 },
    { day: 'Sesh', qarz: 40, tolov: 60 },
    { day: 'Chor', qarz: 80, tolov: 50 },
    { day: 'Pay', qarz: 55, tolov: 75 },
    { day: 'Jum', qarz: 90, tolov: 65 },
    { day: 'Shan', qarz: 70, tolov: 40 },
    { day: 'Yak', qarz: 50, tolov: 30 },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
      
      {/* 1. SIDEBAR (Chap Panel) */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between hidden lg:flex">
        <div>
          {/* Logo qismi */}
          <div className="p-4 flex items-center justify-between border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-600 text-white p-2 rounded-xl font-bold flex items-center justify-center shadow-md">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-tight text-slate-900">Qarz Daftar</span>
                  <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-1.5 py-0.5 rounded">PRO</span>
                </div>
                <p className="text-xs text-slate-400">Nasiya Boshqaruvi</p>
              </div>
            </div>
          </div>

          {/* Do'kon tanlash */}
          <div className="p-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Faol Do'kon</div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Sarvar Oziq-Ovqat</h4>
                  <p className="text-[11px] text-slate-500">ID: 295031 • Tashkent sh.</p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Menyu bo'limlari */}
          <div className="px-3 py-2">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-3 mb-2">Asosiy Bo'limlar</div>
            <nav className="space-y-1">
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${activeTab === 'dashboard' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Boshqaruv paneli
              </button>
              <button 
                onClick={() => setActiveTab('clients')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${activeTab === 'clients' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4" />
                  Mijozlar & Qarzlar
                </div>
                <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full font-bold">142</span>
              </button>
              <button 
                onClick={() => setActiveTab('transactions')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${activeTab === 'transactions' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <ArrowLeftRight className="w-4 h-4" />
                Kirim & Chiqim
              </button>
              <button 
                onClick={() => setActiveTab('sms')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${activeTab === 'sms' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4" />
                  SMS Xabarnomalar
                </div>
                <span className="bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full font-bold">28 ta</span>
              </button>
              <button 
                onClick={() => setActiveTab('calls')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${activeTab === 'calls' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <PhoneCall className="w-4 h-4" />
                Ovozli qo'ng'iroq
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${activeTab === 'settings' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <Settings className="w-4 h-4" />
                Sozlamalar
              </button>
            </nav>
          </div>
        </div>

        {/* Pastdagi Telegram Bot Statusi */}
        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
              <div>
                <p className="text-xs font-bold text-slate-800">Telegram Bot</p>
                <p className="text-[10px] text-emerald-600 font-medium">Ulangan & Faol</p>
              </div>
            </div>
            <span className="text-xs text-slate-400 font-mono">v1.4</span>
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT (Asosiy Oyna) */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        
        {/* Yuqori Navbar */}
        <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Mijozlarni, telefon yoki qarzni qidirish..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all">
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              Excel yuklab olish
            </button>
            <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md shadow-emerald-600/20 transition-all">
              <Plus className="w-4 h-4" />
              + Yangi Nasiya Yozish
            </button>
            <div className="h-6 w-[1px] bg-slate-200 mx-1"></div>
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-9 h-9 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center font-bold text-sm">
                BA
              </div>
              <div className="hidden md:block text-left">
                <h5 className="font-bold text-xs text-slate-900">Baxtiyor Aliyev</h5>
                <p className="text-[10px] text-slate-400">Do'kon egasi</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Asosiy Qismi */}
        <div className="p-6 space-y-6 max-w-7xl mx-auto w-full">
          
          {/* Status Banner & Sana */}
          <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-5 rounded-2xl border border-slate-200 shadow-xs gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-ping"></span>
                  Real Vaqt Rejimi
                </span>
                <span className="text-xs text-slate-400">• Bugun: 14 Aprel, 2026</span>
              </div>
              <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                Assalomu alaykum, Baxtiyor aka! 👋
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">Bugungi do'koningiz moliyaviy holati, nasiya daftari oqimi va avtomatlashtirilgan to'lovlar monitoringi.</p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button className="bg-white text-emerald-700 shadow-xs px-3 py-1.5 rounded-lg text-xs font-bold transition-all">Bugun</button>
                <button className="text-slate-600 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-slate-200/50 transition-all">Hafta</button>
                <button className="text-slate-600 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-slate-200/50 transition-all">Oy</button>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700">
                <Calendar className="w-4 h-4 text-emerald-600" />
                14 Aprel, 2026
              </div>
            </div>
          </div>

          {/* 4 ta Asosiy Metrika Kartochkalari */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Jami Nasiyalar */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Jami Nasiyalar (Qarzlar)</span>
                  <div className="p-2 bg-slate-100 rounded-xl text-slate-700"><Users className="w-4 h-4" /></div>
                </div>
                <h3 className="text-2xl font-black text-slate-900">48,650,000</h3>
                <p className="text-xs text-slate-500 font-medium">so'm</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-lg flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +4.2% o'tgan haftadan
                </span>
                <span className="text-[11px] text-slate-400">12 ta mijoz</span>
              </div>
            </div>

            {/* 2. Muddati O'tgan Qarzlar */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-600">Muddati o'tgan qarzlar</span>
                  <div className="p-2 bg-rose-50 rounded-xl text-rose-600"><AlertTriangle className="w-4 h-4" /></div>
                </div>
                <h3 className="text-2xl font-black text-rose-600">9,420,000</h3>
                <p className="text-xs text-slate-500 font-medium">so'm</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] bg-rose-50 text-rose-700 font-bold px-2 py-0.5 rounded-lg">28 ta kechikkan</span>
                <button className="text-[11px] text-emerald-600 font-bold hover:underline">Harbinga SMS yuborish →</button>
              </div>
            </div>

            {/* 3. Bugungi To'lovlar */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Bugungi to'lovlar (Qaytarilgan)</span>
                  <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600"><CheckCircle2 className="w-4 h-4" /></div>
                </div>
                <h3 className="text-2xl font-black text-emerald-600">3,200,000</h3>
                <p className="text-xs text-slate-500 font-medium">so'm</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">12 ta to'lov</span>
                <span className="text-[11px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-lg">Reja: 80%</span>
              </div>
            </div>

            {/* 4. Sof Kirim-Chiqim */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Bugungi sof kirim-chiqim</span>
                  <div className="p-2 bg-blue-50 rounded-xl text-blue-600"><ArrowLeftRight className="w-4 h-4" /></div>
                </div>
                <h3 className="text-2xl font-black text-blue-600">+5,840,000</h3>
                <p className="text-xs text-slate-500 font-medium">so'm</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1 text-emerald-600 font-bold"><ArrowDownLeft className="w-3.5 h-3.5" /> Kirim: 8.2M</span>
                <span className="flex items-center gap-1 text-rose-600 font-bold"><ArrowUpRight className="w-3.5 h-3.5" /> Chiqim: 2.36M</span>
              </div>
            </div>
          </div>

          {/* Tezkor Bot Xabarnoma Panel */}
          <div className="bg-emerald-900 text-white p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg shadow-emerald-900/10">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-800 p-2.5 rounded-xl text-emerald-300">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm">Telegram Bot Holati</h4>
                  <span className="bg-emerald-700 text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded">Faol</span>
                  <span className="text-xs text-emerald-300/80">(2 daqiqa oldin yangilandi)</span>
                </div>
                <p className="text-xs text-emerald-200/70 mt-0.5">Kechikkan nasiyalarni avtomatika eslatish vaqti: <strong className="text-white">18:00</strong></p>
              </div>
            </div>
            
            <div className="flex items-center gap-2.5 w-full md:w-auto">
              <button className="flex-1 md:flex-none bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-emerald-700 transition-all flex items-center justify-center gap-2">
                <FileText className="w-4 h-4 text-emerald-300" />
                Kechki hisobot (.xlsx)
              </button>
              <button className="flex-1 md:flex-none bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-emerald-700 transition-all flex items-center justify-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-300" />
                Harchaga SMS (28)
              </button>
              <button className="bg-white hover:bg-emerald-50 text-emerald-900 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4" />
                + Tezkor qaytarilish
              </button>
            </div>
          </div>

          {/* Asosiy Content Grid (Jadval + O'ng Panellar) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Chap tomon: So'nggi qarz va to'lov amallari (2 ustunni egallaydi) */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                  <div>
                    <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                      So'nggi qarz va to'lov amallari
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">Bugun: 24 ta</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Do'konda qayd etilgan so'nggi to'lovlar va nasiyalardan ko'rsatkich</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <select 
                      value={filterAction} 
                      onChange={(e) => setFilterAction(e.target.value)}
                      className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
                    >
                      <option>Barcha amallar</option>
                      <option>Nasiya berildi</option>
                      <option>Qaytarildi</option>
                    </select>
                    <button className="p-2 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 text-slate-600 transition-all">
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Jadval */}
                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                        <th className="pb-3 pl-2">Mijoz</th>
                        <th className="pb-3">Mahsulot / Turi</th>
                        <th className="pb-3">Sana & Vaqt</th>
                        <th className="pb-3">Amaliyot Turi</th>
                        <th className="pb-3">Summa (UZS)</th>
                        <th className="pb-3 pr-2">Holati</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {operations.map((op) => (
                        <tr key={op.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 pl-2">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-xs">
                                {op.name.charAt(0)}
                              </div>
                              <div>
                                <h5 className="font-bold text-slate-900 text-xs">{op.name}</h5>
                                <p className="text-[11px] text-slate-400 font-mono">{op.phone}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 text-xs font-medium text-slate-600">{op.type}</td>
                          <td className="py-3.5 text-xs text-slate-500">{op.date}</td>
                          <td className="py-3.5">
                            <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                              {op.action.includes('Kirim') || op.action.includes('to\'lov') ? (
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                              ) : (
                                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                              )}
                              {op.action}
                            </span>
                          </td>
                          <td className={`py-3.5 text-xs font-extrabold ${op.amount.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {op.amount}
                          </td>
                          <td className="py-3.5 pr-2">
                            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${op.statusColor}`}>
                              {op.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Paginatsiya */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Jami <strong>24 ta</strong> amaldan dastlabki 5 tasi ko'rsatilmoqda</span>
                <div className="flex items-center gap-1">
                  <span className="mr-2">Sahifa:</span>
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className="p-1 rounded border border-slate-200 hover:bg-slate-100"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  {[1, 2, 3].map(num => (
                    <button 
                      key={num} 
                      onClick={() => setCurrentPage(num)}
                      className={`w-6 h-6 rounded text-xs font-bold ${currentPage === num ? 'bg-emerald-600 text-white' : 'hover:bg-slate-100 text-slate-600'}`}
                    >
                      {num}
                    </button>
                  ))}
                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, 3))}
                    className="p-1 rounded border border-slate-200 hover:bg-slate-100"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="ml-2 font-bold cursor-pointer hover:text-emerald-600">Keyingi</span>
                </div>
              </div>
            </div>

            {/* O'ng tomon: Eng Katta Qarzdorlar Top-5 va SMS Balans */}
            <div className="space-y-6">
              
              {/* Eng Katta Qarzdorlar Top-5 */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    Eng Katta Qarzdorlar Top-5
                    <AlertTriangle className="w-4 h-4 text-rose-500" />
                  </h3>
                  <span className="text-[10px] text-slate-400 font-medium">Sotuvchi e'tibor talab qiluvchilar</span>
                </div>

                <div className="space-y-3">
                  {topDebtors.map(debtor => (
                    <div key={debtor.rank} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-lg bg-slate-100 font-bold text-slate-600 flex items-center justify-center text-xs">
                          {debtor.rank}
                        </div>
                        <div>
                          <h5 className="font-bold text-xs text-slate-900">{debtor.name}</h5>
                          <p className="text-[10px] text-slate-400 font-mono">{debtor.phone} • <strong className="text-rose-600">{debtor.days}</strong></p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-extrabold text-rose-600">{debtor.amount}</div>
                        <div className="flex gap-1 mt-1 justify-end">
                          <button title="SMS yuborish" className="p-1 bg-emerald-50 text-emerald-600 rounded hover:bg-emerald-100"><MessageSquare className="w-3 h-3" /></button>
                          <button title="Qo'ng'iroq qilish" className="p-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"><PhoneCall className="w-3 h-3" /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-center">
                  <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center justify-center gap-1 w-full">
                    Barcha qarzdorlarni ko'rish (142 ta) →
                  </button>
                </div>
              </div>

              {/* SMS & Ovozli Xabarnomalar Balansi */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    SMS & Ovozli Xabarnomalar
                  </h3>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-600">SMS limit:</span>
                      <span className="text-slate-900 font-bold">1,420 taqoldi / 2,000</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '71%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-600">Ovozli robot:</span>
                      <span className="text-slate-900 font-bold">89 daqiqa qoldi / 120</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: '74%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-emerald-600 text-white p-2 rounded-lg font-bold text-xs">@QarzDaftarBot</div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-800">Faol Integratsiya</p>
                      <p className="text-[10px] text-slate-400">Telegram Bot orqali</p>
                    </div>
                  </div>
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>

                <button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition-all shadow-md shadow-emerald-600/20">
                  Hisobni to'ldirish (Payme / Click)
                </button>
              </div>

            </div>

          </div>

          {/* Haftalik Trendlar Grafigi va Oxirgi Karta */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Grafik bo'limi (2 ustun) */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs p-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div>
                  <h3 className="font-bold text-base text-slate-900">Haftalik Qaytarilish va Yangi Nasiyalar Trendi</h3>
                  <p className="text-xs text-slate-400">Dushanba - Yakshanba kunlari bo'yicha qarz oqimi dinamikasi (ming so'm)</p>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-emerald-500 rounded-sm"></span> Undirilgan qarz</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-rose-400 rounded-sm"></span> Yangi berilgan qarz</span>
                </div>
              </div>

              {/* Bar Chart simulatsiyasi */}
              <div className="h-44 flex items-end justify-between gap-2 pt-6 px-4">
                {weeklyChart.map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="w-full flex items-end justify-center gap-1.5 h-full">
                      <div 
                        className="w-3/5 bg-emerald-500 rounded-t-md transition-all group-hover:bg-emerald-600" 
                        style={{ height: `${item.tolov}%` }}
                        title={`Undirilgan: ${item.tolov * 100}k`}
                      ></div>
                      <div 
                        className="w-3/5 bg-rose-400 rounded-t-md transition-all group-hover:bg-rose-500" 
                        style={{ height: `${item.qarz}%` }}
                        title={`Berilgan: ${item.qarz * 100}k`}
                      ></div>
                    </div>
                    <span className="text-xs font-bold text-slate-500">{item.day}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Haftalik jami undiruv: <strong className="text-slate-800">17.5 mln so'm</strong></span>
                <span>Yangi nasiya: <strong className="text-slate-800">12.7 mln so'm</strong></span>
              </div>
            </div>

            {/* Do'kon qoldig'i kichik kartochkasi */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <h3 className="font-bold text-sm text-slate-900">Sarvar Oziq-Ovqat</h3>
                  <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded">Asosiy do'kon</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4">
                  <span className="text-xs text-slate-400 font-medium">Balans naqd:</span>
                  <div className="text-2xl font-black text-slate-900 mt-1">4,310,000 <span className="text-sm font-normal text-slate-500">so'm v.i.</span></div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Do'koningizdagi jami kassada turgan naqd pul hamda plastik karta tushumlari avtomatik hisoblanmoqda.
                </p>
              </div>
              <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs transition-all shadow-md">
                Kassani yopish / Hisobot
              </button>
            </div>

          </div>

        </div>
      </main>

    </div>
  );
}