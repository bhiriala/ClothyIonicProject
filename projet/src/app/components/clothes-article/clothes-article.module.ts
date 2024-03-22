import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ClothesArticleComponent } from './clothes-article.component';

@NgModule({
  declarations: [
    ClothesArticleComponent
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    ClothesArticleComponent
  ]
})
export class ClothesArticleModule {}
