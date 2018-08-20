import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, forkJoin } from 'rxjs/index';
import { map } from 'rxjs/operators';
import { Artist } from '../models/artist';
import { Release } from '../models/release';
import { Playlist } from '../models/playlist';
import { ItemCategories } from '../models/item-categories';
import { ItemPlaylist } from '../models/item-playlist';
import { TrackItem } from '../models/track-item';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  constructor(private http: HttpClient) {
  }

  artist = new Subject<Artist[]>();

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${ query }`;
    const access_token = 'BQCYCxcePsN5H2zKGSz9KqDu-dHbdFhCIBwS8U8qH' +
      'pJWqb9PsHwJp7Dw163mkWM1gGGTgkoNr8SYJ-HOJ3BYD4KQp4MZbq2FWhdF-7Bdk-oZAOC6wzKxdtU_Qp80wTdWjThuYYb_pwPPHV_3vb4g5vmRYlBduNdNY8EXHlif25-AEsd34w';
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

  getMainData(): Observable<[Release[], Playlist, ItemCategories[] ]> {
    return forkJoin(this.getNewReleases(), this.getRecommendations(), this.getCategories());
  }

  getNewReleases(): Observable<Release[]> {
    return this.getQuery('browse/new-releases?country=US&limit=50')
      .pipe(map(data => data['albums'].items));
  }

  getCategories(): Observable<ItemCategories[]> {
    return this.getQuery('browse/categories?country=US&limit=50')
      .pipe(map(data => data['categories'].items));
  }

  getCategoriesPlaylist(id: string): Observable<ItemPlaylist[]> {
    return this.getQuery(`browse/categories/${id}/playlists?limit=50`)
      .pipe(map(data => data['playlists'].items));
  }

  getPlaylistsTracks(id: string): Observable<TrackItem[]> {
    return this.getQuery(`users/spotify/playlists/${id}/tracks`)
      .pipe(map(data => {
        return data['items'];
      }));
  }

  getRecommendations(): Observable<Playlist> {
    return <Observable<Playlist>>this.getQuery(`browse/featured-playlists?country=US&timestamp=
    ${new Date().toISOString().slice(0, 19)}&offset=0&limit=50`)
      .pipe(map(data => data
      ));
  }

}
