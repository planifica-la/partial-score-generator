import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Auth, authState, signOut, User } from '@angular/fire/auth';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    user$: Observable<User | null>;

    constructor(
      private breakpointObserver: BreakpointObserver,
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
