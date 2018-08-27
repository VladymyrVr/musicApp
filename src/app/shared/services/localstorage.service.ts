import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  set(key: string, item: any) {
    localStorage.setItem(key, JSON.stringify(item));
  }

  get(key: string ) {
    return JSON.parse(localStorage.getItem(key));
  }
}
