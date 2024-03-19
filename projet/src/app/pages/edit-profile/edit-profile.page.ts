import { Component, ViewChild } from '@angular/core';
import type { IonInput } from '@ionic/angular';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage {
  username: string;
  phone: string;
  email: string;
  password: string;
  showPassword: boolean = false;

  //controle de saisie pour username ( alphanumeric )
  inputModel = '';
  @ViewChild('ionInputEl', { static: true }) ionInputEl!: IonInput;
  onInput(ev: { target: any; }) {
    const value = ev.target!.value;
    const filteredValue = value.replace(/[^a-zA-Z0-9]+/g, '');
    this.ionInputEl.value = this.inputModel = filteredValue;
  }

  constructor(private toastController: ToastController) {
    this.username = "SarraSou";
    this.phone = "12345678";
    this.email = "sarra@example.com";
    this.password = "password123";
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async saveChanges() {
    console.log("Changes saved");

    const toast = await this.toastController.create({
      message: 'Changes saved successfully',
      duration: 2000, // Duration in milliseconds
      position: 'bottom', // Position of the toast
      color: 'success' // Color of the toast
    });
    await toast.present();
  }
}
