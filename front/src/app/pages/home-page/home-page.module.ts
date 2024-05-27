import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePagePageRoutingModule } from './home-page-routing.module';

import { HomePagePage } from './home-page.page';

import { ClothesArticleModule } from '../../components/clothes-article/clothes-article.module';
import { FavarticlesModule } from '../../components/favarticles/favarticles.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SearchhPipe } from './searchh.pipe';
// import {Ng2SearchPipeModule} from 'ng2-search-filter';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePagePageRoutingModule,
    ClothesArticleModule,
    FavarticlesModule,
  
  ],
  declarations: [HomePagePage, SearchhPipe]
})
export class HomePagePageModule {}
