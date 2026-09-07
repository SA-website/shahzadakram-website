---
title: "How to Actually Diagnose Zero Conversions When the Ads Are Working"
description: "Ads are spending, clicks are coming in, and your dashboard says nobody's buying. Before you panic, check whether the ads are actually the problem."
pillar: field-notes
topics: [technical-seo, conversion-optimisation]
pubDate: 2026-08-11
---

*Draft — this post is referenced from the homepage but the full write-up isn't finished yet. Outline below.*

## The symptom

Traffic is arriving. Ad spend is real. Conversions in GA4 report near zero. The instinct is to blame the ads or the landing page.

## The actual checklist, before touching the ads

1. Confirm the conversion event is still firing at all — check GA4 realtime and the network tab, not just the reports UI.
2. Check for a silent consent-mode or tag-manager change that stopped the purchase event from sending.
3. Cross-check GA4's order count against your actual payment processor or order system for the same window.
4. Only once tracking is confirmed accurate, start looking at the ads and the funnel itself.

## The verdict

Placeholder — full narrative and the specific fix from the Shilajit UK case to be added.
