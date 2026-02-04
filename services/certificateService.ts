
import { CertificateData, CertificateLabels, GlobalBranding, PartnerItem } from '../types';

const STORAGE_KEY = 'uae_phytosanitary_certs_v8_final';
const BRANDING_KEY = 'uae_portal_branding_v1_dynamic';

export const DEFAULT_BRANDING: GlobalBranding = {
  portalEmblem: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Emblem_of_the_United_Arab_Emirates.svg/1200px-Emblem_of_the_United_Arab_Emirates.svg.png',
  portalRatingBadge: 'https://es.moccae.gov.ae/Content/images/GlobalStarRating.png',
  partners: [
    { id: '1', logo: 'https://i.ibb.co/L5h8nLz/esaad.png', label: 'بطاقة إسعاد' },
    { id: '2', logo: 'https://i.ibb.co/Wc63DHz/skgep.png', label: 'برنامج دبي للتميز' },
    { id: '3', logo: 'https://i.ibb.co/3ykXWHz/abu-dhabi-police.png', label: 'شرطة أبوظبي' }
  ],
  footerLogo1: 'https://es.moccae.gov.ae/Content/images/footer-moccae-logo.png',
  footerLogo2: 'https://es.moccae.gov.ae/Content/images/jae-logo.png',
  footerLogo3: 'https://es.moccae.gov.ae/Content/images/beeatna-logo.png',
};

export const DEFAULT_LABELS: CertificateLabels = {
  titleEn: 'Phytosanitary Certificate for Re-export',
  titleAr: 'شهادة الصحة النباتية لإعادة التصدير',
  headerEn1: 'UNITED ARAB EMIRATES',
  headerEn2: 'MINISTRY OF CLIMATE CHANGE \n & ENVIRONMENT',
  headerAr1: 'الإمارات العربية المتحدة',
  headerAr2: 'وزارة التغييـر المناخــي \n والبيـئــــــــة',
  certNoLabelEn: 'No.',
  certNoLabelAr: 'الرقم',
  verificationCodeLabelEn: 'Verification Code',
  verificationCodeLabelAr: 'رمز التحقق',
  fromLabelEn: 'From / Plant Protection Organization(s) of',
  fromLabelAr: 'من / منظمة وقاية النباتات في',
  toLabelEn: 'To / Plant Protection Organization(s) of',
  toLabelAr: 'إلي / منظمة وقاية النباتات في',
  consignmentTitleEn: 'I. Description of Consignment :',
  consignmentTitleAr: 'أولاً : وصف الإرسالية',
  exporterLabelEn: 'Name & Address of Exporter',
  exporterLabelAr: 'اسم جهة التصدير و عنوانها',
  importerLabelEn: 'Declared Name & Address of Importer',
  importerLabelAr: 'اسم المستورد و عنوانه حسب البيانات',
  marksLabelEn: 'Distinguishing Marks',
  marksLabelAr: 'العلامات المميزة',
  entryPointLabelEn: 'Declared Point of Entry',
  entryPointLabelAr: 'نقطة الدخول حسب البيانات',
  purposeLabelEn: 'End-use Purpose',
  purposeLabelAr: 'غرض الاستعمال النهائي',
  conveyanceLabelEn: 'Declared Means of Conveyance',
  conveyanceLabelAr: 'وسيلة النقل حسب البيانات',
  permitLabelEn: 'Import Permit No.',
  permitLabelAr: 'رقم إذن الاستيراد',
  totalQtyLabelEn: 'Total Quantity',
  totalQtyLabelAr: 'الكمية الكلية',
  totalPkgLabelEn: 'Total No. of Packages',
  totalPkgLabelAr: 'العدد الكلي للطرود',
  itemScientificLabelEn: 'Scientific Name',
  itemScientificLabelAr: 'الاسم العلمي',
  itemCommonLabelEn: 'Common Name',
  itemCommonLabelAr: 'الاسم العام',
  itemOriginLabelEn: 'Origin',
  itemOriginLabelAr: 'جهة المنشأ',
  itemPcLabelEn: 'PC No.',
  itemPcLabelAr: 'رقم الشهادة',
  itemQtyLabelEn: 'Quantity',
  itemQtyLabelAr: 'الكمية',
  itemPkgLabelEn: 'No. of Packages',
  itemPkgLabelAr: 'عدد الطرود',
  itemClassLabelEn: 'Commodity Class',
  itemClassLabelAr: 'الصنف',
  annexNoteEn: 'See Annex of Certificate.',
  annexNoteAr: 'انظر ملحق الشهادة.',
  legalProseAr: 'تشهد بأن النباتات أو المنتجات النباتية أو المواد الأخرى الخاضعة للوائح الصحة النباتية الموضحة بياناتها أعلاه قد وردت إلى دولة الإمارات العربية المتحدة (الطرف المتعاقد القائم بإعادة التصدير) وفقاً للمتطلبات القائمة للصحة النباتية للطرف المتعاقد المستورد مشمولة بشهادة / شهادات الصحة النباتية رقم (انظر أعلاه) المرفق نسخة أصلية ( ✓ ) صورة طبق الأصل موثقة ( ) منها مع هذه الشهادة وأنه؛ ( ✓ ) أو أعيد تعبئتها ( ) في عبواتها الأصلية ( ) أو في عبوات جديدة ( ) وأنه استناداً على شهادة الصحة النباتية الأصلية ( ✓ ) والفحص الإضافي ( ) وجدت مطابقة لمتطلبات الصحة النباتية المعمول بها لدى الطرف المتعاقد المستورد، وأنه أثناء فترة تخزينها في دولة الإمارات العربية المتحدة (الطرف المتعاقد القائم بإعادة التصدير ) لم تتعرض لمخاطر التلوث أو الإصابة.',
  legalProseEn: 'We certify that the plants, plant products or other regulated articles described above were imported in UAE (Country of re-export) from see list above (Country of Origin) covered by Phytosanitary Certificate No. see list above, Original (✓) certified true copy ( ) of which is attached to the Certificate; that they are packed (✓) or Repacked ( ) in original (✓) or in new container ( ), that based on the original Phytosanitary Certificate (✓) & additional inspection ( ) , they are considered to conform with the current phytosanitary requirements of the importing country, and that during storage in UAE (Country of re-export) the consignment has not been subjected to the risk of infestation of infection.',
  additionalDeclarationTitleEn: 'II. Additional Declaration :',
  additionalDeclarationTitleAr: 'ثانياً : إقرار إضافي',
  treatmentTitleEn: 'III. Disinfestation & / or Disinfection Treatment :',
  treatmentTitleAr: 'ثالثاً : المعاملة للتطهير من التلوث و / أو الإصابة',
  treatChemLabelEn: 'Chemicals (Active Ingredients)',
  treatChemLabelAr: 'الكيماويات - المادة الفعالة',
  treatDurLabelEn: 'Duration & Temperature',
  treatDurLabelAr: 'مدة التعرض و درجة الحرارة',
  treatDateLabelEn: 'Treatment Date',
  treatDateLabelAr: 'تاريخ المعاملة',
  treatTypeLabelEn: 'Treatment',
  treatTypeLabelAr: 'المعاملة',
  treatConcLabelEn: 'Concentration Rate',
  treatConcLabelAr: 'نسبة التركيز',
  treatInfoLabelEn: 'Additional Information',
  treatInfoLabelAr: 'معلومات إضافية',
  annexTitleEn: 'Annex of Phytosanitary Certificate No.',
  annexTitleAr: 'ملحق الشهادة الصحية رقم',
  footerStampAr: 'الختم الرسمي',
  footerStampEn: 'Official Stamp',
  footerPlaceAr: 'مكان الإصدار',
  footerPlaceEn: 'Place of Issue',
  footerIssueDateAr: 'تاريخ الإصدار',
  footerIssueDateEn: 'Date of Issue',
  footerInspectDateAr: 'تاريخ الفحص',
  footerInspectDateEn: 'Date of Inspection',
  footerOfficerAr: 'اسم وتوقيع الموظف المختص',
  footerOfficerEn: 'Name & Signature of Authorized Officer',
  verificationNoticeAr: 'للتحقق من صحة بيانات هذا\nالمستند يرجى مسح الشيفرة\nأو زيارة موقع الوزارة',
  verificationNoticeEn: 'To verify this document\nplease scan the QR code\nor visit the ministry\'s website',
  disclaimerAr: 'لا تتحمل وزارة التغير المناخي والبيئة في دولة الإمارات العربية المتحدة أو أي من موظفيها المختصين أي مسؤولية قانونية أو مالية قد تنجم عن هذه الشهادة.',
  disclaimerEn: 'No financial or legal liability with respect to this certificate shall attach to the Ministry Of Climate Change And Environment - UAE or to any of its officials in the United Arab Emirates.',
  approvedNoticeAr: 'هذا المستند معتمد إلكترونياً ولا يحتاج إلى توقيع أو ختم',
  approvedNoticeEn: 'This document is electronically approved and does not require signature or stamp',
  portalTitleAr: 'مركز الشهادات والتصاريح الرقمية',
  portalDescAr: 'يمكنك الآن التحقق من الشهادات أو التصاريح التي يتم إصدارها من وزارة التغير المناخي والبيئة من خلال إدخال رقم المستند (رقم الشهادة أو رقم التصريح) ثم إدخال كود التحقق المذكور على المستند.',
  portalCertNoLabelAr: 'رقم الشهادة',
  portalVerifyCodeLabelAr: 'رمز التحقق',
  portalCaptchaLabelAr: 'أدخل الأحرف الظاهرة',
  portalSubmitBtnAr: 'إرسال',
  portalClearBtnAr: 'مسح',
  portalFooterTextAr: 'حقوق الطبع © 2023 جميع الحقوق محفوظة. وزارة التغير المناخي والبيئة.'
};

export const getCertificates = (): CertificateData[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveCertificate = (cert: CertificateData) => {
  const certs = getCertificates();
  const index = certs.findIndex(c => c.id === cert.id);
  if (index >= 0) {
    certs[index] = cert;
  } else {
    certs.push(cert);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(certs));
};

export const deleteCertificate = (id: string) => {
  const certs = getCertificates().filter(c => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(certs));
};

export const getCertificateById = (id: string): CertificateData | undefined => {
  return getCertificates().find(c => c.id === id);
};

export const findCertificateByPublicInfo = (certNo: string, verifyCode: string): CertificateData | undefined => {
  return getCertificates().find(c => c.certNo === certNo && c.verificationCode === verifyCode);
};

export const getGlobalBranding = (): GlobalBranding => {
  const data = localStorage.getItem(BRANDING_KEY);
  return data ? JSON.parse(data) : DEFAULT_BRANDING;
};

export const saveGlobalBranding = (branding: GlobalBranding) => {
  localStorage.setItem(BRANDING_KEY, JSON.stringify(branding));
};

export const generateId = () => Math.random().toString(36).substring(2, 11);

export const encodeDataForQR = (cert: CertificateData): string => {
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}#/verify?id=${cert.id}`;
};
