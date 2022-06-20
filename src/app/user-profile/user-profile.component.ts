import { Component, OnInit } from '@angular/core';
import { authState, Auth, User } from '@angular/fire/auth';
import { doc, docData, DocumentReference, Firestore } from '@angular/fire/firestore';
import { EMPTY, Observable, tap } from 'rxjs';

import { UserProfile } from '../user-profile';
import { Plan } from '../plan';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user$: Observable<User | null> = EMPTY;
  profile$: Observable<UserProfile | null> = EMPTY;
  plan: Observable<Plan | null> = EMPTY;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    ) {
    this.user$ = authState(this.auth).pipe(tap(user => {
      if (!user) {
        return;
      }

      this.profile$ = docData<UserProfile>(
        doc(this.firestore, 'users', user.uid) as DocumentReference<UserProfile>
        ).pipe(tap(p => this.plan = docData<Plan>(p.plan as DocumentReference<Plan>)));
    }));
  }

  ngOnInit(): void {
  }

}
