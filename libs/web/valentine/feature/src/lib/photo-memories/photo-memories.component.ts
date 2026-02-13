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
      caption: 'The Tinder match that started it all',
      date: 'Summer 2015'
    },
    {
      imageUrl: 'assets/valentine/02.jpg',
      caption: 'Northside Tavern — the night we finally stopped making excuses',
      date: 'September 2018'
    },
    {
      imageUrl: 'assets/valentine/03.jpg',
      caption: 'My 3AM Pedialyte angel — the moment I knew',
      date: '2019'
    },
    {
      imageUrl: 'assets/valentine/04.jpg',
      caption: 'She said yes — Rittenhouse Park',
      date: 'December 2023'
    },
    {
      imageUrl: 'assets/valentine/05.jpg',
      caption: 'I cried like a BITCH — Lecce, Puglia',
      date: 'September 29, 2024'
    },
    {
      imageUrl: 'assets/valentine/06.jpg',
      caption: 'Mr. & Mrs. Tyra — allllll mine, forever',
      date: 'September 29, 2024'
    },
    {
      imageUrl: 'assets/valentine/07.jpg',
      caption: 'Traveling the world together',
      date: 'Always'
    },
    {
      imageUrl: 'assets/valentine/08.jpg',
      caption: 'My pocket-sized, Fireball-pouring, forever person',
      date: 'Every single day'
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
