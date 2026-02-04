
export interface CertificateItem {
  id: string;
  scientificName: string;
  commonName: string;
  origin: string;
  pcNo: string;
  quantity: string;
  noOfPackages: string;
  commodityClass: string;
}

export interface DisinfestationData {
  chemicals: string;
  durationTemp: string;
  treatmentDate: string;
  treatment: string;
  concentrationRate: string;
  additionalInfo: string;
}

export interface CertificateLabels {
  titleEn: string;
  titleAr: string;
  headerEn1: string;
  headerEn2: string;
  headerAr1: string;
  headerAr2: string;
  certNoLabelEn: string;
  certNoLabelAr: string;
  verificationCodeLabelEn: string;
  verificationCodeLabelAr: string;
  fromLabelEn: string;
  fromLabelAr: string;
  toLabelEn: string;
  toLabelAr: string;
  consignmentTitleEn: string;
  consignmentTitleAr: string;
  exporterLabelEn: string;
  exporterLabelAr: string;
  importerLabelEn: string;
  importerLabelAr: string;
  marksLabelEn: string;
  marksLabelAr: string;
  entryPointLabelEn: string;
  entryPointLabelAr: string;
  purposeLabelEn: string;
  purposeLabelAr: string;
  conveyanceLabelEn: string;
  conveyanceLabelAr: string;
  permitLabelEn: string;
  permitLabelAr: string;
  totalQtyLabelEn: string;
  totalQtyLabelAr: string;
  totalPkgLabelEn: string;
  totalPkgLabelAr: string;
  itemScientificLabelEn: string;
  itemScientificLabelAr: string;
  itemCommonLabelEn: string;
  itemCommonLabelAr: string;
  itemOriginLabelEn: string;
  itemOriginLabelAr: string;
  itemPcLabelEn: string;
  itemPcLabelAr: string;
  itemQtyLabelEn: string;
  itemQtyLabelAr: string;
  itemPkgLabelEn: string;
  itemPkgLabelAr: string;
  itemClassLabelEn: string;
  itemClassLabelAr: string;
  annexNoteEn: string;
  annexNoteAr: string;
  legalProseAr: string;
  legalProseEn: string;
  additionalDeclarationTitleEn: string;
  additionalDeclarationTitleAr: string;
  treatmentTitleEn: string;
  treatmentTitleAr: string;
  treatChemLabelEn: string;
  treatChemLabelAr: string;
  treatDurLabelEn: string;
  treatDurLabelAr: string;
  treatDateLabelEn: string;
  treatDateLabelAr: string;
  treatTypeLabelEn: string;
  treatTypeLabelAr: string;
  treatConcLabelEn: string;
  treatConcLabelAr: string;
  treatInfoLabelEn: string;
  treatInfoLabelAr: string;
  annexTitleEn: string;
  annexTitleAr: string;
  footerStampAr: string;
  footerStampEn: string;
  footerPlaceAr: string;
  footerPlaceEn: string;
  footerIssueDateAr: string;
  footerIssueDateEn: string;
  footerInspectDateAr: string;
  footerInspectDateEn: string;
  footerOfficerAr: string;
  footerOfficerEn: string;
  verificationNoticeAr: string;
  verificationNoticeEn: string;
  disclaimerAr: string;
  disclaimerEn: string;
  approvedNoticeAr: string;
  approvedNoticeEn: string;
  portalTitleAr: string;
  portalDescAr: string;
  portalCertNoLabelAr: string;
  portalVerifyCodeLabelAr: string;
  portalCaptchaLabelAr: string;
  portalSubmitBtnAr: string;
  portalClearBtnAr: string;
  portalFooterTextAr: string;
}

export interface GlobalBranding {
  portalEmblem: string;
  portalRatingBadge: string;
  partnerLogo1: string; // Abu Dhabi Police
  partnerLogo2: string; // SKGEP
  partnerLogo3: string; // Esaad
  footerLogo1: string;  // MOCCAE Footer
  footerLogo2: string;  // UAE/JAE
  footerLogo3: string;  // Beeatna
}

export interface CertificateData {
  id: string;
  certNo: string;
  verificationCode: string;
  fromOrg: string;
  toOrg: string;
  exporterNameAddress: string;
  importerNameAddress: string;
  distinguishingMarks: string;
  pointOfEntry: string;
  endUsePurpose: string;
  meansOfConveyance: string;
  importPermitNo: string;
  totalQuantity: string;
  totalNoOfPackages: string;
  items: CertificateItem[];
  additionalDeclaration: string;
  disinfestation: DisinfestationData;
  placeOfIssue: string;
  dateOfIssue: string;
  dateOfInspection: string;
  officerName: string;
  createdAt: number;
  logoCenter?: string;
  officialStamp?: string;
  officerSignature?: string;
  captchaImage?: string;
  captchaValue?: string; 
  labels: CertificateLabels;
}
