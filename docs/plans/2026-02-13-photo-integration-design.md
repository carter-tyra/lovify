# Photo Integration Design — "The Love Story Album"

**Date:** 2026-02-13
**Status:** Approved

## Overview

Incorporate all 22 valentine photos into Lovify across three touchpoints: a redesigned Memories section, enhanced wizard timeline, and celebration screen surprise.

## Photo Inventory

| Era | Directory | Count | Key Files |
|-----|-----------|-------|-----------|
| First photo together | `valentine/` | 1 | `one-of-our-first-photos-together.JPEG` |
| Engagement (Dec 2023) | `valentine/engagement-rittenhouse-park-december-2023/` | 4 | engagement-rittenhouse-1 through 4 |
| Courthouse (Sept 19, 2024) | `valentine/courthouse-legal-marriage-september-19-2024/` | 6 | Including "my-beautiful-wife" shot |
| Wedding Puglia (Sept 29, 2024) | `valentine/wedding-day-puglia-september-29-2024/` | 7 | Carter crying, Victoria walking aisle, dress prep |
| Promotion dinner | `valentine/promotion-dinner-after-vietname-got-sick/` | 1 | `promotion-dinner-got-sick.JPEG` |
| Future family (AI) | `valentine/future-family-ai-lol/` | 3 | AI-generated family photos |

## Component 1: Photo Memories (Complete Redesign)

The Memories tab becomes a vertically-scrolling love story album with 6 chronological era sections.

### Era Sections

1. **"Where It All Started"** — Single hero photo (first photo together), full-width
2. **"She Said Yes"** — 4 engagement photos in masonry grid
3. **"Making It Official"** — 6 courthouse photos in 3-column masonry
4. **"The Most Beautiful Day"** — 7 wedding photos, hero (Victoria in dress or walking aisle) + masonry grid
5. **"The Little Moments"** — 1 promotion dinner photo, single card
6. **"The Future?"** — 3 AI family photos, playful grid, subtitle: "According to AI, anyway"

### Visual Design

- Soft gradient dividers between sections with era headings
- 8px rounded corners, subtle shadows on photos
- Staggered fade-up entrance animations on scroll (Intersection Observer)
- Hover: gentle lift + caption overlay with bottom gradient

### Lightbox

- Full-screen overlay with large photo, caption, date
- Left/right arrow navigation through ALL photos sequentially
- Keyboard support (arrows, Escape)
- Smooth crossfade transitions

## Component 2: Wizard Timeline Enhancement

Step 0 ("Our Story") timeline milestones gain matching photos:

| Milestone | Photo |
|-----------|-------|
| 2015 — The Tinder Match | `one-of-our-first-photos-together.JPEG` |
| 2018 — Northside Tavern | *(no photo — text only)* |
| 2019 — 30 Heart Emojis | *(no photo — text only)* |
| 2023 — Rittenhouse Park | `engagement-rittenhouse-1.JPEG` |
| 2024 — Lecce, Puglia | `me-crying-during-wedding-sept-29-2024.PNG` |
| 2026 — And Now... | *(no photo — preserves suspense)* |

Photos appear to the right of text (desktop), below text (mobile). Fade in with slight delay after text appears.

## Component 3: Celebration Screen

After "Yes!" click with confetti:
- AI family photo fades in below "She Said Yes!" title
- Caption: "Our future is looking pretty good, Mrs. Tyra"
- Subtle warm glow border treatment

## Image Handling

- Serve directly as static assets (local, not API-fetched)
- `loading="lazy"` on images outside first viewport
- `object-fit: cover` with defined aspect ratios
- Photos are large (1-13MB) — acceptable for a personal gift app

## Files Modified

1. `libs/web/valentine/feature/src/lib/photo-memories/photo-memories.component.ts` — New data model with eras, real file paths
2. `libs/web/valentine/feature/src/lib/photo-memories/photo-memories.component.html` — Complete template rewrite
3. `libs/web/valentine/feature/src/lib/photo-memories/photo-memories.component.scss` — Complete style rewrite
4. `libs/web/valentine/feature/src/lib/valentine-wizard/valentine-wizard.component.ts` — Add photo URLs to timeline data
5. `libs/web/valentine/feature/src/lib/valentine-wizard/valentine-wizard.component.html` — Add photo elements to timeline rows
6. `libs/web/valentine/feature/src/lib/valentine-wizard/valentine-wizard.component.scss` — Timeline photo styles
