import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  Firestore,
  setDoc,
  doc,
  DocumentReference
} from '@angular/fire/firestore';
import { Section } from '../../section';

@Component({
  selector: 'app-section-detail',
  templateUrl: './section-detail.component.html',
  styleUrls: ['./section-detail.component.scss']
})
export class SectionDetailComponent implements OnInit {

  sectionForm = this.fb.group({
    name: [''],
    section: [''],
    grade: [1],
    level: ['elementary'],
    teacher: [''],
  });
  working = false;

  constructor(
    private fb: FormBuilder,
    private sb: MatSnackBar,
    private firestore: Firestore,
    @Inject(MAT_DIALOG_DATA)
    private data: Section,
    ) {
    const { id, ...section } = this.data;
    this.sectionForm.setValue(section);
  }

  ngOnInit(): void {
  }

  updateSection() {
    if (this.sectionForm.valid && this.data.id) {
      this.working = true;
      setDoc<Section>(
        doc(this.firestore, 'sections', this.data.id) as DocumentReference<Section>,
        this.sectionForm.value
      ).catch(err => {
        this.sb.open(err.message, 'Close', { duration: 2500 });
        this.working = false;
      });
    }
  }

}
