import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpSpotifyService {
  constructor(private http: HttpClient) {
  }

  private artist;


  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${ query }`;
    const access_token = 'BQDqXU4GaQoZW2Ibey6JVcgxzvIWe-oVhdwY' +
      'YkzqdInoMpF1kTOxYEcC4kodhM79CGvOwZfW' +
      'M-uu-3eLv_qwoh5ox2IdqH8cN6EaNCyhrzdvr-' +
      'YkluI27-8uZi2ff5rljKg0fHIW7WEVOd_nVS5L' +
      'D2rEFzDAUC_B1dJX2ZiyOXn3Xgdl0w';
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token
    });

    return this.http.get(url, {headers});

  }


  searchArtists(artist: string) {
    return this.getQuery(`search?q=${ artist }&type=artist&limit=15`)
      .pipe(map(data => (data['artists'].items)
      ))
      .subscribe(artists => {
        console.log(artists);
        this.artist.next(artists);
      });
  }
}
