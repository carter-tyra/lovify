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
