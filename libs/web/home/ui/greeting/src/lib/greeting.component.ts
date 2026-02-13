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
    'Still thinking about that elevator ride to the 10th floor',
    'Mrs. Tyra, you have my whole heart — and my Venmo',
    'September 29, 2024 was just the beginning',
    'You poured Fireball shots and I knew you were the one',
    'From Tinder to forever. What a playlist.',
    '3 years of excuses, a lifetime of us',
    'My 5-foot angel (fine... 5\'1")',
    'I\'d drive that U-Haul 14 hours again tomorrow',
    'Still can\'t believe I texted you instead of Seth',
    'Puglia sunset, your white dress, me crying like a BITCH',
    'You + me + iced matcha + doom scrolling = perfect day',
    'Ferociously loyal. Impossibly gorgeous. Allllll mine.',
    'Every love song reminds me of Northside Tavern',
    '30 heart emojis wasn\'t enough. Neither is forever.',
  ];
  return notes[Math.floor(Math.random() * notes.length)];
}
