import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { SectionDetailComponent } from '../section-detail/section-detail.component';
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
import { Observable, of, tap } from 'rxjs';

import { Section } from '../../section';

@Component({
  selector: 'app-section-dashboard',
  templateUrl: './section-dashboard.component.html',
  styleUrls: ['./section-dashboard.component.scss']
})
export class SectionDashboardComponent implements OnInit {

  working = false;
  sections: Observable<Section[]> = of([]);
  sectionForm = this.fb.group({
    name: [''],
    section: [''],
    grade: [1],
    level: ['elementary'],
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

      this.sectionForm.get('teacher')?.setValue(user.uid);

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

  addSection() {
    if (this.sectionForm.valid) {
      this.working = true;
      addDoc<Section>(
        collection(this.firestore, 'sections') as CollectionReference<Section>,
        this.sectionForm.value
      ).then(() => {
        this.sectionForm.get('name')?.setValue('');
        this.sectionForm.get('section')?.setValue('');
        this.sectionForm.get('grade')?.setValue(1);
        this.sectionForm.get('level')?.setValue('elementary');
        this.working = false;
      }).catch(err => {
        this.sb.open(err.message, 'Close', { duration: 2500 });
        this.working = false;
      });
    }
  }

}
