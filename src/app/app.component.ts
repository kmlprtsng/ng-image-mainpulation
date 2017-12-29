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

    const image = new Image();
    image.src = 'https://thetuitionteacher.com/blog/wp-content/uploads/2016/04/business-progress-graphic.jpg';

    image.onload = () => {
      image.height = 200;
      image.width = 200;
      this.ctx.drawImage(image, 0, 0, 200, 200);
    };
  }
}
