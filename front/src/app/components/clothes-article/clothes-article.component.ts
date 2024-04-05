import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-clothes-article',
  templateUrl: './clothes-article.component.html',
  styleUrls: ['./clothes-article.component.scss'],
})
export class ClothesArticleComponent {
  @Input() article: any;

  isFavorite: boolean = false;

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }
  
  constructor() {}
}
