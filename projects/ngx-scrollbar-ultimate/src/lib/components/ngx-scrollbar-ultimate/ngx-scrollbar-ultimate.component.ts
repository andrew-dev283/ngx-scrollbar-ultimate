import {
  Component,
  ElementRef,
  viewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
  signal,
  input,
  inject,
  DestroyRef,
} from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent} from 'rxjs';


@Component({
  selector: 'ngx-scrollbar-ultimate',
  imports: [],
  templateUrl: './ngx-scrollbar-ultimate.component.html',
  styleUrl: './ngx-scrollbar-ultimate.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxScrollbarUltimateComponent implements AfterViewInit {
  readonly visibility = input<'hover' | 'always'>('always');
  protected readonly scrollBar = viewChild<ElementRef>('scrollBar');
  protected readonly contentWrapper = viewChild<ElementRef>('contentWrapper');
  protected readonly content = viewChild<ElementRef>('content');
  protected showScroll = signal(false);
  protected scrollStyleHeight = signal(0);
  protected scrollStyleTop = signal(0);
  private resizeObserver: ResizeObserver;
  private contentPosition = 0;
  private isDragging = false;
  private topPos: number
  private scrollerHeight: number
  private normalPos: number
  private destroyRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    this.updateScroll();

    this.resizeObserver = new ResizeObserver(() => {
      this.updateScroll()
      this.moveScroll();
    });

    this.resizeObserver.observe(this.content().nativeElement);

    fromEvent(window, 'mouseup')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.stopDrag();
      });

    fromEvent(window, 'mousemove')
      .pipe(
        filter(() => this.isDragging),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((event) => {
        this.scrollContent(event as MouseEvent)
      });
  }

  protected startDrag(event: MouseEvent): void {
    this.normalPos = event.pageY;
    this.contentPosition = this.contentWrapper().nativeElement.scrollTop;
    this.isDragging = true;
  }

  protected moveScroll(): void {
    let scrollPercentage = this.contentWrapper().nativeElement.scrollTop / this.contentWrapper().nativeElement.scrollHeight;
    this.topPos = scrollPercentage * this.contentWrapper().nativeElement.clientHeight;
    this.scrollStyleTop.set(this.topPos);
  }

  private calculateScrollHeight(): number {
    let visibleRatio = this.contentWrapper().nativeElement.clientHeight / this.contentWrapper().nativeElement.scrollHeight;
    return visibleRatio * this.scrollBar().nativeElement.clientHeight;
  }

  private stopDrag(): void {
    this.isDragging = false;
  }

  private scrollContent(event: MouseEvent): void {
      let mouseDifferential = event.pageY - this.normalPos;
      let scrollEquivalent = mouseDifferential * (this.contentWrapper().nativeElement.scrollHeight / this.contentWrapper().nativeElement.clientHeight);
      this.contentWrapper().nativeElement.scrollTop = this.contentPosition + scrollEquivalent;
  }

  private updateScroll(): void {
    const contentWrapper: HTMLDivElement = this.contentWrapper().nativeElement;
    this.scrollerHeight = this.calculateScrollHeight();
    if (!this.showScroll() && this.scrollerHeight / contentWrapper.clientHeight < 1) {
      this.showScroll.set(true);
      this.scrollerHeight = this.calculateScrollHeight();
      this.scrollStyleHeight.set(this.scrollerHeight);
    } else if (this.showScroll() && this.scrollerHeight / contentWrapper.clientHeight >= 1) {
      this.showScroll.set(false);
    } else if (this.showScroll() && this.scrollerHeight / contentWrapper.clientHeight < 1) {
      this.scrollStyleHeight.set(this.scrollerHeight);
    }
  }
}
