import {Routes} from '@angular/router';
import {Layout} from './shared-ui/layout/layout';
import {SearchPage} from './pages/search-page/search-page';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: 'search', component: SearchPage }
    ]
  }
];
