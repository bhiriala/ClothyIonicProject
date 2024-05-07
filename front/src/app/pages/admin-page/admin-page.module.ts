import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPagePageRoutingModule } from './admin-page-routing.module';

import { AdminPagePage } from './admin-page.page';

import { MyarticlesModule } from 'src/app/components/myarticles/myarticles.module';

import { AdminArticleModule } from 'src/app/components/admin-article/admin-article.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPagePageRoutingModule,
    MyarticlesModule,
    AdminArticleModule
  ],
  declarations: [AdminPagePage]
})
export class AdminPagePageModule {}
