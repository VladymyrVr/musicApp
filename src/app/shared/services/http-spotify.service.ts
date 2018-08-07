import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs/index';
import { map } from 'rxjs/operators';
import { Artist } from '../models/artist';
import { Release } from '../models/release';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  constructor(private http: HttpClient) {
  }

  artist = new Subject<any>();
  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${ query }`;
    const access_token = 'BQBUzYa7f8hrA_OL7ZUXFZ_9-bNuOs-L1HeVVUD7tc0u3CHG7ZK' +
      'AbOK7eAItmbFAQyTUFgrMm4F1FHuSdmibhPHdNz7-6vPuWApFKRDf1h3SAgknAsc' +
      '_5qF36AJ8KxiNNCiwxftiRK_i0B1IBFr0-pDuZo76wOpjNUIXeNQqQdCMTHipVQ';
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

  getNewReleases(): Observable<Release[]> {
    return this.getQuery('browse/new-releases?limit=50')
      .pipe(map(data => data['albums'].items));
  }

  getTopTracks(id: string): Observable<Object[]> {
    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
      .pipe(map(data => data['tracks']));
  }

}
