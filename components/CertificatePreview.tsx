
import React from 'react';
import { CertificateData } from '../types';
import { QRCodeSVG } from 'qrcode.react';
import { encodeDataForQR } from '../services/certificateService';

interface CertificatePreviewProps {
  data: CertificateData;
}

const CertificatePreview: React.FC<CertificatePreviewProps> = ({ data }) => {
  const qrValue = encodeDataForQR(data);
  const { labels } = data;

  const PageHeader = (props: { isAnnex?: boolean }) => (
    <div className="w-full shrink-0 mb-2" dir="ltr">
      <div className="flex justify-between items-center px-1 mb-2">
        <div className="w-[42%] text-left">
          <div className="text-[#8b6b21] font-black leading-tight">
            <h1 className="text-[11px] uppercase tracking-tighter whitespace-pre-line font-black font-inter">{labels.headerEn1}</h1>
            <h2 className="text-[8.5px] uppercase mt-0.5 whitespace-pre-line font-bold font-inter leading-tight">{labels.headerEn2}</h2>
          </div>
        </div>
        <div className="w-[16%] flex justify-center">
          <img 
            src={data.logoCenter || "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Emblem_of_the_United_Arab_Emirates.svg/1200px-Emblem_of_the_United_Arab_Emirates.svg.png"} 
            className="h-[65px] w-auto object-contain" 
            alt="Emblem" 
          />
        </div>
        <div className="w-[42%] text-right font-cairo">
          <div className="text-[#8b6b21] font-black leading-tight">
            <h1 className="text-[19px] whitespace-pre-line font-black leading-none">{labels.headerAr1}</h1>
            <h2 className="text-[13px] mt-0.5 whitespace-pre-line font-black leading-tight">{labels.headerAr2}</h2>
          </div>
        </div>
      </div>
      <div className="bg-[#7da441] text-white py-1.5 px-6 flex justify-between items-center font-black rounded-sm shadow-sm" style={{ backgroundColor: '#7da441', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
        <span className="text-[12px] font-inter uppercase tracking-wide">{props.isAnnex ? labels.annexTitleEn : labels.titleEn}</span>
        <span className="text-[15px] font-cairo">{props.isAnnex ? labels.annexTitleAr : labels.titleAr}</span>
      </div>
    </div>
  );

  const SharedFooter = () => (
    <div className="w-full mt-auto shrink-0 pb-1" dir="ltr">
      <div className="grid grid-cols-4 border border-black text-[7.5px] mb-2 font-bold">
        <div className="col-span-1 border-r border-black min-h-[85px] relative">
          <div className="bg-slate-100 p-0.5 text-center border-b border-black text-[6.5px] font-cairo" style={{ backgroundColor: '#f1f5f9', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
            <span className="block">{labels.footerStampAr}</span>
            <span className="font-inter uppercase text-[5.5px]">{labels.footerStampEn}</span>
          </div>
          <div className="flex items-center justify-center p-2 absolute inset-0 pt-5">
            {data.officialStamp && <img src={data.officialStamp} className="max-h-full max-w-full object-contain" />}
          </div>
        </div>
        <div className="col-span-1 border-r border-black">
          <div className="bg-slate-100 p-0.5 text-center border-b border-black text-[6.5px] font-cairo" style={{ backgroundColor: '#f1f5f9', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
            <span className="block">{labels.footerPlaceAr}</span>
            <span className="font-inter uppercase text-[5.5px]">{labels.footerPlaceEn}</span>
          </div>
          <div className="h-14 flex items-center justify-center p-2 text-center text-[9px] font-black font-cairo leading-tight">
            {data.placeOfIssue}
          </div>
        </div>
        <div className="col-span-1 border-r border-black">
          <div className="h-1/2 border-b border-black flex flex-col">
            <div className="bg-slate-100 p-0.5 text-center border-b border-black text-[6px] font-cairo" style={{ backgroundColor: '#f1f5f9', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
               {labels.footerInspectDateAr} / <span className="font-inter text-[4.5px] uppercase">{labels.footerInspectDateEn}</span>
            </div>
            <div className="flex-1 flex items-center justify-center text-[9.5px] font-black">{data.dateOfInspection}</div>
          </div>
          <div className="h-1/2 flex flex-col">
            <div className="bg-slate-100 p-0.5 text-center border-b border-black text-[6px] font-cairo" style={{ backgroundColor: '#f1f5f9', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
               {labels.footerIssueDateAr} / <span className="font-inter text-[4.5px] uppercase">{labels.footerIssueDateEn}</span>
            </div>
            <div className="flex-1 flex items-center justify-center text-[9.5px] font-black">{data.dateOfIssue}</div>
          </div>
        </div>
        <div className="col-span-1 relative">
          <div className="bg-slate-100 p-0.5 text-center border-b border-black text-[6.5px] font-cairo" style={{ backgroundColor: '#f1f5f9', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
            <span className="block">{labels.footerOfficerAr}</span>
            <span className="font-inter uppercase text-[5.5px]">{labels.footerOfficerEn}</span>
          </div>
          <div className="h-14 flex flex-col items-center justify-center p-2 text-center font-black font-cairo text-[9px] relative">
            {data.officerSignature && <img src={data.officerSignature} className="absolute inset-0 m-auto max-h-[80%] opacity-80" />}
            <span className="mt-auto relative z-10">{data.officerName}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-end gap-3 px-1">
        <div className="flex gap-2 items-center w-[45%]">
          <div className="p-1 bg-white border border-slate-200 shrink-0">
            <QRCodeSVG value={qrValue} size={60} level="H" />
          </div>
          <div className="text-[7.5px] font-black text-slate-800 leading-tight">
            <span className="whitespace-pre-line text-right block font-cairo">{labels.verificationNoticeAr}</span>
            <div className="font-inter font-normal text-[6px] mt-0.5 opacity-70 whitespace-pre-line text-left" dir="ltr">{labels.verificationNoticeEn}</div>
          </div>
        </div>
        <div className="text-right flex-1 flex flex-col items-end">
          <div className="text-[7px] font-bold text-slate-600 mb-1 leading-tight max-w-[340px] font-cairo">
            {labels.disclaimerAr}
            <div className="font-inter font-normal text-[5.5px] mt-0.5 opacity-70 leading-none text-right" dir="ltr">{labels.disclaimerEn}</div>
          </div>
          <div className="text-[#be8b3e] text-right">
             <div className="text-[12px] font-black font-cairo leading-tight">{labels.approvedNoticeAr}</div>
             <div className="text-[8px] uppercase font-black font-inter tracking-tighter leading-none">{labels.approvedNoticeEn}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 items-center print:bg-white print:py-0 print:gap-0" dir="ltr">
      {/* Page 1: Main Certificate */}
      <div className="bg-white w-[210mm] h-[297mm] px-10 py-8 flex flex-col certificate-page relative overflow-hidden print:shadow-none shadow-2xl">
        <PageHeader />
        
        <div className="flex justify-between font-black text-[11px] mb-2 font-inter">
          <div>{labels.certNoLabelEn} <span className="ml-2 font-inter">{data.certNo}</span></div>
          <div className="font-cairo text-[10px]"><span className="mr-2 font-inter text-[11px]">{data.verificationCode}</span> {labels.verificationCodeLabelAr}</div>
        </div>

        <div className="grid grid-cols-2 border border-black mb-2">
          <div className="border-r border-black">
            <div className="bg-slate-100 p-0.5 text-center font-black border-b border-black text-[8px] font-cairo" style={{ backgroundColor: '#f1f5f9', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
              <span className="block">{labels.fromLabelAr}</span>
              <span className="font-inter uppercase text-[6px]">{labels.fromLabelEn}</span>
            </div>
            <div className="p-2 text-center text-[12.5px] font-black uppercase font-inter leading-tight h-10 flex items-center justify-center">{data.fromOrg}</div>
          </div>
          <div>
            <div className="bg-slate-100 p-0.5 text-center font-black border-b border-black text-[8px] font-cairo" style={{ backgroundColor: '#f1f5f9', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
              <span className="block">{labels.toLabelAr}</span>
              <span className="font-inter uppercase text-[6px]">{labels.toLabelEn}</span>
            </div>
            <div className="p-2 text-center text-[12.5px] font-black uppercase font-inter leading-tight h-10 flex items-center justify-center">{data.toOrg}</div>
          </div>
        </div>

        <div className="bg-slate-600 text-white py-1 px-6 flex justify-between font-black mb-0 text-[10.5px]" style={{ backgroundColor: '#4b5563', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
          <span className="uppercase font-inter">{labels.consignmentTitleEn}</span>
          <span className="font-cairo text-[11.5px]">{labels.consignmentTitleAr}</span>
        </div>

        <div className="border border-black mb-2 text-[9px]">
          <div className="grid grid-cols-2 border-b border-black bg-slate-100 font-black text-center text-[10px]" style={{ backgroundColor: '#f1f5f9', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
            <div className="border-r border-black p-1 font-cairo">
                <span className="block">{labels.exporterLabelAr}</span>
                <span className="text-[6px] font-inter uppercase">{labels.exporterLabelEn}</span>
            </div>
            <div className="p-1 font-cairo">
                <span className="block">{labels.importerLabelAr}</span>
                <span className="text-[6px] font-inter uppercase">{labels.importerLabelEn}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 min-h-[95px] text-center font-black items-center text-[11.5px]">
            <div className="border-r border-black p-3 whitespace-pre-wrap font-inter uppercase leading-tight">{data.exporterNameAddress}</div>
            <div className="p-3 whitespace-pre-wrap font-cairo leading-tight">{data.importerNameAddress}</div>
          </div>
          <div className="grid grid-cols-5 bg-slate-100 border-t border-black text-center font-black text-[6.5px] leading-tight min-h-[35px] font-cairo" style={{ backgroundColor: '#f1f5f9', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
            <div className="border-r border-black p-0.5 flex flex-col justify-center"><span>{labels.purposeLabelAr}</span><span className="font-inter uppercase text-[5px]">{labels.purposeLabelEn}</span></div>
            <div className="border-r border-black p-0.5 flex flex-col justify-center"><span>{labels.conveyanceLabelAr}</span><span className="font-inter uppercase text-[5px]">{labels.conveyanceLabelEn}</span></div>
            <div className="border-r border-black p-0.5 flex flex-col justify-center"><span>{labels.permitLabelAr}</span><span className="font-inter uppercase text-[5px]">{labels.permitLabelEn}</span></div>
            <div className="border-r border-black p-0.5 flex flex-col justify-center"><span>{labels.totalQtyLabelAr}</span><span className="font-inter uppercase text-[5px]">{labels.totalQtyLabelEn}</span></div>
            <div className="p-0.5 flex flex-col justify-center"><span>{labels.totalPkgLabelAr}</span><span className="font-inter uppercase text-[5px]">{labels.totalPkgLabelEn}</span></div>
          </div>
          <div className="grid grid-cols-5 border-t border-black text-center font-black items-center min-h-[42px] text-[11.5px] uppercase font-inter">
            <div className="border-r border-black p-1">{data.endUsePurpose}</div>
            <div className="border-r border-black p-1">{data.meansOfConveyance}</div>
            <div className="border-r border-black p-1">{data.importPermitNo}</div>
            <div className="border-r border-black p-1">{data.totalQuantity}</div>
            <div className="p-1">{data.totalNoOfPackages}</div>
          </div>
        </div>

        <div className="text-[8.5px] font-medium leading-tight px-1 border-t border-white pt-1">
           <p className="font-cairo mb-0.5 font-bold text-right" dir="rtl">{labels.legalProseAr}</p>
           <p className="font-inter text-[7px] font-normal leading-[1.1] opacity-90 text-left" dir="ltr">{labels.legalProseEn}</p>
        </div>

        <div className="bg-slate-600 text-white py-1 px-6 flex justify-between font-black mt-3 mb-0 text-[10.5px]" style={{ backgroundColor: '#4b5563', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
          <span className="uppercase font-inter">{labels.additionalDeclarationTitleEn}</span>
          <span className="font-cairo text-[11.5px]">{labels.additionalDeclarationTitleAr}</span>
        </div>
        <div className="border border-black p-2 min-h-[45px] flex items-center justify-center font-black text-[13px] uppercase font-inter">
          {data.additionalDeclaration}
        </div>

        <SharedFooter />
      </div>

      {/* Page 2: Treatment */}
      <div className="bg-white w-[210mm] h-[297mm] px-10 py-8 flex flex-col certificate-page relative overflow-hidden print:shadow-none shadow-2xl">
        <PageHeader />
        <div className="bg-slate-600 text-white py-1 px-6 flex justify-between font-black mt-2 mb-0 text-[10.5px]" style={{ backgroundColor: '#4b5563', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
          <span className="uppercase font-inter">{labels.treatmentTitleEn}</span>
          <span className="font-cairo text-[11.5px]">{labels.treatmentTitleAr}</span>
        </div>
        <div className="border border-black mb-auto">
          <div className="grid grid-cols-5 bg-slate-100 text-center font-black border-b border-black min-h-[45px] text-[7.5px] leading-tight font-cairo" style={{ backgroundColor: '#f1f5f9', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
             <div className="border-r border-black p-1 flex flex-col justify-center"><span>{labels.treatChemLabelAr}</span><span className="font-inter uppercase text-[5.5px]">{labels.treatChemLabelEn}</span></div>
             <div className="border-r border-black p-1 flex flex-col justify-center"><span>{labels.treatDurLabelAr}</span><span className="font-inter uppercase text-[5.5px]">{labels.treatDurLabelEn}</span></div>
             <div className="border-r border-black p-1 flex flex-col justify-center"><span>{labels.treatDateLabelAr}</span><span className="font-inter uppercase text-[5.5px]">{labels.treatDateLabelEn}</span></div>
             <div className="border-r border-black p-1 flex flex-col justify-center"><span>{labels.treatTypeLabelAr}</span><span className="font-inter uppercase text-[5.5px]">{labels.treatTypeLabelEn}</span></div>
             <div className="p-1 flex flex-col justify-center"><span>{labels.treatConcLabelAr}</span><span className="font-inter uppercase text-[5.5px]">{labels.treatConcLabelEn}</span></div>
          </div>
          <div className="grid grid-cols-5 text-center min-h-[85px] items-center text-[12.5px] font-black uppercase font-inter">
             <div className="border-r border-black p-1.5">{data.disinfestation.chemicals}</div>
             <div className="border-r border-black p-1.5">{data.disinfestation.durationTemp}</div>
             <div className="border-r border-black p-1.5">{data.disinfestation.treatmentDate}</div>
             <div className="border-r border-black p-1.5">{data.disinfestation.treatment}</div>
             <div className="p-1.5">{data.disinfestation.concentrationRate}</div>
          </div>
          <div className="grid grid-cols-[1.5fr_3.5fr] border-t border-black min-h-[65px]">
             <div className="bg-slate-100 p-1.5 border-r border-black flex flex-col items-center justify-center font-black" style={{ backgroundColor: '#f1f5f9', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
                <span className="text-[11.5px] font-cairo leading-tight">{labels.treatInfoLabelAr}</span>
                <span className="text-[7px] font-inter uppercase">{labels.treatInfoLabelEn}</span>
             </div>
             <div className="p-2.5 flex items-center font-black text-[13.5px] uppercase font-inter leading-relaxed">{data.disinfestation.additionalInfo}</div>
          </div>
        </div>
        <SharedFooter />
      </div>

      {/* Page 3: Annex Table */}
      <div className="bg-white w-[210mm] h-[297mm] px-10 py-8 flex flex-col certificate-page relative overflow-hidden print:shadow-none shadow-2xl">
        <PageHeader isAnnex />
        <div className="flex justify-between items-center mb-3 border-b border-black pb-1.5">
           <div className="text-[12px] font-black font-inter uppercase">{labels.annexTitleEn} : <span className="text-[#be8b3e] ml-1 font-inter font-black">{data.certNo}</span></div>
           <div className="text-[14px] font-black font-cairo">{labels.annexTitleAr}</div>
        </div>
        <div className="flex-1">
          <table className="w-full border-collapse border border-black text-center font-black">
            <thead className="bg-slate-100 text-[7px] leading-tight font-cairo" style={{ backgroundColor: '#f1f5f9', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
              <tr>
                <th className="border border-black p-1 w-[20%] font-bold"><span>{labels.itemScientificLabelAr}</span><br/><span className="font-inter uppercase text-[5px]">{labels.itemScientificLabelEn}</span></th>
                <th className="border border-black p-1 w-[18%] font-bold"><span>{labels.itemCommonLabelAr}</span><br/><span className="font-inter uppercase text-[5px]">{labels.itemCommonLabelEn}</span></th>
                <th className="border border-black p-1 w-[10%] font-bold"><span>{labels.itemOriginLabelAr}</span><br/><span className="font-inter uppercase text-[5px]">{labels.itemOriginLabelEn}</span></th>
                <th className="border border-black p-1 w-[22%] font-bold"><span>{labels.itemPcLabelAr}</span><br/><span className="font-inter uppercase text-[5px]">{labels.itemPcLabelEn}</span></th>
                <th className="border border-black p-1 w-[10%] font-bold"><span>{labels.itemQtyLabelAr}</span><br/><span className="font-inter uppercase text-[5px]">{labels.itemQtyLabelEn}</span></th>
                <th className="border border-black p-1 w-[10%] font-bold"><span>{labels.itemPkgLabelAr}</span><br/><span className="font-inter uppercase text-[5px]">{labels.itemPkgLabelEn}</span></th>
                <th className="border border-black p-1 w-[10%] font-bold"><span>{labels.itemClassLabelAr}</span><br/><span className="font-inter uppercase text-[5px]">{labels.itemClassLabelEn}</span></th>
              </tr>
            </thead>
            <tbody className="text-[9.5px] uppercase font-inter">
              {data.items.map(item => (
                <tr key={item.id}>
                  <td className="border border-black p-2 italic font-black text-[10.5px] leading-tight">{item.scientificName}</td>
                  <td className="border border-black p-2 font-cairo text-[9px] leading-tight">{item.commonName}</td>
                  <td className="border border-black p-2 text-[9px]">{item.origin}</td>
                  <td className="border border-black p-2 text-[8px] leading-tight break-all font-inter">{item.pcNo}</td>
                  <td className="border border-black p-2 text-[9px]">{item.quantity}</td>
                  <td className="border border-black p-2 text-[9px]">{item.noOfPackages}</td>
                  <td className="border border-black p-2 font-cairo text-[8px] leading-tight">{item.commodityClass}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6 text-[9px] font-bold text-slate-300 font-cairo text-center uppercase tracking-widest">
            --- End of Item List / نهاية قائمة الأصناف ---
          </div>
        </div>
        <SharedFooter />
      </div>

      <style>{`
        .certificate-page { font-family: 'Inter', sans-serif; }
        @media print {
            .certificate-page {
                box-shadow: none !important;
                border: none !important;
                margin: 0 !important;
                display: flex !important;
            }
        }
      `}</style>
    </div>
  );
};

export default CertificatePreview;
