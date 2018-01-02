import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import {Subscription} from 'rxjs/Subscription';

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
  timerSubscription: Subscription;
  hasPanStarted = false;
  startX = this.x;
  startY = this.y;

  hasScaleStarted = false;
  startScale = this.scale;

  loggedEvent;

  hasRotateStarted = false;
  startRotate = this.rotate;

  PAN_ACTION = { left: 'panleft', right: 'panright', up: 'panup', down: 'pandown' };

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

  startAction(action) {
    const timer = Observable.timer(0, 100);
    this.timerSubscription = timer.subscribe(() => this[action]());
  }

  stopAction() {
    this.timerSubscription.unsubscribe();
  }

  togglePan(hasPanStarted) {
    this.hasPanStarted = hasPanStarted;
    this.startX = this.x;
    this.startY = this.y;
  }

  pan(event) {
    if (!this.hasPanStarted) { return; }

    switch (event.additionalEvent) {
      case this.PAN_ACTION.left:
      case this.PAN_ACTION.right:
      case this.PAN_ACTION.up:
      case this.PAN_ACTION.down:
        this.x = this.startX + event.deltaX;
        this.y = this.startY + event.deltaY;
        break;
    }
  }

  pinch(event) {
    if (!this.hasScaleStarted) { return; }

    switch (event.additionalEvent) {
      case 'pinchin':
      case 'pinchout':
        this.scale = this.startScale * event.scale;
        // this.rotate = this.startRotate + event.rotation;
        break;
    }

    this.loggedEvent = `Scale: ${event.scale}, Distance: ${event.distance}, rotation: ${event.rotation}`;
  }

  togglePinch(hasPinchStarted) {
    this.hasScaleStarted = hasPinchStarted;
    this.startScale = this.scale;
  }

  toggleRotate(hasRotateStarted) {
    this.hasRotateStarted = hasRotateStarted;
    this.startRotate = this.rotate;
  }

  rotateImage(event) {
    if (!this.hasRotateStarted) { return; }

    this.rotate = this.startRotate + event.rotation;
  }
}
