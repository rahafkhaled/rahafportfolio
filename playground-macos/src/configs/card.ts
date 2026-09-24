import { RESUME_PDF_PATH } from "~/utils/constants";

/** Profile + links for the NFC business card page (`/card`). */
export const nfcCardProfile = {
  name: "Rahaf Abutarbush",
  email: "rahaf.k.abutarbush@gmail.com",
  workemail:"rahaf.abutarbush@pwc.com",
  linkedIn: "https://www.linkedin.com/in/rahaf-abutarbush/",
  number:"+97450792213",
  /** Opens the main portfolio (macOS desktop on desktop, About on phone). */
  portfolioPath: "/",
  resumePath: RESUME_PDF_PATH,
  /** Shown on the generated vCard. */
  vcardTitle: "Rahaf Abutarbush"
} as const;

export type NfcCardLink = {
  id: string;
  label: string;
  /** `vcard` triggers download; `external` opens new tab; `internal` same origin. */
  kind: "vcard" | "external" | "internal" | "mailto";
  href?: string;
  primary?: boolean;
};

export const nfcCardLinks: NfcCardLink[] = [
  { id: "save", label: "Save Contact", kind: "vcard", primary: true },
  { id: "linkedin", label: "LinkedIn", kind: "external", href: nfcCardProfile.linkedIn },
  { id: "email", label: "Email", kind: "mailto", href: `mailto:${nfcCardProfile.email}` },
  { id: "workemail", label: "Work Email", kind: "mailto", href: `mailto:${nfcCardProfile.workemail}` },
  {
    id: "number",
    label: "Whatsapp Number",
    kind: "external",
    href: `https://wa.me/${nfcCardProfile.number.replace(/\D/g, "")}`
  },
  { id: "portfolio", label: "My Website", kind: "internal", href: nfcCardProfile.portfolioPath },
];
