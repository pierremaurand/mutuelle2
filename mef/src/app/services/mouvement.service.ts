import { Injectable } from '@angular/core';
import { Mouvement } from '../models/mouvement';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MouvementService {
  baseUrl = environment.baseUrl;

  private _mouvements$ = new BehaviorSubject<Mouvement[]>([]);
  get mouvements$(): Observable<Mouvement[]> {
    return this._mouvements$.asObservable();
  }

  constructor(private http: HttpClient) {}

  getMouvementFromServer() {
    console.log('Chargement des mouvements');
    this.http
      .get<Mouvement[]>(`${this.baseUrl}/mouvement/mouvements`)
      .pipe(
        tap((mouvements) => {
          this._mouvements$.next(mouvements);
        })
      )
      .subscribe();
  }
}
