import { Component } from '@angular/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import axios from 'axios';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.page.html',
  styleUrls: ['./add-article.page.scss'],
})
export class AddArticlePage {
  name: string = '';
  price: string = '';
  image: string = '';


  constructor() {}

  async addArticle() {
    const accesToken = sessionStorage.getItem("token");
    const response = await axios.post("http://localhost:5000/addArticle",
    {
      price: this.price,
      name: this.name,
      image: this.image,
  
    },
    {
      headers: {
        Authorization: `Bearer ${accesToken}`
      }
    });
    if (response.status == 200 ){
      console.log("success");
    }

  }



  convertToBase64(event: any) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      this.image = reader.result as string;
      console.log(this.image);
    };
    reader.onerror = error => {
      console.log("Error: ", error);
    };
  }
  
}