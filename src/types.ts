export interface CertificationData {
  code: string;
  candidate_name: string;
  certified_title: string;
  issue_date: string;
  expiry_date: string;
  accreditation: string;
  status: string;
  download_url?: string;
}

export interface IngestStats {
  ingestionRate: string;
  dwellTime: string;
  activeNodes: number;
}
