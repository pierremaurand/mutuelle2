import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Membre } from '../models/membre.model';
import { CompteList } from '../models/compteList';
import { Mouvement } from '../models/mouvement';

@Injectable({
  providedIn: 'root',
})
export class CompteService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  private _loading$ = new BehaviorSubject<boolean>(false);
  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  private _mouvements$ = new BehaviorSubject<Mouvement[]>([]);
  get mouvements$(): Observable<Mouvement[]> {
    return this._mouvements$.asObservable();
  }

  getMouvementsFromServer(): void {
    console.log('Chargement de mouvements');
    this.http
      .get<Mouvement[]>(`${this.baseUrl}/compte/mouvements`)
      .pipe(
        tap((mouvements) => {
          this._mouvements$.next(mouvements);
        })
      )
      .subscribe();
  }

  enregistrerMouvement(mvts: Mouvement): void {
    this.http.post(this.baseUrl + '/compte/addmouvement', mvts).subscribe();
  }
}
