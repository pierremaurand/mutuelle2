import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Utilisateur } from '../models/utilisateur';
import { InfosPassword } from '../models/infosPassword';

@Injectable({
  providedIn: 'root',
})
export class UtilisateurService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  private _utilisateurs$ = new BehaviorSubject<Utilisateur[]>([]);
  get utilisateurs$(): Observable<Utilisateur[]> {
    return this._utilisateurs$.asObservable();
  }

  getUtilisateursFromServer() {
    this.http
      .get<Utilisateur[]>(`${this.baseUrl}/utilisateur/utilisateurs`)
      .pipe(
        tap((utilisateurs) => {
          this._utilisateurs$.next(utilisateurs);
        })
      )
      .subscribe();
  }

  getUtilisateurById(id: number): Observable<Utilisateur> {
    return this.utilisateurs$.pipe(
      map(
        (utilisateurs) =>
          utilisateurs.filter((utilisateur) => utilisateur.id === id)[0]
      )
    );
  }

  add(utilisateur: Utilisateur): Observable<any> {
    return this.http.post(this.baseUrl + '/utilisateur/add', utilisateur);
  }

  initPassword(id: number, utilisateur: Utilisateur): Observable<any> {
    return this.http.put(
      this.baseUrl + '/utilisateur/initPassword/' + id.toString(),
      utilisateur
    );
  }

  changePassword(infosPassword: InfosPassword): Observable<any> {
    return this.http.put(
      this.baseUrl + '/utilisateur/changePassword',
      infosPassword
    );
  }

  update(id: number, utilisateur: Utilisateur): Observable<any> {
    return this.http.put(
      this.baseUrl + '/utilisateur/update/' + id.toString(),
      utilisateur
    );
  }
}
