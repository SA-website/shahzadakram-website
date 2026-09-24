---
title: "How to Actually Diagnose Zero Conversions When the Ads Are Working"
description: "Ads are spending, clicks are coming in, and your dashboard says nobody's buying. Before you panic, check whether the ads are actually the problem."
pillar: field-notes
topics: [technical-seo, conversion-optimisation]
pubDate: 2026-08-11
---

Traffic is arriving. Ad spend is real. Conversions in GA4 report near zero. The instinct is to
blame the ads or the landing page.

## The symptom

A conversion count that drops sharply, or sits at zero, while traffic and spend continue as
normal is unusual enough to investigate before making any change to the campaigns.

## The actual checklist, before touching the ads

1. Confirm the conversion event is still firing at all — check GA4 realtime and the network tab, not just the reports UI.
2. Check for a silent consent-mode or tag-manager change that stopped the purchase event from sending.
3. Cross-check GA4's order count against your actual payment processor or order system for the same window.
4. Only once tracking is confirmed accurate, start looking at the ads and the funnel itself.

## The verdict

A conversion number that moves sharply without a corresponding change in the underlying business
is a measurement question first, and a marketing question second. Ruling out tracking before
touching the ads saves budget and avoids decisions made on bad data.
