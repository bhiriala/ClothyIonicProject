import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  covpic = '../../../assets/couverture.png';
  username: string = '';
  email: string = '';
  phone: string = '';
  image: string = '';
  myarticles = [];

  async user_info() {
    const AccessToken = sessionStorage.getItem('token');
    const response = await axios.get('http://localhost:5000/user_info', {
      headers: {
        Authorization: `Bearer ${AccessToken}`,
      },
    });
    console.log(response.data[0]);
    if (response.status == 200) {
      const { username, email, phone, image, my_articles } = response.data[0];
      this.username = username;
      this.email = email;
      this.phone = phone;
      this.image = image;
      this.myarticles = my_articles;
    }
  }

  logout = () => {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
    console.log('logout');
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.user_info();
  }
}
