import {Routes} from '@angular/router';
import {Layout} from './shared-ui/layout/layout';
import {SearchPage} from './pages/search-page/search-page';
import {LoginPage} from './pages/login-page/login-page';
import {canActiveAuthByAccessToken} from './helpers/guards/access-token.guard';
import {ProfilePage} from './pages/profile-page/profile-page';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: 'search', component: SearchPage },
      { path: 'profile', component: ProfilePage },
    ],
    canActivate: [canActiveAuthByAccessToken],
  },
  { path: 'login', component: LoginPage },
];
