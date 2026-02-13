import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'as-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GreetingComponent {
  get message() {
    const now = new Date();
    const hours = now.getHours();
    const timeGreeting = hours < 12 ? 'Good Morning' : hours < 18 ? 'Good Afternoon' : 'Good Evening';
    return `${timeGreeting}, Dumpling 🥟 😘`;
  }

  get subtitle() {
    return randomLoveNote();
  }
}

function randomLoveNote(): string {
  const notes: string[] = [
    "Every love song reminds me of you",
    "You're the melody to my heart's song",
    "Our love story is my favorite playlist",
    "You make every day feel like our wedding day",
    "Mrs. Tyra, you have my whole heart",
    "September 2024 was just the beginning",
    "Forever sounds like the perfect song length with you",
    "You are my favorite duet partner for life",
  ];
  return notes[Math.floor(Math.random() * notes.length)];
}
