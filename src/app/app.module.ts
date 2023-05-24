import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';

// Firebase imports
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { LogoModule } from './common/components/logo/logo.module';
import { CORE_PRIME_NG_MODULES } from './constants';
import { userMgmtReducer } from './common/state/reducers/user.reducer';

import { UserEffects } from './common/state/effects/user.effects';

@NgModule({
    declarations: [AppComponent, LoginComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        LogoModule,
        ...CORE_PRIME_NG_MODULES,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideDatabase(() => getDatabase()),
        provideFirestore(() => getFirestore()),
        provideStorage(() => getStorage()),
        StoreModule.forRoot({
            router: routerReducer,
            userMgmt: userMgmtReducer,
        }),
        StoreRouterConnectingModule.forRoot(),
        EffectsModule.forRoot([UserEffects]),
    ],
    providers: [
        [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
