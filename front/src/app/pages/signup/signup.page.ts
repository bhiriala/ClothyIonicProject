import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import axios, { AxiosError } from 'axios';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  username: string = '';
  phone: string = '';
  email: string = '';
  password: string = '';
  image: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async signUp() {
    try {
      if (!this.username) {
        await this.presentAlert(
          'username Required',
          'Please enter your username.'
        );
        return;
      }

      if (!this.password) {
        await this.presentAlert(
          'password Required',
          'Please enter your password.'
        );
        return;
      }
      if (!this.image) {
        await this.presentAlert('Image Required', 'Please select an image.');
        return;
      }
      const response = await axios.post('http://localhost:5000/signup', {
        image: this.image,
        username: this.username,
        email: this.email,
        phone: this.phone,
        password: this.password,
      });

      if (response.status === 200) {
        const toast = await this.toastController.create({
          message: 'Account created Successfully',
          duration: 600,
          position: 'bottom',
        });
        toast.present();
        this.router.navigateByUrl('/login');
      } else {
        alert('Creation failed');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        switch (axiosError.response?.status) {
          case 401:
            const alert = await this.alertController.create({
              header: 'Inalid email format',
              message: 'Please enter a valid email address.',
              buttons: ['OK'],
            });
      
            await alert.present();
            // alert('Invalid email format');
            break;
          case 402:
            const alertt = await this.alertController.create({
              header: 'Email already used by another user',
              message: 'Please enter an other email address.',
              buttons: ['OK'],
            });
      
            await alertt.present();
            // alert('Email already used by another user');
            break;
          case 403:
            const alerttt = await this.alertController.create({
              header: 'Phone number must contain only digits',
              message: 'Please enter a valid phone number.',
              buttons: ['OK'],
            });
      
            await alerttt.present();
            // alert('Phone number must contain only digits');
            break;
          case 405:
            const alertttt = await this.alertController.create({
              header: 'username already used by another user',
              message: 'Please enter an other username.',
              buttons: ['OK'],
            });
      
            await alertttt.present();
            // alert('username already used by another user');
            break;
          default:
            console.error('Error:', error);
        }
      } else {
        console.error('Error:', error);
        alert('An error occurred during signup');
      }
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
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

  convertToBase64(base64String: string) {
    // Modification de la méthode pour accepter une chaîne de base64 directement
    this.image = 'data:image/jpeg;base64,' + base64String;
  }

  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64,
        source: CameraSource.Prompt,
        saveToGallery: true,
      });

      if (image.base64String) {
        if (Capacitor.getPlatform() === 'web') {
          this.convertToBase64(image.base64String);
        } else {
          this.image = 'data:image/jpeg;base64,' + image.base64String;
        }
      }
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  }
}
