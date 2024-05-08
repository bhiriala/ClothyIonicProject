import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import axios, { AxiosError } from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private alertController: AlertController,private router: Router) { }
  ngOnInit() {
  }

  async signIn() {
    if (!this.isValidEmail(this.email)) {
      const alert = await this.alertController.create({
        header: 'Invalid Email',
        message: 'Please enter a valid email address.',
        buttons: ['OK']
      });

      await alert.present();
    } else {
      try {
        const response = await axios.post('http://192.168.1.110:5000/login', { email: this.email, password: this.password });
        if (response.status === 200 && response.data.access_token){
          console.log("this came from the backend", response.data);
          sessionStorage.setItem("token", response.data.access_token);
          this.router.navigate(['/tabs/home-page']);
        } else {
          alert("Bad username or password");
        }
      } catch (error) {
        if (axios.isAxiosError(error)){
          const axiosError = error as AxiosError;
          if (axiosError.response && axiosError.response.status === 401) {
            console.error('Error:', axiosError);
            alert("ce compte n'existe pas");
          } else {
            console.error('Error:', axiosError);
          }
        } else {
          console.error('Error:', error);
        }
      }
    }
  }

  async admin() {
    if (!this.isValidEmail(this.email)) {
      const alert = await this.alertController.create({
        header: 'Invalid Email',
        message: 'Please enter a valid email address.',
        buttons: ['OK']
      });

      await alert.present();
    } else {
      try {
        const response = await axios.post('http://192.168.1.110:5000/admin', { email: this.email, password: this.password });
        if (response.status === 200 && response.data.access_token){
          console.log("this came from the backend", response.data);
          sessionStorage.setItem("token", response.data.access_token);
          this.router.navigate(['/admin-page']);
        } else {
          alert("Bad username or password");
        }
      } catch (error) {
        if (axios.isAxiosError(error)){
          const axiosError = error as AxiosError;
          if (axiosError.response && axiosError.response.status === 401) {
            console.error('Error:', axiosError);
            alert("ce compte n'existe pas");
          } else {
            console.error('Error:', axiosError);
          }
        } else {
          console.error('Error:', error);
        }
      }
    }
  }

  isValidEmail(email: string): boolean {
    // Basic email validation regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
