import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favItems: any[] = [];

  constructor() {}

  addToFav(item: any) {
    item.isFavorite = true; 
    this.favItems.push(item);
  }

  removeFromFav(item: any){
    item.isFavorite = false;
    const index = this.favItems.indexOf(item);
    if(index != -1){
      this.favItems.splice(index, 1);
    }
  }

  getFavItems() {
    return this.favItems;
  }
}
