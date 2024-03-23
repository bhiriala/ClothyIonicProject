import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddArticlePage } from './add-article.page';

const routes: Routes = [
  {
    path: '',
    component: AddArticlePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddArticlePageRoutingModule {}
