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
  fav_articles = []
  async get_articles(){
    const AccessToken = sessionStorage.getItem("token")
    const response = await axios.get("http://localhost:5000/get_articles",{
      headers: {
        Authorization: `Bearer ${AccessToken}`
      }
    })
    // console.log(response.data)
    if(response.status==200){
      const { favorite_articles, articles } = response.data;
      console.log(articles)
      this.articles=articles;
      this.fav_articles = favorite_articles
    }   
  }

  constructor(public favoriteService: FavoriteService) { }

  ngOnInit() {
    this.get_articles()
  }

}
