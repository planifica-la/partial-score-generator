import { Component, OnInit, Inject } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  Firestore,
  setDoc,
  doc,
  DocumentReference,
  CollectionReference,
  collection,
  collectionData,
  query,
  where
} from '@angular/fire/firestore';
import { authState, Auth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';

import { Student } from '../../student';
import { Section } from '../../section';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent implements OnInit {

  working = false;
  sections: Observable<Section[]> = of([]);
  studentForm = this.fb.group({
    firstname: [''],
    lastname: [''],
    section: [''],
    teacher: [''],
  });

  constructor(
    private fb: UntypedFormBuilder,
    private sb: MatSnackBar,
    private firestore: Firestore,
    private auth: Auth,
    @Inject(MAT_DIALOG_DATA)
    private data: Student,
    ) {
    const { id, ...student } = this.data;
    this.studentForm.setValue(student);

    authState(this.auth).subscribe(user => {
      if (!user) {
        return;
      }
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

  updateStudent() {
    if (this.studentForm.valid && this.data.id) {
      this.working = true;
      setDoc<Student>(
        doc(this.firestore, 'students', this.data.id) as DocumentReference<Student>,
        this.studentForm.value
      ).catch(err => {
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
