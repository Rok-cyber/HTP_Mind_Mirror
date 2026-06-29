import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-percentile-position-bar',
  standalone: true,
  template: `
    <div class="space-y-2">
      <div class="flex items-center justify-between text-[11px] font-extrabold text-graphite">
        <span>{{ lowLabel }}</span>
        <span>{{ highLabel }}</span>
      </div>
      <div class="relative h-7" role="img" [attr.aria-label]="ariaLabel">
        <span class="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-ink/10"></span>
        @for (tick of ticks; track tick) {
          <span
            class="absolute top-1/2 h-3 w-px -translate-y-1/2 bg-ink/20"
            [style.left.%]="tick"
          ></span>
        }
        <span
          class="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-moss shadow-report"
          [style.left.%]="position"
        ></span>
      </div>
      @if (label) {
        <p class="text-xs font-extrabold text-moss">{{ label }}</p>
      }
    </div>
  `
})
export class PercentilePositionBarComponent {
  @Input() percentile = 0;
  @Input() label = '';
  @Input() lowLabel = 'Low';
  @Input() highLabel = 'High';
  @Input() ariaLabel = 'relative position';

  protected readonly ticks = [0, 25, 50, 75, 100];

  protected get position(): number {
    return Math.max(0, Math.min(100, Math.round(Number(this.percentile) || 0)));
  }
}
