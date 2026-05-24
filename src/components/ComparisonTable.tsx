import { useState, useMemo } from "react";
import { SlidersHorizontal, ExternalLink, Star } from "lucide-react";
import type { Software } from "../data/software";

function RatingStars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5" title={`${rating}/5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-200 fill-gray-200"}`}
        />
      ))}
      <span className="ml-1 text-xs text-gray-500">{rating.toFixed(1)}</span>
    </span>
  );
}

const CATEGORY_LABELS: Record<string, string> = {
  itsm: "ITSM",
  helpdesk: "Helpdesk",
  livechat: "Live Chat",
};

const CATEGORY_COLOURS: Record<string, string> = {
  itsm: "bg-purple-100 text-purple-700",
  helpdesk: "bg-blue-100 text-blue-700",
  livechat: "bg-green-100 text-green-700",
};

function formatPrice(p: number) {
  if (p === 0) return "Free";
  return `£${p}/mo`;
}

export default function ComparisonTable({ products }: { products: Software[] }) {
  const [freeTierOnly, setFreeTierOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"rating" | "price">("rating");
  const [maxPrice, setMaxPrice] = useState(100);

  const filtered = useMemo(() => {
    return products
      .filter((p) => !freeTierOnly || p.freeTier)
      .filter((p) => p.startingPriceGBP <= maxPrice)
      .sort((a, b) => {
        if (sortBy === "price") return a.startingPriceGBP - b.startingPriceGBP;
        return b.rating - a.rating;
      });
  }, [products, freeTierOnly, maxPrice, sortBy]);

  return (
    <div className="space-y-4">
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm">
        <span className="flex items-center gap-1.5 font-medium text-gray-700">
          <SlidersHorizontal className="h-4 w-4" /> Filter
        </span>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={freeTierOnly}
            onChange={(e) => setFreeTierOnly(e.target.checked)}
            className="accent-blue-600 h-4 w-4"
          />
          <span className="text-gray-700">Free tier only</span>
        </label>
        <label className="flex items-center gap-2">
          <span className="text-gray-700 whitespace-nowrap">Max price: £{maxPrice === 100 ? "any" : `${maxPrice}/mo`}</span>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-24 accent-blue-600"
          />
        </label>
        <label className="flex items-center gap-2 ml-auto">
          <span className="text-gray-700">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "rating" | "price")}
            className="border border-gray-200 rounded-lg px-2 py-1 text-sm bg-white"
          >
            <option value="rating">Top rated</option>
            <option value="price">Lowest price</option>
          </select>
        </label>
      </div>

      {/* Table — desktop */}
      <div className="hidden sm:block overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-left">
              <th className="px-4 py-3 font-semibold text-gray-700">Product</th>
              <th className="px-4 py-3 font-semibold text-gray-700">Type</th>
              <th className="px-4 py-3 font-semibold text-gray-700">From</th>
              <th className="px-4 py-3 font-semibold text-gray-700">Free tier</th>
              <th className="px-4 py-3 font-semibold text-gray-700">UK hosting</th>
              <th className="px-4 py-3 font-semibold text-gray-700">Rating</th>
              <th className="px-4 py-3 font-semibold text-gray-700">Best for</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                  No products match the current filters.
                </td>
              </tr>
            )}
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="font-semibold text-gray-900">{p.name}</div>
                  <div className="text-xs text-gray-500">{p.vendor}</div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-block text-xs font-medium rounded-full px-2 py-0.5 ${CATEGORY_COLOURS[p.category]}`}>
                    {CATEGORY_LABELS[p.category]}
                  </span>
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {formatPrice(p.startingPriceGBP)}
                  <span className="text-xs text-gray-400 font-normal">{p.startingPriceGBP > 0 ? "/agent" : ""}</span>
                </td>
                <td className="px-4 py-3">
                  {p.freeTier ? (
                    <span className="text-green-600 font-medium">Yes</span>
                  ) : (
                    <span className="text-gray-400">No</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {p.ukHosting ? (
                    <span className="text-green-600 font-medium">Yes</span>
                  ) : (
                    <span className="text-gray-400">No</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <RatingStars rating={p.rating} />
                </td>
                <td className="px-4 py-3 max-w-[160px]">
                  <div className="flex flex-wrap gap-1">
                    {p.bestFor.slice(0, 2).map((b) => (
                      <span key={b} className="text-xs bg-gray-100 text-gray-600 rounded px-1.5 py-0.5">
                        {b}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <a
                    href={p.affiliate.url}
                    target="_blank"
                    rel="sponsored nofollow noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium bg-blue-600 text-white rounded-lg px-3 py-1.5 hover:bg-blue-700 transition-colors whitespace-nowrap"
                  >
                    Visit <ExternalLink className="h-3 w-3" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards — mobile */}
      <div className="sm:hidden space-y-3">
        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-6">No products match the current filters.</p>
        )}
        {filtered.map((p) => (
          <div key={p.id} className="border border-gray-200 rounded-xl p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold text-gray-900">{p.name}</div>
                <div className="text-xs text-gray-500">{p.vendor}</div>
              </div>
              <span className={`text-xs font-medium rounded-full px-2 py-0.5 ${CATEGORY_COLOURS[p.category]}`}>
                {CATEGORY_LABELS[p.category]}
              </span>
            </div>
            <RatingStars rating={p.rating} />
            <div className="flex gap-4 text-sm">
              <span><span className="text-gray-500">From:</span> <strong>{formatPrice(p.startingPriceGBP)}</strong>{p.startingPriceGBP > 0 && <span className="text-xs text-gray-400">/agent</span>}</span>
              <span><span className="text-gray-500">Free tier:</span> <strong className={p.freeTier ? "text-green-600" : "text-gray-400"}>{p.freeTier ? "Yes" : "No"}</strong></span>
              <span><span className="text-gray-500">UK hosting:</span> <strong className={p.ukHosting ? "text-green-600" : "text-gray-400"}>{p.ukHosting ? "Yes" : "No"}</strong></span>
            </div>
            <a
              href={p.affiliate.url}
              target="_blank"
              rel="sponsored nofollow noreferrer"
              className="flex items-center justify-center gap-1.5 text-sm font-medium bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors"
            >
              Visit {p.name} <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400">
        Prices are indicative GBP figures — verify on each vendor&apos;s website. Affiliate links marked with sponsored/nofollow.
      </p>
    </div>
  );
}
