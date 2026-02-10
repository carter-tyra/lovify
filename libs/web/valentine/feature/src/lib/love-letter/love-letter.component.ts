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
