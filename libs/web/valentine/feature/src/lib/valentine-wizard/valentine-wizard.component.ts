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
    { year: '20XX', title: 'The Beginning', description: 'The day our story started — replace with your date' },
    { year: '20XX', title: 'Our First Adventure', description: 'Replace with your memory' },
    { year: '2024', title: 'Forever Begins', description: 'Our wedding day — the best day of my life' },
    { year: '2025', title: 'Building Our Life', description: 'Every day with you is an adventure' },
    { year: '2026', title: 'And Now...', description: 'I have something to ask you' }
  ];
  visibleMilestones = 0;
  private milestoneTimer: ReturnType<typeof setInterval> | null = null;

  // Step 1: Compliments
  compliments: Compliment[] = [
    { text: 'Your laugh', size: 'lg', style: 'italic' },
    { text: 'The way you see the world', size: 'md', style: 'normal' },
    { text: 'Your kindness', size: 'lg', style: 'normal' },
    { text: 'How you make every day better', size: 'sm', style: 'italic' },
    { text: 'Your beautiful heart', size: 'md', style: 'italic' },
    { text: 'Your strength', size: 'md', style: 'normal' },
    { text: 'The way you love', size: 'lg', style: 'italic' },
    { text: 'Everything about you', size: 'xl', style: 'italic' }
  ];
  visibleCompliments = 0;
  private complimentTimer: ReturnType<typeof setInterval> | null = null;

  // Step 2: Quiz
  quizQuestions: QuizQuestion[] = [
    {
      question: 'What\'s our song?',
      options: ['Replace with option A', 'Replace with your song', 'Replace with option C'],
      correctIndex: 1
    },
    {
      question: 'Where was our first date?',
      options: ['Replace with option A', 'Replace with option B', 'Replace with the answer'],
      correctIndex: 2
    },
    {
      question: 'What did I know from the moment I met you?',
      options: [
        'That you had great taste in music',
        'That I wanted to spend forever with you',
        'That you were trouble'
      ],
      correctIndex: 1
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
    if (this.noMoveCount > 8) return 'Give up!';
    if (this.noMoveCount > 5) return 'Nope!';
    if (this.noMoveCount > 3) return 'Not happening';
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
