import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favItems: any[] = [];

  constructor() {}

  async addToFav(item: any) {
    const accesToken = sessionStorage.getItem("token");
    const response = await axios.post("http://192.168.1.110:5000/addToFav",
    {
      id: item._id,
      price: item.price,
      username:item.username,
      name: item.name,
      image: item.image,
      category: item.category
    },
    {
      headers: {
        Authorization: `Bearer ${accesToken}`
      }
    });
    if (response.status == 200 ){
      window.location.reload();
      console.log("success");
    }

  }

  async removeFromFav(item: any){
    const accesToken = sessionStorage.getItem("token");
    const response = await axios.delete('http://192.168.1.110:5000/removefromfavoris', {
      headers: {
        Authorization: `Bearer ${accesToken}`
      },
        data: { name: item.name }
    });

    if (response.status == 200 ){
      window.location.reload();
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
