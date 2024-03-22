import { Component } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.page.html',
  styleUrls: ['./edit-article.page.scss'],
})
export class EditArticlePage {
  editedArticle: any;
  constructor(private modalController: ModalController, private navParams: NavParams) {
    this.editedArticle = { ...(this.navParams.data['article']) };
  }

  dismiss() {
    this.modalController.dismiss();
  }

  saveChanges() {
    console.log("Article updated:", this.editedArticle);
    // Émet l'événement avec les modifications
    this.modalController.dismiss(this.editedArticle);
  }
}
