export interface AdminMember {
  mbNo: number;
  name: string;
  email: string;
  sketchbookCount: number;
}

export interface AdminSketchbook {
  sbNo: number;
  name: string;
  memberName?: string;
  imageCount: number;
  regdate: string;
  sbStatus: number;
  slType?: number;
  hasResult: boolean;
  analysisStatus: '분석 완료' | '분석 필요' | '미완성';
}

export interface AdminAnalysisOption {
  label: string;
  rawValue: string;
}

export interface AdminAnalysisItem {
  siNo: number;
  label: string;
  selectionType: 'multi';
  options: AdminAnalysisOption[];
  selectedRawValues: string[];
}

export interface AdminAnalysisGroup {
  groupId: number;
  groupName: string;
  items: AdminAnalysisItem[];
}

export interface AdminAnalysisImage {
  sfNo: number;
  sort: number;
  type: string;
  filename: string;
  url: string;
}

export interface AdminAnalysisData {
  success: true;
  sketchbook: {
    sbNo: number;
    sbName: string;
    sbAge: number | null;
    sbGender: string;
    slType: number;
    status: AdminSketchbook['analysisStatus'];
    unsupported: boolean;
    unsupportedMessage?: string;
  };
  images: AdminAnalysisImage[];
  groups: AdminAnalysisGroup[];
}

export interface AdminUntypedSketchbook {
  sbNo: number;
  sbName: string;
  sbAge: number | null;
  sbGender: string;
  slType: number;
  createdAt: string;
  images: AdminAnalysisImage[];
}

export interface AdminUntypedSketchbooksData {
  success: true;
  sketchbooks: AdminUntypedSketchbook[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AdminMergeCandidateItem {
  sbNo: number;
  createdAt: string;
  slType: number;
  imageCount: number;
  images: AdminAnalysisImage[];
}

export interface AdminMergeCandidateGroup {
  groupKey: string;
  memberNo: number;
  sbName: string;
  sbAge: number | null;
  sbGender: string;
  count: number;
  items: AdminMergeCandidateItem[];
}

export interface AdminMergeCandidatesData {
  success: true;
  groups: AdminMergeCandidateGroup[];
}

export interface AdminMergeResponse {
  success: true;
  targetSbNo: number;
  sourceSbNos: number[];
  movedFileCount: number;
}

export interface AdminAnalyzeResponse {
  success: true;
  sbNo: number;
  message: string;
}

export interface AdminSketchbookProfile {
  self: string | null;
  others: string | null;
}

export interface AdminSketchbookProfileResponse {
  sbNo: number;
  profile: AdminSketchbookProfile;
}

export interface AdminSketchbookProfileUpdateResponse extends AdminSketchbookProfileResponse {
  success: true;
}

export interface AdminSeniorFormOption {
  value: number;
  label: string;
}

export interface AdminSeniorFormItem {
  key: string;
  label: string;
  type: 'radio' | 'checkbox' | 'text';
  options?: AdminSeniorFormOption[];
  multiline?: boolean;
}

export interface AdminSeniorFormSection {
  key: string;
  label: string;
  items: AdminSeniorFormItem[];
}

export interface AdminSeniorAnalysisForm {
  success: true;
  sbNo: number;
  slType: 5;
  title: string;
  sketchbook: {
    sbNo: number;
    sbName: string;
    sbAge: number | null;
    sbGender: number | null;
  };
  sections: AdminSeniorFormSection[];
  existingAnswers: Record<string, number | string | undefined>;
}

export interface AdminSeniorAnalyzeResponse {
  success: true;
  sbNo: number;
  redirectTo: string;
}

export interface AdminDashboardItem {
  sbNo: number;
  sbName: string;
  sbAge?: number | null;
  sbGender?: number | null;
  slType: number;
  createdAt?: string;
  analyzedAt?: string;
  hasImages?: boolean;
  reportReady?: boolean;
}

export interface AdminDashboardData {
  success: true;
  summary: {
    totalSketchbooks: number;
    analyzedCount: number;
    pendingCount: number;
    noResultCount: number;
    readyCount: number;
    recentUploadCount7d: number;
    untypedCount: number;
  };
  pendingItems: AdminDashboardItem[];
  readyItems: AdminDashboardItem[];
  recentUntyped: AdminDashboardItem[];
  recentAnalyzed: AdminDashboardItem[];
  recentUploads: AdminDashboardItem[];
  typeCounts: Record<string, number>;
}

export interface AdminAnalysisItemRuleRow {
  status: string;
  detail: string;
  emotion: string;
  adaptation: string;
  relationship: string;
  tendency: string;
  adultInterpretation: string;
  childInterpretation: string;
  seniorInterpretation: string;
  adultFeedback: string;
  childFeedback: string;
  seniorFeedback: string;
}

export interface AdminManagedAnalysisItem {
  si_no: number;
  sg_no: number;
  si_sort: number;
  si_name: string;
  si_type: string;
  si_status: number;
  rows: AdminAnalysisItemRuleRow[];
}

export interface AdminManagedAnalysisItemGroup {
  sg_no: number;
  sg_title: string;
  items: AdminManagedAnalysisItem[];
}

export interface AdminAnalysisItemGroupOption {
  sg_no: number;
  sg_title: string;
}

export interface AdminAnalysisItemPayload {
  sg_no: number;
  si_sort: number;
  si_name: string;
  si_type: string[];
  si_status: number;
  rows: AdminAnalysisItemRuleRow[];
}

export interface AdminPremiumSubject {
  name?: string;
  age?: number;
  reportDate?: string;
  reportType?: string;
}

export interface AdminPremiumSourceScore {
  path?: string;
  label?: string;
  score?: number;
  band?: string;
}

export interface AdminPremiumDerivedTrait {
  id?: string;
  category?: string;
  label?: string;
  signalStrength?: string;
  sourceScores?: AdminPremiumSourceScore[];
  summary?: string;
  reflectionQuestion?: string;
}

export interface AdminPremiumPerceptionGapItem {
  dimension?: string;
  self?: string;
  others?: string;
  reflection?: string;
}

export interface AdminPremiumReflectionPrompt {
  id?: string;
  category?: string;
  source?: string;
  prompt?: string;
}

export interface AdminPremiumPayload {
  schemaVersion: string;
  source: Record<string, unknown>;
  subject: AdminPremiumSubject;
  htp?: {
    narrative?: {
      overall?: string;
      emotion?: string;
      adaptation?: string;
      relationship?: string;
      tendency?: string;
    };
  };
  mbtiPerception: {
    self?: string | null;
    others?: string | null;
    status?: {
      hasSelf?: boolean;
      hasOthers?: boolean;
      hasGap?: boolean;
    };
  };
  derivedTraits?: AdminPremiumDerivedTrait[];
  perceptionGap?: {
    summary: string;
    items: AdminPremiumPerceptionGapItem[];
  };
  reflectionPrompts?: AdminPremiumReflectionPrompt[];
  fusionSummary?: {
    summary?: string;
    sections?: Array<{
      type?: string;
      title?: string;
      content?: string;
    }>;
  };
  [key: string]: unknown;
}
