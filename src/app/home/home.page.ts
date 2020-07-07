import { Component, ViewChild, OnInit } from '@angular/core';
import { TimerCountComponent } from '../components/timer-count/timer-count.component';
import { ActivityTrackerService } from './../services/activity-tracker.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  @ViewChild ('time', {static: false}) timer: TimerCountComponent;
  constructor(public actTracker: ActivityTrackerService) {}

  ngAfterViewInit() {
    //this.timer.countTo(0,1,0); //Can you test with this functions
    //this.timer.countDown(0,0,5);
  }

  ngOnInit() {
    
  }

  accion(status){
    if (status == 'start') this.timer.start();
    if (status == 'stop') this.timer.stop();
    if (status == 'pause') this.timer.pause();
  }

  countEnd(value){ //Triger Event for countEnd for TO and DOWN counts .
    console.log(value);
  }

  onSubmit(form){
    console.log(form);
    //this.actService.saveActivity(form)
  }
}
