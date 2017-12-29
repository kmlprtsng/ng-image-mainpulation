import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  @ViewChild('canvas') canvas: ElementRef;
  private ctx: CanvasRenderingContext2D;

  ngOnInit(): void {
    const canvasElm = this.canvas.nativeElement;
    canvasElm.width = 200;
    canvasElm.height = 200;

    this.ctx = canvasElm.getContext('2d');
    this.ctx.fillStyle = 'e2e2e2';
    this.ctx.fillRect(0, 0, 200, 200);
    // let image = new Image();

  }
}
