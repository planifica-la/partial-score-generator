import { Component, OnInit } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user$: Observable<User | null>;

  constructor(
    private auth: Auth,
  ) {
    this.user$ = authState(this.auth);
  }

  ngOnInit(): void {
  }

  get year() {
    return new Date().getFullYear();
  }

}
