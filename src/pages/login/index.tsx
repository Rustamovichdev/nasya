

import React, { useState } from 'react';
import { 
  BookOpen, Phone, Shield, Smartphone, FileText, 
  CheckCircle, Lock, Eye, EyeOff, ArrowRight, Store 
} from 'lucide-react';

export default function LoginPage() {
  // Tab va ko'rinish statelari
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Form kiritish statelari
  const [phone, setPhone] = useState('90 123 45 67');
  const [password, setPassword] = useState('••••••••');
  const [storeName, setStoreName] = useState('');

  // Tizimga kirish yoki ro'yxatdan o'tish formasi yuborilganda
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      alert(`Tizimga kirilmoqda...\nTelefon: +998${phone}`);
    } else {
      alert(`Ro'yxatdan o'tilmoqda...\nDo'kon: ${storeName || "Kiritilmadi"}\nTelefon: +998${phone}`);
    }
  };

  // OTP tugmasi bosilganda
  const handleOtpClick = (e: React.MouseEvent) => {
    e.preventDefault();
    alert(`+998 ${phone} raqamiga bir martalik SMS kod yuborildi.`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between font-sans text-slate-800 select-none">
      {/* HEADER */}
      <header className="w-full bg-white border-b border-slate-100 py-3 px-4 sm:px-8 md:px-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-[#006A4E] text-white p-1.5 sm:p-2 rounded-lg flex items-center justify-center">
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-900">Qarz Daftar</span>
          <span className="hidden sm:inline-block text-xs font-medium bg-emerald-50 text-[#006A4E] px-2 py-0.5 rounded-full border border-emerald-100">
            SaaS v2.4
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 text-slate-600">
            <Phone className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline text-xs text-slate-500">Yordam:</span>
            <a href="tel:+998712000050" className="font-semibold text-slate-800 hover:text-[#006A4E] transition-colors">
              +998 71 200-00-50
            </a>
          </div>
          <div className="flex items-center gap-0.5 bg-slate-100 p-1 rounded-lg text-xs font-medium">
            <button type="button" className="bg-white text-slate-900 px-2 sm:px-3 py-1 rounded-md shadow-sm">O'zbek</button>
            <button type="button" className="text-slate-500 px-2 sm:px-3 py-1 hover:text-slate-900 transition-colors">Рус</button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 md:p-12 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 grid grid-cols-1 lg:grid-cols-12 w-full overflow-hidden">
          
          {/* CHAP TARAF: MA'LUMOTLAR VA SHARHLAR */}
          <div className="lg:col-span-7 p-5 sm:p-8 md:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-100 order-2 lg:order-1">
            <div>
              <div className="inline-block bg-emerald-50 text-[#006A4E] text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider mb-4 sm:mb-6">
                o'zbekiston chakana savdosi uchun
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3 sm:mb-4">
                Do'koningiz nasiya va qarzlarini <br className="hidden sm:inline" />
                <span className="text-[#006A4E]">oson va xavfsiz boshqaring</span>
              </h1>
              <p className="text-slate-600 text-xs sm:text-sm md:text-base mb-6 sm:mb-8">
                Qog'oz daftarlarni unuting. Mijozlarning nasiya hisob-kitoblarini tartibga soling, kechiktirilgan to'lovlarni 40% tezroq qaytaring.
              </p>

              {/* Xususiyatlar ro'yxati */}
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-10">
                <div className="flex items-start gap-3 sm:gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="p-1.5 sm:p-2 bg-emerald-100/60 text-[#006A4E] rounded-lg mt-0.5 shrink-0">
                    <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-xs sm:text-sm">SMS va Telegram orqali avtomatik eslatmalar</h3>
                    <p className="text-[11px] sm:text-xs text-slate-500">Mijozlarga muloyim, qonuniy va avtomatlashtirilgan eslatma yuboring.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="p-1.5 sm:p-2 bg-emerald-100/60 text-[#006A4E] rounded-lg mt-0.5 shrink-0">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-xs sm:text-sm">100% bulutli xavfsizlik va kafolat</h3>
                    <p className="text-[11px] sm:text-xs text-slate-500">Telefon yo'qolsa ham, barcha yozuvlar xavfsiz saqlanadi.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="p-1.5 sm:p-2 bg-emerald-100/60 text-[#006A4E] rounded-lg mt-0.5 shrink-0">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-xs sm:text-sm">Excel va telefon bilan sinxronizatsiya</h3>
                    <p className="text-[11px] sm:text-xs text-slate-500">Mavjud qarzlar ro'yxatini tezkor yuklab oling.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mijoz sharhi */}
            <div className="bg-slate-50/80 border border-slate-200/60 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex text-amber-400 text-xs sm:text-sm">★★★★★</div>
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                  <CheckCircle className="w-3 h-3" /> Tasdiqlangan
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 italic mb-2 sm:mb-3">
                "Qarz Daftar tufayli do'konimizda qarzlar o'z vaqtida qaytishi 40% ga oshdi. Har bir mijoz bilan hisob-kitob shaffof bo'ldi."
              </p>
              <div className="text-[11px] sm:text-xs">
                <span className="font-bold text-slate-900 block">Baxtiyor Abdullayev</span>
                <span className="text-slate-500">"Sarvar Oziq-Ovqat" do'koni egasi (Chilonzor)</span>
              </div>
            </div>

            {/* Afzalliklar */}
            <div className="flex flex-wrap items-center justify-between gap-2 mt-6 pt-4 border-t border-slate-100 text-[11px] sm:text-xs text-slate-500 font-medium">
              <span>⚡ Avtomatik sinxronizatsiya</span>
              <span>💳 Karta kiritish shart emas</span>
              <span>🏪 2,500+ faol do'konlar</span>
            </div>
          </div>

          {/* O'NG TARAF: FORMA */}
          <div className="lg:col-span-5 p-5 sm:p-8 md:p-12 flex flex-col justify-between bg-white order-1 lg:order-2">
            <div>
              {/* Tab tugmalari */}
              <div className="grid grid-cols-2 bg-slate-100 p-1 rounded-xl mb-6 sm:mb-8">
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className={`py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                    isLogin ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Kirish (Login)
                </button>
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className={`py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                    !isLogin ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Ro'yxatdan o'tish
                </button>
              </div>

              {/* Sarlavha */}
              <div className="mb-5 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
                  {isLogin ? 'Xush kelibsiz!' : "Do'kon hisobini ochish"}
                </h2>
                <p className="text-xs text-slate-500">
                  {isLogin 
                    ? 'Telefon raqamingiz orqali shaxsiy hisobingizga kiring' 
                    : "1 daqiqada do'koningiz hisobini bepul oching"}
                </p>
              </div>

              {/* FORMA */}
              <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Do'kon yoki Savdo nuqtasi nomi
                    </label>
                    <div className="relative flex items-center">
                      <Store className="absolute left-3.5 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required={!isLogin}
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                        placeholder="Masalan: Fayz Baraka Market"
                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#006A4E] focus:ring-1 focus:ring-[#006A4E]"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Telefon raqamingiz
                  </label>
                  <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden focus-within:border-[#006A4E] focus-within:ring-1 focus-within:ring-[#006A4E] bg-white">
                    <div className="bg-slate-50 px-2.5 sm:px-3 py-2.5 sm:py-3 border-r border-slate-200 text-xs font-medium text-slate-600 flex items-center gap-1">
                      <span>uz</span>
                      <span className="font-bold">+998</span>
                    </div>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2.5 sm:py-3 text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700">Maxfiy parol</label>
                    {isLogin && (
                      <button 
                        type="button" 
                        onClick={() => alert("Parolni tiklash sahifasiga o'tilmoqda")}
                        className="text-xs text-[#006A4E] hover:underline font-medium"
                      >
                        Parolni unutdingizmi?
                      </button>
                    )}
                  </div>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-3.5 w-4 h-4 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 sm:py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#006A4E] focus:ring-1 focus:ring-[#006A4E]"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {isLogin && (
                  <div className="flex items-center justify-between text-xs pt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={rememberMe} 
                        onChange={() => setRememberMe(!rememberMe)}
                        className="rounded border-slate-300 text-[#006A4E] focus:ring-[#006A4E] w-4 h-4" 
                      />
                      <span className="text-slate-600 font-medium">Meni eslab qolish</span>
                    </label>
                    <button 
                      type="button" 
                      onClick={handleOtpClick} 
                      className="text-[#006A4E] font-medium hover:underline"
                    >
                      OTP kod bilan kirish
                    </button>
                  </div>
                )}

                {/* Yuborish tugmasi */}
                <button 
                  type="submit"
                  className="w-full mt-2 bg-[#006A4E] active:scale-[0.99] hover:bg-[#00543D] text-white font-semibold py-3 sm:py-3.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  <span>{isLogin ? "Tizimga kirish" : "Do'kon hisobini ochish"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Pastki tab almashish matni */}
              <div className="text-center mt-5 sm:mt-6 text-xs text-slate-500">
                {isLogin ? (
                  <span>
                    Hali hisobingiz yo'qmi?{' '}
                    <button type="button" onClick={() => setIsLogin(false)} className="text-[#006A4E] font-bold hover:underline block sm:inline mt-1 sm:mt-0">
                      Ro'yxatdan o'ting
                    </button>
                  </span>
                ) : (
                  <span>
                    Allaqachon hisobingiz bormi?{' '}
                    <button type="button" onClick={() => setIsLogin(true)} className="text-[#006A4E] font-bold hover:underline">
                      Tizimga kiring
                    </button>
                  </span>
                )}
              </div>
            </div>

            {/* Shartlar */}
            <div className="text-[10px] sm:text-[11px] text-slate-400 text-center mt-6 pt-4 border-t border-slate-100 leading-relaxed">
              Tizimga kirish orqali siz <a href="#" className="underline hover:text-slate-600">Xizmat ko'rsatish shartlari</a> va <a href="#" className="underline hover:text-slate-600">Maxfiylik siyosatiga</a> rozilik bildirasiz.
            </div>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-white border-t border-slate-100 py-4 px-4 sm:px-8 md:px-16 flex flex-col md:flex-row items-center justify-between text-[11px] sm:text-xs text-slate-500 gap-3 text-center md:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
          <span className="font-bold text-slate-800">Qarz Daftar</span>
          <span>© 2026 Qarz Daftar. Barcha huquqlar himoyalangan.</span>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 font-medium">
          <a href="#" className="hover:text-[#006A4E]">Maxfiylik</a>
          <a href="#" className="hover:text-[#006A4E]">Shartlar</a>
          <a href="#" className="hover:text-[#006A4E]">Xavfsizlik</a>
          <a href="#" className="hover:text-[#006A4E]">Yordam</a>
        </div>
      </footer>
    </div>
  );
}