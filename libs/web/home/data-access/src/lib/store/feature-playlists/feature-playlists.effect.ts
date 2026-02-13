import { PlaylistApiService } from '@angular-spotify/web/shared/data-access/spotify-api';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, forkJoin } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { loadFeaturedPlaylists, loadFeaturedPlaylistsSuccess } from './feature-playlists.action';
import { CURATED_PLAYLIST_IDS, CURATED_PLAYLISTS_HEADING } from '../curated-content.config';

@Injectable({ providedIn: 'root' })
export class FeaturePlaylistsEffect {
  constructor(
    private playlistApi: PlaylistApiService,
    private actions$: Actions
  ) {}

  loadFeaturedPlaylists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFeaturedPlaylists),
      switchMap(() =>
        forkJoin(
          CURATED_PLAYLIST_IDS.map((id) => this.playlistApi.getById(id))
        ).pipe(
          map((playlists) =>
            loadFeaturedPlaylistsSuccess({
              response: {
                message: CURATED_PLAYLISTS_HEADING,
                playlists: {
                  items: playlists as any[],
                  total: playlists.length,
                  limit: playlists.length,
                  offset: 0,
                  href: '',
                  next: null as any,
                  previous: null as any
                }
              }
            })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
