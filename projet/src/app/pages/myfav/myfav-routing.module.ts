import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyfavPage } from './myfav.page';

const routes: Routes = [
  {
    path: '',
    component: MyfavPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyfavPageRoutingModule {}
