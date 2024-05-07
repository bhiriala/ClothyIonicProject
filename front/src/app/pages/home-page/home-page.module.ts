import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePagePageRoutingModule } from './home-page-routing.module';

import { HomePagePage } from './home-page.page';

import { ClothesArticleModule } from '../../components/clothes-article/clothes-article.module';
import { FavarticlesModule } from '../../components/favarticles/favarticles.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePagePageRoutingModule,
    ClothesArticleModule,
    FavarticlesModule
  ],
  declarations: [HomePagePage]
})
export class HomePagePageModule {}
