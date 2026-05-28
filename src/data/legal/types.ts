export type LegalBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "list"; ordered?: boolean; items: string[] }
  | { kind: "subsection"; label: string; title: string; body: LegalBlock[] };

export interface LegalSection {
  number: number;
  title: string;
  body: LegalBlock[];
}

export interface LegalContact {
  legalEntity: string;
  brand: string;
  address: string;
  supportPhone: string;
  supportEmail: string;
  grievanceEmail: string;
}

export interface LegalDocument {
  title: string;
  effectiveDate: string;
  intro: string[];
  sections: LegalSection[];
  contact?: LegalContact;
}
