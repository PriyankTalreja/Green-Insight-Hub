import { PageHeader, SectionCard, KpiCard } from "@/components/dss/Primitives";
import { capacityGlide, capitalAllocation, strategicPillars } from "@/data/dssData";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ComposedChart,
} from "recharts";

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))", "hsl(var(--chart-6))"];

const Strategic = () => (
  <>
    <PageHeader
      eyebrow="Strategic lens"
      title="From scale-only to scale + structural advantage"
      lead="Five strategic pillars that together unlock the FY30 ambition: capacity, cost, balance-sheet, diversification and ESG leadership. Capital allocation re-weighted toward storage and hybrid to defend long-run margin."
    />

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <KpiCard accent label="FY30 capacity ambition" value="50 GW" sublabel="3.5x current operational base" />
      <KpiCard label="Capital plan FY26-30" value="₹2.3 L Cr" sublabel="65% solar · 23% wind/hybrid · 14% BESS" />
      <KpiCard label="LCOE trajectory" value="₹2.20/kWh" delta="-11% by FY28" trend="down" />
      <KpiCard label="Scope 1+2 reduction" value="-18%" delta="vs FY23 baseline" trend="up" sublabel="On track for SBTi" />
    </div>

    <div className="grid lg:grid-cols-2 gap-6 mb-8">
      <SectionCard title="Capacity build-out vs plan" subtitle="GW operational by fiscal year">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={capacityGlide}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="year" fontSize={12} stroke="hsl(var(--muted-foreground))" />
              <YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="operational" fill="hsl(var(--chart-1))" name="Operational GW" />
              <Line type="monotone" dataKey="plan" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Plan GW" dot />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      <SectionCard title="Capital allocation FY26-30" subtitle="% of ₹2.3 lakh crore plan">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={capitalAllocation} dataKey="value" nameKey="name" innerRadius={60} outerRadius={110} paddingAngle={2}>
                {capitalAllocation.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} formatter={(v: number) => `${v}%`} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>
    </div>

    <SectionCard title="Five strategic pillars — progress detail">
      <div className="grid md:grid-cols-5 gap-4">
        {strategicPillars.map((p) => (
          <div key={p.pillar} className="border border-border p-4 rounded-sm">
            <p className="ey-kpi-label">{p.pillar}</p>
            <p className="text-2xl font-bold mt-2 tabular-nums">{p.current}</p>
            <p className="text-xs text-muted-foreground">→ {p.target}</p>
            <div className="mt-3 h-1.5 bg-muted rounded-sm overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${p.progress}%` }} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">{p.progress}% complete</p>
          </div>
        ))}
      </div>
    </SectionCard>
  </>
);

export default Strategic;
