import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-changer-mot-de-passe',
  templateUrl: './changer-mot-de-passe.component.html',
  styleUrls: ['./changer-mot-de-passe.component.scss'],
})
export class ChangerMotDePasseComponent implements OnInit {
  photo: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.photo = this.authService.getPhotoUrl();
  }

  cancel(): void {
    this.router.navigate(['profil']);
  }
}
