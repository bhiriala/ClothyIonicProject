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
      const response = await axios.put('http://localhost:5000/editArticle', 
      { id: this.editedArticle._id, name : this.editedArticle.name, price : this.editedArticle.price  }, 
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

}


