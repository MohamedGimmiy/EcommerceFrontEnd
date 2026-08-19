import { Component } from '@angular/core';
import { ActiveAccount } from '../../shared/Models/ActiveAccount';
import { ActivatedRoute, Router } from '@angular/router';
import { Identity } from '../identity';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-active',
  standalone: false,
  templateUrl: './active.html',
  styleUrl: './active.scss',
})
export class Active {
  activeParam = new ActiveAccount();

  constructor(
    private router: ActivatedRoute, 
    private _service: Identity, 
    private _toast: ToastrService,
    private route:Router) { }
  

  ngAfterViewInit() {
    this.router.queryParams.subscribe(params => {
      this.activeParam.email = params['email'];
      this.activeParam.token = params['code'];
    });

    this._service.active(this.activeParam).subscribe({
      next: (response) => {
        this._toast.success('Account activated successfully', 'Success');
        this.route.navigate(['/Account/Login']);},
      error: (error) => {
        this._toast.error(error.error?.message || 'Account activation failed. Please try again.', 'Error');
      }
    });
  }

}
