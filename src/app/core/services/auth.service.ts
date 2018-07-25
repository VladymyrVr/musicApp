import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  setItem(item: string, value) {
    localStorage.setItem(item, JSON.parse(value));
  }

  getUserLoggedIn() {
    return JSON.parse(localStorage.getItem('userLogged'));
  }
}
