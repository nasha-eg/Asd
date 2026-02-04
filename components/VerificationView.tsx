
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
        setError('عذراً، كود التحقق غير صحيح.');
        return;
      }
      setCert(result);
      setIsSearching(false);
      setError('');
    } else {
      setError('عذراً، لم يتم العثور على بيانات مطابقة. يرجى التأكد من الحقول المطلوبة (*) إلزامية.');
    }
  };

  if (isSearching) {
    return (
      <div className="min-h-screen bg-white font-cairo flex flex-col text-[#333]" dir="rtl">
        {/* Top Header Section */}
        <header className="bg-white border-b border-gray-100 no-print">
          <div className="max-w-[1240px] mx-auto px-4 h-24 flex justify-between items-center">
            <div className="flex items-center gap-6">
              <img src={branding.portalEmblem} className="h-20" alt="MOCCAE Logo" />
              <img src={branding.portalRatingBadge} className="h-14 hidden sm:block" alt="Star Rating" />
            </div>
            
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-5 text-[12px] font-bold text-gray-500">
                <span className="cursor-pointer hover:text-[#8b6b21] flex items-center gap-1"><i className="fas fa-chevron-down text-[8px]"></i> Language</span>
                <i className="fas fa-cog cursor-pointer"></i>
                <i className="fas fa-user cursor-pointer"></i>
                <i className="fas fa-search cursor-pointer"></i>
                <i className="fas fa-home cursor-pointer text-lg" onClick={() => navigate('#/')}></i>
              </div>
              <nav className="hidden lg:flex items-center gap-6 text-[14px] font-black text-gray-700 mt-2">
                <span className="cursor-pointer hover:text-[#8b6b21]">عن الوزارة</span>
                <span className="cursor-pointer hover:text-[#8b6b21]">التشريعات</span>
                <span className="cursor-pointer hover:text-[#8b6b21]">خدماتنا</span>
                <span className="cursor-pointer hover:text-[#8b6b21]">المعرفة</span>
                <span className="cursor-pointer hover:text-[#8b6b21]">المشاركة الالكترونية</span>
                <span className="cursor-pointer hover:text-[#8b6b21]">المركز الإعلامي</span>
                <span className="cursor-pointer hover:text-[#8b6b21]">البيانات المفتوحة</span>
              </nav>
            </div>
          </div>
        </header>

        {/* Path / Breadcrumb Bar */}
        <div className="bg-[#fcfcfc] border-b border-gray-100 py-2 no-print">
          <div className="max-w-[1240px] mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400">
              <span className="hover:text-gray-600 cursor-pointer">الصفحة الرئيسية</span>
              <i className="fas fa-chevron-left text-[7px]"></i>
              <span className="hover:text-gray-600 cursor-pointer">مساحة العمل</span>
              <i className="fas fa-chevron-left text-[7px]"></i>
              <span className="text-[#8b6b21]">مركز الشهادات والتصاريح الرقمية</span>
            </div>
            <div className="flex items-center gap-4 text-gray-400">
              <span className="text-sm font-bold">A+</span>
              <span className="text-sm font-bold">A-</span>
              <i className="fas fa-print cursor-pointer"></i>
            </div>
          </div>
        </div>

        <main className="flex-1 max-w-[1240px] mx-auto w-full py-8 px-4 flex flex-col lg:flex-row-reverse gap-8">
          {/* Sidebar Right */}
          <aside className="w-full lg:w-[280px] space-y-4 order-2 lg:order-1 no-print">
            <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
              <div className="bg-[#f5f5f5] p-4 text-[15px] font-black border-b border-gray-200 text-gray-600">روابط هامة</div>
              <div className="flex flex-col">
                {['تسجيل دخول', 'رد الإيراد الإلكتروني', 'دليل استخدام الخدمات الرقمية', 'مركز الشهادات والتصاريح الرقمية'].map((link, i) => (
                  <div key={i} className={`p-4 text-[13px] font-bold flex justify-between items-center cursor-pointer transition-colors ${i === 3 ? 'bg-[#eee] text-gray-800' : 'text-gray-500 hover:bg-gray-50'}`}>
                    {link}
                    <i className="fas fa-chevron-left text-[10px] opacity-30"></i>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 order-1 lg:order-2">
            <h2 className="text-[22px] font-black text-gray-700 mb-6">مركز الشهادات والتصاريح الرقمية</h2>
            <p className="text-[13px] text-gray-400 font-bold mb-10 leading-relaxed max-w-4xl">
              يمكنك الآن التحقق من الشهادات أو التصاريح التي يتم إصدارها من وزارة التغير المناخي والبيئة من خلال إدخال رقم المستند (رقم الشهادة أو رقم التصريح) ثم إدخال كود التحقق المذكور على المستند.
              الحقول المشار إليها بعلامة ( * ) إلزامية.
            </p>

            <form onSubmit={handleSearch} className="space-y-6 max-w-3xl no-print mb-20">
              {/* Field 1: Cert No */}
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <label className="md:w-48 text-[13px] font-black text-gray-700 text-left md:text-right">رقم الشهادة *</label>
                <div className="flex-1 relative">
                  <input 
                    required
                    value={searchCertNo} 
                    onChange={e => setSearchCertNo(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded px-10 py-2.5 text-[14px] font-bold font-inter h-11 focus:border-[#8b6b21] outline-none" 
                    dir="ltr"
                    placeholder="DXB-APH-02415-3286055"
                  />
                  <i className="fas fa-microphone absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"></i>
                </div>
              </div>

              {/* Field 2: Verify Code */}
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <label className="md:w-48 text-[13px] font-black text-gray-700 text-left md:text-right">رمز التحقق *</label>
                <div className="flex-1 relative">
                  <input 
                    required
                    value={searchVerifyCode} 
                    onChange={e => setSearchVerifyCode(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded px-10 py-2.5 text-[14px] font-bold font-inter h-11 focus:border-[#8b6b21] outline-none" 
                    dir="ltr"
                    placeholder="322-7014"
                  />
                  <i className="fas fa-microphone absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"></i>
                </div>
              </div>

              {/* Field 3: Captcha */}
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <label className="md:w-48 text-[13px] font-black text-gray-700 text-left md:text-right">ادخل الأحرف الظاهره *</label>
                <div className="flex-1 flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <input 
                      required
                      value={captchaInput}
                      onChange={e => setCaptchaInput(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded px-10 py-2.5 text-[14px] outline-none focus:border-[#8b6b21] h-11 text-center font-black tracking-widest font-inter"
                      placeholder="XXXXX"
                    />
                    <i className="fas fa-info-circle absolute right-3 top-1/2 -translate-y-1/2 text-[#8b6b21] cursor-help"></i>
                    <i className="fas fa-microphone absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"></i>
                  </div>
                  <div className="flex items-center gap-2 bg-[#f9f9f9] border border-gray-200 rounded px-3 py-1">
                     <img 
                      src={findCertificateByPublicInfo(searchCertNo, searchVerifyCode)?.captchaImage || 'https://i.ibb.co/Xz9G1V9/captcha.png'} 
                      className="h-9 object-contain opacity-70" 
                      alt="Captcha" 
                     />
                     <button type="button" className="text-gray-400 hover:text-black p-1 transition-transform active:rotate-180 duration-500">
                        <i className="fas fa-sync-alt text-xs"></i>
                     </button>
                  </div>
                </div>
              </div>

              {error && <div className="text-red-500 text-[11px] font-black mt-2 md:pr-48">{error}</div>}

              <div className="flex justify-start gap-3 md:pr-48 pt-4">
                <button type="submit" className="bg-[#8b6b21] hover:bg-gray-800 text-white px-10 py-2.5 rounded text-[13px] font-black transition-all min-w-[100px]">إرسال</button>
                <button type="reset" onClick={() => {setSearchCertNo(''); setSearchVerifyCode(''); setError(''); setCaptchaInput('')}} className="bg-gray-300 hover:bg-gray-400 text-white px-10 py-2.5 rounded text-[13px] font-black transition-all min-w-[100px]">مسح</button>
              </div>
            </form>

            {/* Bottom Partners Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20 no-print">
              <div className="bg-[#fcfcfc] border border-gray-100 p-8 rounded-lg flex items-center justify-center hover:shadow-md transition-shadow">
                <img src={branding.partnerLogo1} className="h-20 object-contain" alt="Partner 1" />
              </div>
              <div className="bg-[#fcfcfc] border border-gray-100 p-8 rounded-lg flex items-center justify-center hover:shadow-md transition-shadow">
                <img src={branding.partnerLogo2} className="h-20 object-contain" alt="Partner 2" />
              </div>
              <div className="bg-[#fcfcfc] border border-gray-100 p-8 rounded-lg flex items-center justify-center hover:shadow-md transition-shadow">
                <img src={branding.partnerLogo3} className="h-20 object-contain" alt="Partner 3" />
              </div>
            </div>
          </div>
        </main>

        {/* Deep Footer */}
        <footer className="bg-white border-t border-gray-100 mt-20 no-print pt-10">
          <div className="max-w-[1240px] mx-auto px-4 pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start mb-12 border-b border-gray-50 pb-12 gap-10">
              <div className="space-y-6">
                 <div className="flex items-center gap-6 text-[13px] font-bold text-gray-400">
                   <span>عدد الزوار: 4254879</span>
                   <div className="flex items-center gap-3">
                     <span>تحميل تطبيق الهاتف المحمول:</span>
                     <i className="fab fa-apple text-lg cursor-pointer hover:text-black"></i>
                     <i className="fab fa-android text-lg cursor-pointer hover:text-black"></i>
                   </div>
                 </div>
                 <div className="flex items-center gap-4 text-gray-300">
                   <span className="text-[12px] hover:text-[#8b6b21] cursor-pointer">اشترك في النشرة الإخبارية</span>
                   <span className="text-[12px] bg-gray-100 px-4 py-1 rounded-full text-gray-500 cursor-pointer">اشتراك</span>
                 </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                 <div className="space-y-3">
                   <h4 className="font-black text-gray-800 text-[14px]">عن الموقع</h4>
                   <ul className="text-[12px] text-gray-400 space-y-1 font-bold">
                     <li className="hover:text-[#8b6b21] cursor-pointer">حقوق النسخ</li>
                     <li className="hover:text-[#8b6b21] cursor-pointer">سياسة الخصوصية</li>
                     <li className="hover:text-[#8b6b21] cursor-pointer">الشروط والأحكام</li>
                     <li className="hover:text-[#8b6b21] cursor-pointer">إخلاء المسؤولية</li>
                   </ul>
                 </div>
                 <div className="space-y-3">
                   <h4 className="font-black text-gray-800 text-[14px]">روابط سريعة</h4>
                   <ul className="text-[12px] text-gray-400 space-y-1 font-bold">
                     <li className="hover:text-[#8b6b21] cursor-pointer">النشرة الإخبارية</li>
                     <li className="hover:text-[#8b6b21] cursor-pointer">الصفحة الرئيسية</li>
                     <li className="hover:text-[#8b6b21] cursor-pointer">إمكانية الوصول</li>
                     <li className="hover:text-[#8b6b21] cursor-pointer">بوابتي</li>
                   </ul>
                 </div>
                 <div className="space-y-3">
                    <h4 className="font-black text-gray-800 text-[14px]">اتصل بنا</h4>
                    <ul className="text-[12px] text-gray-400 space-y-1 font-bold">
                      <li className="hover:text-[#8b6b21] cursor-pointer">اتصل بنا</li>
                      <li className="hover:text-[#8b6b21] cursor-pointer">البحث المتقدم</li>
                      <li className="hover:text-[#8b6b21] cursor-pointer">خريطة الموقع</li>
                    </ul>
                 </div>
                 <div className="flex flex-col gap-4">
                   <img src={branding.footerLogo1} className="h-14 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" />
                   <img src={branding.footerLogo2} className="h-12 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" />
                   <img src={branding.footerLogo3} className="h-10 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" />
                 </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center py-6 text-[12px] font-bold text-gray-400">
               <div className="flex items-center gap-6">
                 <span className="flex items-center gap-2"><i className="fas fa-phone-alt"></i> 800 30 50</span>
                 <div className="flex items-center gap-4 text-lg">
                   <i className="fab fa-linkedin hover:text-[#8b6b21] cursor-pointer"></i>
                   <i className="fab fa-instagram hover:text-[#8b6b21] cursor-pointer"></i>
                   <i className="fab fa-youtube hover:text-[#8b6b21] cursor-pointer"></i>
                   <i className="fab fa-twitter hover:text-[#8b6b21] cursor-pointer"></i>
                   <i className="fab fa-facebook hover:text-[#8b6b21] cursor-pointer"></i>
                 </div>
               </div>
               <div>حقوق الطبع © 2023 جميع الحقوق محفوظة. وزارة التغير المناخي والبيئة.</div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Result view remains similar to previous successful verification but matches color scheme
  return (
    <div className="min-h-screen bg-slate-50 font-cairo flex flex-col" dir="rtl">
       <header className="h-20 bg-white border-b px-10 flex items-center justify-between sticky top-0 z-50 no-print">
          <div className="flex items-center gap-6">
            <img src={branding.portalEmblem} className="h-14" alt="Emblem" />
          </div>
          <div className="flex gap-4">
            <button onClick={() => setShowFull(!showFull)} className="bg-slate-800 text-white px-6 py-2.5 rounded font-bold text-sm">{showFull ? 'عرض الملخص' : 'عرض الشهادة الكاملة'}</button>
            <button onClick={() => window.print()} className="bg-[#8b6b21] text-white px-6 py-2.5 rounded font-bold text-sm shadow-lg shadow-amber-200"><i className="fas fa-print ml-2"></i> طباعة كملف PDF</button>
            <button onClick={() => setIsSearching(true)} className="text-gray-400 hover:text-black"><i className="fas fa-times text-xl"></i></button>
          </div>
       </header>

       <main className="flex-1 p-6 md:p-12 flex justify-center overflow-y-auto">
          {showFull ? (
            <div className="origin-top scale-[0.6] md:scale-90 lg:scale-100 transform transition-all pb-20"><CertificatePreview data={cert!} /></div>
          ) : (
            <div className="max-w-4xl w-full bg-white rounded-lg shadow-2xl border border-white overflow-hidden animate-fade-in no-print flex flex-col h-fit">
               <div className="bg-[#7da441] p-12 sm:p-16 text-white flex flex-col md:flex-row justify-between items-center gap-10">
                  <div className="flex items-center gap-8">
                     <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30"><i className="fas fa-check text-4xl"></i></div>
                     <div><h2 className="text-3xl sm:text-4xl font-black mb-2">تم التحقق بنجاح</h2><p className="text-lg opacity-80 font-bold">المستند صالح ومطابق للسجلات الرسمية</p></div>
                  </div>
               </div>
               <div className="p-10 sm:p-16 grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 relative">
                  <div className="absolute top-16 left-16 p-4 bg-white border border-slate-100 rounded shadow-xl hidden md:block"><QRCodeSVG value={encodeDataForQR(cert!)} size={110} level="H" /></div>
                  <div className="space-y-10">
                     <h3 className="text-xl font-black text-[#7da441] border-r-4 border-[#7da441] pr-4">تفاصيل الوثيقة</h3>
                     <div className="space-y-4">
                        <div className="flex justify-between pb-3 border-b border-slate-50"><span className="text-slate-400 font-bold">رقم الشهادة</span><span className="font-black text-slate-800 font-inter">{cert?.certNo}</span></div>
                        <div className="flex justify-between pb-3 border-b border-slate-50"><span className="text-slate-400 font-bold">تاريخ الإصدار</span><span className="font-black text-slate-800">{cert?.dateOfIssue}</span></div>
                     </div>
                  </div>
                  <div className="col-span-full">
                     <h3 className="text-xl font-black text-slate-800 mb-6">اسم وعنوان المصدر المعتمد</h3>
                     <div className="p-8 bg-slate-50 rounded border border-slate-100 font-black text-lg text-slate-700 uppercase font-inter leading-relaxed">{cert?.exporterNameAddress}</div>
                  </div>
               </div>
            </div>
          )}
       </main>
    </div>
  );
};

export default VerificationView;
