import { NavLink } from "react-router-dom";
import EYLogo from "./EYLogo";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/", label: "Executive Summary", end: true },
  { to: "/strategic", label: "Strategic" },
  { to: "/competitive", label: "Competitive Benchmarking" },
  { to: "/operational", label: "Operational" },
  { to: "/tactical", label: "Tactical" },
  { to: "/insights", label: "AI Insights" },
];

const Header = () => (
  <header className="bg-[hsl(var(--ey-black))] text-white sticky top-0 z-40">
    <div className="container mx-auto px-6 py-3 flex items-center gap-6">
      <div className="flex items-center gap-3">
        <EYLogo className="h-10" />
        <div className="border-l border-white/20 pl-3">
          <p className="text-[10px] uppercase tracking-widest text-white/60">CEO Decision Support System</p>
          <p className="text-sm font-bold">Adani Green Energy Ltd.</p>
        </div>
      </div>
      <div className="ml-auto hidden md:flex items-center gap-1 text-xs">
        <span className="px-2 py-1 bg-primary text-primary-foreground font-semibold rounded-sm">FY26 Q1</span>
        <span className="text-white/60 ml-2">Confidential — Board use only</span>
      </div>
    </div>
    <nav className="bg-[hsl(var(--ey-black))] border-t border-white/10">
      <div className="container mx-auto px-6 flex gap-1 overflow-x-auto">
        {tabs.map((t) => (
          <NavLink
            key={t.to}
            to={t.to}
            end={t.end}
            className={({ isActive }) =>
              cn(
                "px-4 py-3 text-sm whitespace-nowrap border-b-2 transition-colors",
                isActive
                  ? "border-primary text-primary font-semibold"
                  : "border-transparent text-white/70 hover:text-white"
              )
            }
          >
            {t.label}
          </NavLink>
        ))}
      </div>
    </nav>
  </header>
);

export default Header;
