"use client";

import { useState } from "react";
import { brand, tiers } from "@/lib/brand";
import { Button } from "./ui";

/**
 * Studio booking + deposit capture (APEX-STACK tools 11 Stripe + 12 Cal.com).
 *
 * Both transactions are server-validated in production (Stripe webhook
 * signature, Zod schemas — never trust client amounts, §Security). Until the
 * Cal.com link and Stripe keys are provisioned, this renders the brandable
 * flow and degrades to a direct booking request so the build never blocks on a
 * dashboard. Set NEXT_PUBLIC_CALCOM_LINK to embed the live scheduler.
 */
export function BookingPanel() {
  const calLink = process.env.NEXT_PUBLIC_CALCOM_LINK;
  const [selected, setSelected] = useState(tiers.find((t) => t.featured)?.name ?? tiers[0].name);
  const tier = tiers.find((t) => t.name === selected)!;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* tier selector */}
      <div>
        <h3 className="display text-sm tracking-[0.25em] text-gold">1 · CHOOSE A TIER</h3>
        <div className="mt-4 space-y-3">
          {tiers.map((t) => {
            const active = t.name === selected;
            return (
              <button
                key={t.name}
                onClick={() => setSelected(t.name)}
                className={`flex w-full items-center justify-between rounded-lg border px-5 py-4 text-left transition-colors ${
                  active
                    ? "border-crimson bg-crimson/10"
                    : "border-smoke/50 hover:border-smoke"
                }`}
              >
                <span>
                  <span className="display block text-lg text-pearl">{t.name}</span>
                  <span className="text-xs text-smoke-mid">{t.summary}</span>
                </span>
                <span className="tabular display ml-4 shrink-0 text-gold">
                  ${t.deposit}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* scheduler / deposit */}
      <div>
        <h3 className="display text-sm tracking-[0.25em] text-gold">2 · LOCK THE DATE</h3>
        <div className="mt-4 rounded-lg border border-smoke/50 bg-smoke/10 p-6">
          <p className="text-sm text-pearl/80">
            <span className="display text-pearl">{tier.name}</span> — a{" "}
            <span className="tabular text-gold">${tier.deposit}</span> deposit
            secures your slot and applies to the final invoice.
          </p>

          {calLink ? (
            <iframe
              title="Book with HYENAZ MAFIA MEDIA"
              src={`https://cal.com/${calLink}`}
              className="mt-5 h-[480px] w-full rounded-md border border-smoke/40"
            />
          ) : (
            <div className="mt-5 rounded-md border border-dashed border-smoke/60 p-5 text-sm text-smoke-mid">
              Live scheduling (Cal.com + Google Calendar) and Stripe deposits go
              live once accounts are connected. Until then, send your request
              straight to the studio:
              <div className="mt-4">
                <Button
                  href={`mailto:${brand.email}?subject=${encodeURIComponent(
                    `Booking — ${tier.name} tier`,
                  )}`}
                  variant="crimson"
                >
                  REQUEST {tier.name.toUpperCase()}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
