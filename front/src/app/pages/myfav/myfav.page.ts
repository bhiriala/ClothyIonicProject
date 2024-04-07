import { Component, OnInit } from '@angular/core';
import { FavoriteService } from 'src/app/services/favorite.service';
import axios from 'axios';

@Component({
  selector: 'app-myfav',
  templateUrl: './myfav.page.html',
  styleUrls: ['./myfav.page.scss'],
})
export class MyfavPage implements OnInit {
  favItems = [];

  constructor(public favService: FavoriteService) {}

  ngOnInit() {
    this.get_fav()
    // this.calculateTotal();
  }
  async get_fav(){
    const AccessToken = sessionStorage.getItem("token")
    const response = await axios.get("http://localhost:5000/get_fav",{
      headers: {
        Authorization: `Bearer ${AccessToken}`
      }
    })
    console.log(response.data)
    if(response.status==200){
      this.favItems=response.data;
      console.log("getting favs success")
    }   

  }
  // calculateTotal(): number {
  //   let total : number= 0;
  //   for (let item of this.favItems) {
  //     total += parseFloat(item.price);
  //   }
  //   return parseFloat(total.toFixed(2));
  // }

  removeItem(item: any): void {
    // this.favService.removeFromFav(item);
    // // this.favItems = this.favService.getFavItems(); // Update cartItems after removal
    // this.calculateTotal()// Recalculate total after removal
  }

}
