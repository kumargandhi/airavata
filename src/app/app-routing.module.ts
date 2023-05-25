import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './common/guard/auth-guard';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'main',
        canActivate: [AuthGuard],
        loadChildren: () =>
            import('./main/main.module').then((m) => m.MainModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
