import { useState, useMemo } from "react";
import { Calculator, TrendingDown, Check, Info } from "lucide-react";

// Pricing data per product × tier. All figures are GBP/agent/month.
// VERIFY these against each vendor's current pricing page before going live.
const PRODUCTS = [
  {
    id: "freshdesk",
    name: "Freshdesk",
    url: "https://www.freshworks.com/freshdesk/", // REPLACE with affiliate link
    tiers: {
      free: 0,
      starter: 12,   // Growth plan — VERIFY
      pro: 35,       // Pro plan — VERIFY
      enterprise: 60, // Enterprise — VERIFY
    },
    freeTierLimit: 10, // free up to any number on Free plan (feature-limited)
    category: "helpdesk",
    highlight: "Best for small teams new to helpdesk",
  },
  {
    id: "freshservice",
    name: "Freshservice",
    url: "https://www.freshworks.com/freshservice/", // REPLACE with affiliate link
    tiers: {
      free: null,    // no free tier
      starter: 15,   // Starter — VERIFY
      pro: 30,       // Growth — VERIFY
      enterprise: 55, // Pro — VERIFY
    },
    freeTierLimit: 0,
    category: "itsm",
    highlight: "Best ITSM for internal IT teams",
  },
  {
    id: "zoho-desk",
    name: "Zoho Desk",
    url: "https://www.zoho.com/desk/", // REPLACE with affiliate link
    tiers: {
      free: 0,
      starter: 7,    // Express — VERIFY
      pro: 12,       // Standard — VERIFY
      enterprise: 25, // Professional — VERIFY
    },
    freeTierLimit: 3,
    category: "helpdesk",
    highlight: "Best value for money",
  },
  {
    id: "hubspot",
    name: "HubSpot Service Hub",
    url: "https://www.hubspot.com/products/service", // REPLACE with affiliate link
    tiers: {
      free: 0,
      starter: 15,   // Starter (per seat, 2 min) — VERIFY
      pro: 90,       // Professional — VERIFY
      enterprise: 150, // Enterprise — VERIFY
    },
    freeTierLimit: 999,
    category: "helpdesk",
    highlight: "Best if you also use HubSpot CRM",
  },
  {
    id: "liveagent",
    name: "LiveAgent",
    url: "https://www.liveagent.com/", // REPLACE with affiliate link
    tiers: {
      free: 0,
      starter: 7,    // Small — VERIFY
      pro: 12,       // Medium — VERIFY
      enterprise: 30, // Large — VERIFY
    },
    freeTierLimit: 999,
    category: "helpdesk",
    highlight: "Best all-in-one chat + ticketing",
  },
  {
    id: "zendesk",
    name: "Zendesk",
    url: "https://www.zendesk.com/",
    tiers: {
      free: null,
      starter: 40,   // Suite Team — VERIFY
      pro: 75,       // Suite Growth — VERIFY
      enterprise: 100, // Suite Pro — VERIFY
    },
    freeTierLimit: 0,
    category: "helpdesk",
    highlight: "Enterprise-grade, premium price",
  },
] as const;

type TierKey = "free" | "starter" | "pro" | "enterprise";

const TIER_LABELS: Record<TierKey, string> = {
  free: "Free",
  starter: "Starter / Entry",
  pro: "Professional / Growth",
  enterprise: "Enterprise / Advanced",
};

function formatGBP(n: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function CostCalculator() {
  const [agents, setAgents] = useState(5);
  const [tier, setTier] = useState<TierKey>("starter");

  const results = useMemo(() => {
    return PRODUCTS.map((p) => {
      const pricePerAgent = p.tiers[tier];

      // Some products have no free tier — skip on free selection
      if (tier === "free" && pricePerAgent === null) {
        return { ...p, monthlyTotal: null, annualTotal: null, note: "No free plan" };
      }
      // Free tier with agent limit exceeded
      if (tier === "free" && pricePerAgent === 0 && agents > p.freeTierLimit) {
        const nextTier = p.tiers["starter"];
        const monthly = nextTier !== null ? nextTier * agents : null;
        return {
          ...p,
          monthlyTotal: monthly,
          annualTotal: monthly !== null ? monthly * 12 : null,
          note: `Free tier is ${p.freeTierLimit === 999 ? "unlimited agents" : `up to ${p.freeTierLimit} agents`} — shown at Starter price`,
        };
      }

      if (pricePerAgent === null) {
        return { ...p, monthlyTotal: null, annualTotal: null, note: "Plan not available" };
      }

      const monthly = pricePerAgent * agents;
      return { ...p, monthlyTotal: monthly, annualTotal: monthly * 12, note: null };
    });
  }, [agents, tier]);

  const validResults = results.filter((r) => r.annualTotal !== null);
  const cheapest = validResults.length
    ? validResults.reduce((a, b) =>
        (a.annualTotal ?? Infinity) < (b.annualTotal ?? Infinity) ? a : b
      )
    : null;

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 sm:p-6 space-y-5">
        <div className="flex items-center gap-2 text-gray-700 font-semibold">
          <Calculator className="h-5 w-5 text-blue-600" />
          <span>Configure your team</span>
        </div>

        {/* Agent count */}
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <label htmlFor="agents" className="text-sm font-medium text-gray-700">
              Number of agents (support staff)
            </label>
            <span className="text-2xl font-bold text-blue-700">{agents}</span>
          </div>
          <input
            id="agents"
            type="range"
            min={1}
            max={50}
            value={agents}
            onChange={(e) => setAgents(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>1 agent</span>
            <span>50 agents</span>
          </div>
        </div>

        {/* Plan tier */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Plan tier</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(["free", "starter", "pro", "enterprise"] as TierKey[]).map((t) => (
              <button
                key={t}
                onClick={() => setTier(t)}
                className={`py-2 px-3 rounded-lg border text-sm font-medium transition-colors ${
                  tier === t
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-white border-gray-200 text-gray-700 hover:border-blue-300"
                }`}
              >
                {TIER_LABELS[t]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Verdict banner */}
      {cheapest && cheapest.annualTotal !== null && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
          <TrendingDown className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-green-900">
            <strong>Cheapest for {agents} agent{agents !== 1 ? "s" : ""} on the {TIER_LABELS[tier]} tier:</strong>{" "}
            <strong className="text-green-700">{cheapest.name}</strong> at{" "}
            <strong>{formatGBP(cheapest.annualTotal)}/year</strong>{" "}
            ({formatGBP(cheapest.monthlyTotal ?? 0)}/month).
          </div>
        </div>
      )}

      {/* Results table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Product</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-700">Monthly</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-700">Annual</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {results
              .sort((a, b) => {
                if (a.annualTotal === null) return 1;
                if (b.annualTotal === null) return -1;
                return a.annualTotal - b.annualTotal;
              })
              .map((r) => {
                const isCheapest = cheapest?.id === r.id && r.annualTotal !== null;
                return (
                  <tr
                    key={r.id}
                    className={`transition-colors ${isCheapest ? "bg-green-50" : "hover:bg-gray-50"}`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {isCheapest && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium bg-green-100 text-green-700 rounded-full px-2 py-0.5">
                            <Check className="h-3 w-3" /> Cheapest
                          </span>
                        )}
                        <div>
                          <div className="font-medium text-gray-900">{r.name}</div>
                          <div className="text-xs text-gray-500">{r.highlight}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-gray-900">
                      {r.monthlyTotal !== null ? formatGBP(r.monthlyTotal) : "—"}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-gray-900">
                      {r.annualTotal !== null ? formatGBP(r.annualTotal) : "—"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {r.annualTotal !== null ? (
                        <a
                          href={r.url}
                          target="_blank"
                          rel="sponsored nofollow noreferrer"
                          className="inline-block text-xs font-medium bg-blue-600 text-white rounded-lg px-3 py-1.5 hover:bg-blue-700 transition-colors whitespace-nowrap"
                        >
                          Try {r.name} →
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400">{r.note}</span>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-2 text-xs text-gray-500">
        <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
        <p>
          All prices shown are indicative, in GBP, and based on per-agent monthly billing. Actual costs may differ depending on billing cycle, currency conversion, add-ons, and current vendor promotions. Always verify pricing on each vendor&apos;s website before committing.
        </p>
      </div>
    </div>
  );
}
