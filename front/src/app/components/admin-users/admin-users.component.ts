import { Component, Input, OnInit } from '@angular/core';
import axios from 'axios';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
})
export class AdminUsersComponent implements OnInit {
  @Input() article: any;
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}
  async deluser() {
    console.log(this.article._id);
    const yourAccessToken = sessionStorage.getItem('token');
    try {
      const response = await axios.put(
        'http://localhost:5000/deluser',
        { id: this.article._id },
        {
          headers: {
            Authorization: `Bearer ${yourAccessToken}`,
          },
        }
      );
      if (response.status == 200) {
        console.log('user deleted successfully', response.data);
        window.location.reload();
      }
    } catch (error) {
      console.error('Error updating article:', error);
    }
  }
}
