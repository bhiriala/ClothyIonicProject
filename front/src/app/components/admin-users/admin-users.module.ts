import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AdminUsersComponent } from './admin-users.component';
import { RouterModule } from '@angular/router'; //to make the routerLink possible inside the ion-card tag

@NgModule({
  declarations: [
    AdminUsersComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    AdminUsersComponent
  ]
})
export class AdminUsersModule {}
