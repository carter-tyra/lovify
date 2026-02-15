import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

interface YearPage {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  photos: { src: string; caption: string }[];
}

const YEAR_DATA: Record<string, YearPage> = {
  '2018': {
    year: '2018',
    title: 'The Year We Stopped Making Excuses',
    subtitle: 'Volume 1',
    description:
      'September. Northside Tavern. Seven beers deep, playing pool with Seth. You texted. I said "I\'m coming." The elevator ride to the 10th floor was the longest of my life. The door opened and there you were — cute ass outfit, biggest smile, two Fireball shots ready. Three years of excuses ended in one night.',
    photos: [
      { src: 'assets/valentine/first-memories/rizz.JPEG', caption: '#didntdisappoint #worththewait — on the way to meet you' },
      { src: 'assets/valentine/one-of-our-first-photos-together.JPEG', caption: 'One of our first photos together' }
    ]
  },
  '2019': {
    year: '2019',
    title: '30 Heart Emojis',
    subtitle: 'Volume 2',
    description:
      'You texted "I love you" while I was in Vietnam. Out of nowhere. No buildup, no warning. I stared at my phone for three hours and sent back 30 multicolored heart emojis in every color. You were furious. I was terrified. We were in love. Also — Tyler Childers, December. One of the best nights.',
    photos: [
      { src: 'assets/valentine/first-memories/rizz02.PNG', caption: '"You look so tasty, want to spread you on my toast" — peak rizz' },
      { src: 'assets/valentine/2019-concerts/tyler-childers-dec-2019.jpeg', caption: 'Tyler Childers concert, December 2019' }
    ]
  },
  '2020': {
    year: '2020',
    title: 'Us vs. The World',
    subtitle: 'Volume 3',
    description:
      'The year everything shut down — except us. While the world was falling apart, we were figuring out who we really were together. No distractions, no escapes. Just us. And we came out the other side stronger.',
    photos: []
  },
  '2021': {
    year: '2021',
    title: 'Building Something Real',
    subtitle: 'Volume 4',
    description:
      'Another year of growing into each other. The kind of year that doesn\'t need a highlight reel — just the quiet proof that we chose each other again, every single day.',
    photos: []
  },
  '2022': {
    year: '2022',
    title: 'The Adventures Begin',
    subtitle: 'Volume 5',
    description:
      'You became a flight attendant and suddenly the whole world opened up. New cities, new experiences, new versions of us. The distance was hard sometimes, but it made every reunion feel like the first time.',
    photos: []
  },
  '2023': {
    year: '2023',
    title: 'She Said Yes',
    subtitle: 'Volume 6',
    description:
      'December. Philadelphia. Rittenhouse Park. One knee. One question. One ring. My heart was beating just as hard as it was in that elevator five years earlier. You said yes. The most nerve-wracking and unforgettable moment of my life.',
    photos: [
      { src: 'assets/valentine/engagement-rittenhouse-park-december-2023/engagement-rittenhouse-1.JPEG', caption: 'The moment' },
      { src: 'assets/valentine/engagement-rittenhouse-park-december-2023/engagement-rittenhouse-2.JPEG', caption: 'She said yes' },
      { src: 'assets/valentine/engagement-rittenhouse-park-december-2023/engagement-rittenhouse-3.JPEG', caption: 'My fianc\u00e9e' },
      { src: 'assets/valentine/engagement-rittenhouse-park-december-2023/engagement-rittenhouse-4.PNG', caption: 'Rittenhouse Park' }
    ]
  },
  '2024': {
    year: '2024',
    title: 'Forever Starts Now',
    subtitle: 'Volume 7',
    description:
      'September 19 — we made it official at the courthouse. September 29 — Lecce, Puglia. Just our families. I told myself I wouldn\'t cry. I cried like a BITCH. The most beautiful angel walked down that aisle and she was alllll mine. Forever.',
    photos: [
      { src: 'assets/valentine/courthouse-legal-marriage-september-19-2024/courthouse-marriage-1-sept-19-2024.JPEG', caption: 'Making it legal' },
      { src: 'assets/valentine/courthouse-legal-marriage-september-19-2024/my-beautiful-wife-courthouse-wedding-sept-19-2024.JPEG', caption: 'My beautiful wife' },
      { src: 'assets/valentine/wedding-day-puglia-september-29-2024/me-watching-victoria-walk-down-the-aisle-wedding-day-sept-29-2024.JPEG', caption: 'Watching her walk down the aisle' },
      { src: 'assets/valentine/wedding-day-puglia-september-29-2024/me-crying-during-wedding-sept-29-2024.PNG', caption: 'I told myself I wouldn\'t cry' },
      { src: 'assets/valentine/wedding-day-puglia-september-29-2024/victoria-wedding-day-in-dress-getting-ready.JPEG', caption: 'Getting ready' },
      { src: 'assets/valentine/wedding-day-puglia-september-29-2024/wedding-day-puglia-1.JPEG', caption: 'Puglia' },
      { src: 'assets/valentine/wedding-day-puglia-september-29-2024/wedding-day-puglia-2.JPEG', caption: 'Mr. & Mrs. Tyra' },
      { src: 'assets/valentine/future-birds.jpg', caption: 'Futurebirds, November 2024' }
    ]
  },
  '2025': {
    year: '2025',
    title: 'The First Year',
    subtitle: 'Volume 8',
    description:
      'Our first full year as husband and wife. Italy (again), Portugal, Ireland, South Africa, Spain, France, Costa Rica, Greece. But also the hard things — the fights, the distance, the losses. All of it. We figured it out every time.',
    photos: [
      { src: 'assets/valentine/Fake-pregnant-ate-too-much-HILTON-HEAD.jpeg', caption: 'She ate too much at Hilton Head (not what you think)' }
    ]
  },
  '2026': {
    year: '2026',
    title: 'Happy Valentine\'s Day',
    subtitle: 'Volume 9',
    description:
      'I built you a whole app because a Hallmark card wasn\'t going to cut it. You\'re my 5-foot-nothing, Fireball-pouring, Pedialyte-at-3AM, matcha-drinking, TikTok-scrolling, Bieber-loving angel. And you somehow picked me.',
    photos: []
  }
};

@Component({
  selector: 'as-valentine',
  templateUrl: './valentine.component.html',
  styleUrls: ['./valentine.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValentineComponent implements OnInit, OnDestroy {
  currentSection: 'letter' | 'photos' | 'wizard' = 'letter';
  isTransitioning = false;

  activeYear: string | null = null;
  yearPage: YearPage | null = null;
  lightboxPhoto: { src: string; caption: string } | null = null;

  private sub!: Subscription;

  constructor(private cdr: ChangeDetectorRef, private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe((params) => {
      const year = params['year'];
      if (year && YEAR_DATA[year]) {
        this.activeYear = year;
        this.yearPage = YEAR_DATA[year];
      } else {
        this.activeYear = null;
        this.yearPage = null;
      }
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  navigateTo(section: 'letter' | 'photos' | 'wizard') {
    if (section === this.currentSection || this.isTransitioning) return;
    this.isTransitioning = true;
    this.cdr.markForCheck();

    setTimeout(() => {
      this.currentSection = section;
      this.isTransitioning = false;
      this.cdr.markForCheck();
    }, 250);
  }

  openLightbox(photo: { src: string; caption: string }) {
    this.lightboxPhoto = photo;
    this.cdr.markForCheck();
  }

  closeLightbox() {
    this.lightboxPhoto = null;
    this.cdr.markForCheck();
  }
}
