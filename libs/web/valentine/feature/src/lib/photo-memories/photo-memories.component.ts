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
  memories: Memory[] = [
    {
      imageUrl: 'assets/valentine/01.jpg',
      caption: 'Where it all began',
      date: 'Add your date'
    },
    {
      imageUrl: 'assets/valentine/02.jpg',
      caption: 'Our first adventure together',
      date: 'Add your date'
    },
    {
      imageUrl: 'assets/valentine/03.jpg',
      caption: 'The moment I knew',
      date: 'Add your date'
    },
    {
      imageUrl: 'assets/valentine/04.jpg',
      caption: 'The day you said yes',
      date: 'Add your date'
    },
    {
      imageUrl: 'assets/valentine/05.jpg',
      caption: 'Our wedding day',
      date: 'September 2024'
    },
    {
      imageUrl: 'assets/valentine/06.jpg',
      caption: 'Mr. & Mrs.',
      date: 'September 2024'
    },
    {
      imageUrl: 'assets/valentine/07.jpg',
      caption: 'Building our life together',
      date: 'Add your date'
    },
    {
      imageUrl: 'assets/valentine/08.jpg',
      caption: 'My favorite person',
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
