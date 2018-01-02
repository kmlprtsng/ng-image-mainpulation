import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import {Subscription} from 'rxjs/Subscription';

class EditableImage {
  title: string;
  src: string;
  x: number;
  y: number;
  scale: number;
  rotate: number;

  public constructor(init?: Partial<EditableImage>) {
    Object.assign(this, init);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  editableImages: EditableImage[] = [
    new EditableImage({
      title: 'Main Image',
      src: '/assets/dummy_img.png',
      x: 100,
      y: 100,
      scale: 1,
      rotate: 0
    }),
    new EditableImage({
      title: 'Sticker 1',
      src: '/assets/sticker1.png',
      x: 100,
      y: 100,
      scale: 1,
      rotate: 0
    })
  ];

  selectedImageIndex = 0;

  timerSubscription: Subscription;
  lastPosX: number = null;
  lastPosY: number = null;

  lastScale: number = null;
  startRotation: number = null;
  lastRotation: number = null;


  ngOnInit(): void {
  }

  moveUp() {
    this.editableImages[this.selectedImageIndex].y--;
  }

  moveDown() {
    this.editableImages[this.selectedImageIndex].y++;
  }

  moveLeft() {
    this.editableImages[this.selectedImageIndex].x--;
  }

  moveRight() {
    this.editableImages[this.selectedImageIndex].x++;
  }

  zoomIn() {
    this.editableImages[this.selectedImageIndex].scale += 0.025;
  }

  zoomOut() {
    this.editableImages[this.selectedImageIndex].scale -= 0.025;
  }

  rotateLeft() {
    this.editableImages[this.selectedImageIndex].rotate -= 1;
  }

  rotateRight() {
    this.editableImages[this.selectedImageIndex].rotate += 1;
  }

  startAction(action) {
    const timer = Observable.timer(0, 100);
    this.timerSubscription = timer.subscribe(() => this[action]());
  }

  stopAction() {
    this.timerSubscription.unsubscribe();
  }

  handleGestures(event) {
    event.preventDefault();
    console.log(event, event.type, event.additionalEvent);

    switch (event.type) {
      case 'rotatestart':
        this.lastScale = this.editableImages[this.selectedImageIndex].scale;
        this.lastRotation = this.editableImages[this.selectedImageIndex].rotate;
        this.startRotation = event.rotation;
        break;

      case 'rotateend':
        this.lastScale = null;
        this.lastRotation = null;
        this.startRotation = null;
        break;

      case 'rotate':
        if (!this.startRotation) { return; }
        const diff = this.startRotation - event.rotation;
        console.log('rotation diff', diff);
        this.editableImages[this.selectedImageIndex].rotate = this.lastRotation - diff;
        break;

      case 'pinch':
        if (!this.lastScale) { return; }
        this.editableImages[this.selectedImageIndex].scale =  this.lastScale * event.scale;
        break;
      case 'pinchstart':
        this.lastScale = this.editableImages[this.selectedImageIndex].scale;
        break;
      case 'pinchend':
        this.lastScale = null;
        break;

      case 'pan':
        if (!this.lastPosX) { return; }

        this.editableImages[this.selectedImageIndex].x = this.lastPosX + event.deltaX;
        this.editableImages[this.selectedImageIndex].y = this.lastPosY + event.deltaY;
        break;

      case 'panstart':
        this.lastPosX = this.editableImages[this.selectedImageIndex].x;
        this.lastPosY = this.editableImages[this.selectedImageIndex].y;
        break;

      case 'panend':
        this.lastPosX = null;
        this.lastPosY = null;
        break;
    }
  }
}
