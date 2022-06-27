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
      this.sb.open('Password reset email sended, follow directions and login with your credentials', 'Close', { duration: 2500 }).afterDismissed().subscribe(() => {
        this.router.navigate(['/login']);
      })
    }).catch(err => {
      this.sb.open(err.message, 'Cerrar', { duration: 2500 });
      this.working = false;
    });
  }

  get emailErrors(): string {
    if (this.email.hasError('required')) {
      return 'You must supply an email';
    } else if (this.email.hasError('email')) {
      return 'This email is not valid.';
    }
    return '';
  }

}
