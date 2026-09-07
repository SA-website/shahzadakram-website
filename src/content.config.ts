import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pillars = ['field-notes', 'built-broken', 'idea-log'] as const;

// SEO topic pillars — the site's core expertise areas. Every pillar hub page
// lives at /seo/<slug>. Blog posts and work entries can tag themselves with
// one or more of these via `topics` to be pulled into the relevant hub page.
const topics = [
  'technical-seo',
  'ai-search-optimisation',
  'international-seo',
  'website-migrations',
  'conversion-optimisation',
] as const;

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pillar: z.enum(pillars),
    topics: z.array(z.enum(topics)).default([]),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    role: z.string().optional(),
    year: z.string().optional(),
    order: z.number().default(0),
    topics: z.array(z.enum(topics)).default([]),
    draft: z.boolean().default(false),
  }),
});

const seoPillars = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pillars' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    description: z.string(),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, work, pillars: seoPillars };

export const PILLARS = {
  'field-notes': {
    label: 'Field Notes',
    description: 'Practical SEO and marketing deep-dives — technical and evergreen.',
  },
  'built-broken': {
    label: 'Built & Broken',
    description: 'Honest venture case studies, including the failures.',
  },
  'idea-log': {
    label: 'Idea Log',
    description: 'Short posts thinking out loud about business ideas and niches, each ending in a verdict.',
  },
} as const;

// Display metadata for SEO topic pillars — id here must match the slug
// (filename) used in src/content/pillars/*.md.
export const TOPICS = {
  'technical-seo': { label: 'Technical SEO' },
  'ai-search-optimisation': { label: 'AI Search Optimisation (AEO/GEO)' },
  'international-seo': { label: 'International SEO' },
  'website-migrations': { label: 'Website Migrations' },
  'conversion-optimisation': { label: 'Conversion Optimisation' },
} as const;

export type TopicSlug = keyof typeof TOPICS;
