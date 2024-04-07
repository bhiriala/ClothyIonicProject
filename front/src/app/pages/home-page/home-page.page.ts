import { Component, OnInit } from '@angular/core';
import { FavoriteService } from 'src/app/services/favorite.service';
import axios from 'axios';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {
  articles = []
  async get_articles(){
    const AccessToken = sessionStorage.getItem("token")
    const response = await axios.get("http://localhost:5000/get_articles",{
      headers: {
        Authorization: `Bearer ${AccessToken}`
      }
    })
    console.log(response.data)
    if(response.status==200){
      this.articles=response.data;
    }   
  }

  // articles = [
  //   { id: 1, name: 'Blue Shirt', price: '19.99', imageUrl: 'https://via.placeholder.com/300x300.png?text=Blue+Shirt', isFavorite: false },
  //   { id: 2, name: 'White Dress', price: '29.99', imageUrl: 'https://via.placeholder.com/300x300.png?text=White+Dress', isFavorite: false},
  //   { id: 3, name: 'Black Tshirt', price: '10.99', imageUrl: 'https://via.placeholder.com/300x300.png?text=Black+Tshirt', isFavorite: false},
  //   { id: 4, name: 'Pink Shoes', price: '39.99', imageUrl: 'https://via.placeholder.com/300x300.png?text=Pink+Shoes', isFavorite: false},
  // ];

  constructor(public favoriteService: FavoriteService) { }

  ngOnInit() {
    this.get_articles()
  }

}
