import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ProfileArticleComponent } from './profile-article.component';

import { RouterModule } from '@angular/router'; //to make the routerLink possible insiide the ion-card tag

@NgModule({
  declarations: [
    ProfileArticleComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    ProfileArticleComponent
  ]
})
export class ProfilearticlesModule {}
