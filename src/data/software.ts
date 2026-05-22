export type SoftwareCategory = "itsm" | "helpdesk" | "livechat";

export interface Software {
  id: string;
  name: string;
  vendor: string;
  category: SoftwareCategory;
  startingPriceGBP: number; // per agent / month
  freeTier: boolean;
  bestFor: string[];
  ukHosting: boolean;
  pros: string[];
  cons: string[];
  affiliate: {
    url: string;
    network: string;
    commission: string;
  };
  rating: number; // /5
}

// IMPORTANT: Verify all startingPriceGBP figures and affiliate commission terms
// before going live — these change regularly. Affiliate URLs are placeholders
// until you have joined each programme.

export const software: Software[] = [
  {
    id: "freshdesk",
    name: "Freshdesk",
    vendor: "Freshworks",
    category: "helpdesk",
    startingPriceGBP: 0, // VERIFY — free tier exists; Growth plan ~£12/agent/mo
    freeTier: true,
    bestFor: ["small business", "e-commerce", "charities", "schools"],
    ukHosting: true,
    pros: [
      "Generous free tier for small teams",
      "Clean, intuitive interface — staff adopt it quickly",
      "Strong email-to-ticket automation",
      "EU data hosting available (GDPR-friendly)",
    ],
    cons: [
      "Reporting is weak on lower plans",
      "AI features locked behind expensive tiers",
      "No UK phone support on free/growth plans",
    ],
    affiliate: {
      url: "https://www.freshworks.com/freshdesk/", // REPLACE with your PartnerStack affiliate link
      network: "PartnerStack",
      commission: "15% recurring for 12 months (verify at signup)",
    },
    rating: 4.2,
  },
  {
    id: "freshservice",
    name: "Freshservice",
    vendor: "Freshworks",
    category: "itsm",
    startingPriceGBP: 15, // VERIFY — Starter plan ~$19/agent/mo; convert at current rate
    freeTier: false,
    bestFor: ["internal IT", "MSPs", "logistics", "manufacturing", "schools"],
    ukHosting: true,
    pros: [
      "Full ITIL-aligned ITSM out of the box",
      "Asset management included on all plans",
      "Excellent automation and workflow builder",
      "Strong change and release management",
    ],
    cons: [
      "Pricier than helpdesk-only tools",
      "Overkill for teams under ~5 agents",
      "Mobile app lags behind the web UI",
    ],
    affiliate: {
      url: "https://www.freshworks.com/freshservice/", // REPLACE with your PartnerStack affiliate link
      network: "PartnerStack",
      commission: "15% recurring for 12 months + $5/valid lead (verify at signup)",
    },
    rating: 4.4,
  },
  {
    id: "zoho-desk",
    name: "Zoho Desk",
    vendor: "Zoho",
    category: "helpdesk",
    startingPriceGBP: 0, // VERIFY — free tier for up to 3 agents; Express ~£7/agent/mo
    freeTier: true,
    bestFor: ["small business", "professional services", "charities", "existing Zoho users"],
    ukHosting: true,
    pros: [
      "Outstanding value — cheapest paid tier in class",
      "Deep integration with the wider Zoho suite",
      "Zia AI assistant included on higher plans",
      "EU data centres (GDPR-compliant)",
    ],
    cons: [
      "UI feels dated compared to Freshdesk",
      "Setup takes longer without a Zoho partner",
      "Support quality varies",
    ],
    affiliate: {
      url: "https://www.zoho.com/desk/", // REPLACE with your Zoho affiliate link
      network: "Zoho Affiliate Programme",
      commission: "Up to 15% first year, rising with volume (verify at signup)",
    },
    rating: 4.1,
  },
  {
    id: "tidio",
    name: "Tidio",
    vendor: "Tidio",
    category: "livechat",
    startingPriceGBP: 0, // VERIFY — free tier; Starter ~£25/mo; verify current GBP pricing
    freeTier: true,
    bestFor: ["e-commerce", "small business", "retail", "Shopify stores"],
    ukHosting: false,
    pros: [
      "Best-in-class live chat + AI chatbot combo",
      "One-click Shopify and WooCommerce integration",
      "30% lifetime recurring commission — best in category",
      "Very quick to set up (under an hour)",
    ],
    cons: [
      "Not a full ticketing/ITSM system",
      "No UK/EU data hosting (US-based)",
      "Gets expensive as chat volume grows",
    ],
    affiliate: {
      url: "https://www.tidio.com/", // REPLACE with your Impact affiliate link
      network: "Impact",
      commission: "30% lifetime recurring (verify at signup)",
    },
    rating: 4.3,
  },
  {
    id: "hubspot-service",
    name: "HubSpot Service Hub",
    vendor: "HubSpot",
    category: "helpdesk",
    startingPriceGBP: 0, // VERIFY — free tier exists; Starter ~£15/seat/mo (2 seat min)
    freeTier: true,
    bestFor: ["professional services", "accountancy", "property", "sales-led businesses"],
    ukHosting: true,
    pros: [
      "Seamless CRM integration — full customer history in one place",
      "Polished UI, easy to get buy-in from non-IT staff",
      "Strong reporting on all paid plans",
      "EU data hosting available",
    ],
    cons: [
      "Not a true ITSM tool — no ITIL alignment",
      "Gets expensive fast once you leave the free tier",
      "Best value only if you also use HubSpot CRM/Marketing",
    ],
    affiliate: {
      url: "https://www.hubspot.com/products/service", // REPLACE with your HubSpot affiliate link
      network: "HubSpot Affiliate Programme",
      commission: "15% recurring 12 mo OR 100% first month — verify current tier at signup",
    },
    rating: 4.0,
  },
  {
    id: "liveagent",
    name: "LiveAgent",
    vendor: "Quality Unit",
    category: "helpdesk",
    startingPriceGBP: 0, // VERIFY — free tier; Small ~£7/agent/mo (verify current GBP)
    freeTier: true,
    bestFor: ["small business", "e-commerce", "MSPs", "live chat + ticketing"],
    ukHosting: false,
    pros: [
      "All-in-one: ticketing, live chat, call centre in one product",
      "Very affordable entry price",
      "150+ integrations",
      "Strong SLA management on paid plans",
    ],
    cons: [
      "UI looks dated",
      "No UK/EU data hosting on entry plans",
      "Reporting less polished than Freshdesk",
    ],
    affiliate: {
      url: "https://www.liveagent.com/", // REPLACE with your LiveAgent affiliate link
      network: "LiveAgent Affiliate",
      commission: "Conversion commission + $5 signup bonus (verify current rate at signup)",
    },
    rating: 3.9,
  },
  {
    id: "jira-service-management",
    name: "Jira Service Management",
    vendor: "Atlassian",
    category: "itsm",
    startingPriceGBP: 0, // VERIFY — free up to 3 agents; Standard ~£17/agent/mo
    freeTier: true,
    bestFor: ["internal IT", "software teams", "MSPs", "enterprises"],
    ukHosting: true,
    pros: [
      "Native Jira/Confluence integration — ideal for dev-adjacent IT teams",
      "Powerful automation",
      "Strong change management and CMDB",
      "EU data hosting (GDPR-compliant)",
    ],
    cons: [
      "Steep learning curve for non-technical users",
      "Overkill for small helpdesk teams",
      "Complex to configure without Atlassian experience",
    ],
    affiliate: {
      url: "https://www.atlassian.com/software/jira/service-management",
      network: "None — no public affiliate programme as of 2025",
      commission: "N/A",
    },
    rating: 4.1,
  },
  {
    id: "zendesk",
    name: "Zendesk",
    vendor: "Zendesk",
    category: "helpdesk",
    startingPriceGBP: 19, // VERIFY — Suite Team ~$55/agent/mo; convert at current rate
    freeTier: false,
    bestFor: ["e-commerce", "enterprises", "professional services", "high-volume support"],
    ukHosting: true,
    pros: [
      "Industry-leading feature set",
      "Massive app marketplace (1,500+ integrations)",
      "Best-in-class reporting and analytics",
      "EU data hosting available",
    ],
    cons: [
      "Most expensive option in this comparison",
      "Significant price jump from 2023–2025 upset many UK SMEs",
      "Overkill and overpriced for teams under ~15 agents",
    ],
    affiliate: {
      url: "https://www.zendesk.com/", // REPLACE if affiliate programme available
      network: "None — no public affiliate programme as of 2025",
      commission: "N/A",
    },
    rating: 4.0,
  },
];

// Helper: get software by category
export const byCategory = (cat: SoftwareCategory) =>
  software.filter((s) => s.category === cat);

// Helper: get software with a free tier
export const withFreeTier = () => software.filter((s) => s.freeTier);

// Helper: get software sorted by price ascending
export const byPriceAsc = () =>
  [...software].sort((a, b) => a.startingPriceGBP - b.startingPriceGBP);

// Helper: get only products with active affiliate programmes
export const affiliateProducts = () =>
  software.filter((s) => s.affiliate.commission !== "N/A");
