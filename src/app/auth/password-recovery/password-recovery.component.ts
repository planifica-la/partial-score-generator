import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {

  email: UntypedFormControl = new UntypedFormControl('', Validators.email);
  working = false;

  constructor(
    private auth: Auth,
    private router: Router,
    private sb: MatSnackBar,
    ) {
  }

  ngOnInit(): void {
  }

  reset() {
    this.working = true;
    const email = this.email.value;
    sendPasswordResetEmail(this.auth, email).then(() => {
      this.sb.open('Email enviado, sigue las instrucciones e inicia sesion', 'Cerrar', { duration: 2500 }).afterDismissed().subscribe(() => {
        this.router.navigate(['/login']);
      })
    }).catch(err => {
      this.sb.open(err.message, 'Cerrar', { duration: 2500 });
      this.working = false;
    });
  }

  get emailErrors(): string {
    if (this.email.hasError('required')) {
      return 'Tienes que ingresar un email';
    } else if (this.email.hasError('email')) {
      return 'Este email no es valido.';
    }
    return '';
  }

}
