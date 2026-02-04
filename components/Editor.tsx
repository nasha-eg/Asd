
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
    placeOfIssue: 'مركز إسعاد المتعاملين - دبي',
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
  const [mobileView, setMobileView] = useState<'edit' | 'preview'>('edit');
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
    alert('تم حفظ البيانات بنجاح');
    navigate('#/');
  };

  const ImageUploadCard = ({ label, field, currentImage, icon }: { label: string, field: keyof CertificateData, currentImage?: string, icon: string }) => (
    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 flex flex-col items-center group transition-all hover:bg-white hover:shadow-lg">
      <label className="text-[11px] font-black text-slate-800 block text-center uppercase tracking-tight">{label}</label>
      <div className="h-24 w-full bg-white rounded-xl flex items-center justify-center border-2 border-dashed border-slate-200 shadow-inner overflow-hidden relative">
         {currentImage ? (
           <img src={currentImage} className="max-h-full max-w-full object-contain p-2 transition-transform group-hover:scale-110" />
         ) : (
           <i className={`fas fa-${icon} text-slate-100 text-3xl`}></i>
         )}
         <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <label className="cursor-pointer text-white text-[10px] font-black bg-slate-900 px-3 py-1.5 rounded-full hover:scale-105 active:scale-95 transition-all">تعديل</label>
         </div>
      </div>
      <input type="file" onChange={handleImageUpload(field)} className="hidden" id={`upload-${field}`} />
      <label htmlFor={`upload-${field}`} className="text-[10px] font-black text-[#8b6b21] cursor-pointer underline">تغيير</label>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 font-cairo overflow-hidden" dir="rtl">
      {/* Header */}
      <header className="no-print flex-none h-16 md:h-20 bg-slate-950 border-b border-slate-800 px-4 md:px-8 flex items-center justify-between z-50">
        <div className="flex items-center gap-3 md:gap-6">
          <button onClick={() => navigate('#/')} className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-all text-white">
            <i className="fas fa-chevron-right"></i>
          </button>
          <div>
            <h1 className="text-white font-black text-sm md:text-xl truncate max-w-[150px] md:max-w-none">محرر الوثائق</h1>
            <p className="hidden md:block text-[11px] text-[#8b6b21] font-bold uppercase tracking-widest font-inter">{cert.certNo}</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-800/50 p-1.5 rounded-2xl border border-slate-700/50 backdrop-blur-xl">
          {[
            { id: 'basic', label: 'عام', icon: 'info-circle' },
            { id: 'consignment', label: 'الإرسالية', icon: 'box' },
            { id: 'items', label: 'الأصناف', icon: 'list-check' },
            { id: 'treatment', label: 'المعاملة', icon: 'vial' },
            { id: 'branding', label: 'الأختام', icon: 'stamp' },
            { id: 'security', label: 'الأمان', icon: 'shield-check' },
            { id: 'labels', label: 'النصوص', icon: 'language' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-[12px] font-black transition-all flex items-center gap-2 ${activeTab === tab.id ? 'bg-[#7da441] text-white shadow-lg' : 'text-slate-400 hover:text-slate-100'}`}
            >
              <i className={`fas fa-${tab.icon}`}></i>
              <span className="hidden xl:inline">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
            <button 
                onClick={() => setMobileView(mobileView === 'edit' ? 'preview' : 'edit')}
                className="lg:hidden bg-slate-800 text-white w-10 h-10 rounded-xl flex items-center justify-center"
            >
                <i className={`fas fa-${mobileView === 'edit' ? 'eye' : 'edit'}`}></i>
            </button>
            <button onClick={handleSave} className="bg-white text-slate-950 px-4 md:px-8 py-2 md:py-3 rounded-xl font-black text-[12px] md:text-sm shadow-2xl hover:bg-[#7da441] hover:text-white transition-all flex items-center gap-2">
              <i className="fas fa-save"></i>
              <span className="hidden sm:inline">حفظ</span>
            </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden flex-col lg:flex-row-reverse" dir="ltr">
        
        {/* Editor Side */}
        <div className={`w-full lg:w-[450px] 2xl:w-[550px] bg-white overflow-y-auto p-4 md:p-8 border-r border-slate-200 shadow-2xl z-40 no-print ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`} dir="rtl">
          
          {/* Mobile Tabs */}
          <div className="lg:hidden flex overflow-x-auto gap-2 mb-6 pb-2 no-scrollbar">
            {[
                { id: 'basic', label: 'عام', icon: 'info-circle' },
                { id: 'consignment', label: 'الإرسالية', icon: 'box' },
                { id: 'items', label: 'الأصناف', icon: 'list-check' },
                { id: 'treatment', label: 'المعاملة', icon: 'vial' },
                { id: 'branding', label: 'الأختام', icon: 'stamp' },
                { id: 'security', label: 'الأمان', icon: 'shield-check' },
                { id: 'labels', label: 'النصوص', icon: 'language' }
            ].map(tab => (
                <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeTab === tab.id ? 'bg-[#7da441] text-white' : 'bg-slate-100 text-slate-500'}`}
                >
                    <i className={`fas fa-${tab.icon}`}></i>
                    {tab.label}
                </button>
            ))}
          </div>

          <div className="space-y-8 pb-32">
            
            {activeTab === 'basic' && (
              <div className="space-y-6 fade-in">
                <h3 className="text-lg font-black text-gray-800 border-r-4 border-[#7da441] pr-3">البيانات الأساسية</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-black text-gray-400">رقم الشهادة</label>
                    <input name="certNo" value={cert.certNo} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-black outline-none font-inter focus:border-[#8b6b21]" dir="ltr" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-black text-gray-400">رمز التحقق</label>
                    <input name="verificationCode" value={cert.verificationCode} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-black outline-none font-inter focus:border-[#8b6b21]" dir="ltr" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-black text-gray-400">من (بلد التصدير)</label>
                    <input name="fromOrg" value={cert.fromOrg} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-bold" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-black text-gray-400">إلى (بلد المقصد)</label>
                    <input name="toOrg" value={cert.toOrg} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-bold" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-black text-gray-400">تاريخ الإصدار</label>
                    <input name="dateOfIssue" value={cert.dateOfIssue} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-bold" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-black text-gray-400">تاريخ الفحص</label>
                    <input name="dateOfInspection" value={cert.dateOfInspection} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-bold" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'consignment' && (
              <div className="space-y-6 fade-in">
                <h3 className="text-lg font-black text-gray-800 border-r-4 border-[#7da441] pr-3">بيانات الإرسالية</h3>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-black text-gray-400 uppercase">المصدر (الاسم والعنوان)</label>
                    <textarea name="exporterNameAddress" value={cert.exporterNameAddress} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-black h-24 font-inter leading-relaxed focus:border-[#8b6b21]" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-black text-gray-400 uppercase">المستورد (الاسم والعنوان)</label>
                    <textarea name="importerNameAddress" value={cert.importerNameAddress} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-bold h-24 leading-relaxed focus:border-[#8b6b21]" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-1">
                       <label className="text-[11px] font-black text-gray-400">وسيلة النقل</label>
                       <input name="meansOfConveyance" value={cert.meansOfConveyance} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-bold" />
                     </div>
                     <div className="space-y-1">
                       <label className="text-[11px] font-black text-gray-400">نقطة الدخول</label>
                       <input name="pointOfEntry" value={cert.pointOfEntry} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-bold" />
                     </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'items' && (
              <div className="space-y-6 fade-in">
                <div className="flex justify-between items-center">
                   <h3 className="text-lg font-black text-gray-800 border-r-4 border-[#7da441] pr-3">الأصناف</h3>
                   <button onClick={addItem} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-black hover:bg-[#8b6b21] transition-all">
                     <i className="fas fa-plus"></i> إضافة
                   </button>
                </div>
                <div className="space-y-4">
                  {cert.items.map((item, idx) => (
                    <div key={item.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative group transition-all">
                      <button onClick={() => setCert(p => ({...p, items: p.items.filter(i => i.id !== item.id)}))} className="absolute top-2 left-2 w-6 h-6 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center">
                        <i className="fas fa-trash-alt text-[10px]"></i>
                      </button>
                      <div className="grid grid-cols-1 gap-3 pt-2">
                        <input placeholder="الاسم العلمي" value={item.scientificName} onChange={e => handleItemChange(item.id, 'scientificName', e.target.value)} className="w-full bg-white border border-gray-100 rounded-lg p-2 text-xs italic font-black font-inter uppercase" />
                        <div className="grid grid-cols-2 gap-2">
                          <input placeholder="الاسم الشائع" value={item.commonName} onChange={e => handleItemChange(item.id, 'commonName', e.target.value)} className="w-full bg-white border border-gray-100 rounded-lg p-2 text-xs" />
                          <input placeholder="المنشأ" value={item.origin} onChange={e => handleItemChange(item.id, 'origin', e.target.value)} className="w-full bg-white border border-gray-100 rounded-lg p-2 text-xs" />
                          <input placeholder="الكمية" value={item.quantity} onChange={e => handleItemChange(item.id, 'quantity', e.target.value)} className="w-full bg-white border border-gray-100 rounded-lg p-2 text-xs font-bold" />
                          <input placeholder="الطرود" value={item.noOfPackages} onChange={e => handleItemChange(item.id, 'noOfPackages', e.target.value)} className="w-full bg-white border border-gray-100 rounded-lg p-2 text-xs" />
                        </div>
                        <input placeholder="رقم الشهادة الأصلية PC No." value={item.pcNo} onChange={e => handleItemChange(item.id, 'pcNo', e.target.value)} className="w-full bg-white border border-gray-100 rounded-lg p-2 text-xs font-black font-inter" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'treatment' && (
              <div className="space-y-6 fade-in">
                <h3 className="text-lg font-black text-gray-800 border-r-4 border-[#7da441] pr-3">المعاملة</h3>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-black text-gray-400 uppercase">المواد الكيميائية</label>
                    <input name="disinfestation.chemicals" value={cert.disinfestation.chemicals} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-bold" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-gray-400 uppercase">المدة والحرارة</label>
                      <input name="disinfestation.durationTemp" value={cert.disinfestation.durationTemp} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-bold" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-gray-400 uppercase">تاريخ المعاملة</label>
                      <input name="disinfestation.treatmentDate" value={cert.disinfestation.treatmentDate} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-bold" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-black text-gray-400 uppercase">إقرار إضافي</label>
                    <textarea name="additionalDeclaration" value={cert.additionalDeclaration} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-black h-24 uppercase font-inter" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'branding' && (
              <div className="space-y-6 fade-in">
                <h3 className="text-lg font-black text-gray-800 border-r-4 border-[#7da441] pr-3">الهوية والأختام</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                   <ImageUploadCard label="الشعار" field="logoCenter" currentImage={cert.logoCenter} icon="building-columns" />
                   <ImageUploadCard label="الختم" field="officialStamp" currentImage={cert.officialStamp} icon="stamp" />
                   <ImageUploadCard label="التوقيع" field="officerSignature" currentImage={cert.officerSignature} icon="signature" />
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6 fade-in">
                <h3 className="text-lg font-black text-gray-800 border-r-4 border-[#7da441] pr-3">الأمان</h3>
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center gap-6">
                  <div className="w-full h-20 bg-white rounded-lg border border-dashed border-slate-300 flex items-center justify-center overflow-hidden relative group">
                     {cert.captchaImage ? <img src={cert.captchaImage} className="h-full object-contain p-2" /> : <i className="fas fa-image text-slate-100 text-2xl"></i>}
                     <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center cursor-pointer">
                        <label className="text-white text-[10px] font-black">
                           تغيير الكابتشا
                           <input type="file" className="hidden" onChange={handleImageUpload('captchaImage')} />
                        </label>
                     </div>
                  </div>
                  <input name="captchaValue" value={cert.captchaValue} onChange={handleChange} placeholder="القيمة..." className="w-full bg-white border border-slate-200 rounded-lg p-3 text-center text-xl font-black font-inter tracking-widest outline-none focus:border-[#8b6b21]" />
                </div>
              </div>
            )}

            {activeTab === 'labels' && (
              <div className="space-y-6 fade-in">
                <div className="relative">
                  <input type="text" placeholder="بحث في المسميات..." value={labelSearch} onChange={e => setLabelSearch(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 pr-10 text-sm outline-none focus:border-[#8b6b21]" />
                  <i className="fas fa-search absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"></i>
                </div>
                <div className="space-y-3 h-[50vh] overflow-y-auto pr-2">
                  {Object.keys(cert.labels)
                    .filter(key => key.toLowerCase().includes(labelSearch.toLowerCase()))
                    .map(key => (
                    <div key={key} className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                      <label className="text-[9px] font-black text-[#8b6b21] uppercase block mb-1 font-inter">{key}</label>
                      <textarea name={`labels.${key}`} value={cert.labels[key as keyof CertificateLabels] as string} onChange={handleChange} rows={2} className="w-full bg-gray-50 border border-gray-100 rounded p-2 text-xs leading-relaxed outline-none" />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Live Preview Side */}
        <div className={`flex-1 bg-slate-800 flex flex-col items-center justify-start p-4 md:p-10 overflow-y-auto relative ${mobileView === 'edit' ? 'hidden lg:flex' : 'flex'}`}>
          <div className="no-print absolute top-4 left-4 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] text-white font-black z-10 border border-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            عرض مباشر للوثيقة المطبوعة
          </div>
          <div className="origin-top scale-[0.4] sm:scale-[0.5] md:scale-[0.7] lg:scale-[0.55] xl:scale-[0.75] 2xl:scale-[1] shadow-2xl transition-all rounded-sm bg-white ring-1 ring-white/10 mb-20">
            <CertificatePreview data={cert} />
          </div>
        </div>
      </div>

      {/* Mobile Preview Controls */}
      <style>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          @media print {
            .no-print { display: none !important; }
            .flex-1 { overflow: visible !important; height: auto !important; width: auto !important; display: block !important; }
            .lg\\:flex { display: block !important; }
            .flex { display: block !important; }
            body, html { overflow: visible !important; height: auto !important; }
            .certificate-page { margin: 0 !important; transform: scale(1) !important; width: 210mm !important; height: 297mm !important; }
          }
      `}</style>
    </div>
  );
};

export default Editor;
