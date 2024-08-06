import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core'; // Ajout de l'importation pour Capacitor
import axios from 'axios';
import { ToastController } from '@ionic/angular';

// const { Storage } = Plugins; // Ajout de l'importation pour Storage

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.page.html',
  styleUrls: ['./add-article.page.scss'],
})
export class AddArticlePage {
  name: string = '';
  price: string = '';
  image: string = '';
  category: string = '';

  constructor(private toastController: ToastController) {}

  convertToBase64(base64String: string) {
    // Modification de la méthode pour accepter une chaîne de base64 directement
    this.image = 'data:image/jpeg;base64,' + base64String;
    console.log(this.image);
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
          console.log(this.image);
        }
      }
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  }

  async addArticle() {
    const accessToken = sessionStorage.getItem('token');
    const response = await axios.post(
      'http://localhost:5000/addArticle',
      {
        price: this.price,
        name: this.name,
        image: this.image,
        category: this.category,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  
    if (response.status === 200) {
      const toast = await this.toastController.create({
        message: 'Article added Successfully',
        duration: 600,
        position: 'bottom',
      });
      toast.present();
  
      // Attendre 1 seconde après le toast
      await this.sleep(1300);
  
      window.location.reload();
      console.log('success');
    }
  }
  
  // Fonction utilitaire sleep
  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
}
