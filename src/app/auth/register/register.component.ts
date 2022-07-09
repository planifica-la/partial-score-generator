import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { doc, Firestore, DocumentReference, setDoc, Timestamp } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserProfile } from '../../user-profile';
import { Plan } from '../../plan';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email: UntypedFormControl = new UntypedFormControl('', Validators.email);
  password: UntypedFormControl = new UntypedFormControl('', Validators.required);
  working = false;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router,
    private sb: MatSnackBar,
    ) {
  }

  ngOnInit(): void {
  }

  register() {
    this.working = true;
    const email = this.email.value;
    const password = this.password.value;
    createUserWithEmailAndPassword(this.auth, email, password).then((cred) => {
      const expiration = Timestamp.fromMillis((Timestamp.now().seconds + 60*60*24*7) * 1000);
      setDoc<UserProfile>(doc(this.firestore, 'users', cred.user.uid) as DocumentReference<UserProfile>, {
        plan: doc(this.firestore, 'plans', 'free-plan') as DocumentReference<Plan>,
        status: 'active',
        expiration,
        phone: '',
        schoolName: ''
      }).then(async () => {
        await this.router.navigate(['/dashboard']);
      }).catch((err: any) => {
        this.sb.open(err.message, 'Cerrar', { duration: 2500 });
        this.working = false;
      });
    }).catch((err: any) => {
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
