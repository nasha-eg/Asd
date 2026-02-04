
import React, { useState, useEffect } from 'react';
import { CertificateData } from '../types';
import { getCertificates, deleteCertificate } from '../services/certificateService';

interface HomeProps {
  navigate: (path: string) => void;
}

const Home: React.FC<HomeProps> = ({ navigate }) => {
  const [certs, setCerts] = useState<CertificateData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setCerts(getCertificates());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه الشهادة نهائياً؟')) {
      deleteCertificate(id);
      setCerts(getCertificates());
    }
  };

  const filteredCerts = certs.filter(c => 
    c.certNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.exporterNameAddress.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-cairo" dir="rtl">
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Emblem_of_the_United_Arab_Emirates.svg/1200px-Emblem_of_the_United_Arab_Emirates.svg.png" className="h-12" alt="UAE Emblem" />
            <div className="border-r border-slate-200 pr-4 mr-4 hidden md:block">
              <h1 className="text-sm font-black text-slate-800 leading-tight">وزارة التغير المناخي والبيئة</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-inter">Digital Certificate Hub</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate('#/settings')}
              className="text-slate-600 hover:text-slate-900 font-black text-xs px-4 py-2 rounded-xl transition-all flex items-center gap-2"
            >
              <i className="fas fa-palette"></i>
              هوية البوابة
            </button>
            <button 
              onClick={() => navigate('#/create')}
              className="bg-[#7da441] hover:bg-[#6a8d36] text-white px-6 py-2.5 rounded-xl font-black text-sm shadow-lg shadow-green-200 transition-all flex items-center gap-2"
            >
              <i className="fas fa-plus"></i>
              إصدار وثيقة جديدة
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto w-full p-6 md:p-10 space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900">نظام إدارة الشهادات</h2>
            <p className="text-slate-500 font-medium">إدارة ومتابعة شهادات الصحة النباتية لإعادة التصدير المعتمدة.</p>
          </div>
          <div className="w-full md:w-96 relative group">
            <input 
              type="text"
              placeholder="ابحث برقم الشهادة أو المصدر..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-3 pr-12 text-sm outline-none focus:ring-2 focus:ring-[#7da441]/20 focus:border-[#7da441] transition-all shadow-sm"
            />
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#7da441]"></i>
          </div>
        </div>

        {filteredCerts.length === 0 ? (
          <div className="bg-white rounded-[40px] border-2 border-dashed border-slate-200 p-24 text-center">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-box-open text-4xl text-slate-200"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">لا يوجد سجلات مطابقة</h3>
            <p className="text-slate-400 max-w-sm mx-auto mb-8">ابدأ بإصدار وثيقة جديدة لتظهر في هذه القائمة.</p>
            <button 
              onClick={() => navigate('#/create')}
              className="bg-slate-900 text-white px-10 py-3 rounded-xl font-bold hover:bg-black transition-all"
            >
              إصدار أول وثيقة
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCerts.sort((a,b) => b.createdAt - a.createdAt).map(cert => (
              <div key={cert.id} className="bg-white rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group overflow-hidden flex flex-col">
                <div className="p-6 pb-2 flex justify-between items-start">
                  <div className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter block leading-none mb-1">Document No.</span>
                    <span className="text-xs font-black text-slate-700 font-inter">{cert.certNo}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-bold">
                    {new Date(cert.createdAt).toLocaleDateString('ar-AE')}
                  </div>
                </div>
                
                <div className="p-6 space-y-4 flex-1">
                  <div>
                    <label className="text-[10px] text-[#7da441] font-black uppercase tracking-widest block mb-1">المصدر / Exporter</label>
                    <p className="text-sm font-bold text-slate-800 line-clamp-2 leading-relaxed">{cert.exporterNameAddress}</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => navigate(`#/edit?id=${cert.id}`)}
                    className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 py-2.5 rounded-2xl text-xs font-bold hover:bg-[#7da441] hover:text-white hover:border-[#7da441] transition-all shadow-sm"
                  >
                    <i className="fas fa-edit"></i> تعديل
                  </button>
                  <button 
                    onClick={() => navigate(`#/verify?id=${cert.id}`)}
                    className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 py-2.5 rounded-2xl text-xs font-bold hover:border-slate-800 transition-all shadow-sm"
                  >
                    <i className="fas fa-eye"></i> بوابة التحقق
                  </button>
                </div>
                <button 
                  onClick={() => handleDelete(cert.id)}
                  className="w-full py-3 text-red-400 hover:text-red-600 text-[10px] font-bold transition-all border-t border-slate-100 hover:bg-red-50"
                >
                  <i className="fas fa-trash-alt ml-2"></i> حذف نهائياً
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
      
      <footer className="mt-auto py-10 text-center border-t border-slate-100 bg-white">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">© 2024 MOCCAE - Digital Documents Management</p>
      </footer>
    </div>
  );
};

export default Home;
