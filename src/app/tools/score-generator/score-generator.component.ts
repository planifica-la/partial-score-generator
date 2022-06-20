import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import {
  setDoc,
  doc,
  Firestore,
  DocumentReference
} from '@angular/fire/firestore';
import { authState, Auth } from '@angular/fire/auth';

interface Score {
  id: number;
  indicator: string;
  value: number;
}

@Component({
  selector: 'app-score-generator',
  templateUrl: './score-generator.component.html',
  styleUrls: ['./score-generator.component.scss']
})
export class ScoreGeneratorComponent implements OnInit {

  indicators: FormControl = new FormControl(8, Validators.required);
  margin: FormControl = new FormControl(4, Validators.required);
  average: FormControl = new FormControl(85, Validators.required);

  @ViewChild(MatTable) table!: MatTable<Score>;

  displayedColumns: string[] = ['#', 'indicator', 'value'];
  scores: Score[] = [];
  margins: number[] = [];

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    ) {
    // authState(this.auth).subscribe(user => {
    //   if (!user) {
    //     return;
    //   }

    //   const ref = doc(this.firestore, 'users', user.uid) as DocumentReference<UserProfile>;
    //   docData<UserProfile>(ref).subscribe(profile => {
    //     if (profile.)
    //   })
    // })
  }

  ngOnInit(): void {
  }

  generateScore(up: boolean) {
    const average = +this.average.value;
    const margin = this.margins.pop();
    if (margin) {
      return up ? average + margin : average - margin;
    }
    return average;
  }

  generateScores() {
    this.scores = [];
    const indicators = this.indicators.value;
    const minorFirst = Math.floor(Math.random()) === 0;
    this.margins = [];
    for (let i = 0; i < indicators / 2; i++) {
      const margin = Math.floor(Math.random() * +this.margin.value);
      this.margins.push(margin);
      this.margins.push(margin);
    }
    if (indicators % 2 !== 0) {
      this.margins.push(0);
    }
    for(let i = 0; i < indicators; i++) {
      const score: Score = {
        id: i + 1,
        indicator: `Indicator ${i + 1}`,
        value: this.generateScore(i % 2 === 0)
      };
      this.scores.push(score);
    }
    this.table.renderRows();
  }

}
