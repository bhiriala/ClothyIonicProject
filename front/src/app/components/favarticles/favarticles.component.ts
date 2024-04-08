import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-favarticles',
  templateUrl: './favarticles.component.html',
  styleUrls: ['./favarticles.component.scss'],
})
export class FavarticlesComponent{
  @Input() article: any;

  constructor(private toastController: ToastController, private cartService: CartService, private favService : FavoriteService, private router: Router) {}


  toggleFavorite(article: any): void {  
      this.favService.removeFromFav(article);
      console.log('Removed from favorites:', article.name); 
    }

  async addCart(item: any) {
    this.cartService.addToCart(item);
    const toast = await this.toastController.create({
      message: 'Successfully added to cart',
      duration: 500,
      position: 'bottom' 
    });
    toast.present();
  }


}
