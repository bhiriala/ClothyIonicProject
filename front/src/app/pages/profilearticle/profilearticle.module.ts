import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilearticlePageRoutingModule } from './profilearticle-routing.module';

import { ProfilearticlePage } from './profilearticle.page';
import { ProfilearticlesModule } from 'src/app/components/profile-article/profile-article.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilearticlePageRoutingModule,
    ProfilearticlesModule
  ],
  declarations: [ProfilearticlePage]
})
export class ProfilearticlePageModule {}
