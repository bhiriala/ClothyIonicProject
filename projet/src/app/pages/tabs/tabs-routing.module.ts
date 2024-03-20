import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path:'',
    component: TabsPage,
    children: [
      {
      path: 'home-page',
      loadChildren: () => import('../home-page/home-page.module').then( m => m.HomePagePageModule)
      },
      {
        path: 'profil',
        loadChildren: () => import('../profil/profil.module').then( m => m.ProfilPageModule)
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
