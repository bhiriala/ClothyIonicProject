import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-myarticles',
  templateUrl: './myarticles.component.html',
  styleUrls: ['./myarticles.component.scss'],
})
export class MyarticlesComponent {
  @Input() article: any;
  
  constructor() { }

  ngOnInit() {}

}
