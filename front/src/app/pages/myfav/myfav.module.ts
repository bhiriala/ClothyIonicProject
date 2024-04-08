import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyfavPageRoutingModule } from './myfav-routing.module';

import { MyfavPage } from './myfav.page';

import { ClothesArticleModule } from '../../components/clothes-article/clothes-article.module';
import { FavarticlesModule } from '../../components/favarticles/favarticles.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyfavPageRoutingModule,
    ClothesArticleModule,
    FavarticlesModule
  ],
  declarations: [MyfavPage]
})
export class MyfavPageModule {}
