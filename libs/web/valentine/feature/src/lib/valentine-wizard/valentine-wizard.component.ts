import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import * as canvasConfetti from 'canvas-confetti';
const confetti = (canvasConfetti as any).default || canvasConfetti;

interface TimelineMoment {
  year: string;
  title: string;
  description: string;
  imageUrl?: string;
}

interface Compliment {
  text: string;
  size: 'sm' | 'md' | 'lg' | 'xl';
  style: 'normal' | 'italic';
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

@Component({
  selector: 'as-valentine-wizard',
  templateUrl: './valentine-wizard.component.html',
  styleUrls: ['./valentine-wizard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValentineWizardComponent implements OnInit, OnDestroy {
  currentStep = 0;
  totalSteps = 4;
  isTransitioning = false;

  // Step 0: Timeline
  timeline: TimelineMoment[] = [
    { year: '2015', title: 'The Tinder Match', description: 'Summer in Atlanta. A PwC intern from Birmingham swipes right on a girl from Augusta. Three years of Snapchat flirting, near-misses, and excuses begin.', imageUrl: 'assets/valentine/one-of-our-first-photos-together.JPEG' },
    { year: '2018', title: 'Northside Tavern', description: 'September. Seven beers. Two tequila shots from Seth. An elevator to the 10th floor. "It\'s unlocked!!!" Fireball. The night we finally stopped making excuses.' },
    { year: '2019', title: '30 Heart Emojis', description: 'You texted "I love you" from out of the blue. I sweated for 3 hours and sent back 30 multicolored hearts. You were furious. I was terrified. We were in love.' },
    { year: '2023', title: 'Rittenhouse Park', description: 'December. Philadelphia. One knee. One question. One ring. The most nerve-wracking and unforgettable moment of my life — and you said yes.', imageUrl: 'assets/valentine/engagement-rittenhouse-park-december-2023/engagement-rittenhouse-1.JPEG' },
    { year: '2024', title: 'Lecce, Puglia', description: 'September 29th. Just our families. I told myself I wouldn\'t cry. I cried like a BITCH. The most beautiful angel walked down that aisle — and she was allllll mine. Forever.', imageUrl: 'assets/valentine/wedding-day-puglia-september-29-2024/me-crying-during-wedding-sept-29-2024.PNG' },
    { year: '2026', title: 'And Now...', description: 'I have something to ask you' }
  ];
  visibleMilestones = 0;
  private milestoneTimer: ReturnType<typeof setInterval> | null = null;

  // Step 1: Compliments
  compliments: Compliment[] = [
    { text: 'Ferociously loyal', size: 'lg', style: 'italic' },
    { text: 'Drop dead gorgeous', size: 'lg', style: 'normal' },
    { text: 'My 5-foot pocket-sized angel', size: 'md', style: 'italic' },
    { text: 'Stronger than anyone I know', size: 'md', style: 'normal' },
    { text: 'That infectious smile', size: 'lg', style: 'italic' },
    { text: 'Impossibly thoughtful', size: 'md', style: 'normal' },
    { text: 'More patient with me than she should be', size: 'sm', style: 'italic' },
    { text: 'Hilarious (eye roll)', size: 'md', style: 'normal' },
    { text: 'Authentically, unapologetically herself', size: 'lg', style: 'italic' },
    { text: 'My 3AM Pedialyte angel', size: 'md', style: 'italic' },
    { text: 'The most beautiful person I have ever seen', size: 'xl', style: 'italic' }
  ];
  visibleCompliments = 0;
  private complimentTimer: ReturnType<typeof setInterval> | null = null;

  // Step 2: Quiz
  quizQuestions: QuizQuestion[] = [
    {
      question: 'What did Carter accidentally text Victoria instead of Seth the morning after they first met?',
      options: [
        '"She\'s definitely an alcoholic"',
        '"It went amazing - probably spent a million dollars"',
        '"I think I\'m in love"',
        '"Seth you were right, she\'s real"'
      ],
      correctIndex: 1
    },
    {
      question: 'How did Carter respond when Victoria texted "I love you" while he was in Vietnam?',
      options: [
        'He said it back immediately',
        'He pretended he didn\'t see it',
        'About 30 multicolored heart emojis after 3 hours of sweating',
        'He called her right away'
      ],
      correctIndex: 2
    },
    {
      question: 'What was the first thing Victoria did when Carter finally showed up at her apartment on the 10th floor?',
      options: [
        'Played it cool and offered him water',
        'Gave him a big hug and poured Fireball shots',
        'Pretended she wasn\'t home',
        'Made him wait in the hallway'
      ],
      correctIndex: 1
    },
    {
      question: 'What moment made Carter know Victoria was "the one"?',
      options: [
        'Their first kiss',
        'When she said she loved him',
        'When she drove to get Pedialyte at 3AM and nursed him back to health',
        'When he saw her walk down the aisle'
      ],
      correctIndex: 2
    },
    {
      question: 'How many years did Carter and Victoria talk before actually meeting in person?',
      options: [
        '6 months',
        '1 year',
        '2 years',
        '3 years'
      ],
      correctIndex: 3
    }
  ];
  currentQuizQuestion = 0;
  selectedAnswer: number | null = null;
  quizComplete = false;

  // Step 3: Proposal
  proposalPhase: 'reveal' | 'question' | 'answered' = 'reveal';
  noButtonPosition = { top: '0px', left: '0px' };
  noMoveCount = 0;
  private revealTimer: ReturnType<typeof setTimeout> | null = null;
  private confettiInterval: ReturnType<typeof setInterval> | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.startTimeline();
  }

  ngOnDestroy() {
    this.clearAllTimers();
  }

  private clearAllTimers() {
    if (this.milestoneTimer) clearInterval(this.milestoneTimer);
    if (this.complimentTimer) clearInterval(this.complimentTimer);
    if (this.revealTimer) clearTimeout(this.revealTimer);
    if (this.confettiInterval) clearInterval(this.confettiInterval);
  }

  nextStep() {
    if (this.isTransitioning || this.currentStep >= this.totalSteps - 1) return;
    this.isTransitioning = true;
    this.cdr.markForCheck();

    setTimeout(() => {
      this.currentStep++;
      this.isTransitioning = false;
      this.cdr.markForCheck();
      this.onStepEnter();
    }, 400);
  }

  private onStepEnter() {
    if (this.currentStep === 1) {
      this.startCompliments();
    } else if (this.currentStep === 3) {
      this.startProposalReveal();
    }
  }

  // Step 0: Timeline
  private startTimeline() {
    this.visibleMilestones = 0;
    this.milestoneTimer = setInterval(() => {
      if (this.visibleMilestones < this.timeline.length) {
        this.visibleMilestones++;
        this.cdr.markForCheck();
      } else {
        if (this.milestoneTimer) clearInterval(this.milestoneTimer);
      }
    }, 600);
  }

  // Step 1: Compliments
  private startCompliments() {
    this.visibleCompliments = 0;
    this.complimentTimer = setInterval(() => {
      if (this.visibleCompliments < this.compliments.length) {
        this.visibleCompliments++;
        this.cdr.markForCheck();
      } else {
        if (this.complimentTimer) clearInterval(this.complimentTimer);
      }
    }, 500);
  }

  // Step 2: Quiz
  selectQuizAnswer(index: number) {
    if (this.selectedAnswer !== null) return;
    this.selectedAnswer = index;
    this.cdr.markForCheck();

    setTimeout(() => {
      if (this.currentQuizQuestion < this.quizQuestions.length - 1) {
        this.currentQuizQuestion++;
        this.selectedAnswer = null;
      } else {
        this.quizComplete = true;
      }
      this.cdr.markForCheck();
    }, 1200);
  }

  // Step 3: Proposal
  private startProposalReveal() {
    this.proposalPhase = 'reveal';
    this.cdr.markForCheck();

    this.revealTimer = setTimeout(() => {
      this.proposalPhase = 'question';
      this.cdr.markForCheck();
    }, 3500);
  }

  onYes() {
    this.proposalPhase = 'answered';
    this.cdr.markForCheck();
    this.launchConfetti();
  }

  onNoHover() {
    this.noMoveCount++;
    const maxOffset = 200;
    const top = Math.random() * maxOffset * 2 - maxOffset;
    const left = Math.random() * maxOffset * 2 - maxOffset;
    this.noButtonPosition = { top: `${top}px`, left: `${left}px` };
    this.cdr.markForCheck();
  }

  get noButtonText(): string {
    if (this.noMoveCount > 10) return 'Just say yes, V!';
    if (this.noMoveCount > 8) return 'I drove a U-Haul 14hrs for you!';
    if (this.noMoveCount > 5) return 'I survived the 10th floor elevator!';
    if (this.noMoveCount > 3) return 'I sent 30 heart emojis!';
    return 'No';
  }

  private launchConfetti() {
    const fire = (x: number, angle: number) => {
      confetti({
        particleCount: 80,
        angle,
        spread: 60,
        origin: { x, y: 0.65 },
        colors: ['#ec4878', '#ff6987', '#ffd78c', '#ff8da1', '#d4a574'],
        shapes: ['circle'],
        gravity: 0.8,
        scalar: 1.2
      });
    };

    fire(0.25, 60);
    fire(0.75, 120);

    let count = 0;
    this.confettiInterval = setInterval(() => {
      if (count >= 5) {
        if (this.confettiInterval) clearInterval(this.confettiInterval);
        return;
      }
      fire(0.2 + Math.random() * 0.6, 60 + Math.random() * 60);
      count++;
    }, 700);
  }
}
