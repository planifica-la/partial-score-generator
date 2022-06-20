import { Component, OnInit } from '@angular/core';
import {
  doc,
  docData,
  DocumentReference,
  collectionData,
  collection,
  CollectionReference,
  query,
  where,
  Firestore,
  Timestamp
} from '@angular/fire/firestore';
import { authState, Auth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';

import { Student } from '../student';
import { Section } from '../section';
import { UserProfile } from '../user-profile';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  sections: Observable<Section[]> = of([]);
  students: Observable<Student[]> = of([]);
  account: string = '';
  expiration: Timestamp = Timestamp.now();

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    ) {
    authState(this.auth).subscribe(user => {
      if (!user) {
        return;
      }

      this.students = collectionData<Student>(
        query<Student>(
          collection(this.firestore, 'students') as CollectionReference<Student>,
          where('teacher', '==', user.uid)
          ), { idField: 'id' }
        );

      this.sections = collectionData<Section>(
        query<Section>(
          collection(this.firestore, 'sections') as CollectionReference<Section>,
          where('teacher', '==', user.uid)
          ), { idField: 'id' }
        );

      docData<UserProfile>(
        doc(this.firestore, 'users', user.uid) as DocumentReference<UserProfile>
        ).subscribe(profile => {
          this.expiration = profile.expiration;
          docData(profile.plan).subscribe(plan => {
            this.account = plan.name;
          })
        })
    })
  }

  ngOnInit(): void {
  }

}
