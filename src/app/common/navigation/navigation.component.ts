import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, authState, signOut, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  user$: Observable<User | null>;

  constructor(
    private auth: Auth,
    private router: Router,
    ) {
    this.user$ = authState(this.auth);
  }

  ngOnInit(): void {
  }

  logout() {
    signOut(this.auth).then(() => {
      this.router.navigate(['/auth', 'login']);
    })
  }

}
