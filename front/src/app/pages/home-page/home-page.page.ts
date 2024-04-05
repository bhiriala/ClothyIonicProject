import { Component, OnInit } from '@angular/core';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {

  articles = [
    { id: 1, name: 'Blue Shirt', price: '19.99', imageUrl: 'https://via.placeholder.com/300x300.png?text=Blue+Shirt', isFavorite: false },
    { id: 2, name: 'White Dress', price: '29.99', imageUrl: 'https://via.placeholder.com/300x300.png?text=White+Dress', isFavorite: false},
    { id: 3, name: 'Black Tshirt', price: '10.99', imageUrl: 'https://via.placeholder.com/300x300.png?text=Black+Tshirt', isFavorite: false},
    { id: 4, name: 'Pink Shoes', price: '39.99', imageUrl: 'https://via.placeholder.com/300x300.png?text=Pink+Shoes', isFavorite: false},
  ];

  constructor(public favoriteService: FavoriteService) { }

  ngOnInit() {
  }

}
