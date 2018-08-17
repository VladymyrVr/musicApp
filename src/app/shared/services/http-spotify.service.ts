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
    const access_token = 'BQCucwoLqylX48noImMMq_y2nt_HJWBVjpZF_al3w7Alsd' +
      'zcH9odSoTtUvgIg-6BTXMIH7vB8DPoz-5kNUWsevhp3AsnYvQcphIIs7bKspwlFl' +
      'c8jeT0Uqtk1TrYsUotImKk8cthBcTSc-VUA-Pa_f9l9BdEFpvlK6veZDeRjFPnEwqHRA';
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
