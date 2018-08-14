export interface Playlist {
  message: string;
  playlists: {
    href: string;
    items: [{
      collabrotive: boolean;
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      images: Object[];
      name: string;
      uri: string;
      type: string;
      tracks: {};
      snapshot_id: string;
      owner: {};
      public: null;
      primary_color: null
    }];
  };
}
