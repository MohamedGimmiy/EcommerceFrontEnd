import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Loading {
  RequestCount = 0;
  constructor(private _service:NgxSpinnerService) {
    
  }
  loading(){
    this._service.show('loading', {
      bdColor : "rgba(0, 0, 0, 0.8)",
      size : "medium",
       color : "#fff",
       type : "square-jelly-box",
       fullScreen : true
    });
  }
  hideLoader(){
    this._service.hide('loading');
  }
}
