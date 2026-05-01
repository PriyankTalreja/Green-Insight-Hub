import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface KpiProps {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "flat";
  sublabel?: string;
  accent?: boolean;
}

export const KpiCard = ({ label, value, delta, trend = "flat", sublabel, accent }: KpiProps) => {
  const trendColor =
    trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground";
  const arrow = trend === "up" ? "▲" : trend === "down" ? "▼" : "■";
  return (
    <div className={cn("ey-card relative overflow-hidden", accent && "border-l-4 border-l-primary")}>
      <p className="ey-kpi-label">{label}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="ey-kpi-value">{value}</span>
        {delta && <span className={cn("text-xs font-semibold", trendColor)}>{arrow} {delta}</span>}
      </div>
      {sublabel && <p className="text-xs text-muted-foreground mt-2">{sublabel}</p>}
    </div>
  );
};

export const SectionCard = ({
  title,
  subtitle,
  children,
  action,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  action?: ReactNode;
}) => (
  <div className="ey-card">
    <div className="flex items-start justify-between mb-4 gap-4">
      <div>
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
    {children}
  </div>
);

export const PageHeader = ({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) => (
  <div className="mb-8">
    <p className="text-xs uppercase tracking-widest text-primary font-bold mb-2">{eyebrow}</p>
    <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">{title}</h1>
    {lead && <p className="text-base text-muted-foreground mt-3 max-w-3xl leading-relaxed">{lead}</p>}
    <div className="ey-stripe mt-4 max-w-[60px]" />
  </div>
);
