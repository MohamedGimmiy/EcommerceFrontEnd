import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Identity } from '../identity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  formGroup: FormGroup
  showModal = false
  modalTitle = ''
  modalMessage = ''
  modalType: 'success' | 'error' = 'error'
  showForgetModal = false
  forgetEmail = ''
  forgetSending = false

  constructor(
    private fb: FormBuilder, 
    private service: Identity,
    private route: Router
  ) { }

  ngOnInit() {
    this.FormValidation();
  }

  FormValidation() {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]]
    });
  }

  get _email() {
    return this.formGroup.get('email');
  }

  get _password() {
    return this.formGroup.get('password');
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.service.Login(this.formGroup.value).subscribe({
        next: (response) => {
          this.modalType = 'success'
          this.modalTitle = 'Success'
          this.modalMessage = 'Login successful! Welcome back.'
          this.showModal = true
          this.formGroup.reset()
          this.route.navigate(['/'])

        },
        error: (error) => {
          this.modalType = 'error'
          this.modalTitle = 'Login Failed'
          this.modalMessage = error.error?.message || 'Invalid email or password. Please try again.'
          this.showModal = true
        }
      });
    }
  }

  closeModal() {
    this.showModal = false
  }

  openForgetModal() {
    this.forgetEmail = ''
    this.showForgetModal = true
  }

  closeForgetModal() {
    this.showForgetModal = false
  }

  sendForgetPassword() {
    if (!this.forgetEmail) return
    this.forgetSending = true
    this.service.forgetPassword(this.forgetEmail).subscribe({
      next: () => {
        this.modalType = 'success'
        this.modalTitle = 'Email Sent'
        this.modalMessage = 'Check your email for the password reset link.'
        this.showForgetModal = false
        this.showModal = true
        this.forgetSending = false
      },
      error: (error) => {
        this.modalType = 'error'
        this.modalTitle = 'Error'
        this.modalMessage = error.error?.message || 'Failed to send reset email. Please try again.'
        this.showForgetModal = false
        this.showModal = true
        this.forgetSending = false
      }
    });
  }
}
