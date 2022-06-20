import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  doc,
  docData,
  Firestore,
  Timestamp,
  DocumentReference
} from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserProfile } from '../../user-profile';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: FormControl = new FormControl('', Validators.email);
  password: FormControl = new FormControl('', Validators.required);
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

  login() {
    this.working = true;
    const email = this.email.value;
    const password = this.password.value;
    signInWithEmailAndPassword(this.auth, email, password).then((cred) => {
      // docData<UserProfile>(
      //   doc(this.firestore, 'users', cred.user.uid) as DocumentReference<UserProfile>
      //   ).subscribe(profile => {
      //   const now = Timestamp.now();
      //   if (profile.expiration.valueOf() < now.valueOf()) {
      //     signOut(this.auth);
      //   }
      // })
      this.router.navigate(['/dashboard']);
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
