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
