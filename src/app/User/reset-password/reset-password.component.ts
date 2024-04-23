import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit{
  resetPasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    // Envía el formulario al servidor o realiza la lógica necesaria
    console.log(this.resetPasswordForm.value);
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');
    
    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      return { 'mismatch': true };
    }
    
    return null;
  }
}


