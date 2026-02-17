import {
  Component,
  ElementRef,
  viewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
  signal,
  input,
  inject,
  DestroyRef, OnDestroy,
} from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, fromEvent } from 'rxjs';


@Component({
  selector: 'ngx-scrollbar-ultimate',
  imports: [],
  templateUrl: './ngx-scrollbar-ultimate.component.html',
  styleUrl: './ngx-scrollbar-ultimate.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxScrollbarUltimateComponent implements AfterViewInit, OnDestroy {
  readonly visibility = input<'hover' | 'always'>('always');
  protected readonly contentWrapper = viewChild<ElementRef>('contentWrapper');
  protected readonly content = viewChild<ElementRef>('content');
  protected showScroll = signal(false);
  protected scrollStyleHeight = signal(0);
  protected scrollStyleTop = signal(0);
  private resizeObserver: ResizeObserver;
  private contentPosition = 0;
  private isDragging = false;
  private topPos: number
  private normalPos: number
  private destroyRef = inject(DestroyRef);
  private wrapperObserver: ResizeObserver;

  ngAfterViewInit(): void {
    this.updateScroll();
    this.moveScroll();

    this.resizeObserver = new ResizeObserver(() => {
      this.updateScroll();
      this.moveScroll();
    });
    this.resizeObserver.observe(this.content().nativeElement);

    this.wrapperObserver = new ResizeObserver(() => {
      this.updateScroll();
      this.moveScroll();
    });
    this.wrapperObserver.observe(this.contentWrapper().nativeElement);

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

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.wrapperObserver.disconnect();
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
    const wrapper = this.contentWrapper().nativeElement;
    const containerHeight = wrapper.getBoundingClientRect().height;
    const visibleRatio = containerHeight / wrapper.scrollHeight;
    return Math.max(5, visibleRatio * containerHeight);
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
    const wrapper = this.contentWrapper().nativeElement;
    const containerHeight = wrapper.getBoundingClientRect().height;
    const scrollHeight = wrapper.scrollHeight;

    const needsScrollbar = scrollHeight > containerHeight;

    if (!this.showScroll() && needsScrollbar) {
      this.showScroll.set(true);
      this.scrollStyleHeight.set(this.calculateScrollHeight());
    } else if (this.showScroll() && !needsScrollbar) {
      this.showScroll.set(false);
    } else if (this.showScroll() && needsScrollbar) {
      this.scrollStyleHeight.set(this.calculateScrollHeight());
    }
  }
}
