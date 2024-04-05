import { Component, OnInit } from '@angular/core';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-myfav',
  templateUrl: './myfav.page.html',
  styleUrls: ['./myfav.page.scss'],
})
export class MyfavPage implements OnInit {
  favItems!: any[];

  constructor(public favService: FavoriteService) {}

  ngOnInit() {
    this.favItems = this.favService.getFavItems();
    this.calculateTotal();
  }

  calculateTotal(): number {
    let total : number= 0;
    for (let item of this.favItems) {
      total += parseFloat(item.price);
    }
    return parseFloat(total.toFixed(2));
  }

  removeItem(item: any): void {
    this.favService.removeFromFav(item);
    this.favItems = this.favService.getFavItems(); // Update cartItems after removal
    this.calculateTotal()// Recalculate total after removal
  }

}
