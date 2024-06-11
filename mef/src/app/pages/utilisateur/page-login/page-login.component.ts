import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/models/loginRequest';
import { LoginRes } from 'src/app/models/loginRes';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss'],
})
export class PageLoginComponent {
  loginRequest: LoginRequest = { login: '', password: '' };

  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyService,
    private router: Router
  ) {}

  login(): void {
    this.authService
      .authUser(this.loginRequest)
      .subscribe((loginRes: LoginRes) => {
        this.authService.setInfosUser(loginRes);
        this.alertifyService.success('Vous êtes maintenant connecté');
        this.router.navigate(['']);
      });
  }
}
