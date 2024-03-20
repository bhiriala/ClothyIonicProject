import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';

  constructor(private alertController: AlertController) { }

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
      // Continue with sign in process
    }
  }

  isValidEmail(email: string): boolean {
    // Basic email validation regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
