import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-profilearticle',
  templateUrl: './profilearticle.page.html',
  styleUrls: ['./profilearticle.page.scss'],
})
export class ProfilearticlePage implements OnInit {
  covpic = "../../../assets/couverture.png";
  username: string = "";
  email: string = "";
  phone: string = "";
  image: string = "";
  article: any;
  myarticles = [];

  async user_info_article() {
    const AccessToken = sessionStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:5000/user_info_article", {
        headers: {
          Authorization: `Bearer ${AccessToken}`
        },
        params: {
          username: this.article.username
        }
      });
      console.log(response.data);
      if (response.status == 200) {
        const { username, email, phone, image, my_articles } = response.data[0];
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.image = image;
        this.myarticles = my_articles;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.article = history.state.article;
    console.log(this.article.username);
    this.user_info_article();
  }
}
