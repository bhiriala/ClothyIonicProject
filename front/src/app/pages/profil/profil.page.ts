import { Component, OnInit } from '@angular/core';
import { MyarticlesModule } from 'src/app/components/myarticles/myarticles.module';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  covpic="../../../assets/couverture.png"
  profilpic="../../../assets/profilpic.png"
  
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
