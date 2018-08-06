import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs/index';
import { map } from 'rxjs/operators';
import { Artists } from '../models/artists';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  constructor(private http: HttpClient) {
  }

  artist = new Subject<any>();
  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${ query }`;
    const access_token = 'BQCFCa_k1GulGS-_wQ68PKyRK9RxNZbWoLy13nrO_dJ0dPv' +
      'DDh89I2RAQ6WNcCESKFOTclfS2kJTRDI3DAcAGo0O-p49jnf3LsZ5xrJ' +
      'HFq15aXpPjo8OazArev2qdxZXZXbcrSxAJKtmbHxnpeqDN8rbyoSgHnUarG7JmRleJZdUICgB8g';
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
