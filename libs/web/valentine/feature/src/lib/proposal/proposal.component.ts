import { ChangeDetectionStrategy, Component, ChangeDetectorRef } from '@angular/core';
import * as canvasConfetti from 'canvas-confetti';

const confetti = (canvasConfetti as any).default || canvasConfetti;

@Component({
  selector: 'as-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProposalComponent {
  state: 'question' | 'answered' = 'question';
  noButtonPosition = { top: '0px', left: '0px' };
  noMoveCount = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  onYes() {
    this.state = 'answered';
    this.cdr.markForCheck();
    this.launchConfetti();
  }

  onNoHover() {
    this.noMoveCount++;
    const maxX = 250;
    const maxY = 150;
    const randomX = Math.floor(Math.random() * maxX * 2) - maxX;
    const randomY = Math.floor(Math.random() * maxY * 2) - maxY;
    this.noButtonPosition = {
      top: `${randomY}px`,
      left: `${randomX}px`
    };
    this.cdr.markForCheck();
  }

  private launchConfetti() {
    const duration = 5000;
    const end = Date.now() + duration;
    const colors = ['#ec4878', '#ff6987', '#ffd78c', '#ff85a2', '#ffc2d1'];

    const frame = () => {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0, y: 0.7 }, colors, shapes: ['circle'], scalar: 1.2 });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, colors, shapes: ['circle'], scalar: 1.2 });
      if (Date.now() < end) { requestAnimationFrame(frame); }
    };

    confetti({ particleCount: 100, spread: 100, origin: { y: 0.6 }, colors, shapes: ['circle'], scalar: 1.5 });
    frame();
  }
}
