import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'as-love-letter',
  templateUrl: './love-letter.component.html',
  styleUrls: ['./love-letter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoveLetterComponent {
  isRevealed = false;

  constructor(private cdr: ChangeDetectorRef) {}

  revealLetter() {
    this.isRevealed = true;
    this.cdr.markForCheck();
  }
}
