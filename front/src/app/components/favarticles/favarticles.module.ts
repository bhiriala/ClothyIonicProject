import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FavarticlesComponent } from './favarticles.component';

@NgModule({
  declarations: [
    FavarticlesComponent
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    FavarticlesComponent
  ]
})
export class FavarticlesModule {}