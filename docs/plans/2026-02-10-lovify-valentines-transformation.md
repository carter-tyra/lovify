# Lovify: Valentine's Day Spotify Transformation

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform this Angular Spotify clone into "Lovify" - a Valentine's Day themed music app for Carter's wife Victoria, featuring a romantic color scheme, personalized love notes, photo memories, custom navigation, and a show-stopping "Will you be my Valentine?" proposal page with confetti animation.

**Architecture:** We keep the existing Spotify API integration fully intact (auth, playback, playlists) while layering on: (1) a Valentine's color theme via CSS variable changes, (2) personalized copy/branding throughout, (3) a new standalone Valentine's feature module with love letter, photo gallery, and proposal page, all added as a new route in the Nx libs structure.

**Tech Stack:** Angular 15, Nx workspace, ngrx, TailwindCSS, ng-zorro, CSS animations, canvas-confetti (new dependency for proposal page)

---

## Task 1: Create Valentine's Feature Branch

**Files:**
- N/A (git operation)

**Step 1: Create and switch to feature branch**

Run: `git checkout -b feat/lovify-valentines`
Expected: Switched to new branch 'feat/lovify-valentines'

**Step 2: Commit**

No commit needed yet - empty branch.

---

## Task 2: Valentine's Color Theme - CSS Variables & Tailwind

Transform the entire app from Spotify green-on-dark to a romantic Valentine's palette: deep burgundy background, rose/pink accents, warm cream text.

**Files:**
- Modify: `apps/angular-spotify/src/styles.scss:16-21` (CSS variables)
- Modify: `tailwind.config.js:17-24` (add Valentine colors)
- Modify: `apps/angular-spotify/src/custom/tailwind/_utilities.scss` (link colors)
- Modify: `apps/angular-spotify/src/custom/tailwind/_components.scss` (component colors)

**Step 1: Update CSS custom properties for Valentine's theme**

In `apps/angular-spotify/src/styles.scss`, replace lines 16-21:

```scss
:root {
  --background-baseline: 26 15 20;
  --background-highlight: 62 35 47;
  --text-baseline: 255 241 245;
  --text-primary: 236 72 120;
  --valentines-accent: 255 105 135;
  --valentines-gold: 255 215 140;
  --valentines-deep: 180 40 80;
}
```

Color rationale:
- `--background-baseline: 26 15 20` - Deep dark burgundy/wine (#1a0f14)
- `--background-highlight: 62 35 47` - Lighter plum for hovers (#3e232f)
- `--text-baseline: 255 241 245` - Warm pinkish-cream text (#fff1f5)
- `--text-primary: 236 72 120` - Vibrant rose pink accent (#ec4878)
- `--valentines-accent: 255 105 135` - Lighter coral pink for secondary highlights
- `--valentines-gold: 255 215 140` - Warm gold for special moments
- `--valentines-deep: 180 40 80` - Deep rose for borders/shadows

**Step 2: Add Valentine accent colors to Tailwind config**

In `tailwind.config.js`, update the colors section:

```js
colors: {
  primary: 'rgb(var(--text-primary) / <alpha-value>)',
  sliderRail: '#4a2535',
  sliderTrack: '#ec4878',
  baseline: 'rgb(var(--background-baseline) / <alpha-value>)',
  white: 'rgb(var(--text-baseline) / <alpha-value>)',
  highlight: 'rgb(var(--background-highlight) / <alpha-value>)',
  accent: 'rgb(var(--valentines-accent) / <alpha-value>)',
  gold: 'rgb(var(--valentines-gold) / <alpha-value>)',
  deep: 'rgb(var(--valentines-deep) / <alpha-value>)',
}
```

**Step 3: Update body background in styles.scss**

In `apps/angular-spotify/src/styles.scss`, change the body styles:

```scss
body {
  min-width: 600px;
  line-height: normal;
  font-size: 16px;
  letter-spacing: 0.015em;
  @apply h-full w-full absolute overflow-hidden flex flex-col text-white/70;
  background: linear-gradient(135deg, rgb(26 15 20) 0%, rgb(45 20 32) 50%, rgb(26 15 20) 100%);
}
```

**Step 4: Verify the app compiles with new colors**

Run: `npx nx serve angular-spotify --port=4200` (start dev server, then stop after confirming compile)
Expected: App compiles and loads with new color scheme

**Step 5: Commit**

```bash
git add apps/angular-spotify/src/styles.scss tailwind.config.js
git commit -m "feat: transform color scheme to Valentine's Day rose/burgundy theme"
```

---

## Task 3: Rebrand App Identity - Title, Meta, Logo

Replace all Spotify branding with "Lovify" branding.

**Files:**
- Modify: `apps/angular-spotify/src/index.html` (title, meta tags, comments)
- Modify: `libs/web/shell/ui/nav-bar/src/lib/nav-bar.component.html:29-37` (logo SVG)

**Step 1: Update index.html title and meta tags**

In `apps/angular-spotify/src/index.html`:

Replace the comment block (lines 4-13) with:
```html
    <!--
    Project: Lovify - A Valentine's Day Love Letter
    For: Victoria, from Carter with all my love
    Made with: Angular, Nx, ngrx, TailwindCSS, and a whole lot of love
    February 2026
    -->
```

Replace line 18 title:
```html
    <title>Lovify - Carter & Victoria's Love Songs</title>
```

Replace all meta title content attributes with:
```
Lovify - Carter & Victoria's Love Songs
```

Replace all meta description content attributes with:
```
A musical love letter for Victoria. Happy Valentine's Day!
```

**Step 2: Replace the Spotify logo SVG with a Lovify heart logo**

In `libs/web/shell/ui/nav-bar/src/lib/nav-bar.component.html`, replace the `<ng-template #logoTmpl>` block (lines 29-37) with:

```html
<ng-template #logoTmpl>
  <div class="flex items-center gap-3">
    <svg viewBox="0 0 24 24" class="h-8 w-8" fill="currentColor" style="color: #ec4878;">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
    <span class="text-2xl font-bold tracking-tight" style="background: linear-gradient(135deg, #ec4878, #ff6987, #ffd78c); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
      Lovify
    </span>
  </div>
</ng-template>
```

**Step 3: Commit**

```bash
git add apps/angular-spotify/src/index.html libs/web/shell/ui/nav-bar/src/lib/nav-bar.component.html
git commit -m "feat: rebrand to Lovify with heart logo and personalized meta"
```

---

## Task 4: Personalize Navigation Labels & Icons

Rename the sidebar navigation items to cute Valentine's-themed labels.

**Files:**
- Modify: `libs/web/shared/data-access/store/src/lib/ui/ui-store.ts:17-24`

**Step 1: Update nav item labels and icons**

In `libs/web/shared/data-access/store/src/lib/ui/ui-store.ts`, replace the navItems array (lines 17-24):

```typescript
navItems: [
  { label: 'Home', path: '', exact: true, icon: 'house-door', iconSelected: 'house-door-fill' },
  { label: 'Our Songs', path: '/search', icon: 'search-heart' },
  { label: 'Browse', path: '/browse', icon: 'compass', iconSelected: 'compass-fill' },
  { label: 'Love Playlists', path: '/collection/playlists', icon: 'heart', iconSelected: 'heart-fill' },
  { label: 'Our Albums', path: '/albums', icon: 'journal' },
  { label: 'Victoria\'s Favorites', path: '/collection/tracks', icon: 'heart-fill' },
  { label: 'For Victoria', path: '/valentine', icon: 'emoji-heart-eyes' }
],
```

Note: The existing icon assets already include `search-heart`, `heart-fill`, and `emoji-heart-eyes` SVGs, so no new icons needed.

**Step 2: Commit**

```bash
git add libs/web/shared/data-access/store/src/lib/ui/ui-store.ts
git commit -m "feat: personalize navigation with Valentine's labels and add Valentine route"
```

---

## Task 5: Personalize Home Page Greeting

Transform the greeting from generic time-of-day messages to romantic personalized greetings for Victoria.

**Files:**
- Modify: `libs/web/home/ui/greeting/src/lib/greeting.component.ts`
- Modify: `libs/web/home/ui/greeting/src/lib/greeting.component.html`

**Step 1: Update greeting component logic**

Replace the entire content of `libs/web/home/ui/greeting/src/lib/greeting.component.ts`:

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'as-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GreetingComponent {
  get message() {
    const now = new Date();
    const hours = now.getHours();
    const timeGreeting = hours < 12 ? 'Good Morning' : hours < 18 ? 'Good Afternoon' : 'Good Evening';
    return `${timeGreeting}, Victoria`;
  }

  get subtitle() {
    return randomLoveNote();
  }
}

function randomLoveNote(): string {
  const notes: string[] = [
    "Every love song reminds me of you",
    "You're the melody to my heart's song",
    "Our love story is my favorite playlist",
    "You make every day feel like our wedding day",
    "Mrs. Tyra, you have my whole heart",
    "September 2024 was just the beginning",
    "Forever sounds like the perfect song length with you",
    "You are my favorite duet partner for life",
  ];
  return notes[Math.floor(Math.random() * notes.length)];
}
```

**Step 2: Update greeting template**

Replace the content of `libs/web/home/ui/greeting/src/lib/greeting.component.html`:

```html
<h2 class="text-3xl text-white">{{ message }}</h2>
<p class="mt-2 text-lg" style="color: #ec4878;">{{ subtitle }}</p>
```

**Step 3: Commit**

```bash
git add libs/web/home/ui/greeting/src/lib/greeting.component.ts libs/web/home/ui/greeting/src/lib/greeting.component.html
git commit -m "feat: personalize home greeting with romantic messages for Victoria"
```

---

## Task 6: Update Visualizer Colors to Valentine's Palette

Change the music visualizer particles from the default color palette to romantic pinks, reds, and golds.

**Files:**
- Modify: `libs/web/visualizer/data-access/src/lib/const.ts:9-27`

**Step 1: Replace visualizer color palette**

In `libs/web/visualizer/data-access/src/lib/const.ts`, replace the COLORS array (lines 9-27):

```typescript
export const COLORS = [
  '#ec4878',  // Rose pink (primary)
  '#ff6987',  // Coral pink (accent)
  '#ffd78c',  // Warm gold
  '#ff85a2',  // Light pink
  '#b42850',  // Deep rose
  '#e8a0bf',  // Soft mauve
  '#ff4d6d',  // Hot pink
  '#ffc2d1',  // Blush
  '#ffb3c6',  // Baby pink
  '#c9184a',  // Crimson
  '#ff758f',  // Salmon pink
  '#ffd6e0',  // Pale rose
  '#e05780',  // Medium pink
  '#ff9eb5',  // Pink coral
  '#d4376e',  // Fuchsia rose
  '#ffccd5',  // Cotton candy
  '#f7879a',  // Flamingo
];
```

**Step 2: Commit**

```bash
git add libs/web/visualizer/data-access/src/lib/const.ts
git commit -m "feat: update visualizer particle colors to Valentine's pink/rose palette"
```

---

## Task 7: Update Slider & Player Control Styles

Make the playback slider and player controls match the Valentine's theme.

**Files:**
- Modify: `apps/angular-spotify/src/custom/tailwind/_components.scss:29-37` (control-button)
- Modify: `apps/angular-spotify/src/custom/ant/` (ng-zorro slider overrides if they exist)

**Step 1: Check for existing ant/slider overrides**

Run: `find apps/angular-spotify/src/custom/ant -type f` to see what's there.

**Step 2: Update control-button color in _components.scss**

In `apps/angular-spotify/src/custom/tailwind/_components.scss`, change the control-button color from `#b3b3b3` to `#e8a0bf`:

```scss
  .control-button {
    color: #e8a0bf;
    position: relative;
    @apply w-8 h-8 flex items-center justify-center cursor-pointer;

    &.large {
      @apply w-12 h-12;
    }
  }
```

**Step 3: Commit**

```bash
git add apps/angular-spotify/src/custom/tailwind/_components.scss
git commit -m "feat: update player controls to Valentine's rose theme"
```

---

## Task 8: Install canvas-confetti for Proposal Page

**Files:**
- Modify: `package.json` (new dependency)

**Step 1: Install canvas-confetti**

Run: `npm install canvas-confetti`
Expected: Package added to dependencies

**Step 2: Install types**

Run: `npm install --save-dev @types/canvas-confetti`
Expected: Types package added to devDependencies

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add canvas-confetti dependency for Valentine's proposal page"
```

---

## Task 9: Create Valentine's Feature Module - Module & Routing

Create a new Nx library for the Valentine's feature page at `libs/web/valentine/feature/`.

**Files:**
- Create: `libs/web/valentine/feature/src/index.ts`
- Create: `libs/web/valentine/feature/src/lib/valentine.module.ts`
- Create: `libs/web/valentine/feature/src/lib/valentine.component.ts`
- Create: `libs/web/valentine/feature/src/lib/valentine.component.html`
- Create: `libs/web/valentine/feature/src/lib/valentine.component.scss`
- Modify: `libs/web/shell/feature/src/lib/web-shell.routes.ts` (add route)
- Create: `tsconfig.lib.json` and other Nx boilerplate

**Step 1: Generate the library using Nx (or create manually)**

Since Nx generators may not work cleanly, create the files manually:

Create `libs/web/valentine/feature/src/index.ts`:
```typescript
export { ValentineModule } from './lib/valentine.module';
```

Create `libs/web/valentine/feature/src/lib/valentine.module.ts`:
```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ValentineComponent } from './valentine.component';
import { LoveLetterComponent } from './love-letter/love-letter.component';
import { PhotoMemoriesComponent } from './photo-memories/photo-memories.component';
import { ProposalComponent } from './proposal/proposal.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ValentineComponent
      }
    ])
  ],
  declarations: [
    ValentineComponent,
    LoveLetterComponent,
    PhotoMemoriesComponent,
    ProposalComponent
  ]
})
export class ValentineModule {}
```

Create `libs/web/valentine/feature/src/lib/valentine.component.ts`:
```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'as-valentine',
  templateUrl: './valentine.component.html',
  styleUrls: ['./valentine.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValentineComponent {
  currentSection: 'letter' | 'photos' | 'proposal' = 'letter';

  navigateTo(section: 'letter' | 'photos' | 'proposal') {
    this.currentSection = section;
  }
}
```

Create `libs/web/valentine/feature/src/lib/valentine.component.html`:
```html
<div class="content-spacing valentine-page">
  <div class="valentine-header">
    <h1 class="valentine-title">For Victoria</h1>
    <p class="valentine-subtitle">A Valentine's Day surprise, with all my love - Carter</p>
  </div>

  <nav class="valentine-nav">
    <button
      (click)="navigateTo('letter')"
      [class.active]="currentSection === 'letter'"
      class="valentine-nav-btn">
      Love Letter
    </button>
    <button
      (click)="navigateTo('photos')"
      [class.active]="currentSection === 'photos'"
      class="valentine-nav-btn">
      Our Memories
    </button>
    <button
      (click)="navigateTo('proposal')"
      [class.active]="currentSection === 'proposal'"
      class="valentine-nav-btn">
      A Question...
    </button>
  </nav>

  <div class="valentine-content">
    <as-love-letter *ngIf="currentSection === 'letter'"></as-love-letter>
    <as-photo-memories *ngIf="currentSection === 'photos'"></as-photo-memories>
    <as-proposal *ngIf="currentSection === 'proposal'"></as-proposal>
  </div>
</div>
```

Create `libs/web/valentine/feature/src/lib/valentine.component.scss`:
```scss
.valentine-page {
  max-width: 800px;
  margin: 0 auto;
  padding-bottom: 100px;
}

.valentine-header {
  text-align: center;
  padding: 2rem 0;
}

.valentine-title {
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(135deg, #ec4878, #ff6987, #ffd78c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.valentine-subtitle {
  font-size: 1.125rem;
  color: #e8a0bf;
  margin-top: 0.5rem;
}

.valentine-nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
}

.valentine-nav-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  border: 1px solid rgba(236, 72, 120, 0.3);
  background: transparent;
  color: #e8a0bf;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(236, 72, 120, 0.15);
    border-color: #ec4878;
    color: #fff;
  }

  &.active {
    background: linear-gradient(135deg, #ec4878, #ff6987);
    border-color: transparent;
    color: #fff;
  }
}

.valentine-content {
  margin-top: 1rem;
}
```

**Step 2: Add the valentine route to web-shell.routes.ts**

In `libs/web/shell/feature/src/lib/web-shell.routes.ts`, add a new lazy-loaded route for the valentine page. Add this entry to the routes array:

```typescript
{
  path: 'valentine',
  loadChildren: () => import('@angular-spotify/web/valentine/feature').then(m => m.ValentineModule)
},
```

**Step 3: Add tsconfig path alias**

In the root `tsconfig.base.json`, add the path alias:
```json
"@angular-spotify/web/valentine/feature": ["libs/web/valentine/feature/src/index.ts"]
```

**Step 4: Verify the app compiles**

Run: `npx nx serve angular-spotify`
Expected: App compiles, /valentine route loads the new page shell

**Step 5: Commit**

```bash
git add libs/web/valentine/ tsconfig.base.json libs/web/shell/feature/src/lib/web-shell.routes.ts
git commit -m "feat: create Valentine's feature module with routing and page shell"
```

---

## Task 10: Create Love Letter Component

A beautifully styled love letter that Carter wrote for Victoria.

**Files:**
- Create: `libs/web/valentine/feature/src/lib/love-letter/love-letter.component.ts`
- Create: `libs/web/valentine/feature/src/lib/love-letter/love-letter.component.html`
- Create: `libs/web/valentine/feature/src/lib/love-letter/love-letter.component.scss`

**Step 1: Create the love letter component**

Create `libs/web/valentine/feature/src/lib/love-letter/love-letter.component.ts`:
```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'as-love-letter',
  templateUrl: './love-letter.component.html',
  styleUrls: ['./love-letter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoveLetterComponent {
  isRevealed = false;

  revealLetter() {
    this.isRevealed = true;
  }
}
```

Create `libs/web/valentine/feature/src/lib/love-letter/love-letter.component.html`:
```html
<div class="letter-container" [class.revealed]="isRevealed">
  <div class="letter-envelope" *ngIf="!isRevealed" (click)="revealLetter()">
    <div class="envelope-body">
      <div class="envelope-flap"></div>
      <div class="envelope-heart">
        <svg viewBox="0 0 24 24" fill="#ec4878" width="48" height="48">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
      <p class="envelope-prompt">Click to open</p>
    </div>
  </div>

  <div class="letter-paper" *ngIf="isRevealed">
    <div class="letter-date">February 14, 2026</div>
    <div class="letter-greeting">My Dearest Victoria,</div>
    <div class="letter-body">
      <p>
        <!-- CARTER: Replace this with your actual love letter! -->
        <!-- This is placeholder text - make it personal and from your heart -->
        From the moment I met you, I knew my life would never be the same. You brought color into
        a world I didn't even know was grey. Every day with you feels like a new favorite song
        I never want to stop playing.
      </p>
      <p>
        When we said "I do" in September 2024, I thought my heart couldn't possibly feel any fuller.
        But you prove me wrong every single day. You are my best friend, my greatest adventure,
        and the love of my life.
      </p>
      <p>
        I built this little app because I wanted you to know that every song reminds me of you.
        Every melody carries a memory of us. Every beat matches the rhythm of my heart when
        I'm with you.
      </p>
      <p>
        You once said I hadn't asked you to be my Valentine yet... well, I wanted to do it
        in a way you'd never forget.
      </p>
      <p>
        I love you more than words (or code) could ever express.
      </p>
    </div>
    <div class="letter-signature">
      Forever yours,<br/>
      Carter
    </div>
  </div>
</div>
```

Create `libs/web/valentine/feature/src/lib/love-letter/love-letter.component.scss`:
```scss
.letter-container {
  display: flex;
  justify-content: center;
  padding: 2rem 0;
}

.letter-envelope {
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);

    .envelope-flap {
      transform: rotateX(180deg);
    }
  }
}

.envelope-body {
  width: 300px;
  height: 200px;
  background: linear-gradient(135deg, #ec4878, #b42850);
  border-radius: 8px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 40px rgba(236, 72, 120, 0.3);
}

.envelope-flap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(135deg, #d4376e, #ec4878);
  clip-path: polygon(0 0, 50% 100%, 100% 0);
  transform-origin: top;
  transition: transform 0.6s ease;
  z-index: 1;
}

.envelope-heart {
  z-index: 2;
  animation: pulse 1.5s ease-in-out infinite;
}

.envelope-prompt {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
  margin-top: 0.5rem;
  z-index: 2;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.15); }
}

.letter-paper {
  background: linear-gradient(180deg, #fff8f0 0%, #fff1e8 100%);
  border-radius: 8px;
  padding: 3rem;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  animation: unfold 0.6s ease-out;
}

@keyframes unfold {
  from {
    opacity: 0;
    transform: scaleY(0.3) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scaleY(1) translateY(0);
  }
}

.letter-date {
  text-align: right;
  color: #b42850;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
  font-style: italic;
}

.letter-greeting {
  font-size: 1.5rem;
  font-weight: 600;
  color: #b42850;
  margin-bottom: 1.5rem;
  font-style: italic;
}

.letter-body {
  color: #4a2535;
  line-height: 1.8;
  font-size: 1rem;

  p {
    margin-bottom: 1rem;
    text-indent: 2rem;
  }
}

.letter-signature {
  margin-top: 2rem;
  text-align: right;
  color: #b42850;
  font-size: 1.25rem;
  font-style: italic;
  font-weight: 600;
  line-height: 1.6;
}
```

**Step 2: Commit**

```bash
git add libs/web/valentine/feature/src/lib/love-letter/
git commit -m "feat: add love letter component with envelope open animation"
```

---

## Task 11: Create Photo Memories Component

A gallery section where Carter can add photos of him and Victoria.

**Files:**
- Create: `libs/web/valentine/feature/src/lib/photo-memories/photo-memories.component.ts`
- Create: `libs/web/valentine/feature/src/lib/photo-memories/photo-memories.component.html`
- Create: `libs/web/valentine/feature/src/lib/photo-memories/photo-memories.component.scss`
- Create: `libs/web/shared/assets/src/assets/valentine/` (directory for photos)

**Step 1: Create the photos directory and a placeholder**

Run: `mkdir -p libs/web/shared/assets/src/assets/valentine`

Create a `.gitkeep` in `libs/web/shared/assets/src/assets/valentine/.gitkeep` so the directory is tracked.

**Step 2: Create photo memories component**

Create `libs/web/valentine/feature/src/lib/photo-memories/photo-memories.component.ts`:
```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Memory {
  imageUrl: string;
  caption: string;
  date: string;
}

@Component({
  selector: 'as-photo-memories',
  templateUrl: './photo-memories.component.html',
  styleUrls: ['./photo-memories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoMemoriesComponent {
  /**
   * CARTER: Add your photos to libs/web/shared/assets/src/assets/valentine/
   * Then update this array with your actual photos and captions!
   * Images should be referenced as 'assets/valentine/filename.jpg'
   */
  memories: Memory[] = [
    {
      imageUrl: 'assets/valentine/placeholder-1.jpg',
      caption: 'Our first adventure together',
      date: 'Add your date'
    },
    {
      imageUrl: 'assets/valentine/placeholder-2.jpg',
      caption: 'The day you said yes',
      date: 'Add your date'
    },
    {
      imageUrl: 'assets/valentine/placeholder-3.jpg',
      caption: 'Our wedding day - September 2024',
      date: 'September 2024'
    },
    {
      imageUrl: 'assets/valentine/placeholder-4.jpg',
      caption: 'Our favorite moment together',
      date: 'Add your date'
    },
  ];

  selectedMemory: Memory | null = null;

  selectMemory(memory: Memory) {
    this.selectedMemory = memory;
  }

  closeModal() {
    this.selectedMemory = null;
  }
}
```

Create `libs/web/valentine/feature/src/lib/photo-memories/photo-memories.component.html`:
```html
<div class="memories-container">
  <h2 class="memories-title">Our Memories</h2>
  <p class="memories-subtitle">Every moment with you is my favorite</p>

  <div class="memories-grid">
    <div
      class="memory-card"
      *ngFor="let memory of memories; let i = index"
      (click)="selectMemory(memory)"
      [style.animation-delay]="i * 0.1 + 's'">
      <div class="memory-image-wrapper">
        <img [src]="memory.imageUrl" [alt]="memory.caption" class="memory-image" />
        <div class="memory-overlay">
          <span class="memory-view-text">View Memory</span>
        </div>
      </div>
      <div class="memory-caption">{{ memory.caption }}</div>
      <div class="memory-date">{{ memory.date }}</div>
    </div>
  </div>
</div>

<!-- Lightbox Modal -->
<div class="lightbox" *ngIf="selectedMemory" (click)="closeModal()">
  <div class="lightbox-content" (click)="$event.stopPropagation()">
    <button class="lightbox-close" (click)="closeModal()">&times;</button>
    <img [src]="selectedMemory.imageUrl" [alt]="selectedMemory.caption" class="lightbox-image" />
    <div class="lightbox-caption">{{ selectedMemory.caption }}</div>
    <div class="lightbox-date">{{ selectedMemory.date }}</div>
  </div>
</div>
```

Create `libs/web/valentine/feature/src/lib/photo-memories/photo-memories.component.scss`:
```scss
.memories-container {
  padding: 1rem 0;
}

.memories-title {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  background: linear-gradient(135deg, #ec4878, #ff6987, #ffd78c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.memories-subtitle {
  text-align: center;
  color: #e8a0bf;
  margin-top: 0.5rem;
  margin-bottom: 2rem;
}

.memories-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.memory-card {
  border-radius: 12px;
  overflow: hidden;
  background: rgba(62, 35, 47, 0.7);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: fadeInUp 0.5s ease-out both;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(236, 72, 120, 0.25);

    .memory-overlay {
      opacity: 1;
    }
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.memory-image-wrapper {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
}

.memory-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  .memory-card:hover & {
    transform: scale(1.05);
  }
}

.memory-overlay {
  position: absolute;
  inset: 0;
  background: rgba(180, 40, 80, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.memory-view-text {
  color: white;
  font-weight: 600;
  font-size: 1rem;
}

.memory-caption {
  padding: 0.75rem 1rem 0.25rem;
  color: #fff;
  font-weight: 600;
  font-size: 0.875rem;
}

.memory-date {
  padding: 0 1rem 0.75rem;
  color: #e8a0bf;
  font-size: 0.75rem;
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.lightbox-content {
  max-width: 90vw;
  max-height: 90vh;
  position: relative;
}

.lightbox-close {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  padding: 0.5rem;

  &:hover {
    color: #ec4878;
  }
}

.lightbox-image {
  max-width: 100%;
  max-height: 70vh;
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(236, 72, 120, 0.3);
}

.lightbox-caption {
  text-align: center;
  color: #fff;
  font-size: 1.125rem;
  font-weight: 600;
  margin-top: 1rem;
}

.lightbox-date {
  text-align: center;
  color: #e8a0bf;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
```

**Step 3: Commit**

```bash
git add libs/web/valentine/feature/src/lib/photo-memories/ libs/web/shared/assets/src/assets/valentine/
git commit -m "feat: add photo memories gallery with lightbox and fade-in animations"
```

---

## Task 12: Create "Will You Be My Valentine?" Proposal Component

The grand finale - a beautiful animated proposal page with confetti explosion.

**Files:**
- Create: `libs/web/valentine/feature/src/lib/proposal/proposal.component.ts`
- Create: `libs/web/valentine/feature/src/lib/proposal/proposal.component.html`
- Create: `libs/web/valentine/feature/src/lib/proposal/proposal.component.scss`

**Step 1: Create the proposal component**

Create `libs/web/valentine/feature/src/lib/proposal/proposal.component.ts`:
```typescript
import {
  ChangeDetectionStrategy,
  Component,
  ChangeDetectorRef,
  ElementRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import confetti from 'canvas-confetti';

@Component({
  selector: 'as-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProposalComponent {
  state: 'question' | 'answered' = 'question';
  noButtonPosition = { top: '0px', left: '0px' };
  noMoveCount = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  onYes() {
    this.state = 'answered';
    this.cdr.markForCheck();
    this.launchConfetti();
  }

  onNoHover() {
    this.noMoveCount++;
    const maxX = 250;
    const maxY = 150;
    const randomX = Math.floor(Math.random() * maxX * 2) - maxX;
    const randomY = Math.floor(Math.random() * maxY * 2) - maxY;
    this.noButtonPosition = {
      top: `${randomY}px`,
      left: `${randomX}px`
    };
    this.cdr.markForCheck();
  }

  private launchConfetti() {
    const duration = 5000;
    const end = Date.now() + duration;

    const heartShape = confetti.shapeFromPath({
      path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
    });

    const colors = ['#ec4878', '#ff6987', '#ffd78c', '#ff85a2', '#ffc2d1'];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: colors,
        shapes: [heartShape, 'circle'],
        scalar: 1.2
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: colors,
        shapes: [heartShape, 'circle'],
        scalar: 1.2
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    // Initial burst
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.6 },
      colors: colors,
      shapes: [heartShape, 'circle'],
      scalar: 1.5
    });

    frame();
  }
}
```

Create `libs/web/valentine/feature/src/lib/proposal/proposal.component.html`:
```html
<div class="proposal-container">
  <!-- The Question -->
  <div class="proposal-question" *ngIf="state === 'question'">
    <div class="floating-hearts">
      <span class="floating-heart" *ngFor="let h of [1,2,3,4,5,6,7,8]"
            [style.animation-delay]="h * 0.5 + 's'"
            [style.left]="h * 12 + '%'">
      </span>
    </div>

    <div class="question-card">
      <div class="question-heart">
        <svg viewBox="0 0 24 24" fill="#ec4878" width="80" height="80">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>

      <h1 class="question-text">Victoria...</h1>
      <h2 class="question-subtitle">Will you be my Valentine?</h2>

      <div class="buttons-area">
        <button class="btn-yes" (click)="onYes()">
          Yes!
        </button>
        <div class="no-btn-wrapper">
          <button
            class="btn-no"
            [style.position]="'relative'"
            [style.top]="noButtonPosition.top"
            [style.left]="noButtonPosition.left"
            (mouseenter)="onNoHover()"
            (touchstart)="onNoHover()">
            {{ noMoveCount > 3 ? 'You can\'t click me!' : 'No' }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- The Answer (after Yes) -->
  <div class="proposal-answer" *ngIf="state === 'answered'">
    <div class="answer-card">
      <h1 class="answer-title">She said YES!</h1>
      <div class="answer-heart-burst">
        <svg viewBox="0 0 24 24" fill="#ec4878" width="120" height="120">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
      <p class="answer-message">
        Happy Valentine's Day, Victoria!<br/>
        I love you more every single day.<br/>
        <span class="answer-signature">- Your husband, Carter</span>
      </p>
      <p class="answer-date">February 14, 2026</p>
    </div>
  </div>
</div>
```

Create `libs/web/valentine/feature/src/lib/proposal/proposal.component.scss`:
```scss
.proposal-container {
  padding: 2rem 0;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

/* Floating Hearts Background */
.floating-hearts {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.floating-heart {
  position: absolute;
  bottom: -20px;
  font-size: 1.5rem;
  animation: floatUp 6s ease-in infinite;
  opacity: 0;

  &::before {
    content: '\2764';
    color: rgba(236, 72, 120, 0.3);
  }
}

@keyframes floatUp {
  0% {
    opacity: 0;
    transform: translateY(0) rotate(0deg);
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    opacity: 0;
    transform: translateY(-600px) rotate(360deg);
  }
}

/* Question Card */
.question-card {
  text-align: center;
  padding: 3rem;
  border-radius: 16px;
  background: rgba(62, 35, 47, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(236, 72, 120, 0.2);
  box-shadow: 0 20px 60px rgba(236, 72, 120, 0.15);
  position: relative;
  z-index: 1;
  animation: scaleIn 0.5s ease-out;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.question-heart {
  animation: heartbeat 1.2s ease-in-out infinite;
  margin-bottom: 1.5rem;
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  25% { transform: scale(1.1); }
  40% { transform: scale(1); }
  60% { transform: scale(1.1); }
}

.question-text {
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.5rem;
}

.question-subtitle {
  font-size: 1.75rem;
  font-weight: 600;
  background: linear-gradient(135deg, #ec4878, #ff6987, #ffd78c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 2.5rem;
}

/* Buttons */
.buttons-area {
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  min-height: 80px;
}

.btn-yes {
  padding: 1rem 3rem;
  font-size: 1.25rem;
  font-weight: 700;
  border: none;
  border-radius: 9999px;
  background: linear-gradient(135deg, #ec4878, #ff6987);
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(236, 72, 120, 0.4);

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 30px rgba(236, 72, 120, 0.6);
  }
}

.no-btn-wrapper {
  width: 120px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-no {
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 9999px;
  background: transparent;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

/* Answer (after Yes) */
.proposal-answer {
  width: 100%;
  display: flex;
  justify-content: center;
}

.answer-card {
  text-align: center;
  padding: 3rem;
  animation: celebrationPop 0.6s ease-out;
}

@keyframes celebrationPop {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.answer-title {
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(135deg, #ec4878, #ff6987, #ffd78c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
}

.answer-heart-burst {
  animation: heartbeat 1s ease-in-out infinite;
  margin-bottom: 1.5rem;
}

.answer-message {
  font-size: 1.25rem;
  color: #e8a0bf;
  line-height: 2;
}

.answer-signature {
  display: block;
  margin-top: 1rem;
  font-style: italic;
  color: #ffd78c;
  font-size: 1.125rem;
}

.answer-date {
  margin-top: 1.5rem;
  color: rgba(232, 160, 191, 0.6);
  font-size: 0.875rem;
}
```

**Step 2: Commit**

```bash
git add libs/web/valentine/feature/src/lib/proposal/
git commit -m "feat: add Valentine's proposal page with confetti, dodging No button, and celebration"
```

---

## Task 13: Update Card & Media Components for Valentine's Theme

Subtle theming updates to the shared UI cards and play button to match Valentine's feel.

**Files:**
- Modify: `libs/web/shared/ui/media/src/lib/card.component.scss:8` (hover color)
- Modify: `libs/web/shared/ui/play-button/` (green play button to pink)

**Step 1: Check play-button component for color references**

Run: `grep -r "1DB954\|#1db954\|green\|29 185 84" libs/web/shared/ui/play-button/` to find any hardcoded Spotify green.

The play button likely uses the `primary` tailwind color which is already driven by CSS variables, so it should auto-update. Verify this.

**Step 2: Update card hover background**

In `libs/web/shared/ui/media/src/lib/card.component.scss`, the card uses `bg-highlight bg-opacity-70` which is driven by CSS variables. This should auto-update with our new theme. Verify visually.

**Step 3: Check for any remaining hardcoded Spotify green (#1DB954 or rgb(29,185,84))**

Run: `grep -ri "1DB954\|1db954\|29, 185, 84\|29 185 84\|spotify-green" libs/ apps/ --include="*.ts" --include="*.scss" --include="*.html" --include="*.css" -l`

Fix any hardcoded Spotify green references found.

**Step 4: Commit (if changes were made)**

```bash
git add -u
git commit -m "fix: remove remaining Spotify green references, ensure Valentine theme consistency"
```

---

## Task 14: Add Floating Hearts CSS Animation to Layout

Add subtle floating heart particles in the background of the main content area for extra romance.

**Files:**
- Modify: `libs/web/shell/ui/layout/src/lib/layout.component.html`
- Modify: `libs/web/shell/ui/layout/src/lib/layout.component.scss`

**Step 1: Add hearts container to layout**

In `libs/web/shell/ui/layout/src/lib/layout.component.html`, add before the closing tag (before `@if (showPiPVisualizer$`):

```html
<div class="hearts-bg" aria-hidden="true">
  <div class="heart-particle" *ngFor="let i of [1,2,3,4,5,6,7,8,9,10,11,12]"
       [style.left]="(i * 8.3) + '%'"
       [style.animation-delay]="(i * 1.5) + 's'"
       [style.font-size]="(10 + (i % 3) * 6) + 'px'">
  </div>
</div>
```

Note: This requires CommonModule. Check if layout module already imports it.

**Step 2: Add hearts animation CSS**

In `libs/web/shell/ui/layout/src/lib/layout.component.scss`, add:

```scss
.hearts-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.heart-particle {
  position: absolute;
  bottom: -20px;
  animation: floatHeart 12s linear infinite;
  opacity: 0;

  &::before {
    content: '\2764';
    color: rgba(236, 72, 120, 0.08);
  }
}

@keyframes floatHeart {
  0% {
    opacity: 0;
    transform: translateY(0) translateX(0) rotate(0deg) scale(1);
  }
  5% {
    opacity: 1;
  }
  50% {
    transform: translateY(-50vh) translateX(30px) rotate(180deg) scale(1.2);
  }
  95% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(-100vh) translateX(-20px) rotate(360deg) scale(0.8);
  }
}
```

**Step 3: Verify layout module imports CommonModule**

Check if `*ngFor` works in the layout template. If the layout module doesn't import CommonModule, add it.

**Step 4: Commit**

```bash
git add libs/web/shell/ui/layout/
git commit -m "feat: add subtle floating hearts background animation to layout"
```

---

## Task 15: Update Recently Played & Featured Sections Headings

Personalize the section headings on the home page.

**Files:**
- Modify: `libs/web/home/ui/recent-played/src/lib/recent-played.component.html:1`
- Modify: `libs/web/home/ui/featured-playlists/src/lib/featured-playlists.component.html:2`

**Step 1: Update "Recently Played" heading**

In `libs/web/home/ui/recent-played/src/lib/recent-played.component.html`, change line 1:

```html
<h2 class="mt-8 mb-4 text-heading">Songs We've Been Loving</h2>
```

**Step 2: The featured playlists heading comes from the API response (data.message), so leave it dynamic but it will naturally display Spotify's message.**

No change needed here - the Spotify API will return its own featured message.

**Step 3: Commit**

```bash
git add libs/web/home/ui/recent-played/src/lib/recent-played.component.html
git commit -m "feat: personalize home page section headings"
```

---

## Task 16: Update Favicon to Heart

Replace the Spotify favicon with a heart favicon.

**Files:**
- Create: `libs/web/shared/assets/src/assets/favicon-heart.png` (or use an SVG inline)
- Modify: `apps/angular-spotify/src/index.html:57-61`

**Step 1: Create an SVG heart favicon**

Create `apps/angular-spotify/src/assets/favicon-heart.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ec4878"/>
      <stop offset="100%" style="stop-color:#ff6987"/>
    </linearGradient>
  </defs>
  <path fill="url(#g)" d="M50 88.7l-5.8-5.3C18.8 60.1 5 47.8 5 32.5 5 20.1 14.8 10 27 10c7 0 13.7 3.3 18 8.4C49.3 13.3 56 10 63 10 75.2 10 85 20.1 85 32.5c0 15.3-13.8 27.6-39.2 50.9L50 88.7z"/>
</svg>
```

**Step 2: Update favicon references in index.html**

In `apps/angular-spotify/src/index.html`, replace lines 57-61:

```html
    <link rel="image_src" href="assets/favicon-heart.svg" type="image/svg+xml" />
    <link rel="shortcut icon" href="assets/favicon-heart.svg" type="image/svg+xml" />
    <link rel="icon" href="assets/favicon-heart.svg" type="image/svg+xml" />
```

**Step 3: Commit**

```bash
git add apps/angular-spotify/src/assets/favicon-heart.svg apps/angular-spotify/src/index.html
git commit -m "feat: replace favicon with Valentine's heart icon"
```

---

## Task 17: Update ng-zorro/Ant Design Slider Theme

Make the music player slider match the Valentine's theme.

**Files:**
- Modify or Create: `apps/angular-spotify/src/custom/ant/_slider.scss` (or wherever ant overrides live)

**Step 1: Check existing ant overrides**

Run: `ls apps/angular-spotify/src/custom/ant/`
Run: `cat apps/angular-spotify/src/custom/ant/_index.scss` (or similar entry file)

**Step 2: Add/update slider color overrides**

The slider colors are primarily controlled via the Tailwind `sliderRail` and `sliderTrack` colors we already updated in Task 2. Verify the ng-zorro slider picks up these colors, or add explicit overrides:

```scss
.ant-slider-rail {
  background-color: #4a2535 !important;
}

.ant-slider-track {
  background-color: #ec4878 !important;
}

.ant-slider-handle {
  border-color: #ec4878 !important;
  background-color: #fff !important;
}

.ant-slider:hover .ant-slider-track {
  background-color: #ff6987 !important;
}
```

**Step 3: Commit**

```bash
git add apps/angular-spotify/src/custom/ant/
git commit -m "feat: theme ng-zorro slider to Valentine's rose colors"
```

---

## Task 18: Final Verification & Polish

**Step 1: Start the dev server**

Run: `npx nx serve angular-spotify`

**Step 2: Manual verification checklist**

- [ ] App loads with Valentine's color scheme (dark burgundy bg, pink accents)
- [ ] Logo says "Lovify" with heart icon
- [ ] Browser tab shows "Lovify - Carter & Victoria's Love Songs"
- [ ] Nav sidebar shows personalized labels including "For Victoria" link
- [ ] Home page greets Victoria by name with a love note subtitle
- [ ] Music visualizer shows pink/rose particles
- [ ] Player slider and controls are themed pink
- [ ] Floating hearts appear subtly in the background
- [ ] `/valentine` route loads with 3 tabs: Love Letter, Our Memories, A Question
- [ ] Love Letter has clickable envelope that opens to reveal the letter
- [ ] Photo Memories shows gallery grid (with placeholders until photos are added)
- [ ] Proposal page has heartbeat animation, "Yes" button triggers confetti
- [ ] "No" button dodges the cursor when hovered
- [ ] After clicking "Yes", celebration screen appears with heart confetti

**Step 3: Fix any issues found during verification**

Address any compilation errors, visual bugs, or broken functionality.

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat: final polish and fixes for Lovify Valentine's transformation"
```

---

## Post-Implementation: Personal Touches (Carter's TODO)

These items require Carter's personal input and can't be automated:

1. **Write your real love letter** - Edit `libs/web/valentine/feature/src/lib/love-letter/love-letter.component.html` and replace the placeholder text with your actual heartfelt letter to Victoria.

2. **Add your photos** - Drop your favorite couple photos into `libs/web/shared/assets/src/assets/valentine/` and update the `memories` array in `libs/web/valentine/feature/src/lib/photo-memories/photo-memories.component.ts` with real filenames, captions, and dates.

3. **Create a Spotify playlist** - Consider creating a special "Carter & Victoria's Valentine's Day" playlist on Spotify with all your songs. When she logs in with your shared account, it'll appear in the "Love Playlists" section.

4. **Deployment** - Deploy to a custom URL (e.g., lovify.vercel.app or a custom domain) so you can share it with Victoria on Valentine's Day.

5. **The Reveal** - Send her the link on February 14th with a message like: "I made you something. Click the heart on the left that says 'For Victoria'."
