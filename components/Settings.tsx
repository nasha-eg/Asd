
import React, { useState, useEffect } from 'react';
import { GlobalBranding } from '../types';
import { getGlobalBranding, saveGlobalBranding } from '../services/certificateService';

interface SettingsProps {
  navigate: (path: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ navigate }) => {
  const [branding, setBranding] = useState<GlobalBranding>(getGlobalBranding());

  const handleImageUpload = (field: keyof GlobalBranding) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setBranding(prev => ({ ...prev, [field]: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    saveGlobalBranding(branding);
    alert('تم حفظ إعدادات الهوية البصرية للبوابة بنجاح');
    navigate('#/');
  };

  const ImageCard = ({ label, field, current, icon }: { label: string, field: keyof GlobalBranding, current: string, icon: string }) => (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center gap-4 group hover:shadow-xl transition-all">
      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</h4>
      <div className="w-full h-24 bg-slate-50 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-100 relative overflow-hidden">
        {current ? (
          <img src={current} className="max-h-full max-w-full object-contain p-2" />
        ) : (
          <i className={`fas fa-${icon} text-slate-200 text-3xl`}></i>
        )}
        <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white text-[10px] font-black uppercase">
          تغيير
          <input type="file" className="hidden" onChange={handleImageUpload(field)} />
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-cairo" dir="rtl">
      <header className="h-20 bg-slate-900 border-b border-slate-800 px-8 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('#/')} className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white transition-all">
            <i className="fas fa-chevron-right"></i>
          </button>
          <div>
            <h1 className="text-white font-black text-lg">تخصيص هوية بوابة التحقق</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest font-inter">Global Portal Branding</p>
          </div>
        </div>
        <button onClick={handleSave} className="bg-[#7da441] text-white px-8 py-2.5 rounded-xl font-black text-sm shadow-xl shadow-green-900/20 hover:scale-105 transition-all">
          <i className="fas fa-save ml-2"></i> حفظ الكل
        </button>
      </header>

      <main className="max-w-6xl mx-auto p-10 space-y-12 pb-24">
        <section className="space-y-6">
          <h3 className="text-lg font-black text-slate-800 border-r-4 border-[#7da441] pr-4">الترويسة والتقييم (Header)</h3>
          <div className="grid grid-cols-2 gap-8">
            <ImageCard label="شعار الوزارة الرئيسي" field="portalEmblem" current={branding.portalEmblem} icon="landmark" />
            <ImageCard label="وسام التقييم النجمي" field="portalRatingBadge" current={branding.portalRatingBadge} icon="star" />
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-lg font-black text-slate-800 border-r-4 border-[#7da441] pr-4">البطاقات الترويجية (Partner Cards)</h3>
          <div className="grid grid-cols-3 gap-8">
            <ImageCard label="شعار شرطة أبوظبي" field="partnerLogo1" current={branding.partnerLogo1} icon="shield-halved" />
            <ImageCard label="شعار برنامج التميز" field="partnerLogo2" current={branding.partnerLogo2} icon="medal" />
            <ImageCard label="شعار إسعاد" field="partnerLogo3" current={branding.partnerLogo3} icon="face-smile" />
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-lg font-black text-slate-800 border-r-4 border-[#7da441] pr-4">شعارات التذييل (Footer)</h3>
          <div className="grid grid-cols-3 gap-8">
            <ImageCard label="شعار التذييل الملون" field="footerLogo1" current={branding.footerLogo1} icon="leaf" />
            <ImageCard label="شعار حكومة الإمارات" field="footerLogo2" current={branding.footerLogo2} icon="flag" />
            <ImageCard label="شعار Beeatna" field="footerLogo3" current={branding.footerLogo3} icon="earth-asia" />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Settings;
