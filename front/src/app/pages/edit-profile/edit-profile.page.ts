import { Component, ViewChild } from '@angular/core';
import type { IonInput } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import axios from 'axios';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core'; 

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
  image: string = '';
  showPassword: boolean = false;

  //controle de saisie pour username ( alphanumeric )
  inputModel = '';
  @ViewChild('ionInputEl', { static: true }) ionInputEl!: IonInput;
  onInput(ev: { target: any; }) {
    const value = ev.target!.value;
    const filteredValue = value.replace(/[^a-zA-Z0-9]+/g, '');
    this.ionInputEl.value = this.inputModel = filteredValue;
  }

  constructor(private toastController: ToastController, private router: Router) {}

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
        this.image = userInfo.image;
        this.username = userInfo.username;
        this.phone = userInfo.phone;
        this.email = userInfo.email;
        this.password = userInfo.password;
      }
    } catch (error) {
      console.error('Error fetching user information:', error);
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
      { username : this.username, phone : this.phone, email: this.email, new_password : this.password, image: this.image }, 
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

  
  // convertToBase64(event: any) {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(event.target.files[0]);
  //   reader.onload = () => {
  //     this.image = reader.result as string;
  //     console.log(this.image);
  //   };
  //   reader.onerror = error => {
  //     console.log("Error: ", error);
  //   };
  // }

  convertToBase64(base64String: string) { // Modification de la méthode pour accepter une chaîne de base64 directement
    this.image = 'data:image/jpeg;base64,' + base64String;
    console.log(this.image);
  }

  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        // allowEditing: true,
        resultType: CameraResultType.Base64,
        // source: CameraSource.Prompt,
        // saveToGallery: true
      });

      if (image.base64String) {
        if (Capacitor.getPlatform() === 'web') {
          this.convertToBase64(image.base64String);
        } else {
          this.image = 'data:image/jpeg;base64,' + image.base64String;
          console.log("image updated");
        }
      }
    } catch (error) {
      console.error("Error taking picture:", error);
    }
  }

}
