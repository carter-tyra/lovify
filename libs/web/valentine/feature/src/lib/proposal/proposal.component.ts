import { ChangeDetectionStrategy, Component, ChangeDetectorRef } from '@angular/core';
import confetti from 'canvas-confetti';

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
    const heartShape = confetti.shapeFromPath({
      path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
    });
    const colors = ['#ec4878', '#ff6987', '#ffd78c', '#ff85a2', '#ffc2d1'];

    const frame = () => {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0, y: 0.7 }, colors, shapes: [heartShape, 'circle'], scalar: 1.2 });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, colors, shapes: [heartShape, 'circle'], scalar: 1.2 });
      if (Date.now() < end) { requestAnimationFrame(frame); }
    };

    confetti({ particleCount: 100, spread: 100, origin: { y: 0.6 }, colors, shapes: [heartShape, 'circle'], scalar: 1.5 });
    frame();
  }
}
