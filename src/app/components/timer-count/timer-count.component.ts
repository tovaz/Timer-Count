import { Component, Output, EventEmitter } from '@angular/core';
export enum statusType { start, pause, stop }

@Component({
  selector: 'app-timer-count',
  templateUrl: './timer-count.component.html',
  styleUrls: ['./timer-count.component.scss'],
})

export class TimerCountComponent {
  private status: statusType = statusType.stop;
  private maxTime = 0; 
  private minTime = 0;
  private _countDown = false;
  private time: any = 0;
  public h = '00'; m = '00'; s = '00';

  @Output()
  public onCountEnd = new EventEmitter<boolean>();

  constructor() {   }

  private async count(){
    const wait = (ms) => new Promise(r => setTimeout(r, ms));
    await wait(1000);
    
    if (this.status == statusType.start){
      this.setTime(this._countDown ? this.time - 1: this.time + 1); //Add or subtrac if is countDown true
      this.count();
    }
  }

  public async countTo(h:number, m:number, s:number){
    this._countDown = false;
    this.minTime = (h*3600) + (m*60) + s;
    this.setTime(0);
    return this;
  }

  public async countDown(h:number, m:number, s:number){
    this._countDown = true;
    this.maxTime = (h*3600) + (m*60) + s;
    this.setTime(this.maxTime);
    return this;
  }

  public async start(){
    this.status = statusType.start;
    this.count();
  }

  public async pause(){
    this.status = statusType.pause;
  }

  public async stop(){
    this.status = statusType.stop;
    this.time = this.countDown ? this.maxTime: 0; // If  countDown then reset time to maxTime
    this.formatTime(this.time);
  }

  public async setStatus(_status:statusType){
    this.status = _status;
  }

  public async getStatus(){
    return(this.status);
  }

  public async setTime(seconds : number = 0){
    if ( (this.countDown && seconds == this.minTime)  //If seconds == maxTime or minTime 
      || (!this.countDown && seconds == this.maxTime) ){ //then stop status
        this.setStatus(statusType.stop);
        this.onCountEnd.emit(true);
    }

    this.time = seconds;
    this.formatTime(seconds);
    
    return this;
  }

  private formatTime(sec){
    let h: any = Math.floor(sec/3600);
    (h >= 1) ? sec = sec - (h*3600) : h = '00';
    
    let m: any = Math.floor(sec/60);
    (m >= 1) ? sec = sec - (m*60) : m = '00';
    (sec < 1) ? sec = '00' : void 0;

    (h.toString().length == 1) ? this.h = '0'+ h : this.h = h;    
    (m.toString().length == 1) ? this.m = '0'+ m : this.m = m;    
    (sec.toString().length == 1) ? this.s = '0'+sec : this.s = sec; 
  }
}

