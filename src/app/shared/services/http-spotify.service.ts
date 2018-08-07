import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs/index';
import { map } from 'rxjs/operators';
import { Artists } from '../models/artist';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  constructor(private http: HttpClient) {
  }

  artist = new Subject<any>();
  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${ query }`;
    const access_token = 'BQCZEwZ3A_ZLhZ4-2tQGaxlx1tFFyPdkydeL' +
      'AjzOoHshSS7KPeBD-Nu8Ww6p64rbrhKnuhsvR23WZH96-Qyng1H' +
      'Kg6uVhB8iD4bgEWrjdgFothf7KH9YaZHG7l1t5IRRv2XK' +
      'PYb_wO_cibsnrLSJ-4Odl0Ck0fuXav3nyqGtnnxRML5h3Q';
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token
    });
    return this.http.get(url, {headers});
  }

  searchArtists(artist: string): Observable<any[]> {
    if (artist.length) {
      return this.getQuery(`search?q=${ artist }&type=artist&limit=50`)
        .pipe(map(data => (data['artists'].items)
        ));
    }
    return new Observable(null);
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases?limit=50')
      .pipe(map(data => data['albums'].items));
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
      .pipe(map(data => data['tracks']));
  }

}
