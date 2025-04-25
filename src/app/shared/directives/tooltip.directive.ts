import { Directive, ElementRef, HostListener, Inject, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective {
  @Input('appTooltip') tooltipText: string = '';
  private _tooltipEl: HTMLElement | null = null;

  constructor(private _el: ElementRef, private _renderer: Renderer2){}
  @HostListener('mouseenter') onMouseEnder() {
    this.showTooltip();
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.hideTooltip();
  }

  showTooltip() {
    this._tooltipEl = this._renderer.createElement('span');
    if(this._tooltipEl){
      this._tooltipEl.innerText = this.tooltipText;
      this._renderer.addClass(this._tooltipEl, 'tooltip');
      this._renderer.appendChild(this._el.nativeElement, this._tooltipEl);
    }
  }

  hideTooltip() {
    if(this._tooltipEl){
      this._renderer.removeChild(this._el.nativeElement, this._tooltipEl);
      this._tooltipEl = null;
    }
  }
}
