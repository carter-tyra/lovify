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
      { src: 'assets/valentine/nyc-2019/NYC-2019.jpg', caption: 'NYC, 2019' },
      { src: 'assets/valentine/first-memories/rizz02.PNG', caption: '"You look so tasty, want to spread you on my toast" — peak rizz' },
      { src: 'assets/valentine/2019-concerts/tyler-childers-dec-2019.jpeg', caption: 'Tyler Childers concert, December 2019' }
    ]
  },
  '2020': {
    year: '2020',
    title: 'Us vs. The World',
    subtitle: 'Volume 3',
    description:
      'The year everything shut down — except us. While the world was falling apart, we were figuring out who we really were together. No distractions, no escapes. Just us. Lake Tahoe, Hilton Head, PCH road trip, Monterey, Panama City Beach — we made the most of every moment we had.',
    photos: [
      { src: 'assets/valentine/2020 - Christmas, Laguna beach, Covid, Tahoe, Pacific Coast Highway, Atlanta, Augusta and more/Lake-Tahoe-trip.JPG', caption: 'Lake Tahoe' },
      { src: 'assets/valentine/2020 - Christmas, Laguna beach, Covid, Tahoe, Pacific Coast Highway, Atlanta, Augusta and more/bday-dinner.jpeg', caption: 'Birthday dinner' },
      { src: 'assets/valentine/2020 - Christmas, Laguna beach, Covid, Tahoe, Pacific Coast Highway, Atlanta, Augusta and more/Covid-funny-PCH-roadtrip.jpeg', caption: 'COVID era — PCH road trip vibes' },
      { src: 'assets/valentine/2020 - Christmas, Laguna beach, Covid, Tahoe, Pacific Coast Highway, Atlanta, Augusta and more/hilton-head-sunset-victoria.jpeg', caption: 'Hilton Head sunset' },
      { src: 'assets/valentine/2020 - Christmas, Laguna beach, Covid, Tahoe, Pacific Coast Highway, Atlanta, Augusta and more/Monterey-California-Victoria.jpeg', caption: 'Monterey, California' },
      { src: 'assets/valentine/2020 - Christmas, Laguna beach, Covid, Tahoe, Pacific Coast Highway, Atlanta, Augusta and more/hilton-head-dinner-2.jpeg', caption: 'Hilton Head dinner — golden hour' },
      { src: 'assets/valentine/My All Time Favorites of Victoria/PCB-2020-Victoria-on-beach.jpg', caption: 'Panama City Beach' },
      { src: 'assets/valentine/2020 - Christmas, Laguna beach, Covid, Tahoe, Pacific Coast Highway, Atlanta, Augusta and more/Lobster-start-of-pch-roadtrip.jpg', caption: 'Lobster to kick off the PCH road trip' }
    ]
  },
  '2021': {
    year: '2021',
    title: 'Building Something Real',
    subtitle: 'Volume 4',
    description:
      'Portugal for your birthday — Lisbon and Lagos, cliffs and seafood and way too much wine. Then Dublin in December — Temple Bar at Christmas, cozy pubs, cocktails by candlelight. The year we started collecting passport stamps together.',
    photos: [
      { src: 'assets/valentine/2021/Dublin - December/FullSizeRender.jpeg', caption: 'Temple Bar, Dublin — Christmas lights' },
      { src: 'assets/valentine/2021/Dublin - December/FullSizeRender (1).jpeg', caption: 'Inside Temple Bar — live music & Christmas ornaments' },
      { src: 'assets/valentine/2021/Dublin - December/IMG_8081.jpeg', caption: 'Vintage Cocktail Club, Dublin' },
      { src: 'assets/valentine/2021/Dublin - December/IMG_3235.jpeg', caption: 'Dublin cocktails by candlelight' },
      { src: 'assets/valentine/Portugal - 2021 - Victoria Bday Trip - Lisbon - Lagos/IMG_6765.jpeg', caption: 'Birthday dinner — Lisbon' },
      { src: 'assets/valentine/Portugal - 2021 - Victoria Bday Trip - Lisbon - Lagos/IMG_7044.jpeg', caption: 'Lagos sea caves' }
    ]
  },
  '2022': {
    year: '2022',
    title: 'The Adventures Begin',
    subtitle: 'Volume 5',
    description:
      'You became a flight attendant and suddenly the whole world opened up. Paris in April — the Louvre, the Eiffel Tower at night, cafes on every corner. New cities, new experiences, new versions of us.',
    photos: [
      { src: 'assets/valentine/2022/Paris - April 2022/FullSizeRender.jpeg', caption: 'La Fontaine de Mars, Paris' },
      { src: 'assets/valentine/2022/Paris - April 2022/IMG_7044.jpeg', caption: 'Paris — our kind of staircase' },
      { src: 'assets/valentine/2022/Paris - April 2022/IMG_7252.jpeg', caption: 'Eiffel Tower at night' },
      { src: 'assets/valentine/2022/Paris - April 2022/IMG_7316.jpeg', caption: 'The Louvre' },
      { src: 'assets/valentine/2022/Paris - April 2022/IMG_7355.jpeg', caption: 'Victoria at the Louvre' }
    ]
  },
  '2023': {
    year: '2023',
    title: 'She Said Yes',
    subtitle: 'Volume 6',
    description:
      'Costa Rica, Aruba, Eagles playoffs, Philly nights — and then December. Rittenhouse Park. One knee. One question. One ring. The most nerve-wracking and unforgettable moment of my life.',
    photos: [
      { src: 'assets/valentine/2023/costa-rica.jpeg', caption: 'Costa Rica sunset' },
      { src: 'assets/valentine/2023/costa-rica-horse-riding.jpeg', caption: 'Horseback riding in Costa Rica' },
      { src: 'assets/valentine/2023/costa-rica-welcome-sign.jpeg', caption: '"Welcome, Victoria Tyra"' },
      { src: 'assets/valentine/2023/aruba-victoria.jpeg', caption: 'Aruba' },
      { src: 'assets/valentine/2023/philly-victoria-eagles-jacket.jpeg', caption: 'Eagles jacket season' },
      { src: 'assets/valentine/2023/eagles-playoffs-w-friends.jpeg', caption: 'Eagles playoffs with the crew' },
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
      'Venice in the summer — canals, street food, Aperol spritzes on bridges. September 19 — courthouse. September 29 — Lecce, Puglia. I told myself I wouldn\'t cry. I cried like a BITCH. The most beautiful angel walked down that aisle and she was alllll mine. Forever.',
    photos: [
      { src: 'assets/valentine/2024/Venice/IMG_1714.jpeg', caption: 'Venice — Grand Canal with a spritz' },
      { src: 'assets/valentine/2024/Venice/IMG_1740.jpeg', caption: 'Venice — gondola canal' },
      { src: 'assets/valentine/2024/Venice/IMG_1710.jpeg', caption: 'Venice street food' },
      { src: 'assets/valentine/2024/Venice/IMG_1845.jpeg', caption: 'Puglia coastline' },
      { src: 'assets/valentine/courthouse-legal-marriage-september-19-2024/courthouse-marriage-1-sept-19-2024.JPEG', caption: 'Making it legal' },
      { src: 'assets/valentine/courthouse-legal-marriage-september-19-2024/my-beautiful-wife-courthouse-wedding-sept-19-2024.JPEG', caption: 'My beautiful wife' },
      { src: 'assets/valentine/wedding-day-puglia-september-29-2024/me-watching-victoria-walk-down-the-aisle-wedding-day-sept-29-2024.JPEG', caption: 'Watching her walk down the aisle' },
      { src: 'assets/valentine/wedding-day-puglia-september-29-2024/me-crying-during-wedding-sept-29-2024.PNG', caption: 'I told myself I wouldn\'t cry' },
      { src: 'assets/valentine/wedding-day-puglia-september-29-2024/victoria-wedding-day-in-dress-getting-ready.JPEG', caption: 'Getting ready' },
      { src: 'assets/valentine/wedding-day-puglia-september-29-2024/wedding-day-puglia-1.JPEG', caption: 'Puglia' },
      { src: 'assets/valentine/wedding-day-puglia-september-29-2024/wedding-day-puglia-2.JPEG', caption: 'Mr. & Mrs. Tyra' },
      { src: 'assets/valentine/My All Time Favorites of Victoria/Cooking-class-wedding-Puglia.JPEG', caption: 'Cooking class — wedding week in Puglia' },
      { src: 'assets/valentine/future-birds.jpg', caption: 'Futurebirds, November 2024' }
    ]
  },
  '2025': {
    year: '2025',
    title: 'The First Year',
    subtitle: 'Volume 8',
    description:
      'Our first full year as husband and wife. Greece for our second honeymoon — sunsets over the Aegean, seafood on the water, island hopping. Matcha runs, birthday dinners, concerts, and more passport stamps. The year we settled into forever.',
    photos: [
      { src: 'assets/valentine/Greece - second honeymoon 2025/IMG_1824.JPEG', caption: 'Greece — sunset over the Aegean' },
      { src: 'assets/valentine/Greece - second honeymoon 2025/IMG_1257.JPEG', caption: 'Greek island hilltop' },
      { src: 'assets/valentine/Greece - second honeymoon 2025/IMG_0015.jpeg', caption: 'Boarding Olympic Air' },
      { src: 'assets/valentine/2025/FullSizeRender.jpeg', caption: 'Flowers, matcha, and cookies — the good life' },
      { src: 'assets/valentine/2025/IMG_9306.jpeg', caption: 'Happy 29th Birthday' },
      { src: 'assets/valentine/2025/IMG_9505.jpeg', caption: 'Date night' },
      { src: 'assets/valentine/2025/IMG_9214.jpeg', caption: 'Concert season' },
      { src: 'assets/valentine/Fake-pregnant-ate-too-much-HILTON-HEAD.jpeg', caption: 'She ate too much at Hilton Head (not what you think)' },
      { src: 'assets/valentine/My All Time Favorites of Victoria/Pizza-picnic-rosemary-beach.jpg', caption: 'Rosemary Beach' }
    ]
  },
  '2026': {
    year: '2026',
    title: 'Happy Valentine\'s Day',
    subtitle: 'Volume 9',
    description:
      'I built you a whole app because a Hallmark card wasn\'t going to cut it. You\'re my 5-foot-nothing, Fireball-pouring, Pedialyte-at-3AM, matcha-drinking, TikTok-scrolling, Bieber-loving angel. And you somehow picked me.',
    photos: [
      { src: 'assets/valentine/Concerts throughout the years/2026-Gregory-Alan-Isakov-Philadelphia.JPEG', caption: 'Gregory Alan Isakov, Philadelphia — 2026' },
      { src: 'assets/valentine/Concerts throughout the years/rayland-baxter.JPG', caption: 'Rayland Baxter' }
    ]
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
