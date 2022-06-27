import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { SubjectDetailComponent } from '../subject-detail/subject-detail.component';
import {
  Firestore,
  doc,
  docData,
  deleteDoc,
  DocumentReference
} from '@angular/fire/firestore';
import { of } from 'rxjs';

import { Section } from '../../section';
import { Subject } from '../../subject';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})
export class SubjectListComponent implements OnInit {

  @Input() subjects: Subject[] | null = [];
  sections: Section[] = [];

  constructor(
    private firestore: Firestore,
    private sb: MatSnackBar,
    private dialog: MatDialog,
    ) {
    of(this.subjects).subscribe(subjects => {
      if (subjects) {
        subjects.forEach(subject => {
          docData(subject.section).subscribe(section => {
            this.sections.push(section);
          })
        })
      }
    });
  }

  ngOnInit(): void {
  }

  showDetail(id?: string) {
    if (id && this.subjects) {
      const subject = this.subjects.find(subject => subject.id === id);
      this.dialog.open(SubjectDetailComponent, {
        data: subject,
      });
    }
  }

  deleteSubject(id?: string) {
    if (id) {
      deleteDoc(
        doc(this.firestore, 'subjects', id)
        ).then(() => {
          this.sb.open('Subject delete success', 'Close', { duration: 2500 });
        })
    }
  }

  subjectSection(ref: DocumentReference<Section>) {
    return this.sections.find(s => s.id === ref.id);
  }

}
