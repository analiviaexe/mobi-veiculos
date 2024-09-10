import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth-guard';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [ AuthGuard ],
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },
];
