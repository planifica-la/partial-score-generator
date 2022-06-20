import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { 
  Firestore,
  doc,
  docData,
  deleteDoc,
  DocumentReference,
} from '@angular/fire/firestore';
import { Section } from '../../section';
import { SectionDetailComponent } from '../section-detail/section-detail.component';

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.scss']
})
export class SectionListComponent implements OnInit {

  @Input() sections: Section[] | null = null;

  constructor(
    private dialog: MatDialog,
    private firestore: Firestore,
    private sb: MatSnackBar,
  ) {}

  ngOnInit(): void {
  }

  showDetail(id?: string) {
    if (this.sections && id) {
      const section = this.sections.find(section => section.id === id);
      if (section) {
        this.dialog.open(SectionDetailComponent, {
          data: section,
        });
      }
    }
  }

  deleteSection(id?: string) {
    if (id) {
      deleteDoc(
        doc(this.firestore, 'sections', id)
        ).then(() => {
          this.sb.open('Section delete successfull', 'Close', { duration: 2500 })
        })
    }
  }

}
