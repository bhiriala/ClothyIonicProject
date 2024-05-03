import { Component } from '@angular/core';
import { Filesystem, Directory } from '@capacitor/filesystem';

// import { Camera, CameraResultType } from '@capacitor/camera';

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
  category: string = '';


  constructor() {}

  async addArticle() {
    const accesToken = sessionStorage.getItem("token");
    const response = await axios.post("http://localhost:5000/addArticle",
    {
      price: this.price,
      name: this.name,
      image: this.image,
      category: this.category
    },
    {
      headers: {
        Authorization: `Bearer ${accesToken}`
      }
    });
    if (response.status == 200 ){
      window.location.reload();
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

  // takePicture = async () => {
  //   const image = await Camera.getPhoto({
  //     quality: 90,
  //     allowEditing: true,
  //     resultType: CameraResultType.Uri
  //   });
  
  //   // image.webPath will contain a path that can be set as an image src.
  //   // You can access the original file using image.path, which can be
  //   // passed to the Filesystem API to read the raw data of the image,
  //   // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
  //   var imageUrl = image.webPath;
  
  //   // Can be set to the src of an image now
  //   this.image = imageUrl;
  // };
  
}