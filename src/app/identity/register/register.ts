import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Identity } from '../identity';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit {
  formGroup:FormGroup
  successMessage = ''
  errorMessage = ''
  constructor(
    private fb: FormBuilder, 
    private identityService: Identity, 
    private toast: ToastrService,
    private route: Router
  ) { }

  ngOnInit(){
    this.formValidation();
  }

  formValidation(){
    this.formGroup = this.fb.group({
      UserName: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      DisplayName: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
    });
  }

  get _username(){
    return this.formGroup.get('UserName');
  }
  get _email(){
    return this.formGroup.get('email');
  }
  get _displayname(){
    return this.formGroup.get('DisplayName');
  }
  get _password(){
    return this.formGroup.get('password');
  }

  onSubmit(){
    this.successMessage = ''
    this.errorMessage = ''
    if(this.formGroup.valid){
      this.identityService.register(this.formGroup.value).subscribe({
        next: (response) => {
          this.toast.success('Registration successful', 'Success');
          this.formGroup.reset()
          this.route.navigate(['/Account/Login']);
        },
        error: (error) => {
          this.toast.error(error.error?.message || 'Registration failed. Please try again.', 'Error');
        }
      });
    }
  }
}
