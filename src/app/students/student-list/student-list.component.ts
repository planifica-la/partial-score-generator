import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { StudentDetailComponent } from '../student-detail/student-detail.component';
import {
  Firestore,
  doc,
  docData,
  deleteDoc,
  DocumentReference
} from '@angular/fire/firestore';

import { Section } from '../../section';
import { Student } from '../../student';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  @Input() students: Student[] | null = [];

  constructor(
    private firestore: Firestore,
    private sb: MatSnackBar,
    private dialog: MatDialog,
    ) { }

  ngOnInit(): void {
  }

  showDetail(id?: string) {
    if (id && this.students) {
      const student = this.students.find(student => student.id === id);
      this.dialog.open(StudentDetailComponent, {
        data: student,
      });
    }
  }

  deleteStudent(id?: string) {
    if (id) {
      deleteDoc(
        doc(this.firestore, 'students', id)
        ).then(() => {
          this.sb.open('Student delete success', 'Close', { duration: 2500 });
        })
    }
  }

  studentSection(ref: DocumentReference<Section>) {
    return docData<Section>(ref);
  }

}
