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
      imageUrl: 'assets/valentine/placeholder-1.jpg',
      caption: 'Our first adventure together',
      date: 'Add your date'
    },
    {
      imageUrl: 'assets/valentine/placeholder-2.jpg',
      caption: 'The day you said yes',
      date: 'Add your date'
    },
    {
      imageUrl: 'assets/valentine/placeholder-3.jpg',
      caption: 'Our wedding day - September 2024',
      date: 'September 2024'
    },
    {
      imageUrl: 'assets/valentine/placeholder-4.jpg',
      caption: 'Our favorite moment together',
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
