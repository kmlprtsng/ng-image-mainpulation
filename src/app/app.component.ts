import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
}
