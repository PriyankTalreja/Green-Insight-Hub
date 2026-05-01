import { KpiCard, PageHeader, SectionCard } from "@/components/dss/Primitives";
import { capacityGlide, kpis, strategicPillars } from "@/data/dssData";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { Link } from "react-router-dom";
import { ArrowRight, FileDown, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

const ExecutiveSummary = () => {
  return (
    <>
      <PageHeader
        eyebrow="Executive Summary · CEO Decision Support System"
        title="Adani Green at a strategic inflection — scale leadership, balance-sheet repair"
        lead="A consolidated view of strategic, competitive, operational and tactical signals for the CEO. Use the lenses above to drill in. Use the AI Insights panel to interrogate any data point in EY voice."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KpiCard accent label="Operational capacity" value={`${kpis.installedGW} GW`} delta="+30% YoY" trend="up" sublabel="Largest renewables IPP in India" />
        <KpiCard label="FY30 ambition" value={`${kpis.target2030GW} GW`} sublabel={`${Math.round((kpis.installedGW / kpis.target2030GW) * 100)}% achieved · 5-yr glide path`} />
        <KpiCard label="EBITDA margin" value={`${kpis.ebitdaMarginPct}%`} delta="+180 bps" trend="up" sublabel="Best-in-class vs peer median 70%" />
        <KpiCard label="Net debt / EBITDA" value={`${kpis.netDebtToEbitda}x`} delta="vs target 4.0x" trend="down" sublabel="Refinance USD 750M HY notes priority" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <SectionCard
            title="Capacity glide path to 50 GW"
            subtitle="Operational + under construction (GW). Plan vs delivery."
          >
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={capacityGlide}>
                  <defs>
                    <linearGradient id="op" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={0.2} />
                    </linearGradient>
                    <linearGradient id="uc" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--chart-2))" stopOpacity={0.7} />
                      <stop offset="100%" stopColor="hsl(var(--chart-2))" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Area type="monotone" dataKey="operational" stackId="1" stroke="hsl(var(--chart-1))" fill="url(#op)" name="Operational" />
                  <Area type="monotone" dataKey="construction" stackId="1" stroke="hsl(var(--chart-2))" fill="url(#uc)" name="Under construction" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </div>

        <SectionCard title="Strategic pillars" subtitle="Progress vs FY30 targets">
          <div className="space-y-4">
            {strategicPillars.map((p) => (
              <div key={p.pillar}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-semibold">{p.pillar}</span>
                  <span className="text-muted-foreground">{p.current} → {p.target}</span>
                </div>
                <div className="h-2 bg-muted rounded-sm overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${p.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {[
          { to: "/strategic", title: "Strategic", desc: "Vision, portfolio, capital allocation, ESG roadmap." },
          { to: "/competitive", title: "Competitive", desc: "Peer benchmarking vs ReNew, Tata, Greenko." },
          { to: "/operational", title: "Operational", desc: "CUF, availability, generation, receivables." },
        ].map((c) => (
          <Link key={c.to} to={c.to} className="ey-card hover:border-primary transition-colors group">
            <p className="ey-kpi-label">Lens</p>
            <h3 className="text-xl font-bold mt-1">{c.title}</h3>
            <p className="text-sm text-muted-foreground mt-2">{c.desc}</p>
            <span className="inline-flex items-center gap-1 text-sm text-primary font-semibold mt-3 group-hover:gap-2 transition-all">
              Open lens <ArrowRight className="h-3 w-3" />
            </span>
          </Link>
        ))}
      </div>

      <SectionCard
        title="Static deliverables for the board"
        subtitle="EY-branded executive packs available to download alongside this dashboard"
      >
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="gap-2" disabled>
            <FileDown className="h-4 w-4" /> AdaniGreen_CEO_DSS.pptx
          </Button>
          <Button variant="outline" className="gap-2" disabled>
            <FileDown className="h-4 w-4" /> AdaniGreen_CEO_DSS.pdf
          </Button>
          <Button variant="outline" className="gap-2" disabled>
            <Video className="h-4 w-4" /> AdaniGreen_Board_Briefing.mp4 (90s)
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Files generated in `/mnt/documents/`. Wire to a download bucket to expose them to end users.
        </p>
      </SectionCard>
    </>
  );
};

export default ExecutiveSummary;
