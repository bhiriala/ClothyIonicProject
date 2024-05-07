import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AdminArticleComponent } from './admin-article.component';
import { RouterModule } from '@angular/router'; //to make the routerLink possible inside the ion-card tag

@NgModule({
  declarations: [
    AdminArticleComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    AdminArticleComponent
  ]
})
export class AdminArticleModule {}
