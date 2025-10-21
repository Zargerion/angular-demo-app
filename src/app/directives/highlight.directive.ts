import { Directive, ElementRef, Input, OnInit, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective implements OnInit, OnDestroy {
  @Input() appHighlight: string = 'default';
  @Input() highlightColor: string = '#ffeb3b';
  @Input() highlightDuration: number = 2000;

  private originalBackgroundColor: string = '';
  private timeoutId: number | null = null;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.originalBackgroundColor = this.el.nativeElement.style.backgroundColor;
    this.applyHighlight();
  }

  ngOnDestroy(): void {
    this.clearHighlight();
  }

  private applyHighlight(): void {
    const colors = {
      'gold': '#ffd700',
      'silver': '#c0c0c0',
      'bronze': '#cd7f32',
      'success': '#4caf50',
      'warning': '#ff9800',
      'error': '#f44336',
      'info': '#2196f3',
      'default': this.highlightColor
    };

    const color = colors[this.appHighlight as keyof typeof colors] || this.highlightColor;
    
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'background-color 0.3s ease');

    // Автоматически убираем подсветку через указанное время
    if (this.highlightDuration > 0) {
      this.timeoutId = window.setTimeout(() => {
        this.clearHighlight();
      }, this.highlightDuration);
    }
  }

  private clearHighlight(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    
    this.renderer.setStyle(this.el.nativeElement, 'background-color', this.originalBackgroundColor);
  }
}
