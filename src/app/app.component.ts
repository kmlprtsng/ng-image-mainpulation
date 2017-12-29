import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  x = 100;
  y = 100;
  scale = 1;
  rotate = 0;

  ngOnInit(): void {
  }

  moveUp() {
    this.y--;
  }

  moveDown() {
    this.y++;
  }

  moveLeft() {
    this.x--;
  }

  moveRight() {
    this.x++;
  }

  zoomIn() {
    this.scale += 0.025;
  }

  zoomOut() {
    this.scale -= 0.025;
  }

  rotateLeft() {
    this.rotate -= 1;
  }

  rotateRight() {
    this.rotate += 1;
  }
}
