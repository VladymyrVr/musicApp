import { Injectable } from '@angular/core';
import { LocalstorageService } from '../../shared/services/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  constructor(private storage: LocalstorageService) {
  }

  addToFavorite(item: string, type: string) {
    this.checkCollection(item, type);
  }

  checkCollection(item, type) {
    if (this.storage.get(type)) {
      this.editCollection(item, type, this.storage.get(type));
    } else {
      this.editCollection(item, type);
    }
  }

  editCollection(item, type, ...value) {
    const collection = new Set(...value);
    if (collection.has(item)) {
      collection.delete(item);
    } else {
      collection.add(item);
    }
    this.storage.set(type, Array.from(collection));
  }

  newCollection(item: string): boolean {
    if (this.storage.get('artists') ? this.storage.get('artists').includes(item) : false) {
      return true;
    } else if (this.storage.get('tracks') ? this.storage.get('tracks').includes(item) : false) {
      return true;
    } else {
      return false;
    }
  }
}


