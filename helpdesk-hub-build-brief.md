# Build Brief — UK IT Help Desk Software Comparison Hub

**For:** Claude Code
**Goal:** A genuinely independent, UK-focused comparison site for IT help desk / service desk software, monetised by recurring affiliate commissions, designed to earn ~£1,000/month within 12–18 months and run largely hands-off thereafter.

> **How to use this file:** Open the project folder in VS Code, start Claude Code, and paste/point it at this brief. Work through the **Build Sequence** at the bottom one step at a time. Do **not** attempt to build all pages at once.

---

## 1. Strategy (the "why", so build choices stay aligned)

- **The wedge:** Generic head terms ("best IT help desk software") are saturated by US-centric review aggregators and biased vendor pages. The opening is **UK-specific + narrow vertical/use-case** content, written with genuine practitioner authority (the owner is a UK IT & Facilities Manager who runs a service desk).
- **2026 SEO reality:** AI Overviews eat thin "what is X" content. Pages must lead with genuine comparison, real opinion, structured data, and at least one interactive tool that an AI summary cannot replace (the cost calculator). Independence and depth are the moat.
- **Monetisation:** Recurring affiliate commissions are the spine (income compounds, low maintenance). One-off/lifetime deals are a secondary layer only where a tool in-niche offers one. Display ads are a later add-on once traffic clears a network threshold.

---

## 2. Tech stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Astro** | Content-first, excellent SEO/perf, minimal config. Use **content collections** for pages and a single data file for software. |
| Interactive bits | **React islands** (Astro's React integration) | For the cost calculator and any filterable comparison UI only — keep the rest static. |
| Styling | **Tailwind CSS** | Fast, consistent. |
| Icons | **Lucide** (`lucide-react` / `lucide` ) | Owner's standard icon set. |
| Content format | **Markdown / MDX** | Each comparison page is an MDX file so prose + components mix cleanly. |
| Data | **One TypeScript data file** (`src/data/software.ts`) | All software products + affiliate links + pricing in one place, so the whole site updates by editing one file. This is critical for "hands-off". |
| Hosting | **Vercel** (free tier) | Auto-deploy from GitHub on push. |
| Repo | **GitHub** | Claude Code to initialise, commit, and connect. |

---

## 3. Data model (build this first — everything reads from it)

Create `src/data/software.ts` exporting a typed array. Each product:

```ts
{
  id: string;              // "freshservice"
  name: string;            // "Freshservice"
  vendor: string;          // "Freshworks"
  category: "itsm" | "helpdesk" | "livechat";
  startingPriceGBP: number;        // per agent / month, GBP
  freeTier: boolean;
  bestFor: string[];       // ["internal IT", "MSPs", "logistics"]
  ukHosting: boolean;      // UK/EU data residency available?
  pros: string[];
  cons: string[];
  affiliate: {
    url: string;           // full affiliate link
    network: string;       // "PartnerStack" | "Impact" | "direct"
    commission: string;    // human-readable, e.g. "15% recurring (12 mo)"
  };
  rating: number;          // owner's editorial score /5
}
```

Seed it with the products in the Appendix. Prices are illustrative — flag any the owner should verify.

---

## 4. Components to build

1. **`ComparisonTable`** (React island) — filterable/sortable table reading from `software.ts`. Filters: category, free tier, price range, "best for" vertical. Each row has a clearly-labelled affiliate CTA (`rel="sponsored nofollow"`).
2. **`CostCalculator`** (React island) — **the centrepiece, AI-Overview-resistant.** Inputs: number of agents, plan tier, optional add-ons. Output: side-by-side annual cost across the top products, with a "cheapest for your size" verdict. This is the linkable asset other sites cite.
3. **`ProductCard`** — used in listicle pages; name, score, one-line verdict, pros/cons, CTA.
4. **`AffiliateDisclosure`** — reusable banner. **Required on every monetised page** (see §6).
5. **`Layout`** — header, footer, fast/clean independent-reviewer aesthetic. Footer carries About, editorial-independence statement, and affiliate disclosure link.

---

## 5. Page architecture & build order

Each page is an MDX file in `src/content/`. Build in waves; ship after each wave.

**Wave 1 — fast wins (lowest competition):**
1. Cost calculator page (`/it-help-desk-cost-calculator`) — the centrepiece tool + explainer.
2. Best help desk software for UK charities & non-profits
3. Best help desk software for UK schools & multi-academy trusts
4. Best help desk software for UK MSPs / IT support firms
5. Best IT ticketing for UK logistics & manufacturing firms *(owner's own sector — write with real authority)*

**Wave 2 — core money pages:**
6. Best internal IT help desk / ITSM for UK SMEs
7. Best help desk software for UK small businesses (2026) *(hub page; internally links to all verticals)*
8. Best help desk software for UK e-commerce & retail SMEs
9. Best help desk software for UK accountancy & professional services
10. Best help desk software for UK property & lettings agencies

**Wave 3 — comparison/decision intent:**
11. Freshdesk vs Zoho Desk for UK small business
12. Freshservice vs Jira Service Management
13. Best Zendesk alternatives for UK SMEs
14. Best free help desk software UK
15. Best live chat + ticketing for UK small business

**Internal linking:** Page 7 is the hub; every vertical page links up to it and across to 2–3 sibling pages. Calculator (page 1) is linked from every page.

---

## 6. Affiliate integration & UK compliance

- Store every affiliate URL in `software.ts` only — never hard-code links in pages.
- All affiliate links: `rel="sponsored nofollow"` and `target="_blank"`.
- **Disclosure (UK ASA / CMA rules):** a clear, visible affiliate disclosure must appear on every page that contains affiliate links, near the top, in plain language (e.g. "We may earn a commission if you sign up through our links. This never affects our rankings."). Use the `AffiliateDisclosure` component.
- Editorial independence statement in the footer and About page — this is both an ASA requirement and an SEO trust signal in 2026.

---

## 7. SEO requirements

- Unique, genuinely-written title + meta description per page; one clear H1.
- Each comparison page: real verdict in the first 100 words, then depth (comparison table, pros/cons, who-each-is-for, pricing reality, a recommendation).
- **Schema markup:** `Article`, `ItemList`/`Product` for comparison lists, `FAQPage` where FAQs exist.
- Fast Core Web Vitals (Astro handles most; keep islands minimal).
- `sitemap.xml` + `robots.txt` (Astro sitemap integration).
- Canonical URLs; clean slugs (`/best-help-desk-software-uk-charities`).
- No thin/duplicated content — each vertical page must have genuinely distinct analysis, not a find-and-replace of the vertical name.

---

## 8. Design

- Clean, trustworthy, fast — "independent reviewer", not "salesy affiliate blog".
- Lucide icons throughout.
- Light theme, generous whitespace, readable typography (system font stack or Inter).
- Comparison tables and the calculator are the visual focus; everything else stays calm.
- Mobile-first (most traffic will be mobile).

---

## 9. Build sequence for Claude Code (do these in order)

1. **Scaffold:** Create a new Astro project with Tailwind + React + sitemap integrations in this folder. Initialise Git.
2. **Data layer:** Build `src/data/software.ts` with the types in §3, seeded from the Appendix.
3. **Layout + one page:** Build `Layout`, `AffiliateDisclosure`, and the **cost calculator page only**. Run it locally (`npm run dev`) so it can be viewed in the browser. **Stop here and confirm it looks right before continuing.**
4. **Deploy early:** Create a GitHub repo, push, connect to Vercel, deploy. Confirm the live URL works. (Walk the owner through each click — they are a Git/GitHub novice.)
5. **Wave 1 pages:** Build pages 2–5 plus the `ComparisonTable` and `ProductCard` components. Commit + deploy.
6. **Iterate:** Waves 2 and 3 in later sessions, one wave per sitting.

> Keep each session scoped to one wave. After each, commit with a clear message and redeploy.

---

## Appendix — Anchor affiliate programmes (verify current terms at signup)

| Programme | Products | Commission | Cookie | Network / Signup |
|---|---|---|---|---|
| **Freshworks** | Freshdesk, Freshservice (ITSM) | 15% recurring for 12 months (up to 25% at higher tiers) + $5/valid lead | 90 days | PartnerStack — freshworks.com/company/affiliate-partner |
| **Zoho** | Zoho Desk (+ wider suite) | Up to 15% first-year (rising to ~20% with volume) | 30–90 days | zoho.com/affiliate/signup.html |
| **Tidio** | Live chat + AI | 30% lifetime recurring | 30 days | Impact — tidio.com/partners/affiliate |
| **HubSpot** | Service Hub | 15% recurring (12 mo) or 100% first month — affiliate's choice; verify current tier | ~90–180 days | Search "HubSpot affiliate program" |
| **LiveAgent** | Multichannel help desk | Conversion commission + $5 signup bonus | — | liveagent.com (verify rate) |

**Funnel mapping:** Freshservice/Zoho → internal-IT, ITSM, MSP, logistics, schools pages. Tidio → e-commerce/SME live-chat pages. HubSpot → premium/professional-services pages. Freshworks via PartnerStack is the anchor (recurring, well-tracked, $5 min payout).

*All commission figures should be confirmed on each programme's signup page before going live, as terms change.*
