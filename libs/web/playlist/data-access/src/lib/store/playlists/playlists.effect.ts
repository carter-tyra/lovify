import { PlaylistApiService } from '@angular-spotify/web/shared/data-access/spotify-api';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, forkJoin } from 'rxjs';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { loadPlaylists, loadPlaylistsSuccess } from './playlists.action';
import { getPlaylistsState } from './playlists.selector';
import { SIDEBAR_PLAYLIST_IDS } from '@angular-spotify/web/home/data-access';

@Injectable({ providedIn: 'root' })
export class PlaylistsEffect {
  loadPlaylists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPlaylists),
      withLatestFrom(this.store.pipe(select(getPlaylistsState))),
      filter(([, playlistState]) => !playlistState.data),
      switchMap(() =>
        forkJoin(
          SIDEBAR_PLAYLIST_IDS.map((id) => this.playlistsApi.getById(id))
        ).pipe(
          map((playlists) =>
            loadPlaylistsSuccess({
              playlists: {
                items: playlists as unknown as SpotifyApi.PlaylistObjectSimplified[],
                total: playlists.length,
                limit: playlists.length,
                offset: 0,
                href: '',
                next: null,
                previous: null
              }
            })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private playlistsApi: PlaylistApiService,
    private store: Store
  ) {}
}
