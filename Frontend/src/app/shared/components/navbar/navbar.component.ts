import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  isLogged?: boolean;

  constructor(private token: TokenService, private router: Router) {}

  ngOnInit(): void {
    this.token.isLogged
      .pipe(takeUntil(this.destroy$))
      .subscribe((log: boolean) => {
        this.isLogged = log;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  logOut(): void {
    this.token.removeToken();
    this.router.navigate(['/']);
  }
}
