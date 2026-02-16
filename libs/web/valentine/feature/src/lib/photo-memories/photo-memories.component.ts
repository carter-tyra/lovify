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
      layout: 'grid-2',
      photos: [
        { src: 'assets/valentine/first-memories/rizz.JPEG', caption: '#didntdisappoint #worththewait', span: 'hero' },
        { src: 'assets/valentine/first-memories/rizz02.PNG', caption: 'Peak rizz era' },
        { src: 'assets/valentine/one-of-our-first-photos-together.JPEG', caption: 'One of our first photos together' }
      ]
    },
    {
      id: 'adventures-2020',
      title: 'Us vs. The World',
      subtitle: 'Tahoe, Hilton Head, PCH Road Trip — 2020',
      layout: 'grid-3',
      photos: [
        { src: 'assets/valentine/2020 - Christmas, Laguna beach, Covid, Tahoe, Pacific Coast Highway, Atlanta, Augusta and more/Lake-Tahoe-trip.JPG', caption: 'Lake Tahoe', span: 'hero' },
        { src: 'assets/valentine/My All Time Favorites of Victoria/PCB-2020-Victoria-on-beach.jpg', caption: 'Panama City Beach' },
        { src: 'assets/valentine/2020 - Christmas, Laguna beach, Covid, Tahoe, Pacific Coast Highway, Atlanta, Augusta and more/hilton-head-sunset-victoria.jpeg', caption: 'Hilton Head sunset' },
        { src: 'assets/valentine/2020 - Christmas, Laguna beach, Covid, Tahoe, Pacific Coast Highway, Atlanta, Augusta and more/Monterey-California-Victoria.jpeg', caption: 'Monterey, California' },
        { src: 'assets/valentine/2020 - Christmas, Laguna beach, Covid, Tahoe, Pacific Coast Highway, Atlanta, Augusta and more/bday-dinner.jpeg', caption: 'Birthday dinner' },
        { src: 'assets/valentine/2020 - Christmas, Laguna beach, Covid, Tahoe, Pacific Coast Highway, Atlanta, Augusta and more/hilton-head-dinner-2.jpeg', caption: 'Hilton Head dinner' }
      ]
    },
    {
      id: 'europe-2021',
      title: 'First Stamps in the Passport',
      subtitle: 'Portugal & Dublin — 2021',
      layout: 'grid-2',
      photos: [
        { src: 'assets/valentine/2021/Dublin - December/FullSizeRender.jpeg', caption: 'Temple Bar, Dublin', span: 'hero' },
        { src: 'assets/valentine/2021/Dublin - December/IMG_8081.jpeg', caption: 'Vintage Cocktail Club' },
        { src: 'assets/valentine/Portugal - 2021 - Victoria Bday Trip - Lisbon - Lagos/IMG_7044.jpeg', caption: 'Lagos sea caves' },
        { src: 'assets/valentine/2021/Dublin - December/IMG_3235.jpeg', caption: 'Dublin cocktails' }
      ]
    },
    {
      id: 'paris-2022',
      title: 'Paris in April',
      subtitle: 'The city of love — 2022',
      layout: 'hero-grid',
      photos: [
        { src: 'assets/valentine/2022/Paris - April 2022/IMG_7252.jpeg', caption: 'Eiffel Tower at night', span: 'hero' },
        { src: 'assets/valentine/2022/Paris - April 2022/FullSizeRender.jpeg', caption: 'La Fontaine de Mars' },
        { src: 'assets/valentine/2022/Paris - April 2022/IMG_7044.jpeg', caption: 'Our kind of staircase' },
        { src: 'assets/valentine/2022/Paris - April 2022/IMG_7316.jpeg', caption: 'The Louvre' },
        { src: 'assets/valentine/2022/Paris - April 2022/IMG_7355.jpeg', caption: 'Victoria at the Louvre' }
      ]
    },
    {
      id: 'adventures-2023',
      title: 'Costa Rica, Aruba & Philly',
      subtitle: 'The year before everything changed — 2023',
      layout: 'grid-3',
      photos: [
        { src: 'assets/valentine/2023/costa-rica.jpeg', caption: 'Costa Rica sunset', span: 'hero' },
        { src: 'assets/valentine/2023/costa-rica-horse-riding.jpeg', caption: 'Horseback riding' },
        { src: 'assets/valentine/2023/aruba-victoria.jpeg', caption: 'Aruba' },
        { src: 'assets/valentine/2023/philly-victoria-eagles-jacket.jpeg', caption: 'Eagles jacket season' },
        { src: 'assets/valentine/2023/costa-rica-welcome-sign.jpeg', caption: '"Welcome, Victoria Tyra"' }
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
      id: 'venice',
      title: 'Venice',
      subtitle: 'Canals, street food & Aperol spritzes — Summer 2024',
      layout: 'grid-2',
      photos: [
        { src: 'assets/valentine/2024/Venice/IMG_1714.jpeg', caption: 'Grand Canal', span: 'hero' },
        { src: 'assets/valentine/2024/Venice/IMG_1740.jpeg', caption: 'Gondola canal' },
        { src: 'assets/valentine/2024/Venice/IMG_1845.jpeg', caption: 'Puglia coastline' }
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
        { src: 'assets/valentine/wedding-day-puglia-september-29-2024/wedding-day-puglia-4.JPEG', caption: 'The most beautiful day' },
        { src: 'assets/valentine/My All Time Favorites of Victoria/Cooking-class-wedding-Puglia.JPEG', caption: 'Cooking class — wedding week' }
      ]
    },
    {
      id: 'greece',
      title: 'Second Honeymoon',
      subtitle: 'Greece — 2025',
      layout: 'hero-grid',
      photos: [
        { src: 'assets/valentine/Greece - second honeymoon 2025/IMG_1824.JPEG', caption: 'Sunset over the Aegean', span: 'hero' },
        { src: 'assets/valentine/Greece - second honeymoon 2025/IMG_1257.JPEG', caption: 'Greek island hilltop' },
        { src: 'assets/valentine/Greece - second honeymoon 2025/IMG_0015.jpeg', caption: 'Boarding Olympic Air' }
      ]
    },
    {
      id: 'everyday',
      title: 'The Little Moments',
      subtitle: 'The ones that matter most',
      layout: 'grid-3',
      photos: [
        { src: 'assets/valentine/promotion-dinner-after-vietname-got-sick/promotion-dinner-got-sick.JPEG', caption: 'Promotion dinner — before the Pedialyte incident' },
        { src: 'assets/valentine/2025/FullSizeRender.jpeg', caption: 'Flowers, matcha & cookies' },
        { src: 'assets/valentine/2025/IMG_9306.jpeg', caption: 'Happy 29th Birthday' },
        { src: 'assets/valentine/My All Time Favorites of Victoria/Pizza-picnic-rosemary-beach.jpg', caption: 'Rosemary Beach' },
        { src: 'assets/valentine/Fake-pregnant-ate-too-much-HILTON-HEAD.jpeg', caption: 'She ate too much at Hilton Head' },
        { src: 'assets/valentine/2025/IMG_9505.jpeg', caption: 'Date night' }
      ]
    },
    {
      id: 'concerts',
      title: 'Our Concerts',
      subtitle: 'The soundtrack to us',
      layout: 'grid-2',
      photos: [
        { src: 'assets/valentine/Concerts throughout the years/rayland-baxter.JPG', caption: 'Rayland Baxter' },
        { src: 'assets/valentine/Concerts throughout the years/2026-Gregory-Alan-Isakov-Philadelphia.JPEG', caption: 'Gregory Alan Isakov, Philly 2026' },
        { src: 'assets/valentine/future-birds.jpg', caption: 'Futurebirds' }
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

  allPhotos: Photo[] = ([] as Photo[]).concat(...this.eras.map(era => era.photos));
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
