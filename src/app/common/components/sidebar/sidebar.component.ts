import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import head from 'lodash/head';
import { MENU_ITEMS } from '../../../main/constants';
import { AuthService } from '../../services/auth.service';
import {
    StorageKeys,
    StorageService,
    StorageType,
} from '../../services/storage.service';
import { DestroyService } from '../../services/destroy.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    providers: [DestroyService]
})
export class SidebarComponent implements OnInit {
    menu: MenuItem[] = [...MENU_ITEMS];

    selectedMenu: MenuItem;

    constructor(
        private _destroy$: DestroyService,
        private _cd: ChangeDetectorRef,
        private _authService: AuthService,
        private _storageService: StorageService
    ) {
        this.selectedMenu = head(this.menu);
        this._cd.markForCheck();
    }

    ngOnInit(): void {}

    pageChanged(item: MenuItem) {
        this._storageService.set(
            StorageKeys.Selected_Page,
            item.label,
            StorageType.Local
        );
        this._cd.markForCheck();
    }
}
