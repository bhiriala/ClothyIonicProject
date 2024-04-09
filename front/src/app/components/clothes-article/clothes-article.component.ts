import { Component, Input } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FavoriteService } from 'src/app/services/favorite.service';
import axios from 'axios';

@Component({
  selector: 'app-clothes-article',
  templateUrl: './clothes-article.component.html',
  styleUrls: ['./clothes-article.component.scss'],
})
export class ClothesArticleComponent {
  @Input() article: any;
  isFavorite: boolean = false;

  constructor(
    private toastController: ToastController,
    private favService: FavoriteService,
    private router: Router
  ) {}

  async showArticleProfile(article: any) {
    // Naviguer vers la page 'profilearticle' en passant l'article comme paramètre
    await this.router.navigate(['/profilearticle'], { state: { article } });
  }

  toggleFavorite(article: any): void {
    if (this.isFavorite == true) {
      this.favService.removeFromFav(article);
      console.log('Removed from favorites:', article.name);
    } else {
      console.log(article);
      this.favService.addToFav(article);
      console.log('Added to favorites:', article.name);
    }
    this.isFavorite = !this.isFavorite;
  }

  async addCart(item: any) {
    const yourAccessToken = sessionStorage.getItem('token');
    try {
      const response = await axios.post(
        'http://localhost:5000/addToCart',
        {
          id: this.article._id,
          name: this.article.name,
          price: this.article.price,
          image: this.article.image
        },
        {
          headers: {
            Authorization: `Bearer ${yourAccessToken}`
          }
        }
      );
      if (response.status == 200) {
        console.log('Profile updated successfully', response.data);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }

    const toast = await this.toastController.create({
      message: 'Successfully added to cart',
      duration: 500,
      position: 'bottom'
    });
    toast.present();
  }
}
