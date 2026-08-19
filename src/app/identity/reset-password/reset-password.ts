import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPassword as Reset} from '../../shared/Models/ResetPassword';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Identity } from '../identity';

@Component({
  selector: 'app-reset-password',
  standalone: false,
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword implements OnInit {
  ResetValue = new Reset();
  formGroup:FormGroup
  private router = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);
  private route = inject(Router);
  private identityService = inject(Identity);
  private _toast = inject(ToastrService);
  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.ResetValue.email = params['email'];
      this.ResetValue.token = params['code'];
    });

    this.FormValidation();
  }

  FormValidation() {
    this.formGroup = this.formBuilder.group({
      password: ['',[Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirmPassword: ['',[Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }
  get _password() {
    return this.formGroup.get('password');
  }
  get _confirmPassword() {
    return this.formGroup.get('confirmPassword');
  }

  onSubmit(){
    if(this.formGroup.valid){
        this.ResetValue.password = this.formGroup.value.password;
        this.identityService.ResetPassword(this.ResetValue).subscribe({
          next: (response) => {
            this._toast.success('Password reset successfully', 'Success');
            this.formGroup.reset();
            this.route.navigate(['/Account/Login']);
          },
          error: (error) => {
            this._toast.error(error.error?.message || 'Password reset failed. Please try again.', 'Error');
          }
        });
    }
  }
}
