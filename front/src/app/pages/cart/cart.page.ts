import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import axios from 'axios';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss']
})
export class CartPage implements OnInit {
  cartItems: any[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.getCartItems();
  }

  async getCartItems() {
    const accessToken = sessionStorage.getItem("token");
    try {
      const response = await axios.get('http://localhost:5000/get_cart', {
        headers: {
          Authorization: `Bearer ${accessToken}` 
        }
      });

      if (response.status === 200) {
        this.cartItems = response.data; // Update cartItems with fetched data
        this.calculateTotal(); // Calculate total after fetching items
        console.log("total fl getcart melowl:", this.total)
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  }

  calculateTotal(): void {
    this.total = 0;
    for (const item of this.cartItems) {
      this.total += parseFloat(item.price);
    }
    this.total = parseFloat(this.total.toFixed(2));
  }

  async removeItem(item: any){
    const accessToken = sessionStorage.getItem("token");
    try {
      const response = await axios.put(`http://localhost:5000/remove_from_cart`, 
      { id : item._id },
      {
        headers: {
          Authorization: `Bearer ${accessToken}` 
        }
      });

      if (response.status === 200) {
        this.getCartItems(); 
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  }
}
