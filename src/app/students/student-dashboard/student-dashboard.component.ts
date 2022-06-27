import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { StudentDetailComponent } from '../student-detail/student-detail.component';
import {
  collectionData,
  collection,
  query,
  where,
  CollectionReference,
  Firestore,
  addDoc,
  doc,
  docData,
  DocumentReference
} from '@angular/fire/firestore';
import { authState, Auth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';

import { Section } from '../../section';
import { Student } from '../../student';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {

  working = false;
  students: Observable<Student[]> = of([]);
  sections: Observable<Section[]> = of([]);
  studentForm = this.fb.group({
    firstname: [''],
    lastname: [''],
    section: [''],
    teacher: [''],
  });

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private sb: MatSnackBar,
    private fb: UntypedFormBuilder,
    private dialog: MatDialog,
    ) {
    authState(this.auth).subscribe(user => {
      if (!user) {
        return;
      }

      this.studentForm.get('teacher')?.setValue(user.uid);

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
    })
  }

  ngOnInit(): void {
  }

  addStudent() {
    if (this.studentForm.valid) {
      this.working = true;
      addDoc<Student>(
        collection(this.firestore, 'students') as CollectionReference<Student>,
        this.studentForm.value
      ).then(() => {
        this.studentForm.get('firstname')?.setValue('');
        this.studentForm.get('lastname')?.setValue('');
        this.working = false;
      }).catch(err => {
        this.sb.open(err.message, 'Close', { duration: 2500 });
        this.working = false;
      });
    }
  }

  sectionRef(section: Section) {
    if (!section.id) {
      return;
    }
    
    return doc(this.firestore, 'sections', section.id);
  }

}
