import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss']
})
export class CartPage implements OnInit {
  cartItems!: any[];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  calculateTotal(): number {
    let total : number= 0;
    for (let item of this.cartItems) {
      total += parseFloat(item.price);
    }
    return parseFloat(total.toFixed(2));
  }

  removeItem(item: any): void {
    this.cartService.removeFromCart(item);
    this.cartItems = this.cartService.getCartItems(); // Update cartItems after removal
    this.calculateTotal()// Recalculate total after removal
  }
  
}
