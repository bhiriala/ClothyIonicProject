import { Component, OnInit } from '@angular/core';
import { MyarticlesModule } from 'src/app/components/myarticles/myarticles.module';
import axios from 'axios';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  covpic="../../../assets/couverture.png"
  username : string = ""
  email : string = ""
  phone : string = ""
  image : string = ""
  myarticles = []
  async user_info(){
    const AccessToken = sessionStorage.getItem("token")
    const response = await axios.get("http://localhost:5000/user_info",{
      headers: {
        Authorization: `Bearer ${AccessToken}`
      }
    })
    console.log(response.data[0])
    if(response.status==200){
      const { username, email, phone, image, my_articles } = response.data[0];
      this.username=username
      this.email=email
      this.phone=phone
      this.image=image
      this.myarticles=my_articles
    }   
  }
  
  // articles = [
  //   { id: 1, name: 'Blue Shirt', price: '$19.99', imageUrl: 'https://via.placeholder.com/300x300.png?text=Blue+Shirt' },
  //   { id: 2, name: 'White Dress', price: '$29.99', imageUrl: 'https://via.placeholder.com/300x300.png?text=White+Dress' },
  //   { id: 3, name: 'Black Tshirt', price: '$10.99', imageUrl: 'https://via.placeholder.com/300x300.png?text=Black+Tshirt' },
  //   { id: 4, name: 'Pink Shoes', price: '$39.99', imageUrl: 'https://via.placeholder.com/300x300.png?text=Pink+Shoes' },
  // ];

  constructor() { }

  ngOnInit() {
    this.user_info()
  }

}
