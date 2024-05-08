import { Component } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.page.html',
  styleUrls: ['./edit-article.page.scss'],
})
export class EditArticlePage {
  editedArticle: any;
  constructor(private modalController: ModalController, private navParams: NavParams ) {
    this.editedArticle = { ...(this.navParams.data['article']) }; 
  }
 
  

  dismiss() {
    this.modalController.dismiss();
  }

  async saveChanges() {
    const yourAccessToken = sessionStorage.getItem('token');
    try {
      const response = await axios.put('http://192.168.1.110:5000/editArticle', 
      { id: this.editedArticle._id, name : this.editedArticle.name, price : this.editedArticle.price, image: this.editedArticle.image  }, 
      {
        headers: {
          Authorization: `Bearer ${yourAccessToken}`
        }
      });
      if ( response.status == 200) {
        console.log('Article updated successfully', response.data);
        this.modalController.dismiss({ updatedArticle: this.editedArticle });
        window.location.reload();
      }

    } catch (error) {
      console.error('Error updating article:', error);
    }
  }

  async deleteArticle() {
    const yourAccessToken = sessionStorage.getItem('token');
    try {
      const response = await axios.put('http://192.168.1.110:5000/removeArticle', 
      { id: this.editedArticle._id }, 
      {
        headers: {
          Authorization: `Bearer ${yourAccessToken}`
        }
      });
      if ( response.status == 200) {
        console.log('Article deleted successfully', response.data);
        this.modalController.dismiss({ updatedArticle: this.editedArticle });
        window.location.reload();
      }

    } catch (error) {
      console.error('Error updating article:', error);
    }
  }

  
  convertToBase64(event: any) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      this.editedArticle.image = reader.result as string;
      console.log(this.editedArticle.image);
    };
    reader.onerror = error => {
      console.log("Error: ", error);
    };
  }

}


