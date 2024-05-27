import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { FavoriteService } from 'src/app/services/favorite.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {
  all_articles: any[] = [];
  fav_articles: any[] = [];

  filteredArticles: any[] = [];
  searchText = "";

  // men: any[] = [];
  // women: any[] = [];

  men_clicked = false;
  women_clicked = false;

  constructor(public favoriteService: FavoriteService) {}

  async ngOnInit() {
    await this.getArticles();
  }

  async getArticles() {
    try {
      const accessToken = sessionStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/get_articles', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        const { favorite_articles, articles,all_articles} = response.data;
        // const { favorite_articles, articles, men, women } = response.data;
        // this.articles = articles;
        this.fav_articles = favorite_articles;
        this.filteredArticles = articles;
        this.all_articles = all_articles;
        console.log(this.all_articles)
        console.log(this.fav_articles)
        console.log(this.filteredArticles)
        // this.men = men;
        // this.women = women;
      } else {
        console.error('Failed to fetch articles:', response.status);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  }

  menClickedFunction() {
    this.men_clicked = !this.men_clicked;
    this.women_clicked = false;
  }

  womenClickedFunction() {
    this.women_clicked = !this.women_clicked;
    this.men_clicked = false;
  }

  // isArticleLiked(article: any): boolean {
  //   return this.fav_articles.some((favArticle) => favArticle.id == article.id);
  // }
}
