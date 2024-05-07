import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditArticlePage } from 'src/app/pages/edit-article/edit-article.page';


@Component({
  selector: 'app-admin-article',
  templateUrl: './admin-article.component.html',
  styleUrls: ['./admin-article.component.scss'],
})
export class AdminArticleComponent  implements OnInit {
  @Input() article: any;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  async openEditModal() {
    const modal = await this.modalCtrl.create({
      component: EditArticlePage,
      componentProps: {
        article: this.article 
      }
    });
    modal.onDidDismiss().then((data) => {
      const modifiedArticle = data['data'];
      console.log('Modified Article:', modifiedArticle);
      
      Object.assign(this.article, modifiedArticle);
    });
    return await modal.present();
  }

}
