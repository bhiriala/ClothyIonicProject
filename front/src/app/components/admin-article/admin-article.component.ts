import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import axios from 'axios';


@Component({
  selector: 'app-admin-article',
  templateUrl: './admin-article.component.html',
  styleUrls: ['./admin-article.component.scss'],
})
export class AdminArticleComponent  implements OnInit {
  @Input() article: any;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  async delArticle() {
    const yourAccessToken = sessionStorage.getItem('token');
    try {
      const response = await axios.put('http://localhost:5000/delArticle', 
      { id: this.article._id }, 
      {
        headers: {
          Authorization: `Bearer ${yourAccessToken}`
        }
      });
      if ( response.status == 200) {
        console.log('Article deleted successfully', response.data);
        window.location.reload();
      }

    } catch (error) {
      console.error('Error updating article:', error);
    }
  }

}
