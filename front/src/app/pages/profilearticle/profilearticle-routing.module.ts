import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilearticlePage } from './profilearticle.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilearticlePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilearticlePageRoutingModule {}
