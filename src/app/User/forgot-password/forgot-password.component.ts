import { Component,OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceLoginService } from '../../Services/service-login.service';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ServiceLoginService: ServiceLoginService,
    private router: Router
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.get('email')?.value;
      this.ServiceLoginService.sendResetPasswordEmail({ Correo_Institucional_Usuario: email }).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Correo enviado',
            text: 'Se ha enviado un correo para restablecer su contraseña.',
            confirmButtonColor: '#3085d6'
          });
          this.router.navigate(['/']); // Navegar a la página principal u otra página
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al enviar el correo. Inténtelo de nuevo.',
            confirmButtonColor: '#d33'
          });
          console.error('Error al enviar el correo:', error);
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['/']); // Redirigir a la página principal o donde sea necesario
  }
}
