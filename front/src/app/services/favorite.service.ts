import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favItems: any[] = [];

  constructor() {}

  async addToFav(item: any) {
    item.isFavorite = true; 
    const accesToken = sessionStorage.getItem("token");
    const response = await axios.post("http://localhost:5000/addToFav",
    {
      price: item.price,
      name: item.name,
      image: item.image
    },
    {
      headers: {
        Authorization: `Bearer ${accesToken}`
      }
    });
    if (response.status == 200 ){
      console.log("success");
    }

    // this.favItems.push(item);
  }

  async removeFromFav(item: any){
    item.isFavorite = false;
    const accesToken = sessionStorage.getItem("token");
    const response = await axios.delete('http://localhost:5000/removefromfavoris', {
      headers: {
        Authorization: `Bearer ${accesToken}`
      },
        data: { name: item.name }
    });

    if (response.status == 200 ){
      console.log("success");
    }

    // const index = this.favItems.indexOf(item);
    // if(index != -1){
    //   this.favItems.splice(index, 1);
    // }
  }

  getFavItems() {
    return this.favItems;
  }
}
