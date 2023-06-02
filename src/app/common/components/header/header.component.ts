import { Component, OnInit } from '@angular/core';
import {
    StorageKeys,
    StorageService,
    StorageType,
} from '../../services/storage.service';
import { IUser } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { ConfirmationService } from 'primeng/api';
import { DestroyService } from '../../services/destroy.service';
import { Store, ActionsSubject } from '@ngrx/store';
import { takeUntil, skip } from 'rxjs/operators';
import { USER_FETCHED, getUser } from '../../state/actions/user.action';

enum UserActions {
    Profile = 'Profile',
    Delete_Account = 'Delete_Account',
    Logout = 'Logout',
    Info = 'Info',
}

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [DestroyService, ConfirmationService],
})
export class HeaderComponent implements OnInit {
    infoDialog = false;

    user: IUser;

    readonly UserActions = UserActions;

    confirmationMessage = '';

    showProfilePanel = false;

    constructor(
        private _storageService: StorageService,
        private _authService: AuthService,
        private _userService: UserService,
        private _confirmationService: ConfirmationService,
        private _destroy$: DestroyService,
        private _actionListener: ActionsSubject,
        private _store: Store
    ) {}

    ngOnInit(): void {
        // Dispatch action to get the user
        this._store.dispatch(getUser());
        this._actionListener
            .pipe(takeUntil(this._destroy$), skip(1))
            .subscribe((action: any) => {
                if (action.type === USER_FETCHED) {
                    this.user = this._userService.currentUser = action.val;
                }
            });
    }

    onUserAction(action: UserActions) {
        switch (action) {
            case UserActions.Profile: {
                this.showProfilePanel = true;
                break;
            }
            case UserActions.Delete_Account: {
                this.confirmationMessage = `Are you sure that you want to delete your account?`;
                this._confirmationService.confirm({
                    message: this.confirmationMessage,
                    accept: () => {
                        // this._authService.deleteUserAccount();
                    },
                });
                break;
            }
            case UserActions.Logout: {
                this.confirmationMessage = `Are you sure you want to logout?`;
                this._confirmationService.confirm({
                    message: this.confirmationMessage,
                    accept: () => {
                        this._authService.signOut();
                    },
                });
                break;
            }
            case UserActions.Info: {
                this.infoDialog = true;
                break;
            }
            default:
                break;
        }
    }

    getHeaderTitle() {
        return this._storageService.get<IUser>(
            StorageKeys.Selected_Page,
            StorageType.Local
        );
    }
}
