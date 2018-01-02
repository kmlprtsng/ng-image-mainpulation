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
  lastPosX = this.x;
  lastPosY = this.y;

  loggedEvent;

  lastScale: number = null;
  startRotation: number = null;
  lastRotation: number = null;


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

  pan(event) {
    event.preventDefault();
    console.log(event, event.type, event.additionalEvent);

    switch (event.type) {
      case 'rotatestart':
        this.lastScale = this.scale;
        this.lastRotation = this.rotate;
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
        this.rotate = this.lastRotation - diff;
        break;

      case 'pinch':
        if (!this.lastScale) { return;}
        this.scale =  this.lastScale * event.scale;
        break;
      case 'pinchstart':
        this.lastScale = this.scale;
        break;
      case 'pinchend':
        this.lastScale = null;
        break;

      case 'pan':
        this.x = this.lastPosX + event.deltaX;
        this.y = this.lastPosY + event.deltaY;
        break;

      case 'panend':
        this.lastPosX = this.x;
        this.lastPosY = this.y;
        break;
    }
  }
}
