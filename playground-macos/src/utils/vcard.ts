import { nfcCardProfile } from "~/configs/card";

type VCardProfile = typeof nfcCardProfile;

/** Download a `.vcf` contact file for NFC / “Save Contact” taps. */
export function downloadVCard(profile: VCardProfile): void {
  const origin = window.location.origin;
  const portfolioUrl = `${origin}${profile.portfolioPath}`;

  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${profile.name}`,
    "N:Abutarbush;Rahaf;;;",
    `EMAIL;TYPE=INTERNET:${profile.email}`,
    `EMAIL;TYPE=INTERNET,WORK:${profile.workemail}`,
    `TEL;TYPE=CELL,VOICE:${profile.number.replace(/\s/g, "")}`,
    `URL:${profile.linkedIn}`,
    `URL:${portfolioUrl}`,
    `TITLE:${profile.vcardTitle}`,
    "END:VCARD"
  ];

  const blob = new Blob([lines.join("\r\n")], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "Rahaf-Abutarbush.vcf";
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
