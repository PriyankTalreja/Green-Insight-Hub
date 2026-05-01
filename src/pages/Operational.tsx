import { PageHeader, SectionCard, KpiCard } from "@/components/dss/Primitives";
import { kpis, operationalMonthly, receivablesAging } from "@/data/dssData";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Operational = () => (
  <>
    <PageHeader
      eyebrow="Operational lens"
      title="Fleet performance solid — receivables remain the operational headline risk"
      lead="CUF tracking 24.8% (industry-leading) with 99.6% availability. DSO at 142 days driven by DISCOM dues in 3 states. Generation pacing 6% above plan year-to-date."
    />

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <KpiCard accent label="Fleet CUF" value={`${kpis.cuf}%`} delta="+90 bps" trend="up" sublabel="vs industry 22.5%" />
      <KpiCard label="Availability" value={`${kpis.availability}%`} delta="+20 bps" trend="up" sublabel="O&M digital twin uplift" />
      <KpiCard label="DSO" value={`${kpis.dso} days`} delta="+12 days" trend="down" sublabel="DISCOM exposure: TN, AP, MH" />
      <KpiCard label="Receivables outstanding" value="₹9,420 Cr" sublabel="₹2,830 Cr aged >90 days" />
    </div>

    <div className="grid lg:grid-cols-2 gap-6 mb-8">
      <SectionCard title="Monthly CUF and availability" subtitle="Last 8 months — fleet-wide">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={operationalMonthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" fontSize={12} stroke="hsl(var(--muted-foreground))" />
              <YAxis yAxisId="left" fontSize={12} stroke="hsl(var(--muted-foreground))" />
              <YAxis yAxisId="right" orientation="right" domain={[99, 100]} fontSize={12} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar yAxisId="left" dataKey="cuf" fill="hsl(var(--chart-1))" name="CUF (%)" />
              <Line yAxisId="right" type="monotone" dataKey="availability" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Availability (%)" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      <SectionCard title="Receivables aging" subtitle="₹ Crore by aging bucket">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={receivablesAging}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="bucket" fontSize={12} stroke="hsl(var(--muted-foreground))" />
              <YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} formatter={(v: number) => `₹${v.toLocaleString()} Cr`} />
              <Bar dataKey="amount" fill="hsl(var(--chart-1))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>
    </div>

    <SectionCard title="Generation vs plan (GWh)" subtitle="Fleet-wide actual generation by month">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={operationalMonthly}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" fontSize={12} stroke="hsl(var(--muted-foreground))" />
            <YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" />
            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
            <Bar dataKey="generation" fill="hsl(var(--chart-2))" name="Generation (GWh)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  </>
);

export default Operational;
