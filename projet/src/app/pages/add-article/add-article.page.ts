import { Component } from '@angular/core';
import { Filesystem, Directory } from '@capacitor/filesystem';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.page.html',
  styleUrls: ['./add-article.page.scss'],
})
export class AddArticlePage {
  name: string = '';
  price?: number ;

  constructor() {}

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
  
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      if (reader.result) {
        const base64Data = reader.result.toString().split(',')[1];
        const savedFile = await Filesystem.writeFile({
          path: 'image.jpg',
          data: base64Data,
          directory: Directory.Data
        });
        console.log('Saved file:', savedFile.uri);
      }
    };
  }
  add(){
    this.name='';
    this.price=0;

  }
  
}
