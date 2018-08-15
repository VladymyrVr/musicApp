import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, forkJoin } from 'rxjs/index';
import { map } from 'rxjs/operators';
import { Artist } from '../models/artist';
import { Release } from '../models/release';
import { Playlist } from '../models/playlist';
import { ItemCategories } from '../models/item-categories';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  constructor(private http: HttpClient) {
  }

  artist = new Subject<Artist[]>();

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${ query }`;
    const access_token = 'BQA77EOH7HnszZ0V-HWORncKUkXTiVHeqlZ5WFr1d' +
      'WmL_i1dbb5s0RLe00P-amXxZ678FQzo38NSsIwzTnbiTg9Ph_iktR-U' +
      'OBpSZguUgOkhF_w-WA62N0I2Zx7ebEhBYRPup0fAlyoBdqAgyyw' +
      '3W6-QfL6s-tyKR-KKlDFqu5dYZRjv6A';
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token
    });
    return this.http.get(url, {headers});
  }

  searchArtists(artist: string): Observable<Artist[]> {
    if (artist.length) {
      return this.getQuery(`search?q=${ artist }&type=artist&limit=50`)
        .pipe(map(data => (data['artists'].items)
        ));
    }
    return new Observable(null);
  }

  getMainData() {
    return forkJoin(this.getNewReleases(), this.getRecommendations(), this.getCategories());
  }

  getNewReleases(): Observable<Release[]> {
    return this.getQuery('browse/new-releases?limit=50')
      .pipe(map(data => data['albums'].items));
  }

  getCategories(): Observable<ItemCategories[]> {
    return this.getQuery('browse/categories?country=US&limit=50')
      .pipe(map(data => data['categories'].items));
  }

  getRecommendations(): Observable<Playlist> {
    return <Observable<Playlist>>this.getQuery(`browse/featured-playlists?country=US&timestamp=
    ${new Date().toISOString().slice(0, 19)}&offset=0&limit=50`)
      .pipe(map(data => {
        return data;
      }));
  }

}
