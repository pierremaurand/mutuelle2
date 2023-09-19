import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-page-profil',
  templateUrl: './page-profil.component.html',
  styleUrls: ['./page-profil.component.scss'],
})
export class PageProfilComponent implements OnInit {
  photo: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.photo = this.authService.getPhotoUrl();
  }

  modifierMotDePasse(): void {
    this.router.navigate(['changermotdepasse']);
  }
}
