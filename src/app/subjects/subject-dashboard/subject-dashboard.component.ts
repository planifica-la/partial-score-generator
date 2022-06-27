import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  collectionData,
  collection,
  query,
  where,
  CollectionReference,
  Firestore,
  addDoc,
  doc,
} from '@angular/fire/firestore';
import { authState, Auth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';

import { Section } from '../../section';
import { Subject } from '../../subject';

@Component({
  selector: 'app-subject-dashboard',
  templateUrl: './subject-dashboard.component.html',
  styleUrls: ['./subject-dashboard.component.scss']
})
export class SubjectDashboardComponent implements OnInit {

  working = false;
  subjects: Observable<Subject[]> = of([]);
  sections: Observable<Section[]> = of([]);
  subjectForm = this.fb.group({
    name: [''],
    section: [''],
    teacher: [''],
  });
  subjectsNames = [
    'spanish',
    'english',
    'french',
    'math',
    'history',
    'science',
    'art',
    'sports',
    'religion',
  ];

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private sb: MatSnackBar,
    private fb: UntypedFormBuilder,
    ) {
    authState(this.auth).subscribe(user => {
      if (!user) {
        return;
      }

      this.subjectForm.get('teacher')?.setValue(user.uid);

      this.subjects = collectionData<Subject>(
        query<Subject>(
          collection(this.firestore, 'subjects') as CollectionReference<Subject>,
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

  addSubject() {
    if (this.subjectForm.valid) {
      this.working = true;
      addDoc<Subject>(
        collection(this.firestore, 'subjects') as CollectionReference<Subject>,
        this.subjectForm.value
      ).then(() => {
        this.subjectForm.get('name')?.setValue('');
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
