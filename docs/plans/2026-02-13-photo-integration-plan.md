# Photo Integration Implementation Plan — "The Love Story Album"

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Incorporate all 22 valentine photos into Lovify across a redesigned Memories section, enhanced wizard timeline, and celebration screen surprise.

**Architecture:** The photo-memories component gets a complete rewrite from a flat grid to a vertically-scrolling chronological album with 6 era sections, masonry grids, and a full-screen lightbox with arrow navigation. The wizard timeline gains matching photos alongside milestone text. The celebration screen gains an AI family photo reveal.

**Tech Stack:** Angular 17, SCSS, Intersection Observer API, CSS Grid/Masonry, OnPush change detection

**Design Doc:** `docs/plans/2026-02-13-photo-integration-design.md`

**CSS Variables (from styles.scss `:root`):**
- `--background-baseline: 26 15 20` (dark rose-tinted background)
- `--background-highlight: 62 35 47` (lighter card background)
- `--text-baseline: 255 241 245` (off-white text)
- `--text-primary: 236 72 120` (pink accent)
- `--valentines-accent: 255 105 135`
- `--valentines-gold: 255 215 140`
- `--valentines-deep: 180 40 80`
- Font: `'Gotham', sans-serif` (400, 500, 700, 900 weights loaded)

---

### Task 1: Rewrite photo-memories.component.ts — Data Model & Logic

**Files:**
- Modify: `libs/web/valentine/feature/src/lib/photo-memories/photo-memories.component.ts`

**Step 1: Replace the entire component TypeScript**

Replace the full contents of the file with:

```typescript
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  QueryList,
  ViewChildren
} from '@angular/core';

interface Photo {
  src: string;
  caption: string;
  span?: 'hero' | 'wide' | 'tall';
}

interface Era {
  id: string;
  title: string;
  subtitle: string;
  photos: Photo[];
  layout: 'hero' | 'grid-2' | 'grid-3' | 'hero-grid' | 'single' | 'playful';
}

@Component({
  selector: 'as-photo-memories',
  templateUrl: './photo-memories.component.html',
  styleUrls: ['./photo-memories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoMemoriesComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('eraSection') eraSections!: QueryList<ElementRef>;

  eras: Era[] = [
    {
      id: 'beginning',
      title: 'Where It All Started',
      subtitle: 'A Tinder match in the summer of 2015',
      layout: 'hero',
      photos: [
        { src: 'assets/valentine/one-of-our-first-photos-together.JPEG', caption: 'One of our first photos together' }
      ]
    },
    {
      id: 'engagement',
      title: 'She Said Yes',
      subtitle: 'Rittenhouse Park — December 2023',
      layout: 'grid-2',
      photos: [
        { src: 'assets/valentine/engagement-rittenhouse-park-december-2023/engagement-rittenhouse-1.JPEG', caption: 'The moment' },
        { src: 'assets/valentine/engagement-rittenhouse-park-december-2023/engagement-rittenhouse-2.JPEG', caption: 'She said yes' },
        { src: 'assets/valentine/engagement-rittenhouse-park-december-2023/engagement-rittenhouse-4.PNG', caption: 'The ring' },
        { src: 'assets/valentine/engagement-rittenhouse-park-december-2023/engagement-rittenhouse-park-3.JPEG', caption: 'Rittenhouse Park' }
      ]
    },
    {
      id: 'courthouse',
      title: 'Making It Official',
      subtitle: 'Philadelphia — September 19, 2024',
      layout: 'grid-3',
      photos: [
        { src: 'assets/valentine/courthouse-legal-marriage-september-19-2024/courthouse-marriage-1-sept-19-2024.JPEG', caption: 'Mr. & Mrs. Tyra' },
        { src: 'assets/valentine/courthouse-legal-marriage-september-19-2024/courthouse-marriage-2-sept-19-2024.JPEG', caption: 'Making it legal' },
        { src: 'assets/valentine/courthouse-legal-marriage-september-19-2024/courthouse-marriage-3-sept-19-2024.PNG', caption: 'Officially married' },
        { src: 'assets/valentine/courthouse-legal-marriage-september-19-2024/courthouse-marriage-4-sept-19-2024.JPEG', caption: 'The happiest day' },
        { src: 'assets/valentine/courthouse-legal-marriage-september-19-2024/courhouse-wedding-06-sept-19-2024.JPEG', caption: 'Celebrating together' },
        { src: 'assets/valentine/courthouse-legal-marriage-september-19-2024/my-beautiful-wife-courthouse-wedding-sept-19-2024.JPEG', caption: 'My beautiful wife', span: 'wide' }
      ]
    },
    {
      id: 'puglia',
      title: 'The Most Beautiful Day',
      subtitle: 'Lecce, Puglia — September 29, 2024',
      layout: 'hero-grid',
      photos: [
        { src: 'assets/valentine/wedding-day-puglia-september-29-2024/me-watching-victoria-walk-down-the-aisle-wedding-day-sept-29-2024.JPEG', caption: 'Walking down the aisle', span: 'hero' },
        { src: 'assets/valentine/wedding-day-puglia-september-29-2024/victoria-wedding-day-in-dress-getting-ready.JPEG', caption: 'Getting ready' },
        { src: 'assets/valentine/wedding-day-puglia-september-29-2024/me-crying-during-wedding-sept-29-2024.PNG', caption: 'I cried like a BITCH' },
        { src: 'assets/valentine/wedding-day-puglia-september-29-2024/wedding-day-puglia-1.JPEG', caption: 'Puglia magic' },
        { src: 'assets/valentine/wedding-day-puglia-september-29-2024/wedding-day-puglia-2.JPEG', caption: 'Our wedding day' },
        { src: 'assets/valentine/wedding-day-puglia-september-29-2024/wedding-day-puglia-3.JPEG', caption: 'Forever and always' },
        { src: 'assets/valentine/wedding-day-puglia-september-29-2024/wedding-day-puglia-4.JPEG', caption: 'The most beautiful day' }
      ]
    },
    {
      id: 'everyday',
      title: 'The Little Moments',
      subtitle: 'The ones that matter most',
      layout: 'single',
      photos: [
        { src: 'assets/valentine/promotion-dinner-after-vietname-got-sick/promotion-dinner-got-sick.JPEG', caption: 'Promotion dinner — before the Pedialyte incident' }
      ]
    },
    {
      id: 'future',
      title: 'The Future?',
      subtitle: 'According to AI, anyway',
      layout: 'playful',
      photos: [
        { src: 'assets/valentine/future-family-ai-lol/future-family-01-lol.PNG', caption: 'The Tyra family' },
        { src: 'assets/valentine/future-family-ai-lol/future-family-02-lol.PNG', caption: 'Coming soon...' },
        { src: 'assets/valentine/future-family-ai-lol/future-family-03-lol.PNG', caption: 'AI has spoken' }
      ]
    }
  ];

  // Flatten all photos for lightbox navigation
  allPhotos: Photo[] = this.eras.flatMap(era => era.photos);
  visibleEras = new Set<string>();
  lightboxIndex: number | null = null;

  private observer: IntersectionObserver | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).dataset['eraId'];
            if (id && !this.visibleEras.has(id)) {
              this.visibleEras.add(id);
              this.cdr.markForCheck();
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    this.eraSections.forEach(section => {
      this.observer!.observe(section.nativeElement);
    });
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  isEraVisible(eraId: string): boolean {
    return this.visibleEras.has(eraId);
  }

  openLightbox(photo: Photo) {
    this.lightboxIndex = this.allPhotos.indexOf(photo);
    this.cdr.markForCheck();
  }

  closeLightbox() {
    this.lightboxIndex = null;
    this.cdr.markForCheck();
  }

  prevPhoto() {
    if (this.lightboxIndex !== null && this.lightboxIndex > 0) {
      this.lightboxIndex--;
      this.cdr.markForCheck();
    }
  }

  nextPhoto() {
    if (this.lightboxIndex !== null && this.lightboxIndex < this.allPhotos.length - 1) {
      this.lightboxIndex++;
      this.cdr.markForCheck();
    }
  }

  get currentLightboxPhoto(): Photo | null {
    return this.lightboxIndex !== null ? this.allPhotos[this.lightboxIndex] : null;
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.lightboxIndex === null) return;
    if (event.key === 'Escape') this.closeLightbox();
    if (event.key === 'ArrowLeft') this.prevPhoto();
    if (event.key === 'ArrowRight') this.nextPhoto();
  }
}
```

**Step 2: Verify no TypeScript errors**

Run: `npx nx build angular-spotify --skip-nx-cache 2>&1 | head -30`
Expected: No TS errors related to photo-memories component (template/style errors ok at this stage)

**Step 3: Commit**

```bash
git add libs/web/valentine/feature/src/lib/photo-memories/photo-memories.component.ts
git commit -m "feat(photo-memories): rewrite data model with era sections and lightbox navigation"
```

---

### Task 2: Rewrite photo-memories.component.html — Template

**Files:**
- Modify: `libs/web/valentine/feature/src/lib/photo-memories/photo-memories.component.html`

**Step 1: Replace the entire template**

Replace the full contents with:

```html
<div class="album">
  @for (era of eras; track era.id) {
    <section
      #eraSection
      class="era-section"
      [class.visible]="isEraVisible(era.id)"
      [attr.data-era-id]="era.id">

      <!-- Section header -->
      <div class="era-header">
        <h3 class="era-title">{{ era.title }}</h3>
        <p class="era-subtitle">{{ era.subtitle }}</p>
      </div>

      <!-- Hero layout: single full-width photo -->
      @if (era.layout === 'hero' || era.layout === 'single') {
        <div class="photo-hero">
          @for (photo of era.photos; track photo.src) {
            <div class="photo-card photo-card--hero" (click)="openLightbox(photo)">
              <img [src]="photo.src" [alt]="photo.caption" loading="lazy" />
              <div class="photo-overlay">
                <span class="photo-caption">{{ photo.caption }}</span>
              </div>
            </div>
          }
        </div>
      }

      <!-- 2-column grid -->
      @if (era.layout === 'grid-2') {
        <div class="photo-grid photo-grid--2">
          @for (photo of era.photos; track photo.src; let i = $index) {
            <div
              class="photo-card"
              [style.animation-delay]="(i * 0.1) + 's'"
              (click)="openLightbox(photo)">
              <img [src]="photo.src" [alt]="photo.caption" loading="lazy" />
              <div class="photo-overlay">
                <span class="photo-caption">{{ photo.caption }}</span>
              </div>
            </div>
          }
        </div>
      }

      <!-- 3-column grid -->
      @if (era.layout === 'grid-3') {
        <div class="photo-grid photo-grid--3">
          @for (photo of era.photos; track photo.src; let i = $index) {
            <div
              class="photo-card"
              [class.photo-card--wide]="photo.span === 'wide'"
              [style.animation-delay]="(i * 0.08) + 's'"
              (click)="openLightbox(photo)">
              <img [src]="photo.src" [alt]="photo.caption" loading="lazy" />
              <div class="photo-overlay">
                <span class="photo-caption">{{ photo.caption }}</span>
              </div>
            </div>
          }
        </div>
      }

      <!-- Hero + grid (Puglia wedding) -->
      @if (era.layout === 'hero-grid') {
        <div class="photo-hero-grid">
          @for (photo of era.photos; track photo.src; let i = $index) {
            @if (photo.span === 'hero') {
              <div class="photo-card photo-card--hero" (click)="openLightbox(photo)">
                <img [src]="photo.src" [alt]="photo.caption" loading="lazy" />
                <div class="photo-overlay">
                  <span class="photo-caption">{{ photo.caption }}</span>
                </div>
              </div>
            }
          }
          <div class="photo-grid photo-grid--3">
            @for (photo of era.photos; track photo.src; let i = $index) {
              @if (photo.span !== 'hero') {
                <div
                  class="photo-card"
                  [style.animation-delay]="(i * 0.08) + 's'"
                  (click)="openLightbox(photo)">
                  <img [src]="photo.src" [alt]="photo.caption" loading="lazy" />
                  <div class="photo-overlay">
                    <span class="photo-caption">{{ photo.caption }}</span>
                  </div>
                </div>
              }
            }
          </div>
        </div>
      }

      <!-- Playful grid (AI future family) -->
      @if (era.layout === 'playful') {
        <div class="photo-grid photo-grid--playful">
          @for (photo of era.photos; track photo.src; let i = $index) {
            <div
              class="photo-card photo-card--playful"
              [style.animation-delay]="(i * 0.12) + 's'"
              (click)="openLightbox(photo)">
              <img [src]="photo.src" [alt]="photo.caption" loading="lazy" />
              <div class="photo-overlay photo-overlay--playful">
                <span class="photo-caption">{{ photo.caption }}</span>
              </div>
            </div>
          }
        </div>
      }
    </section>
  }
</div>

<!-- Lightbox -->
@if (currentLightboxPhoto) {
  <div class="lightbox" (click)="closeLightbox()">
    <div class="lightbox-content" (click)="$event.stopPropagation()">
      <!-- Close button -->
      <button class="lightbox-close" (click)="closeLightbox()" aria-label="Close">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
          <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round"/>
        </svg>
      </button>

      <!-- Navigation arrows -->
      @if (lightboxIndex! > 0) {
        <button class="lightbox-nav lightbox-nav--prev" (click)="prevPhoto()" aria-label="Previous photo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
            <path d="M15 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      }
      @if (lightboxIndex! < allPhotos.length - 1) {
        <button class="lightbox-nav lightbox-nav--next" (click)="nextPhoto()" aria-label="Next photo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
            <path d="M9 18l6-6-6-6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      }

      <!-- Photo -->
      <img [src]="currentLightboxPhoto.src" [alt]="currentLightboxPhoto.caption" class="lightbox-image" />

      <!-- Info -->
      <div class="lightbox-info">
        <p class="lightbox-caption">{{ currentLightboxPhoto.caption }}</p>
        <p class="lightbox-counter">{{ lightboxIndex! + 1 }} / {{ allPhotos.length }}</p>
      </div>
    </div>
  </div>
}
```

**Step 2: Commit**

```bash
git add libs/web/valentine/feature/src/lib/photo-memories/photo-memories.component.html
git commit -m "feat(photo-memories): rewrite template with era sections, grids, and lightbox"
```

---

### Task 3: Rewrite photo-memories.component.scss — Styles

**Files:**
- Modify: `libs/web/valentine/feature/src/lib/photo-memories/photo-memories.component.scss`

**Step 1: Replace the entire stylesheet**

Replace the full contents with:

```scss
:host {
  display: block;
}

// ========================================
// Album container
// ========================================
.album {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

// ========================================
// Era sections
// ========================================
.era-section {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
}

.era-header {
  margin-bottom: 1.25rem;
}

.era-title {
  font-family: 'Gotham', sans-serif;
  font-weight: 900;
  font-size: 1.5rem;
  color: rgb(var(--text-baseline));
  margin: 0;
  letter-spacing: -0.01em;
}

.era-subtitle {
  font-size: 0.875rem;
  color: rgb(var(--text-baseline) / 0.4);
  margin: 0.25rem 0 0;
}

// ========================================
// Photo cards (shared)
// ========================================
.photo-card {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  background: rgb(var(--text-baseline) / 0.05);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover img {
    transform: scale(1.04);
  }

  &:hover .photo-overlay {
    opacity: 1;
  }
}

.photo-card--hero {
  aspect-ratio: 16 / 10;

  img {
    aspect-ratio: 16 / 10;
  }
}

.photo-card--wide {
  grid-column: span 2;
}

// ========================================
// Photo overlay
// ========================================
.photo-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgb(0 0 0 / 0.65) 0%,
    rgb(0 0 0 / 0.15) 40%,
    transparent 70%
  );
  display: flex;
  align-items: flex-end;
  padding: 1.25rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.photo-overlay--playful {
  background: linear-gradient(
    to top,
    rgb(var(--text-primary) / 0.7) 0%,
    rgb(var(--text-primary) / 0.1) 50%,
    transparent 80%
  );
}

.photo-caption {
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  line-height: 1.3;
  text-shadow: 0 1px 3px rgb(0 0 0 / 0.3);
}

// ========================================
// Grid layouts
// ========================================
.photo-hero {
  .photo-card {
    animation: photoIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
}

.photo-grid {
  display: grid;
  gap: 0.625rem;

  &--2 {
    grid-template-columns: repeat(2, 1fr);

    .photo-card {
      aspect-ratio: 1;
      animation: photoIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;

      img {
        aspect-ratio: 1;
      }
    }
  }

  &--3 {
    grid-template-columns: repeat(3, 1fr);

    .photo-card {
      aspect-ratio: 1;
      animation: photoIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;

      img {
        aspect-ratio: 1;
      }

      &.photo-card--wide {
        aspect-ratio: 2 / 1;

        img {
          aspect-ratio: 2 / 1;
        }
      }
    }
  }

  &--playful {
    grid-template-columns: repeat(3, 1fr);

    .photo-card {
      aspect-ratio: 3 / 4;
      animation: photoIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
      border: 2px solid rgb(var(--text-primary) / 0.2);
      transition: border-color 0.3s ease;

      img {
        aspect-ratio: 3 / 4;
      }

      &:hover {
        border-color: rgb(var(--text-primary) / 0.5);
      }
    }
  }
}

.photo-hero-grid {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  .photo-card--hero {
    animation: photoIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
}

@keyframes photoIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// ========================================
// Lightbox
// ========================================
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgb(0 0 0 / 0.9);
  backdrop-filter: blur(24px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  animation: fadeIn 0.2s ease;
}

.lightbox-content {
  position: relative;
  max-width: 800px;
  max-height: 85vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.lightbox-close {
  position: absolute;
  top: -48px;
  right: 0;
  background: rgb(255 255 255 / 0.1);
  border: none;
  color: rgb(255 255 255 / 0.7);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgb(255 255 255 / 0.2);
  }
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgb(255 255 255 / 0.08);
  border: none;
  color: rgb(255 255 255 / 0.7);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  z-index: 10;

  &:hover {
    background: rgb(255 255 255 / 0.15);
  }

  &--prev {
    left: -72px;
  }

  &--next {
    right: -72px;
  }
}

.lightbox-image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 10px;
}

.lightbox-info {
  margin-top: 1rem;
  text-align: center;
  width: 100%;
}

.lightbox-caption {
  font-size: 1rem;
  font-weight: 600;
  color: rgb(255 255 255 / 0.9);
  margin: 0;
}

.lightbox-counter {
  font-size: 0.8125rem;
  color: rgb(255 255 255 / 0.35);
  margin: 0.375rem 0 0;
  font-weight: 500;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
}

// ========================================
// Responsive
// ========================================
@media (max-width: 600px) {
  .photo-grid--3 {
    grid-template-columns: repeat(2, 1fr);

    .photo-card--wide {
      grid-column: span 2;
    }
  }

  .photo-grid--playful {
    grid-template-columns: repeat(2, 1fr);

    .photo-card:last-child {
      grid-column: span 2;
      aspect-ratio: 16 / 10;

      img {
        aspect-ratio: 16 / 10;
      }
    }
  }

  .lightbox-nav {
    &--prev { left: -8px; }
    &--next { right: -8px; }
  }
}
```

**Step 2: Commit**

```bash
git add libs/web/valentine/feature/src/lib/photo-memories/photo-memories.component.scss
git commit -m "feat(photo-memories): rewrite styles with era sections, masonry grids, and lightbox"
```

---

### Task 4: Enhance wizard timeline with photos

**Files:**
- Modify: `libs/web/valentine/feature/src/lib/valentine-wizard/valentine-wizard.component.ts`
- Modify: `libs/web/valentine/feature/src/lib/valentine-wizard/valentine-wizard.component.html`
- Modify: `libs/web/valentine/feature/src/lib/valentine-wizard/valentine-wizard.component.scss`

**Step 1: Update the TimelineMoment interface and data in the TS file**

In `valentine-wizard.component.ts`, update the `TimelineMoment` interface to include an optional `imageUrl`:

```typescript
interface TimelineMoment {
  year: string;
  title: string;
  description: string;
  imageUrl?: string;
}
```

Then update the `timeline` array entries to include photos where available:

```typescript
timeline: TimelineMoment[] = [
  { year: '2015', title: 'The Tinder Match', description: '...existing...', imageUrl: 'assets/valentine/one-of-our-first-photos-together.JPEG' },
  { year: '2018', title: 'Northside Tavern', description: '...existing...' },
  { year: '2019', title: '30 Heart Emojis', description: '...existing...' },
  { year: '2023', title: 'Rittenhouse Park', description: '...existing...', imageUrl: 'assets/valentine/engagement-rittenhouse-park-december-2023/engagement-rittenhouse-1.JPEG' },
  { year: '2024', title: 'Lecce, Puglia', description: '...existing...', imageUrl: 'assets/valentine/wedding-day-puglia-september-29-2024/me-crying-during-wedding-sept-29-2024.PNG' },
  { year: '2026', title: 'And Now...', description: 'I have something to ask you' }
];
```

Keep all existing description strings exactly as they are — only add the `imageUrl` property.

**Step 2: Update the timeline template rows in the HTML**

In `valentine-wizard.component.html`, replace the timeline-row content (lines 23-29) with:

```html
<div class="timeline-row" [class.has-photo]="!!moment.imageUrl">
  <span class="timeline-year">{{ moment.year }}</span>
  <div class="timeline-detail">
    <p class="timeline-title">{{ moment.title }}</p>
    <p class="timeline-desc">{{ moment.description }}</p>
    @if (moment.imageUrl) {
      <div class="timeline-photo">
        <img [src]="moment.imageUrl" [alt]="moment.title" loading="lazy" />
      </div>
    }
  </div>
</div>
```

**Step 3: Add timeline photo styles to the SCSS**

In `valentine-wizard.component.scss`, add after the `.timeline-desc` styles (after line 149):

```scss
// Timeline photos
.timeline-photo {
  margin-top: 0.75rem;
  border-radius: 8px;
  overflow: hidden;
  animation: photoReveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
  max-width: 280px;

  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 8px;
  }
}

@keyframes photoReveal {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

**Step 4: Commit**

```bash
git add libs/web/valentine/feature/src/lib/valentine-wizard/
git commit -m "feat(wizard): add photos to timeline milestones"
```

---

### Task 5: Add AI family photo to celebration screen

**Files:**
- Modify: `libs/web/valentine/feature/src/lib/valentine-wizard/valentine-wizard.component.html`
- Modify: `libs/web/valentine/feature/src/lib/valentine-wizard/valentine-wizard.component.scss`

**Step 1: Update the celebration section in the HTML**

In `valentine-wizard.component.html`, replace the celebration div (lines 127-134) with:

```html
@if (proposalPhase === 'answered') {
  <div class="celebration">
    <h2 class="celebration-title">She Said Yes!</h2>
    <p class="celebration-sub">
      From a Tinder match to forever, Mrs. Tyra.<br />
      Happy Valentine's Day. I love you.
    </p>
    <div class="celebration-photo">
      <img src="assets/valentine/future-family-ai-lol/future-family-01-lol.PNG" alt="Our future family" />
      <p class="celebration-photo-caption">Our future is looking pretty good, Mrs. Tyra</p>
    </div>
  </div>
}
```

**Step 2: Add celebration photo styles to the SCSS**

In `valentine-wizard.component.scss`, add after the `.celebration-sub` styles (at end of file):

```scss
// Celebration photo
.celebration-photo {
  margin-top: 2rem;
  animation: celebrationPhotoIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both;
  max-width: 320px;
  margin-left: auto;
  margin-right: auto;

  img {
    width: 100%;
    border-radius: 12px;
    border: 2px solid rgb(var(--text-primary) / 0.3);
    box-shadow: 0 0 40px rgb(var(--text-primary) / 0.15);
  }
}

.celebration-photo-caption {
  font-size: 0.9375rem;
  font-weight: 600;
  font-style: italic;
  color: rgb(var(--text-baseline) / 0.5);
  margin: 0.75rem 0 0;
}

@keyframes celebrationPhotoIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
```

**Step 3: Commit**

```bash
git add libs/web/valentine/feature/src/lib/valentine-wizard/
git commit -m "feat(wizard): add AI family photo surprise to celebration screen"
```

---

### Task 6: Build verification and visual testing

**Step 1: Run the full build**

Run: `npx nx build angular-spotify --skip-nx-cache`
Expected: Build succeeds with no errors

**Step 2: Start the dev server and visually verify**

Run: `npm start`

Verify in browser at http://localhost:4200/valentine:
1. **Memories tab** — 6 era sections scroll vertically with staggered fade-in
2. **Photo grid** — All 22 photos load correctly (no broken images)
3. **Lightbox** — Click any photo, verify full-screen view with prev/next arrows and keyboard nav
4. **Wizard tab → Our Story** — Photos appear next to Tinder Match, Rittenhouse Park, and Puglia milestones
5. **Wizard → Yes! celebration** — AI family photo appears with caption after confetti

**Step 3: Final commit**

```bash
git add -A
git commit -m "feat: integrate all valentine photos into memories album, wizard timeline, and celebration"
```
