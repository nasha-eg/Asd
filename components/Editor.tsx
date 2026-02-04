
import React, { useState, useEffect } from 'react';
import { CertificateData, CertificateItem, CertificateLabels } from '../types';
import { getCertificateById, saveCertificate, generateId, DEFAULT_LABELS } from '../services/certificateService';
import CertificatePreview from './CertificatePreview';

interface EditorProps {
  id?: string;
  navigate: (path: string) => void;
}

const Editor: React.FC<EditorProps> = ({ id, navigate }) => {
  const defaultCertState: CertificateData = {
    id: generateId(),
    certNo: `DXB-APH-02415-3286055`,
    verificationCode: `322-7014`,
    fromOrg: 'United Arab Emirates',
    toOrg: 'Kingdom of Saudi Arabia',
    exporterNameAddress: 'SYTRWL VEGETABLES AND FRUITS TRADING CO - دبي سوق\n- UAE',
    importerNameAddress: 'مؤسسة بستان دارين للخضار والفواكه - السعودية',
    distinguishingMarks: 'NIL',
    pointOfEntry: 'الدمام',
    endUsePurpose: 'Consumption',
    meansOfConveyance: 'By Road 74635',
    importPermitNo: 'NIL',
    totalQuantity: '22200 kg(s)',
    totalNoOfPackages: '3510',
    items: [
      { id: generateId(), scientificName: 'Actinidia deliciosa', commonName: 'Kiwi', origin: 'Chile', pcNo: '2339658', quantity: '1500 KG', noOfPackages: '104', commodityClass: 'Fruits and vegetables' },
      { id: generateId(), scientificName: 'Capsicum spp.', commonName: 'Peppers', origin: 'China', pcNo: '225N670200', quantity: '1000 KG', noOfPackages: '100', commodityClass: 'Fruits and vegetables' },
    ],
    additionalDeclaration: 'NIL',
    disinfestation: {
      chemicals: 'NIL',
      durationTemp: 'NIL',
      treatmentDate: 'NIL',
      treatment: 'NIL',
      concentrationRate: 'NIL',
      additionalInfo: 'NIL'
    },
    placeOfIssue: 'Customer Happiness Center - Dubai',
    dateOfIssue: '11-01-2026',
    dateOfInspection: '11-01-2026',
    officerName: 'Hassan Saeed Al-Younes',
    createdAt: Date.now(),
    logoCenter: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Emblem_of_the_United_Arab_Emirates.svg/1200px-Emblem_of_the_United_Arab_Emirates.svg.png',
    captchaImage: 'https://i.ibb.co/Xz9G1V9/captcha.png',
    captchaValue: '12345',
    labels: DEFAULT_LABELS
  };

  const [cert, setCert] = useState<CertificateData>(defaultCertState);
  const [activeTab, setActiveTab] = useState<'basic' | 'consignment' | 'items' | 'treatment' | 'branding' | 'security' | 'labels'>('basic');
  const [labelSearch, setLabelSearch] = useState('');

  useEffect(() => {
    if (id) {
      const existing = getCertificateById(id);
      if (existing) setCert(existing);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('labels.')) {
      const field = name.split('.')[1];
      setCert(prev => ({ ...prev, labels: { ...prev.labels, [field]: value } }));
    } else if (name.startsWith('disinfestation.')) {
      const field = name.split('.')[1];
      setCert(prev => ({ ...prev, disinfestation: { ...prev.disinfestation, [field]: value } }));
    } else {
      setCert(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = (field: keyof CertificateData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setCert(prev => ({ ...prev, [field]: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const handleItemChange = (itemId: string, field: keyof CertificateItem, value: string) => {
    setCert(prev => ({
      ...prev,
      items: prev.items.map(item => item.id === itemId ? { ...item, [field]: value } : item)
    }));
  };

  const addItem = () => {
    setCert(prev => ({ ...prev, items: [...prev.items, { id: generateId(), scientificName: '', commonName: '', origin: '', pcNo: '', quantity: '', noOfPackages: '', commodityClass: '' }] }));
  };

  const handleSave = () => {
    saveCertificate(cert);
    alert('تم حفظ كافة البيانات بنجاح');
    navigate('#/');
  };

  const ImageUploadCard = ({ label, field, currentImage, icon }: { label: string, field: keyof CertificateData, currentImage?: string, icon: string }) => (
    <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100 space-y-3 flex flex-col items-center group transition-all hover:shadow-md">
      <label className="text-[11px] font-black text-slate-800 block text-center uppercase tracking-tighter">{label}</label>
      <div className="h-24 w-full bg-white rounded-2xl flex items-center justify-center border border-slate-100 shadow-inner overflow-hidden relative">
         {currentImage ? (
           <img src={currentImage} className="h-full object-contain mix-blend-multiply transition-transform group-hover:scale-110" />
         ) : (
           <i className={`fas fa-${icon} text-slate-100 text-3xl`}></i>
         )}
         <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <label className="cursor-pointer text-white text-[10px] font-black bg-slate-900 px-3 py-1.5 rounded-full">تعديل</label>
         </div>
      </div>
      <input type="file" onChange={handleImageUpload(field)} className="hidden" id={`upload-${field}`} />
      <label htmlFor={`upload-${field}`} className="text-[9px] font-black text-slate-400 cursor-pointer hover:text-[#7da441]">اختر ملفاً</label>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-slate-950 font-cairo overflow-hidden" dir="rtl">
      {/* Header */}
      <header className="flex-none h-20 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between z-50">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('#/')} className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-all text-slate-300">
            <i className="fas fa-chevron-right"></i>
          </button>
          <div>
            <h1 className="text-white font-black text-lg">المحرر الاحترافي</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest font-inter">{cert.certNo || 'جديد'}</p>
          </div>
        </div>

        <nav className="flex items-center gap-1 bg-slate-800/50 p-1 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
          {[
            { id: 'basic', label: 'عام', icon: 'info-circle' },
            { id: 'consignment', label: 'الإرسالية', icon: 'box' },
            { id: 'items', label: 'الأصناف', icon: 'table' },
            { id: 'treatment', label: 'المعاملة', icon: 'flask' },
            { id: 'branding', label: 'الأختام', icon: 'stamp' },
            { id: 'security', label: 'الأمان', icon: 'shield-halved' },
            { id: 'labels', label: 'النصوص', icon: 'language' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-[11px] font-black transition-all flex items-center gap-2 ${activeTab === tab.id ? 'bg-[#7da441] text-white shadow-xl shadow-green-900/30' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <i className={`fas fa-${tab.icon}`}></i>
              <span className="hidden lg:inline">{tab.label}</span>
            </button>
          ))}
        </nav>

        <button onClick={handleSave} className="bg-white text-slate-950 px-8 py-3 rounded-xl font-black text-sm shadow-xl hover:scale-105 transition-all flex items-center gap-3">
          <i className="fas fa-save text-green-600"></i>
          حفظ الملف
        </button>
      </header>

      <div className="flex-1 flex overflow-hidden flex-row-reverse" dir="ltr">
        <div className="w-[500px] xl:w-[650px] bg-white overflow-y-auto p-8 border-r border-slate-100" dir="rtl">
          <div className="space-y-12 pb-20">
            
            {activeTab === 'basic' && (
              <div className="space-y-8 animate-fade-in">
                <h3 className="text-lg font-black text-slate-800 border-r-4 border-[#7da441] pr-4">المعلومات الأساسية والتوثيق</h3>
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase">رقم الشهادة (Cert No.)</label>
                    <input name="certNo" value={cert.certNo} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-black outline-none font-inter" dir="ltr" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase">رمز التحقق (Verify Code)</label>
                    <input name="verificationCode" value={cert.verificationCode} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-black outline-none font-inter" dir="ltr" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase">من منظمة وقاية النباتات في</label>
                    <input name="fromOrg" value={cert.fromOrg} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase">إلى منظمة وقاية النباتات في</label>
                    <input name="toOrg" value={cert.toOrg} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-bold" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase">مكان الإصدار</label>
                    <input name="placeOfIssue" value={cert.placeOfIssue} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase">الموظف المعتمد</label>
                    <input name="officerName" value={cert.officerName} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-bold" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'consignment' && (
              <div className="space-y-8 animate-fade-in">
                <h3 className="text-lg font-black text-slate-800 border-r-4 border-[#7da441] pr-4">تفاصيل الإرسالية والكميات</h3>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase">اسم وعنوان المصدر (كامل)</label>
                  <textarea name="exporterNameAddress" value={cert.exporterNameAddress} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-bold h-28 uppercase font-inter leading-relaxed" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase">اسم وعنوان المستورد (كامل)</label>
                  <textarea name="importerNameAddress" value={cert.importerNameAddress} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-bold h-28 leading-relaxed" />
                </div>
                <div className="grid grid-cols-2 gap-5">
                   <div className="space-y-2">
                     <label className="text-[11px] font-black text-slate-400 uppercase">العلامات المميزة</label>
                     <input name="distinguishingMarks" value={cert.distinguishingMarks} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-bold" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[11px] font-black text-slate-400 uppercase">نقطة الدخول</label>
                     <input name="pointOfEntry" value={cert.pointOfEntry} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-bold" />
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                   <div className="space-y-2">
                     <label className="text-[11px] font-black text-slate-400 uppercase">وسيلة النقل</label>
                     <input name="meansOfConveyance" value={cert.meansOfConveyance} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-bold" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[11px] font-black text-slate-400 uppercase">غرض الاستعمال</label>
                     <input name="endUsePurpose" value={cert.endUsePurpose} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-bold" />
                   </div>
                </div>
                <div className="grid grid-cols-3 gap-5">
                   <div className="space-y-2">
                     <label className="text-[11px] font-black text-slate-400 uppercase">إجمالي الكمية</label>
                     <input name="totalQuantity" value={cert.totalQuantity} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-bold" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[11px] font-black text-slate-400 uppercase">إجمالي الطرود</label>
                     <input name="totalNoOfPackages" value={cert.totalNoOfPackages} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-bold" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[11px] font-black text-slate-400 uppercase">إذن الاستيراد</label>
                     <input name="importPermitNo" value={cert.importPermitNo} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-bold" />
                   </div>
                </div>
              </div>
            )}

            {activeTab === 'items' && (
              <div className="space-y-8 animate-fade-in">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-black text-slate-800 border-r-4 border-[#7da441] pr-4">قائمة الأصناف</h3>
                  <button onClick={addItem} className="bg-slate-900 text-white px-5 py-2 rounded-xl text-xs font-black flex items-center gap-2 hover:bg-[#7da441] transition-all">
                    <i className="fas fa-plus"></i> إضافة صنف
                  </button>
                </div>
                <div className="space-y-4">
                  {cert.items.map((item, idx) => (
                    <div key={item.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 relative group">
                      <button onClick={() => setCert(p => ({...p, items: p.items.filter(i => i.id !== item.id)}))} className="absolute top-4 left-4 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <i className="fas fa-trash"></i>
                      </button>
                      <div className="grid grid-cols-2 gap-4">
                        <input placeholder="Scientific Name" value={item.scientificName} onChange={e => handleItemChange(item.id, 'scientificName', e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs italic font-black uppercase font-inter" />
                        <input placeholder="Common Name" value={item.commonName} onChange={e => handleItemChange(item.id, 'commonName', e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-bold" />
                        <input placeholder="Origin" value={item.origin} onChange={e => handleItemChange(item.id, 'origin', e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-bold" />
                        <input placeholder="Quantity" value={item.quantity} onChange={e => handleItemChange(item.id, 'quantity', e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-bold" />
                        <input placeholder="Packages" value={item.noOfPackages} onChange={e => handleItemChange(item.id, 'noOfPackages', e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-bold" />
                        <input placeholder="Commodity Class" value={item.commodityClass} onChange={e => handleItemChange(item.id, 'commodityClass', e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-bold" />
                        <input placeholder="PC No." value={item.pcNo} onChange={e => handleItemChange(item.id, 'pcNo', e.target.value)} className="w-full col-span-2 bg-white border border-slate-200 rounded-xl p-3 text-xs font-black font-inter" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'treatment' && (
              <div className="space-y-8 animate-fade-in">
                <h3 className="text-lg font-black text-slate-800 border-r-4 border-[#7da441] pr-4">بيانات المعاملة والإقرار</h3>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase">المواد الكيميائية</label>
                    <input name="disinfestation.chemicals" value={cert.disinfestation.chemicals} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-bold" />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-slate-400 uppercase">مدة التعرض والحرارة</label>
                      <input name="disinfestation.durationTemp" value={cert.disinfestation.durationTemp} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-bold" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-slate-400 uppercase">تاريخ المعاملة</label>
                      <input name="disinfestation.treatmentDate" value={cert.disinfestation.treatmentDate} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-bold" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase">الإقرار الإضافي (Additional Declaration)</label>
                    <textarea name="additionalDeclaration" value={cert.additionalDeclaration} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-bold h-24 leading-relaxed uppercase font-inter" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'branding' && (
              <div className="space-y-12 animate-fade-in">
                <h3 className="text-lg font-black text-slate-800 border-r-4 border-[#7da441] pr-4">أختام وتواقيع الشهادة المطبوعة</h3>
                <div className="grid grid-cols-3 gap-6">
                  <ImageUploadCard label="الشعار العلوي" field="logoCenter" currentImage={cert.logoCenter} icon="landmark" />
                  <ImageUploadCard label="الختم الرسمي" field="officialStamp" currentImage={cert.officialStamp} icon="stamp" />
                  <ImageUploadCard label="توقيع الموظف" field="officerSignature" currentImage={cert.officerSignature} icon="signature" />
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-8 animate-fade-in">
                <h3 className="text-lg font-black text-slate-800 border-r-4 border-[#7da441] pr-4">أمان الملف (كود التحقق)</h3>
                <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100 flex flex-col items-center gap-6">
                  <div className="w-full max-w-[280px] h-20 bg-white rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden relative group">
                     {cert.captchaImage ? <img src={cert.captchaImage} className="h-full object-contain" /> : <i className="fas fa-image text-slate-200 text-2xl"></i>}
                     <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white text-xs font-black">
                       رفع الصورة المسماة بالأرقام
                       <input type="file" className="hidden" onChange={handleImageUpload('captchaImage')} />
                     </label>
                  </div>
                  <input name="captchaValue" value={cert.captchaValue} onChange={handleChange} placeholder="أدخل الأرقام الظاهرة بالصورة..." className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-center text-xl font-black font-inter tracking-[0.5em] outline-none" />
                </div>
              </div>
            )}

            {activeTab === 'labels' && (
              <div className="space-y-8 animate-fade-in">
                <div className="relative">
                  <input type="text" placeholder="ابحث في النصوص..." value={labelSearch} onChange={e => setLabelSearch(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 pr-12 text-sm outline-none focus:ring-2 focus:ring-green-100" />
                  <i className="fas fa-search absolute right-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
                </div>
                <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                  {Object.keys(cert.labels)
                    .filter(key => key.toLowerCase().includes(labelSearch.toLowerCase()) || (cert.labels[key as keyof CertificateLabels] as string).includes(labelSearch))
                    .map(key => (
                    <div key={key} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 transition-colors">
                      <label className="text-[10px] font-black text-[#7da441] uppercase block mb-1">{key}</label>
                      <textarea name={`labels.${key}`} value={cert.labels[key as keyof CertificateLabels] as string} onChange={handleChange} rows={1} className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm font-bold resize-none" />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        <div className="flex-1 bg-slate-900 flex flex-col items-center justify-start p-10 overflow-y-auto no-print">
          <div className="origin-top scale-[0.4] xl:scale-[0.5] 2xl:scale-[0.75] shadow-2xl transition-all rounded-sm">
            <CertificatePreview data={cert} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
