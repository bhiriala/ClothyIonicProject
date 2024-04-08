import { Component, ViewChild } from '@angular/core';
import type { IonInput } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage {
  username: string = '';
  phone: string = '';
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  //controle de saisie pour username ( alphanumeric )
  inputModel = '';
  @ViewChild('ionInputEl', { static: true }) ionInputEl!: IonInput;
  onInput(ev: { target: any; }) {
    const value = ev.target!.value;
    const filteredValue = value.replace(/[^a-zA-Z0-9]+/g, '');
    this.ionInputEl.value = this.inputModel = filteredValue;
  }

  constructor(private toastController: ToastController) {}

  ngOnInit() {
    this.getUserInfo();
  }

  async getUserInfo() {
    const yourAccessToken = sessionStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:5000/user_info', {
        headers: {
          Authorization: `Bearer ${yourAccessToken}`
        }
      });

      if (response.status === 200) {
        const userInfo = response.data[0];
        
        this.username = userInfo.username;
        this.phone = userInfo.phone;
        this.email = userInfo.email;
        this.password = userInfo.password;
      }
    } catch (error) {
      console.error('Error fetching user information:', error);
      // Display error toast if needed
      this.presentToast('Error fetching user information');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


  async saveChanges() {
    const yourAccessToken = sessionStorage.getItem('token');
    try {
      const response = await axios.put('http://localhost:5000/editProfile', 
      { username : this.username, phone : this.phone, email: this.email, new_password : this.password }, 
      {
        headers: {
          Authorization: `Bearer ${yourAccessToken}`
        }
      });
      if ( response.status == 200) {
        console.log('Profile updated successfully', response.data);
        window.location.reload();
      }

    } catch (error) {
      console.error('Error updating profile:', error);
    }


    const toast = await this.toastController.create({
      message: 'Changes saved successfully',
      duration: 2000, // Duration in milliseconds
      position: 'bottom', // Position of the toast
      color: 'success' // Color of the toast
    });
    await toast.present();
  }
}
