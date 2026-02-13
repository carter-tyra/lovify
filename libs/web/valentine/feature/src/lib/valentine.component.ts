import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'as-valentine',
  templateUrl: './valentine.component.html',
  styleUrls: ['./valentine.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValentineComponent {
  currentSection: 'letter' | 'photos' | 'wizard' = 'letter';
  isTransitioning = false;

  constructor(private cdr: ChangeDetectorRef) {}

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
}
