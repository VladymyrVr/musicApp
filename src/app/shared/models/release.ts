export interface Release {
  id: string;
  href: string;
  genres: Array<Object>;
  images: Array<Object>;
  name: string;
  type: string;
  available_markets: [string];
  artists: Array<Object>;
  album_type: string;
  uri: string;
  release_date: string;
  release_date_precision: string;
  favorite: boolean;
}
