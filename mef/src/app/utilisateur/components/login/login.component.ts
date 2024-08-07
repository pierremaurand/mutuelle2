import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/models/loginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginRequest: LoginRequest = { login: '', password: '' };

  constructor(private router: Router) {}

  ngOnInit(): void {}

  login(): void {
    this.router.navigate(['membre']);
  }
}
