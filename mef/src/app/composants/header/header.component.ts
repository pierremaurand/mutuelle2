import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  photo: string = '';
  userName: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.photo = this.authService.getPhotoUrl();
    if (localStorage.getItem('userName') != null) {
      this.userName = localStorage.getItem('userName');
    }
  }
}
