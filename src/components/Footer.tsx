import { Link } from "react-router-dom";
import EYLogo from "./EYLogo";

const Footer = () => (
  <footer className="mt-12 border-t border-border bg-[hsl(var(--ey-black))] text-white">
    <div className="ey-stripe" />
    <div className="container mx-auto px-6 py-8 grid md:grid-cols-3 gap-6 text-sm">
      <div>
        <EYLogo className="h-8 mb-3" variant="light" />
        <p className="text-white/70 leading-relaxed">
          Building a better working world. Decision Support System prepared for Adani Green Energy Ltd. CEO Office.
        </p>
      </div>
      <div>
        <p className="font-semibold mb-2 text-primary">Deliverables</p>
        <ul className="space-y-1 text-white/70">
          <li>Strategic, Competitive, Operational, Tactical lenses</li>
          <li>Board briefing video (90 sec)</li>
          <li>PPT &amp; PDF executive packs</li>
        </ul>
      </div>
      <div>
        <p className="font-semibold mb-2 text-primary">Disclaimer</p>
        <p className="text-white/70 text-xs leading-relaxed">
          This DSS uses illustrative figures for demonstration purposes. Figures are benchmarked against
          publicly available industry data and do not represent audited results.
        </p>
      </div>
    </div>
    <div className="border-t border-white/10 py-3 text-center text-xs text-white/50">
      © {new Date().getFullYear()} EY — Ernst &amp; Young LLP. All rights reserved.
    </div>
  </footer>
);

export default Footer;
