import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import {
    Auth,
    User,
    signInWithEmailAndPassword,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
} from '@angular/fire/auth';
import { StorageKeys, StorageService, StorageType } from './storage.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _userData: User;

    constructor(
        public router: Router,
        public ngZone: NgZone,
        private _auth: Auth,
        private _storageService: StorageService
    ) {
        _auth.onAuthStateChanged((user: User) => {
            if (user) {
                this._userData = user;
                localStorage.setItem('user', JSON.stringify(this._userData));
                JSON.parse(localStorage.getItem('user'));
            } else {
                this._userData = null;
                localStorage.setItem('user', null);
                JSON.parse(localStorage.getItem('user'));
            }
        });
    }

    // Sign in with email/password
    signIn(email: string, password: string) {
        signInWithEmailAndPassword(this._auth, email, password)
            .then(() => {
                this.ngZone.run(() => {
                    // Just wait a few ms for authState to change if already changed then no need to wait
                    if (this._userData) {
                        this.router.navigate(['/main']);
                    } else {
                        setTimeout(() => {
                            this.router.navigate(['/main']);
                        }, 500);
                    }
                });
            })
            .catch((error) => {
                window.alert(error.message);
            });
    }

    signOut() {
        return signOut(this._auth).then(() => {
            localStorage.removeItem('user');
            this._storageService.pop(
                StorageKeys.Selected_Page,
                StorageType.Local
            );
            this.router.navigate(['login']);
        });
    }

    signInWithGoogle() {
        signInWithPopup(this._auth, new GoogleAuthProvider())
            .then(() => {
                this.ngZone.run(() => {
                    setTimeout(() => {
                        this.router.navigate(['/main']);
                    }, 500);
                });
            })
            .catch((error) => {
                window.alert(error.message);
            });
    }

    signUp(email: string, password: string) {
        createUserWithEmailAndPassword(this._auth, email, password)
            .then(() => {
                this.ngZone.run(() => {
                    setTimeout(() => {
                        this.router.navigate(['/login'], { queryParams: { signUp: true } });
                        console.log('User created successfully!');
                    }, 500);
                });
            })
            .catch((error) => {
                window.alert(error.message);
            });
    }

    // Returns true when user is looged in and email is verified
    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        // TODO : Below line is the original code, we need to check the emailVerified also so in PROD we need to uncomment below line.
        // return user !== null && user.emailVerified !== false ? true : false;
        return user !== null ? true : false;
    }
}
