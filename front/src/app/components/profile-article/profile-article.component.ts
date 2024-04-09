import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-profile-article',
  templateUrl: './profile-article.component.html',
  styleUrls: ['./profile-article.component.scss'],
})
export class ProfileArticleComponent  {

  @Input() article: any;

  constructor() { }

  ngOnInit() {}


}
