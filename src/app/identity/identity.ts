import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ActiveAccount } from '../shared/Models/ActiveAccount';
import { ResetPassword } from '../shared/Models/ResetPassword';

@Injectable({
  providedIn: 'root',
})
export class Identity {
  private http = inject(HttpClient);
  baseURL = environment.baseURL;
  register(formData: any) {
    return this.http.post(this.baseURL + 'Account/register', formData);
  }

  active(param: ActiveAccount) {
    return this.http.post(this.baseURL + 'Account/active-account', param);
  }

  Login(formData: any) {
    return this.http.post(this.baseURL + 'Account/Login', formData);
  }

  forgetPassword(email:string){
    return this.http.get(this.baseURL + 'Account/send-email-forget-password?email=' + email);
  }

  ResetPassword(param:ResetPassword){
    return this.http.post(this.baseURL + 'Account/reset-password', param);
  }
}
