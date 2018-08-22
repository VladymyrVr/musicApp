import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { LocalstorageService } from './shared/services/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private storage: LocalstorageService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.storage.get('userLogged')) {
      this.router.navigate(['login']);
    } else {
      return true;
    }

  }
}
