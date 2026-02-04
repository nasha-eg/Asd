
import React, { useState } from 'react';
import { GlobalBranding, PartnerItem } from '../types';
import { getGlobalBranding, saveGlobalBranding, generateId } from '../services/certificateService';

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

  const handlePartnerImage = (partnerId: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBranding(prev => ({
          ...prev,
          partners: prev.partners.map(p => p.id === partnerId ? { ...p, logo: reader.result as string } : p)
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePartnerLabel = (partnerId: string, label: string) => {
    setBranding(prev => ({
      ...prev,
      partners: prev.partners.map(p => p.id === partnerId ? { ...p, label } : p)
    }));
  };

  const addPartner = () => {
    setBranding(prev => ({
      ...prev,
      partners: [...prev.partners, { id: generateId(), logo: '', label: 'شريك جديد' }]
    }));
  };

  const removePartner = (id: string) => {
    setBranding(prev => ({
      ...prev,
      partners: prev.partners.filter(p => p.id !== id)
    }));
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
      <header className="h-20 bg-slate-900 border-b border-slate-800 px-8 flex items-center justify-between sticky top-0 z-50 no-print">
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
        {/* Header Branding */}
        <section className="space-y-6">
          <h3 className="text-lg font-black text-slate-800 border-r-4 border-[#7da441] pr-4">الترويسة والتقييم (Header)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ImageCard label="شعار الوزارة الرئيسي" field="portalEmblem" current={branding.portalEmblem} icon="landmark" />
            <ImageCard label="وسام التقييم النجمي" field="portalRatingBadge" current={branding.portalRatingBadge} icon="star" />
          </div>
        </section>

        {/* Dynamic Partners Branding */}
        <section className="space-y-6">
          <div className="flex justify-between items-center border-r-4 border-[#8b6b21] pr-4">
            <h3 className="text-lg font-black text-slate-800">الشركاء والجوائز (Partners)</h3>
            <button onClick={addPartner} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-black hover:bg-[#8b6b21] transition-all">
              <i className="fas fa-plus ml-2"></i> إضافة شريك
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {branding.partners.map((partner) => (
              <div key={partner.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4 group relative hover:shadow-xl transition-all">
                <button onClick={() => removePartner(partner.id)} className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-red-50 text-red-500 shadow-sm flex items-center justify-center hover:bg-red-500 hover:text-white transition-all z-10">
                   <i className="fas fa-times text-xs"></i>
                </button>
                
                <div className="w-full h-32 bg-slate-50 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-100 relative overflow-hidden group/img">
                  {partner.logo ? (
                    <img src={partner.logo} className="max-h-full max-w-full object-contain p-2" />
                  ) : (
                    <i className="fas fa-image text-slate-100 text-4xl"></i>
                  )}
                  <label className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white text-[10px] font-black">
                    تحميل الشعار
                    <input type="file" className="hidden" onChange={handlePartnerImage(partner.id)} />
                  </label>
                </div>
                
                <div className="space-y-1">
                   <label className="text-[10px] font-black text-slate-400 uppercase">اسم الشريك / المسمى</label>
                   <input 
                    value={partner.label} 
                    onChange={(e) => handlePartnerLabel(partner.id, e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-lg p-2.5 text-xs font-bold focus:border-[#8b6b21] outline-none"
                    placeholder="مثال: جائزة التميز..."
                   />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Branding */}
        <section className="space-y-6">
          <h3 className="text-lg font-black text-slate-800 border-r-4 border-slate-400 pr-4">شعارات التذييل (Footer)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
