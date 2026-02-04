
import React, { useEffect, useState } from 'react';
import { CertificateData, GlobalBranding } from '../types';
import { getCertificateById, findCertificateByPublicInfo, encodeDataForQR, getGlobalBranding } from '../services/certificateService';
import CertificatePreview from './CertificatePreview';
import { QRCodeSVG } from 'qrcode.react';

interface VerificationViewProps {
  id: string | null;
  dataParam: string | null;
  navigate: (path: string) => void;
}

const VerificationView: React.FC<VerificationViewProps> = ({ id, dataParam, navigate }) => {
  const [cert, setCert] = useState<CertificateData | null>(null);
  const [branding, setBranding] = useState<GlobalBranding>(getGlobalBranding());
  const [searchCertNo, setSearchCertNo] = useState('');
  const [searchVerifyCode, setSearchVerifyCode] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [isSearching, setIsSearching] = useState(true);
  const [error, setError] = useState('');
  const [showFull, setShowFull] = useState(false);

  useEffect(() => {
    if (id) {
      const data = getCertificateById(id);
      if (data) {
        setCert(data);
        setIsSearching(false);
      }
    }
    setBranding(getGlobalBranding());
  }, [id]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const result = findCertificateByPublicInfo(searchCertNo, searchVerifyCode);
    if (result) {
      if (result.captchaValue && captchaInput !== result.captchaValue) {
        setError('عذراً، كود التحقق غير صحيح. يرجى إعادة المحاولة.');
        return;
      }
      setCert(result);
      setIsSearching(false);
      setError('');
    } else {
      setError('عذراً، لم يتم العثور على بيانات مطابقة. يرجى التأكد من صحة رقم الشهادة ورمز التحقق.');
    }
  };

  if (isSearching) {
    return (
      <div className="min-h-screen bg-white font-cairo flex flex-col text-[#333]" dir="rtl">
        {/* Top Navbar - MOCCAE Style */}
        <header className="bg-white border-b border-gray-100 no-print sticky top-0 z-50">
          <div className="max-w-[1280px] mx-auto px-4 h-24 flex justify-between items-center">
            <div className="flex items-center gap-6">
              <img src={branding.portalEmblem} className="h-16 md:h-20" alt="MOCCAE Logo" />
              <img src={branding.portalRatingBadge} className="h-14 hidden sm:block" alt="Star Rating" />
            </div>
            
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-5 text-[12px] font-bold text-gray-500 mb-2">
                <div className="flex items-center gap-1 cursor-pointer hover:text-[#8b6b21]">
                   <i className="fas fa-chevron-down text-[8px]"></i> Language
                </div>
                <div className="flex gap-4">
                  <i className="fas fa-cog cursor-pointer hover:text-black"></i>
                  <i className="fas fa-user cursor-pointer hover:text-black"></i>
                  <i className="fas fa-search cursor-pointer hover:text-black"></i>
                  <i className="fas fa-home cursor-pointer text-lg hover:text-[#8b6b21]" onClick={() => navigate('#/')}></i>
                </div>
              </div>
              <nav className="hidden lg:flex items-center gap-6 text-[14px] font-bold text-gray-600">
                {['عن الوزارة', 'التشريعات', 'خدماتنا', 'المعرفة', 'المشاركة الالكترونية', 'المركز الإعلامي', 'البيانات المفتوحة'].map(nav => (
                  <span key={nav} className="cursor-pointer hover:text-[#8b6b21] border-b-2 border-transparent hover:border-[#8b6b21] pb-1 transition-all">{nav}</span>
                ))}
              </nav>
            </div>
          </div>
        </header>

        {/* Path Bar */}
        <div className="bg-[#fcfcfc] border-b border-gray-100 py-3 no-print shadow-sm">
          <div className="max-w-[1280px] mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400">
              <span className="hover:text-gray-600 cursor-pointer">الصفحة الرئيسية</span>
              <i className="fas fa-chevron-left text-[7px]"></i>
              <span className="hover:text-gray-600 cursor-pointer">مساحة العمل</span>
              <i className="fas fa-chevron-left text-[7px]"></i>
              <span className="text-[#8b6b21]">مركز الشهادات والتصاريح الرقمية</span>
            </div>
            <div className="flex items-center gap-4 text-gray-400">
              <div className="flex gap-2">
                 <span className="w-6 h-6 rounded flex items-center justify-center border border-gray-100 cursor-pointer hover:bg-gray-50 text-[10px] font-bold">A+</span>
                 <span className="w-6 h-6 rounded flex items-center justify-center border border-gray-100 cursor-pointer hover:bg-gray-50 text-[10px] font-bold">A-</span>
              </div>
              <i className="fas fa-print cursor-pointer hover:text-black" onClick={() => window.print()}></i>
              <i className="fas fa-share-alt cursor-pointer hover:text-black"></i>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <main className="flex-1 max-w-[1280px] mx-auto w-full py-10 px-4 flex flex-col lg:flex-row-reverse gap-10">
          
          {/* Sidebar Section */}
          <aside className="w-full lg:w-[300px] flex-none order-2 lg:order-1 no-print">
            <div className="bg-white border border-gray-200 rounded overflow-hidden shadow-sm sticky top-28">
              <div className="bg-[#f8f8f8] p-4 text-[15px] font-black border-b border-gray-200 text-gray-700 flex items-center gap-2">
                 <div className="w-1 h-4 bg-[#8b6b21]"></div>
                 روابط هامة
              </div>
              <div className="divide-y divide-gray-50">
                {['تسجيل دخول', 'رد الإيراد الإلكتروني', 'دليل استخدام الخدمات الرقمية', 'مركز الشهادات والتصاريح الرقمية'].map((link, i) => (
                  <div key={i} className={`p-4 text-[13px] font-bold flex justify-between items-center cursor-pointer transition-colors ${i === 3 ? 'bg-[#eee] text-[#8b6b21]' : 'text-gray-500 hover:bg-gray-50'}`}>
                    {link}
                    <i className="fas fa-chevron-left text-[9px] opacity-40"></i>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Form Content Section */}
          <div className="flex-1 order-1 lg:order-2 fade-in">
            <h2 className="text-[26px] font-black text-gray-700 mb-6 flex items-center gap-3">
              مركز الشهادات والتصاريح الرقمية
            </h2>
            <p className="text-[14px] text-gray-400 font-bold mb-10 leading-relaxed max-w-4xl">
              يمكنك الآن التحقق من الشهادات أو التصاريح التي يتم إصدارها من وزارة التغير المناخي والبيئة من خلال إدخال رقم المستند (رقم الشهادة أو رقم التصريح) ثم إدخال كود التحقق المذكور على المستند.
              الحقول المشار إليها بعلامة ( * ) إلزامية.
            </p>

            <form onSubmit={handleSearch} className="space-y-8 max-w-2xl">
              {/* Certificate No */}
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <label className="md:w-56 text-[14px] font-black text-gray-600 text-right">رقم الشهادة *</label>
                <div className="flex-1 relative">
                  <input 
                    required
                    value={searchCertNo} 
                    onChange={e => setSearchCertNo(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded px-10 py-3 text-[15px] font-black font-inter h-12 focus:border-[#8b6b21] focus:ring-1 focus:ring-[#8b6b21] outline-none transition-all shadow-sm" 
                    dir="ltr"
                    placeholder="DXB-APH-02415-3286055"
                  />
                  <i className="fas fa-microphone absolute left-3 top-1/2 -translate-y-1/2 text-gray-200"></i>
                </div>
              </div>

              {/* Verify Code */}
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <label className="md:w-56 text-[14px] font-black text-gray-600 text-right">رمز التحقق *</label>
                <div className="flex-1 relative">
                  <input 
                    required
                    value={searchVerifyCode} 
                    onChange={e => setSearchVerifyCode(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded px-10 py-3 text-[15px] font-black font-inter h-12 focus:border-[#8b6b21] focus:ring-1 focus:ring-[#8b6b21] outline-none transition-all shadow-sm" 
                    dir="ltr"
                    placeholder="322-7014"
                  />
                  <i className="fas fa-microphone absolute left-3 top-1/2 -translate-y-1/2 text-gray-200"></i>
                </div>
              </div>

              {/* Captcha */}
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <label className="md:w-56 text-[14px] font-black text-gray-600 text-right">ادخل الأحرف الظاهره *</label>
                <div className="flex-1 flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <input 
                      required
                      value={captchaInput}
                      onChange={e => setCaptchaInput(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded px-10 py-3 text-[15px] outline-none focus:border-[#8b6b21] h-12 text-center font-black tracking-widest font-inter shadow-sm"
                      placeholder="XXXXX"
                    />
                    <i className="fas fa-info-circle absolute right-3 top-1/2 -translate-y-1/2 text-[#8b6b21] cursor-help"></i>
                    <i className="fas fa-microphone absolute left-3 top-1/2 -translate-y-1/2 text-gray-200"></i>
                  </div>
                  <div className="flex items-center gap-3 bg-[#fdfdfd] border border-gray-100 rounded px-4 py-1">
                     <img 
                      src={findCertificateByPublicInfo(searchCertNo, searchVerifyCode)?.captchaImage || 'https://i.ibb.co/Xz9G1V9/captcha.png'} 
                      className="h-9 object-contain opacity-80 mix-blend-multiply" 
                      alt="Captcha" 
                     />
                     <button type="button" className="text-gray-300 hover:text-black p-2 transition-transform active:rotate-180">
                        <i className="fas fa-sync-alt text-sm"></i>
                     </button>
                  </div>
                </div>
              </div>

              {error && <div className="text-red-500 text-[12px] font-black mt-2 md:pr-56 fade-in"><i className="fas fa-exclamation-triangle ml-2"></i>{error}</div>}

              <div className="flex justify-start gap-3 md:pr-56 pt-4">
                <button type="submit" className="bg-[#8b6b21] hover:bg-black text-white px-12 py-3 rounded text-[14px] font-black transition-all shadow-md active:scale-95">ارسال</button>
                <button type="reset" onClick={() => {setSearchCertNo(''); setSearchVerifyCode(''); setError(''); setCaptchaInput('')}} className="bg-gray-300 hover:bg-gray-400 text-white px-12 py-3 rounded text-[14px] font-black transition-all">مسح</button>
              </div>
            </form>

            {/* Dynamic Partner Logos Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-20 no-print">
              {branding.partners.map((partner) => (
                <div key={partner.id} className="bg-[#fbfbfb] border border-gray-50 min-h-[160px] rounded-xl flex flex-col items-center justify-center p-6 hover:shadow-xl transition-all group gap-3">
                   <div className="flex-1 flex items-center justify-center">
                     <img src={partner.logo} className="max-h-24 max-w-full object-contain transition-all duration-500" alt={partner.label} />
                   </div>
                   <span className="text-[10px] font-black text-gray-400 text-center leading-tight uppercase tracking-tighter">
                     {partner.label}
                   </span>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Extended Official Footer */}
        <footer className="bg-white border-t border-gray-100 no-print pt-16">
          <div className="max-w-[1280px] mx-auto px-4">
            <div className="flex flex-col lg:flex-row justify-between items-start mb-16 gap-12 pb-16 border-b border-gray-50">
              
              <div className="space-y-8 max-w-xs">
                 <div className="flex items-center gap-6 text-[13px] font-bold text-gray-400">
                   <span className="bg-gray-50 px-3 py-1 rounded">عدد الزوار: 4254879</span>
                 </div>
                 <div className="space-y-3">
                    <span className="text-[12px] font-bold text-gray-400 block">تحميل تطبيق الهاتف المحمول:</span>
                    <div className="flex gap-4">
                      <i className="fab fa-apple text-2xl text-gray-300 hover:text-black cursor-pointer"></i>
                      <i className="fab fa-android text-2xl text-gray-300 hover:text-black cursor-pointer"></i>
                    </div>
                 </div>
                 <div className="pt-4">
                    <div className="flex items-center gap-3">
                      <span className="text-[12px] font-bold text-gray-400">اشترك في النشرة الإخبارية</span>
                      <button className="bg-gray-100 text-gray-500 px-6 py-1 rounded-full text-[11px] font-black hover:bg-[#8b6b21] hover:text-white transition-all">اشتراك</button>
                    </div>
                 </div>
              </div>

              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-12 text-right">
                <div className="space-y-4">
                  <h4 className="font-black text-gray-800 text-[15px]">عن الموقع</h4>
                  <ul className="text-[12px] text-gray-400 space-y-2 font-bold">
                    <li className="hover:text-[#8b6b21] cursor-pointer">حقوق النسخ</li>
                    <li className="hover:text-[#8b6b21] cursor-pointer">سياسة الخصوصية</li>
                    <li className="hover:text-[#8b6b21] cursor-pointer">الشروط والأحكام</li>
                    <li className="hover:text-[#8b6b21] cursor-pointer">إخلاء المسؤولية</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-black text-gray-800 text-[15px]">روابط سريعة</h4>
                  <ul className="text-[12px] text-gray-400 space-y-2 font-bold">
                    <li className="hover:text-[#8b6b21] cursor-pointer">النشرة الإخبارية</li>
                    <li className="hover:text-[#8b6b21] cursor-pointer">الصفحة الرئيسية</li>
                    <li className="hover:text-[#8b6b21] cursor-pointer">إمكانية الوصول</li>
                    <li className="hover:text-[#8b6b21] cursor-pointer">بوابتي</li>
                    <li className="hover:text-[#8b6b21] cursor-pointer">الوظائف</li>
                    <li className="hover:text-[#8b6b21] cursor-pointer">ميثاق سعادة المتعاملين</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-black text-gray-800 text-[15px]">اتصل بنا</h4>
                  <ul className="text-[12px] text-gray-400 space-y-2 font-bold">
                    <li className="hover:text-[#8b6b21] cursor-pointer">اتصل بنا</li>
                    <li className="hover:text-[#8b6b21] cursor-pointer">البحث المتقدم</li>
                    <li className="hover:text-[#8b6b21] cursor-pointer">خريطة الموقع</li>
                    <li className="hover:text-[#8b6b21] cursor-pointer">مراكز سعادة المتعاملين</li>
                  </ul>
                </div>
                <div className="flex flex-col gap-6 items-end">
                   <img src={branding.footerLogo1} className="h-16 object-contain" alt="MOCCAE" />
                   <img src={branding.footerLogo2} className="h-12 object-contain" alt="JAE" />
                   <img src={branding.footerLogo3} className="h-10 object-contain" alt="Beeatna" />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center py-10 text-[12px] font-bold text-gray-400 gap-6">
               <div className="flex items-center gap-10">
                 <span className="flex items-center gap-2"><i className="fas fa-phone-alt text-[#8b6b21]"></i> 800 30 50</span>
                 <div className="flex items-center gap-5 text-lg">
                   {['linkedin', 'instagram', 'youtube', 'twitter', 'facebook'].map(social => (
                     <i key={social} className={`fab fa-${social} hover:text-[#8b6b21] cursor-pointer transition-colors`}></i>
                   ))}
                 </div>
               </div>
               <div className="text-center md:text-left">حقوق الطبع © 2023 جميع الحقوق محفوظة. وزارة التغير المناخي والبيئة.</div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Result view with professional MOCCAE success branding
  return (
    <div className="min-h-screen bg-slate-50 font-cairo flex flex-col" dir="rtl">
       <header className="h-24 bg-white border-b px-10 flex items-center justify-between sticky top-0 z-50 no-print shadow-sm">
          <img src={branding.portalEmblem} className="h-16" alt="Emblem" />
          <div className="flex gap-4">
            <button onClick={() => setShowFull(!showFull)} className="bg-slate-800 hover:bg-black text-white px-8 py-2.5 rounded font-black text-sm transition-all">{showFull ? 'عرض الملخص' : 'عرض الشهادة الكاملة'}</button>
            <button onClick={() => window.print()} className="bg-[#8b6b21] hover:bg-[#6a8d36] text-white px-8 py-2.5 rounded font-black text-sm shadow-xl shadow-amber-900/10 transition-all"><i className="fas fa-print ml-2"></i> طباعة PDF</button>
            <button onClick={() => setIsSearching(true)} className="w-12 h-12 rounded-full hover:bg-red-50 text-gray-300 hover:text-red-500 transition-all flex items-center justify-center"><i className="fas fa-times text-2xl"></i></button>
          </div>
       </header>

       <main className="flex-1 p-6 md:p-16 flex justify-center overflow-y-auto">
          {showFull ? (
            <div className="origin-top scale-[0.55] md:scale-90 lg:scale-100 transform transition-all pb-24"><CertificatePreview data={cert!} /></div>
          ) : (
            <div className="max-w-4xl w-full bg-white rounded-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-white overflow-hidden animate-fade-in flex flex-col h-fit fade-in">
               <div className="bg-[#7da441] p-16 text-white flex flex-col md:flex-row justify-between items-center gap-12 relative overflow-hidden">
                  <div className="absolute -right-20 -top-20 opacity-10"><i className="fas fa-certificate text-[300px] rotate-12"></i></div>
                  <div className="flex items-center gap-10 relative z-10">
                     <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-lg border border-white/40 shadow-2xl"><i className="fas fa-check text-5xl"></i></div>
                     <div><h2 className="text-4xl font-black mb-3">تم التحقق بنجاح</h2><p className="text-xl opacity-90 font-bold">المستند معتمد إلكترونياً وصالح حسب سجلات الوزارة</p></div>
                  </div>
               </div>
               
               <div className="p-12 sm:p-20 grid grid-cols-1 md:grid-cols-2 gap-16 relative">
                  <div className="absolute top-16 left-16 p-5 bg-white border border-slate-50 rounded shadow-2xl hidden lg:block"><QRCodeSVG value={encodeDataForQR(cert!)} size={130} level="H" /></div>
                  <div className="space-y-12">
                     <div className="space-y-8">
                        <h3 className="text-xl font-black text-[#7da441] border-r-4 border-[#7da441] pr-4">تفاصيل المستند</h3>
                        <div className="space-y-5">
                           <div className="flex justify-between items-end pb-3 border-b border-gray-50"><span className="text-gray-400 font-bold text-sm">رقم الشهادة</span><span className="font-black text-gray-800 text-lg font-inter">{cert?.certNo}</span></div>
                           <div className="flex justify-between items-end pb-3 border-b border-gray-50"><span className="text-gray-400 font-bold text-sm">تاريخ الإصدار</span><span className="font-black text-gray-800 text-lg">{cert?.dateOfIssue}</span></div>
                           <div className="flex justify-between items-end pb-3 border-b border-gray-50"><span className="text-gray-400 font-bold text-sm">رمز التحقق المعتمد</span><span className="font-black text-[#8b6b21] text-lg font-inter">{cert?.verificationCode}</span></div>
                        </div>
                     </div>
                  </div>
                  <div className="col-span-full">
                     <h3 className="text-xl font-black text-gray-800 mb-8 border-r-4 border-gray-800 pr-4">جهة التصدير المعتمدة</h3>
                     <div className="p-10 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-100 font-black text-xl text-slate-700 uppercase font-inter leading-relaxed text-center">
                        {cert?.exporterNameAddress}
                     </div>
                  </div>
               </div>

               {/* Result Footer with Dynamic Partners */}
               <div className="p-10 bg-gray-50/50 flex flex-wrap justify-center gap-12 border-t border-gray-100 items-center">
                  {branding.partners.map((partner) => (
                    <div key={partner.id} className="flex flex-col items-center gap-2">
                       <img src={partner.logo} className="h-10 object-contain" alt={partner.label} />
                       <span className="text-[8px] font-black text-gray-400 uppercase tracking-tighter">{partner.label}</span>
                    </div>
                  ))}
               </div>
            </div>
          )}
       </main>
    </div>
  );
};

export default VerificationView;
