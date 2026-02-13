import { Injectable } from '@angular/core';
import { AlbumApiService } from '@angular-spotify/web/shared/data-access/spotify-api';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadRecentTracks, loadRecentTracksSuccess } from './recent-played-tracks.action';
import { catchError, map, switchMap } from 'rxjs/operators';
import { EMPTY, forkJoin } from 'rxjs';
import { CURATED_ALBUM_IDS } from '../curated-content.config';

@Injectable({ providedIn: 'root' })
export class RecentPlayedTracksEffect {
  constructor(private albumApi: AlbumApiService, private actions$: Actions) {}

  loadRecentTracks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRecentTracks),
      switchMap(() =>
        forkJoin(
          CURATED_ALBUM_IDS.map((id) => this.albumApi.getAlbum(id))
        ).pipe(
          map((albums) => {
            const items = albums
              .filter((album) => album.tracks.items.length > 0)
              .map((album) => ({
                track: {
                  ...album.tracks.items[0],
                  album: {
                    id: album.id,
                    name: album.name,
                    images: album.images,
                    uri: album.uri,
                    album_type: album.album_type,
                    artists: album.artists,
                    available_markets: [],
                    external_urls: album.external_urls,
                    href: album.href,
                    release_date: album.release_date,
                    release_date_precision: album.release_date_precision,
                    type: 'album' as const,
                    total_tracks: album.tracks.total
                  },
                  name: album.name,
                  artists: album.artists as any[],
                  uri: album.uri
                },
                played_at: new Date().toISOString(),
                context: {
                  type: 'album',
                  uri: album.uri,
                  external_urls: album.external_urls,
                  href: album.href
                }
              }));
            return loadRecentTracksSuccess({
              response: {
                items,
                total: items.length,
                limit: items.length,
                href: '',
                cursors: { after: '', before: '' },
                next: ''
              } as any
            });
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
