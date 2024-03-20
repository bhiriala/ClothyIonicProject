import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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

  constructor(
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  async signUp() {
    if (!this.isValidUsername(this.username)) {
      await this.presentAlert('Invalid Username', 'Please enter a valid username (letters only).');
      return;
    }

    if (!this.isValidPhone(this.phone)) {
      await this.presentAlert('Invalid Phone', 'Please enter a valid phone number (8 digits only).');
      return;
    }

    if (!this.isValidEmail(this.email)) {
      await this.presentAlert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    // Redirect to home page if all inputs are valid
    this.router.navigateByUrl('/tabs/home-page');
    this.username="";
    this.phone="";
    this.email="";
    this.password="";
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  isValidUsername(username: string): boolean {
    const usernameRegex = /^[a-zA-Z]+$/;
    return usernameRegex.test(username);
  }

  isValidPhone(phone: string): boolean {
    const phoneRegex = /^\d{8}$/;
    return phoneRegex.test(phone);
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
