import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import axios, { AxiosError } from 'axios';

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
    private alertController: AlertController
  ) { }

  ngOnInit() {}

  async signUp() {
    try {
      if (!this.username) {
        await this.presentAlert('username Required', 'Please enter your username.');
        return;
      }
    
      if (!this.password) {
        await this.presentAlert('password Required', 'Please enter your password.');
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
        password: this.password 
      });

      if (response.status === 200) {
        alert("Account created successfully");
        console.log("Account created successfully");
        this.router.navigateByUrl('/login');
      } else {
        alert("Creation failed");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        switch (axiosError.response?.status) {
          case 401:
            alert("Invalid email format");
            break;
          case 402:
            alert("Email already used by another user");
            break;
          case 403:
            alert("Phone number must contain only digits");
            break;
          case 404:
            alert("Password already used by another user");
            break;
            case 405:
              alert("username already used by another user");
              break;
          default:
            console.error('Error:', error);
            alert("An error occurred during signup");
        }
      } else {
        console.error('Error:', error);
        alert("An error occurred during signup");
      }
    }
  }

  convertToBase64(event: any) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      this.image = reader.result as string;
      console.log(this.image);
    };
    reader.onerror = error => {
      console.log("Error: ", error);
    };
  }
  
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
