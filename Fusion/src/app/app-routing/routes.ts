import { Routes } from '@angular/router';

import { MenuComponent } from '../menu/menu.component';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { SignupComponent } from '../signup/signup.component';
import { AdminComponent } from '../admin/admin.component';
import { FavoritesComponent } from '../favorites/favorites.component';
import { AuthGuardService as AuthGuard } from '../services/auth-guard.service';

export const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'menu',     component: MenuComponent },
  { path: 'contactus',     component: ContactComponent },
  { path: 'aboutus',     component: AboutComponent },
  { path: 'signup',     component: SignupComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'dishdetail/:id',     component: DishdetailComponent },
  { path: 'favorites',     component: FavoritesComponent, canActivate: [AuthGuard] },
  { path: 'users',     component: AdminComponent }
];