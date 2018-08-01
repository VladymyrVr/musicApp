import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {Subject} from 'rxjs/index';

import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  constructor(private http: HttpClient) {
  }

  public artist = new Subject<any>();


  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${ query }`;
    const access_token = 'BQBotQSNcPa-Ea5-0vO2HBbScK6xg0TfLQ1Ec4Hx3p6JVorj' +
      'twEeWNoS0xqWIwRNRnWhMgOMgsrDCd1Hc8C2Hhz1oafQg' +
      'CMuc1hyU27ndsBTcX9lNyRhHKYmXNqTNqmgczXgEL7FM0IfJV' +
      'T5esgxJFqhm61ShtBYWj9SqtiV-p7DWx2s4Q';
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token
    });

    return this.http.get(url, {headers});

  }


  searchArtists(artist: string): Observable<any[]> {
    return this.getQuery(`search?q=${ artist }&type=artist&limit=50`)
      .pipe(map(data => (data['artists'].items)
      ));
  }

}
