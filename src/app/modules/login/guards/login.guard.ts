import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map } from 'highcharts';
import { Observable, of, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  isAuthenticated: Observable<boolean> = of(false)

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

    console.log(this.authService.isAuthenticated());

    this.authService.isAuthenticated()
      .pipe(
        tap(valid => {
          if (valid) {
            this.router.navigateByUrl('/dashboard')
            this.isAuthenticated = of(false)
          } else {
            this.isAuthenticated = of(true)
          }
        })

      ).subscribe()

    return this.isAuthenticated

  }

}
