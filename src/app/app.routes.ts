import { Routes } from '@angular/router';
import {BaseLayout} from './pages/base-layout/base-layout';
import {NotFoundError} from './pages/not-found/not-found-error';
import {Homepage} from './pages/homepage/homepage';
import {ProductDetailsPage} from './pages/product-details-page/product-details-page';
import {UserProfile} from './pages/user-profile/user-profile';


export const routes: Routes = [
  {
    path: '',
    component:  BaseLayout,
    children: [
      { path: '', component:  Homepage },
      { path: 'product/:id', component:  ProductDetailsPage },
      { path: 'user/profile', component:  UserProfile },
    ]
  },
  { path: '**', component: NotFoundError}
];
