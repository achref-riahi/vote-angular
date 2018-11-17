import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import {  Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(!localStorage.getItem('token')){
        this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
        return false;
      }

      let date = new Date();
      let timestamp = (date.getTime()/1000 | 0);
      if(parseInt(localStorage.getItem('exp')) < timestamp ){
        this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
        
        return false;
      }
      return true;
    }
}
