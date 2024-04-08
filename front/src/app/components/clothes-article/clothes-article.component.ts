import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import axios from 'axios';
@Component({
  selector: 'app-clothes-article',
  templateUrl: './clothes-article.component.html',
  styleUrls: ['./clothes-article.component.scss'],
})
export class ClothesArticleComponent {
  @Input() article: any;

  isFavorite: boolean = false;

  constructor(private toastController: ToastController, private cartService: CartService, private favService : FavoriteService, private router: Router) {}


  toggleFavorite(article: any): void {
    // const index = this.favService.getFavItems().indexOf(article);
    if (this.isFavorite == true) {
      this.favService.removeFromFav(article);
      console.log('Removed from favorites:', article.name);
    } else {
      this.favService.addToFav(article);
      console.log('Added to favorites:', article.name);
    }
    this.isFavorite = !this.isFavorite; 
    }



  async addCart(item: any) {
    const yourAccessToken = sessionStorage.getItem('token');
    try {
      const response = await axios.post('http://localhost:5000/addToCart', 
      { id: this.article._id ,name : this.article.name, price: this.article.price, image: this.article.image }, 
      {
        headers: {
          Authorization: `Bearer ${yourAccessToken}`
        }
      });
      if ( response.status == 200) {
        console.log('Profile updated successfully', response.data);
        // window.location.reload();
      }

    } catch (error) {
      console.error('Error updating profile:', error);
    }

    // this.cartService.addToCart(item);

    const toast = await this.toastController.create({
      message: 'Successfully added to cart',
      duration: 500,
      position: 'bottom' 
    });
    toast.present();
  }

}
