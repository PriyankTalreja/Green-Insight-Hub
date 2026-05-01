import { PageHeader, SectionCard, KpiCard } from "@/components/dss/Primitives";
import { tacticalActions } from "@/data/dssData";
import { cn } from "@/lib/utils";

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    "On track": "bg-success text-success-foreground",
    "At risk": "bg-destructive text-destructive-foreground",
    Watch: "bg-warning text-warning-foreground",
  };
  return map[status] || "bg-muted text-muted-foreground";
};

const impactBadge = (impact: string) =>
  impact === "High" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground";

const Tactical = () => {
  const total = tacticalActions.length;
  const onTrack = tacticalActions.filter((t) => t.status === "On track").length;
  const atRisk = tacticalActions.filter((t) => t.status === "At risk").length;
  const watch = tacticalActions.filter((t) => t.status === "Watch").length;

  return (
    <>
      <PageHeader
        eyebrow="Tactical lens"
        title="90-day action register — owner, timeline, status"
        lead="Eight tactical bets that move the strategic needle inside the next quarter. Each is owned at C-suite level and tracked weekly. Refinance is the single most urgent at-risk item."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KpiCard accent label="Total actions" value={`${total}`} sublabel="Tracked at CEO weekly review" />
        <KpiCard label="On track" value={`${onTrack}`} sublabel="Green status" />
        <KpiCard label="Watch" value={`${watch}`} sublabel="Amber status" />
        <KpiCard label="At risk" value={`${atRisk}`} sublabel="Red status — escalate" />
      </div>

      <SectionCard title="90-day action register" subtitle="C-suite ownership · weekly cadence">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-foreground text-left">
                <th className="py-3 pr-3 w-12">#</th>
                <th className="py-3 pr-3">Action</th>
                <th className="py-3 pr-3">Owner</th>
                <th className="py-3 pr-3 text-right">Days</th>
                <th className="py-3 pr-3">Impact</th>
                <th className="py-3 pr-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {tacticalActions.map((t) => (
                <tr key={t.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-3 pr-3 font-mono text-xs text-muted-foreground">{t.id}</td>
                  <td className="py-3 pr-3 font-medium">{t.action}</td>
                  <td className="py-3 pr-3">{t.owner}</td>
                  <td className="py-3 pr-3 text-right tabular-nums">{t.days}</td>
                  <td className="py-3 pr-3">
                    <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-sm", impactBadge(t.impact))}>{t.impact}</span>
                  </td>
                  <td className="py-3 pr-3">
                    <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-sm", statusBadge(t.status))}>{t.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <div className="mt-6 grid md:grid-cols-3 gap-4">
        {[
          { title: "CEO review cadence", body: "Weekly Monday 8am — 30 minutes. Standing item: refinance, DISCOM, Khavda." },
          { title: "Escalation rule", body: "Any action slipping by >7 days against plan auto-escalates to CEO + Board chair." },
          { title: "Decision rights", body: "Capex >₹500 Cr requires CEO; PPA pricing band requires CCO + CFO sign-off." },
        ].map((c) => (
          <div key={c.title} className="ey-card border-l-4 border-l-primary">
            <p className="ey-kpi-label">Operating rhythm</p>
            <p className="font-bold mt-1">{c.title}</p>
            <p className="text-sm text-muted-foreground mt-2">{c.body}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Tactical;
