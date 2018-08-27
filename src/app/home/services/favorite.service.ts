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
      this.addCollection(item, type, this.storage.get(type));
    } else {
      this.addCollection(item, type);
    }
  }

  addCollection(item, type, ...value) {
    const collection = new Set(...value);
    collection.add(item);
    this.storage.set(type, Array.from(collection));
  }
}


