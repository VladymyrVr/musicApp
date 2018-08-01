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
    const access_token = 'BQDG0IqJl4Th2v51OzgjNFx0xPXV6PODBiKoexVb_5lUO0nmEcCuCBj4FTiQflAiMmfKRIPyoGfdn9a1TkFC1OIK-V0LLXLybvdSg8hr7m38jH-1erbPitUA2a4a_F9swwESZVrdyXO5lNPQGSkeuYCEPpzCm9P0oY7kOYhzL45LcrsqsA';
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token
    });

    return this.http.get(url, {headers});

  }


  searchArtists(artist: string): Observable<any[]> {
    return this.getQuery(`search?q=${ artist }&type=artist&limit=15`)
      .pipe(map(data => (data['artists'].items)
      ));
  }

}
