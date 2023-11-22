import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Echeance } from '../models/echeance.model';
import { Mouvement } from '../models/mouvement';

@Injectable({
  providedIn: 'root',
})
export class EcheanceService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  private _echeances$ = new BehaviorSubject<Echeance[]>([]);
  get echeances$(): Observable<Echeance[]> {
    return this._echeances$.asObservable();
  }

  getEcheancesFromServer() {
    this.http
      .get<Echeance[]>(`${this.baseUrl}/echeance/list`)
      .pipe(
        tap((echeances) => {
          this._echeances$.next(echeances);
        })
      )
      .subscribe();
  }

  getEcheanceById(id: number): Observable<Echeance> {
    return this.echeances$.pipe(
      map((echeances) => echeances.filter((echeance) => echeance.id === id)[0])
    );
  }

  addEcheances(echeances: Echeance[]): Observable<number> {
    return this.http.post<number>(this.baseUrl + '/echeance/add', echeances);
  }

  enregistrerMouvement(mvts: Mouvement): void {
    this.http.post(this.baseUrl + '/echeance/addPayement', mvts).subscribe();
  }

  getEcheancierAvance(id: number): Observable<Echeance[]> {
    return this.echeances$.pipe(
      map((echeances) =>
        echeances.filter((echeance) => echeance.avanceId === id)
      )
    );
  }

  getEcheancierCredit(id: number): Observable<Echeance[]> {
    return this.echeances$.pipe(
      map((echeances) =>
        echeances.filter((echeance) => echeance.creditId === id)
      )
    );
  }
}
