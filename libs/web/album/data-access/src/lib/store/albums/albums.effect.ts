import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AlbumApiService, PlaylistApiService } from '@angular-spotify/web/shared/data-access/spotify-api';
import { loadAlbums, loadAlbumsSuccess } from './albums.action';
import { catchError, map, switchMap } from 'rxjs/operators';
import { EMPTY, forkJoin, of } from 'rxjs';

const PINNED_PLAYLIST_IDS = ['4XoEC2GQnc2LVfIR7dPNFZ'];

@Injectable({ providedIn: 'root' })
export class AlbumsEffect {
  loadAlbums$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAlbums),
      switchMap(() =>
        forkJoin({
          saved: this.albumApi.getUserSavedAlbums().pipe(catchError(() => of(null))),
          pinned: forkJoin(
            PINNED_PLAYLIST_IDS.map(id =>
              this.playlistApi.getById(id).pipe(catchError(() => of(null)))
            )
          ).pipe(catchError(() => of([] as null[])))
        }).pipe(
          map(({ saved, pinned }) => {
            const pinnedItems: any[] = [];
            for (const p of pinned) {
              if (p != null) {
                pinnedItems.push({
                  added_at: new Date().toISOString(),
                  album: {
                    id: p.id,
                    name: p.name,
                    uri: p.uri,
                    images: p.images,
                    artists: [{ name: (p.owner && p.owner.display_name) || 'Playlist' }],
                    album_type: 'playlist'
                  }
                });
              }
            }
            const savedItems = saved?.items || [];
            return loadAlbumsSuccess({
              albums: {
                ...(saved || { href: '', limit: 50, next: '', offset: 0, previous: '', total: 0, items: [] }),
                items: [...pinnedItems, ...savedItems] as SpotifyApi.SavedAlbumObject[]
              }
            });
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private albumApi: AlbumApiService,
    private playlistApi: PlaylistApiService
  ) {}
}
