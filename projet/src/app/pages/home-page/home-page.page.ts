import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {

  articles = [
    { id: 1, name: 'Blue Shirt', price: '$19.99', imageUrl: 'https://via.placeholder.com/300x300.png?text=Blue+Shirt' },
    { id: 2, name: 'White Dress', price: '$29.99', imageUrl: 'https://via.placeholder.com/300x300.png?text=White+Dress' },
    { id: 3, name: 'Black Tshirt', price: '$10.99', imageUrl: 'https://via.placeholder.com/300x300.png?text=Black+Tshirt' },
    { id: 4, name: 'Pink Shoes', price: '$39.99', imageUrl: 'https://via.placeholder.com/300x300.png?text=Pink+Shoes' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
