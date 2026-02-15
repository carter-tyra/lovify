import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AlbumApiService } from '@angular-spotify/web/shared/data-access/spotify-api';
import { loadAlbums, loadAlbumsSuccess } from './albums.action';
import { catchError, map, switchMap } from 'rxjs/operators';
import { EMPTY, forkJoin } from 'rxjs';

const PINNED_ALBUM_IDS = ['4XoEC2GQnc2LVfIR7dPNFZ'];

@Injectable({ providedIn: 'root' })
export class AlbumsEffect {
  loadAlbums$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAlbums),
      switchMap(() =>
        forkJoin({
          saved: this.albumApi.getUserSavedAlbums(),
          pinned: forkJoin(PINNED_ALBUM_IDS.map(id => this.albumApi.getAlbum(id)))
        }).pipe(
          map(({ saved, pinned }) => {
            const pinnedItems = pinned.map(album => ({
              added_at: new Date().toISOString(),
              album
            }));
            return loadAlbumsSuccess({
              albums: {
                ...saved,
                items: [...pinnedItems, ...saved.items] as SpotifyApi.SavedAlbumObject[]
              }
            });
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(private actions$: Actions, private albumApi: AlbumApiService) {}
}
