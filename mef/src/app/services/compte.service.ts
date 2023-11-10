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
    this.http
      .get<Mouvement[]>(`${this.baseUrl}/compte/mouvements`)
      .pipe(
        tap((mouvements) => {
          this._mouvements$.next(mouvements);
        })
      )
      .subscribe();
  }

  getMembreMouvements(id: number): Observable<Mouvement[]> {
    return this.mouvements$.pipe(
      map((mouvements) =>
        mouvements.filter((mouvement) => mouvement.membreId === id)
      )
    );
  }

  getMouvementsAvance(id: number): Observable<Mouvement[]> {
    return this.mouvements$.pipe(
      map((mouvements) =>
        mouvements.filter((mouvement) => mouvement.avanceId === id)
      )
    );
  }

  getMouvementsCredit(id: number): Observable<Mouvement[]> {
    return this.mouvements$.pipe(
      map((mouvements) =>
        mouvements.filter((mouvement) => mouvement.creditId === id)
      )
    );
  }

  getMouvementsMembre(id: number): Observable<Mouvement[]> {
    return this.mouvements$.pipe(
      map((mouvements) =>
        mouvements.filter((mouvement) => mouvement.membreId === id)
      )
    );
  }

  getMouvementsCotisation(id: number): Observable<Mouvement[]> {
    return this.mouvements$.pipe(
      map((mouvements) =>
        mouvements.filter((mouvement) => mouvement.cotisationId === id)
      )
    );
  }

  getMouvementsDeboursement(id: number): Observable<Mouvement[]> {
    return this.mouvements$.pipe(
      map((mouvements) =>
        mouvements.filter((mouvement) => mouvement.deboursementId === id)
      )
    );
  }

  getMouvementsEcheance(id: number): Observable<Mouvement[]> {
    return this.mouvements$.pipe(
      map((mouvements) =>
        mouvements.filter((mouvement) => mouvement.echeanceId === id)
      )
    );
  }

  getMouvementsEcheancesAvances(): Observable<Mouvement[]> {
    return this.mouvements$.pipe(
      map((mouvements) =>
        mouvements.filter((mouvement) => mouvement.echeanceId)
      )
    );
  }

  ajouterMouvement(mouvement: Mouvement): void {
    this.mouvements$.pipe(
      tap((mouvements) => {
        const mouvementsUpdated = [mouvement, ...mouvements];
        console.log(mouvementsUpdated);
        this._mouvements$.next(mouvementsUpdated);
      })
    );
  }

  //---------------------------------------------------

  getAllComptes(): Observable<CompteList[]> {
    return this.http.get<CompteList[]>(this.baseUrl + '/compte/comptes');
  }

  getSoldeMembre(id: number): Observable<number> {
    return this.http.get<number>(
      this.baseUrl + '/compte/getSolde/' + id.toString()
    );
  }

  getAllMvts(id: number): Observable<Mouvement[]> {
    return this.http.get<Mouvement[]>(
      this.baseUrl + '/compte/mvtsmembre/' + id.toString()
    );
  }

  getById(id?: number): Observable<Membre> {
    return this.http.get<Membre>(
      this.baseUrl + '/compte/get/' + id?.toString()
    );
  }

  enregistrerMouvement(mvts: Mouvement): void {
    this.http
      .post(this.baseUrl + '/compte/addmouvement', mvts)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
