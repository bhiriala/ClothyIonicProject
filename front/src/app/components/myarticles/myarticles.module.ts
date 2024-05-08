import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { MyarticlesComponent } from './myarticles.component';

import { RouterModule } from '@angular/router'; //to make the routerLink possible inside the ion-card tag

@NgModule({
  declarations: [
    MyarticlesComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    MyarticlesComponent
  ]
})
export class MyarticlesModule {}
