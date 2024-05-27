import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import axios from 'axios';
@Component({
  selector: 'app-favarticles',
  templateUrl: './favarticles.component.html',
  styleUrls: ['./favarticles.component.scss'],
})
export class FavarticlesComponent {
  @Input() article: any;
  isFavorite: boolean = true;

  constructor(
    private toastController: ToastController,
    private cartService: CartService,
    private favService: FavoriteService,
    private router: Router
  ) {}

  async showArticleProfile(article: any) {
    // Naviguer vers la page 'profilearticle' en passant l'article comme paramètre
    await this.router.navigate(['/profilearticle'], { state: { article } });
  }

  toggleFavorite(article: any): void {
    this.favService.removeFromFav(article);
    console.log('Removed from favorites:', article.name);
  }

  async addCart(item: any) {
    const yourAccessToken = sessionStorage.getItem('token');
    try {
      const response = await axios.post(
        'http://localhost:5000/addToCart',
        // 'http://localhost:5000/addToCart',
        {
          id: this.article._id,
          name: this.article.name,
          price: this.article.price,
          image: this.article.image,
        },
        {
          headers: {
            Authorization: `Bearer ${yourAccessToken}`,
          },
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
      position: 'bottom',
    });
    toast.present();
  }
}
