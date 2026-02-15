import { loadPlaylists } from '@angular-spotify/web/playlist/data-access';
import { PlaybackStore } from '@angular-spotify/web/shared/data-access/store';
import { VisualizerStore } from '@angular-spotify/web/visualizer/data-access';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';

const LOVIFY_START_YEAR = 2018;
const SPLASH_STORAGE_KEY = 'lovify-last-seen-year';

@Component({
  selector: 'as-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {
  showPiPVisualizer$ = this.visualizerStore.showPiPVisualizer$;
  currentAlbumCoverUrl$ = this.playbackStore.currentTrack$.pipe(
    map((track) => track?.album?.images[0]?.url),
    filter((imageUrl) => !!imageUrl)
  );

  showSplash = false;
  splashDismissing = false;
  currentYear = new Date().getFullYear();
  volume = this.currentYear - LOVIFY_START_YEAR;

  constructor(
    private playbackStore: PlaybackStore,
    private store: Store,
    private visualizerStore: VisualizerStore
  ) {
    const lastSeen = localStorage.getItem(SPLASH_STORAGE_KEY);
    if (lastSeen !== String(this.currentYear)) {
      this.showSplash = true;
    }
  }

  ngOnInit(): void {
    this.store.dispatch(loadPlaylists());
  }

  dismissSplash(): void {
    this.splashDismissing = true;
    localStorage.setItem(SPLASH_STORAGE_KEY, String(this.currentYear));
    setTimeout(() => {
      this.showSplash = false;
      this.splashDismissing = false;
    }, 600);
  }
}
