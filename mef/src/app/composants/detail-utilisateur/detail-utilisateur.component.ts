import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-detail-utilisateur',
  templateUrl: './detail-utilisateur.component.html',
  styleUrls: ['./detail-utilisateur.component.scss'],
})
export class DetailUtilisateurComponent implements OnInit {
  photo: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.photo = this.authService.getPhotoUrl();
  }
}
