import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilPageRoutingModule } from './profil-routing.module';

import { ProfilPage } from './profil.page';

import { MyarticlesModule } from 'src/app/components/myarticles/myarticles.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilPageRoutingModule,
    MyarticlesModule
    
  ],
  declarations: [ProfilPage]
})
export class ProfilPageModule {}
