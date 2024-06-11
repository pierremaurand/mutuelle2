import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../models/loginRequest';
import { LoginRes } from '../models/loginRes';
import { UserForRegister } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  baseUrl = environment.baseUrl;
  imagesUrl = environment.imagesUrl;

  private _loading$ = new BehaviorSubject<boolean>(false);
  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  constructor(private http: HttpClient, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.isAuthenticateUser();
  }

  authUser(loginRequest: LoginRequest): Observable<LoginRes> {
    return this.http.post<LoginRes>(
      this.baseUrl + '/utilisateur/login',
      loginRequest
    );
  }

  registerUser(user: UserForRegister) {
    return this.http.post(this.baseUrl + '/utilisateur/add', user);
  }

  getPhotoUrl(): string {
    return this.imagesUrl + '/assets/images/default_man.jpg';
  }

  setInfosUser(loginRes: LoginRes): void {
    localStorage.setItem('userName', loginRes.nom);
    localStorage.setItem('id', loginRes.id.toString());
    // localStorage.setItem('membreId', loginRes.membreId.toString());
    localStorage.setItem('token', loginRes.token);
  }

  getUserId(): number {
    if (localStorage.getItem('id')) {
      const id = localStorage.getItem('id') as string;
      return parseInt(id);
    }
    return 0;
  }

  getMembreId(): number {
    if (localStorage.getItem('membreId')) {
      const id = localStorage.getItem('membreId') as string;
      return parseInt(id);
    }
    return 0;
  }

  isAuthenticateUser(): boolean {
    const token = localStorage.getItem('token');
    if (token && !this.tokenExpired(token)) {
      return true;
    }
    this.logout();
    return false;
  }

  private tokenExpired(token: string) {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
