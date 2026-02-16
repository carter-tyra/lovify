import { Injectable } from '@angular/core';
import { NavItem } from '@angular-spotify/web/shared/data-access/models';
import { ComponentStore } from '@ngrx/component-store';
import { filter, switchMapTo, tap } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UnauthorizedModalComponent } from '@angular-spotify/web/auth/ui/unauthorized-modal';

interface UIState {
  navItems: NavItem[];
  isShowUnauthorizedModal: boolean;
}

@Injectable({ providedIn: 'root' })
export class UIStore extends ComponentStore<UIState> {
  constructor(private modalService: NzModalService) {
    super({
      navItems: [
        { label: 'For Victoria', path: '/valentine', exact: true, icon: 'emoji-heart-eyes' },
        { label: 'Our Songs', path: '/search', icon: 'search-heart' },
        { label: 'Browse', path: '/browse', icon: 'compass', iconSelected: 'compass-fill' },
        // { label: 'Love Playlists', path: '/collection/playlists', icon: 'heart', iconSelected: 'heart-fill' },
        { label: 'Shows together', path: '/albums', icon: 'journal' },
        { label: 'Victoria\'s Favorites', path: '/collection/tracks', icon: 'heart-fill' },
        { label: '2018', path: '/valentine', icon: 'music-note-beamed', queryParams: { year: '2018' } },
        { label: '2019', path: '/valentine', icon: 'music-note-beamed', queryParams: { year: '2019' } },
        { label: '2020', path: '/valentine', icon: 'music-note-beamed', queryParams: { year: '2020' } },
        { label: '2021', path: '/valentine', icon: 'music-note-beamed', queryParams: { year: '2021' } },
        { label: '2022', path: '/valentine', icon: 'music-note-beamed', queryParams: { year: '2022' } },
        { label: '2023', path: '/valentine', icon: 'music-note-beamed', queryParams: { year: '2023' } },
        { label: '2024', path: '/valentine', icon: 'music-note-beamed', queryParams: { year: '2024' } },
        { label: '2025', path: '/valentine', icon: 'music-note-beamed', queryParams: { year: '2025' } },
        { label: '2026', path: '/valentine', icon: 'music-note-beamed', queryParams: { year: '2026' } }
      ],
      isShowUnauthorizedModal: false
    });
  }
  readonly isShowUnauthorizedModal$ = this.select((s) => s.isShowUnauthorizedModal);
  readonly navItems$ = this.select(({ navItems }) => navItems);

  readonly showUnauthorizedModal = this.effect((params$) =>
    params$.pipe(
      switchMapTo(this.isShowUnauthorizedModal$),
      filter((s) => !s),
      tap(() => {
        this.patchState({
          isShowUnauthorizedModal: true
        });
        this.modalService.create({
          nzTitle: 'Your access token has expired!',
          nzContent: UnauthorizedModalComponent,
          nzClosable: false,
          nzKeyboard: false,
          nzMaskClosable: false
        });
      })
    )
  );
}
