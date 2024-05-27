import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.page.html',
  styleUrls: ['./admin-page.page.scss'],
})
export class AdminPagePage implements OnInit {
  image: string = '';
  name: string = '';

  users_clicked = false;
  articles_clicked = false;

  articles: any[] = [];
  users: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.allArticles();
    this.allUsers();
  }

  async allUsers() {
    const AccessToken = sessionStorage.getItem('token');
    const response = await axios.get('http://localhost:5000/userss', {
      headers: {
        Authorization: `Bearer ${AccessToken}`,
      },
    });
    console.log(response.data);
    if (response.status == 200) {
      const { users } = response.data;
      this.users = users;
    }
  }

  async allArticles() {
    const AccessToken = sessionStorage.getItem('token');
    const response = await axios.get('http://localhost:5000/articless', {
      headers: {
        Authorization: `Bearer ${AccessToken}`,
      },
    });
    console.log(response.data);
    if (response.status == 200) {
      const { articles } = response.data;
      this.articles = articles;
    }
  }

  manageUsers() {
    this.users_clicked = !this.users_clicked;
    this.articles_clicked = false;
  }

  manageArticles() {
    this.articles_clicked = !this.articles_clicked;
    this.users_clicked = false;
  }

  logout = () => {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  };
}
