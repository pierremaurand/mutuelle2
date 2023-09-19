import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginReq } from 'src/app/models/loginReq';
import { LoginRes } from 'src/app/models/loginRes';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss'],
})
export class PageLoginComponent implements OnInit {
  loginReq: LoginReq = new LoginReq();

  loginForm!: FormGroup;
  loginCtrl!: FormControl;
  passwordCtrl!: FormControl;

  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initControls();
    this.initForms();
  }

  private initControls(): void {
    this.loginCtrl = this.fb.control('', Validators.required);
    this.passwordCtrl = this.fb.control('', Validators.required);
  }

  private initForms(): void {
    this.loginForm = this.fb.group({
      login: this.loginCtrl,
      password: this.passwordCtrl,
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this.authService
        .authUser(this.loginForm.value)
        .subscribe((loginRes: LoginRes) => {
          this.authService.setInfosUser(loginRes);
          this.alertifyService.success('Vous êtes maintenant connecté');
          this.router.navigate(['']);
        });
    } else {
      this.alertifyService.error(
        "L'identifiant ou le mot de passe n'est pas renseigné"
      );
    }
  }

  checkLoginForm(): boolean {
    if (this.loginReq.login == '' || this.loginReq.password == '') {
      return false;
    }
    return true;
  }
}
