import { PageHeader, SectionCard, KpiCard } from "@/components/dss/Primitives";
import { competitiveRadar, peerScorecard } from "@/data/dssData";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Competitive = () => (
  <>
    <PageHeader
      eyebrow="Competitive Benchmarking lens"
      title="Scale and margin leadership; balance-sheet remains the differentiator gap"
      lead="Adani Green leads the Indian renewables IPP cohort on installed capacity, EBITDA margin and pipeline depth. Tata Power leads on balance-sheet strength. Greenko edges on CUF. ESG ratings are the closest race."
    />

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <KpiCard accent label="Market share (renewables IPP)" value="17.4%" delta="+220 bps YoY" trend="up" />
      <KpiCard label="Capacity vs #2 peer" value="1.4x" sublabel="vs ReNew 10.3 GW" />
      <KpiCard label="Margin vs peer median" value="+22 pp" trend="up" sublabel="92% vs 70%" />
      <KpiCard label="Leverage vs peer median" value="+1.4x" trend="down" sublabel="5.8x vs 5.4x" />
    </div>

    <div className="grid lg:grid-cols-2 gap-6 mb-8">
      <SectionCard title="Competitive radar" subtitle="Indexed score (0-100) across six dimensions">
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={competitiveRadar}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="axis" tick={{ fontSize: 11, fill: "hsl(var(--foreground))" }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Radar name="Adani Green" dataKey="Adani Green" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.5} />
              <Radar name="ReNew" dataKey="ReNew" stroke="hsl(var(--chart-3))" fill="hsl(var(--chart-3))" fillOpacity={0.2} />
              <Radar name="Tata Power" dataKey="Tata" stroke="hsl(var(--chart-4))" fill="hsl(var(--chart-4))" fillOpacity={0.2} />
              <Radar name="Greenko" dataKey="Greenko" stroke="hsl(var(--chart-5))" fill="hsl(var(--chart-5))" fillOpacity={0.2} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      <SectionCard title="Operational capacity (GW)" subtitle="Indian renewables IPP league table">
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={peerScorecard} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" fontSize={12} stroke="hsl(var(--muted-foreground))" />
              <YAxis dataKey="peer" type="category" width={120} fontSize={12} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Bar dataKey="capacity" fill="hsl(var(--chart-1))" name="GW operational" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>
    </div>

    <SectionCard title="Peer scorecard" subtitle="Illustrative figures — benchmarked against public disclosures">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-foreground text-left">
              <th className="py-3 pr-4">Peer</th>
              <th className="py-3 pr-4 text-right">Capacity (GW)</th>
              <th className="py-3 pr-4 text-right">CUF (%)</th>
              <th className="py-3 pr-4 text-right">Net debt / EBITDA</th>
              <th className="py-3 pr-4 text-right">EBITDA margin (%)</th>
              <th className="py-3 pr-4 text-right">Market share (%)</th>
            </tr>
          </thead>
          <tbody>
            {peerScorecard.map((p) => (
              <tr key={p.peer} className={`border-b border-border ${p.peer === "Adani Green" ? "bg-primary/10 font-semibold" : ""}`}>
                <td className="py-3 pr-4">{p.peer}</td>
                <td className="py-3 pr-4 text-right tabular-nums">{p.capacity}</td>
                <td className="py-3 pr-4 text-right tabular-nums">{p.cuf}</td>
                <td className="py-3 pr-4 text-right tabular-nums">{p.leverage}x</td>
                <td className="py-3 pr-4 text-right tabular-nums">{p.marginPct}</td>
                <td className="py-3 pr-4 text-right tabular-nums">{p.share}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  </>
);

export default Competitive;
