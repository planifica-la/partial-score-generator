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

import { Subject } from '../../subject';
import { Section } from '../../section';

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.scss']
})
export class SubjectDetailComponent implements OnInit {

  working = false;
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
    private fb: UntypedFormBuilder,
    private sb: MatSnackBar,
    private firestore: Firestore,
    private auth: Auth,
    @Inject(MAT_DIALOG_DATA)
    private data: Subject,
    ) {
    const { id, ...subject } = this.data;
    this.subjectForm.setValue(subject);

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

  updateSubject() {
    if (this.subjectForm.valid && this.data.id) {
      this.working = true;
      setDoc<Subject>(
        doc(this.firestore, 'subjects', this.data.id) as DocumentReference<Subject>,
        this.subjectForm.value
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
