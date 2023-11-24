import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Avance } from '../models/avance';
import { EcheanceAvance } from '../models/echeanceAvance';
import { MvtCompte } from '../models/mvtCompte';
import { AvanceDebourse } from '../models/avanceDebourse';
import { Mouvement } from '../models/mouvement';
import { InfosAvance } from '../models/infosAvance';
import { InfosRemboursements } from '../models/infosRemboursements';
import { Deboursement } from '../models/deboursement.model';

@Injectable({
  providedIn: 'root',
})
export class AvanceService {
  baseUrl = environment.baseUrl;
  imagesUrl = environment.imagesUrl;

  constructor(private http: HttpClient) {}

  private _avances$ = new BehaviorSubject<Avance[]>([]);
  get avances$(): Observable<Avance[]> {
    return this._avances$.asObservable();
  }

  getAvancesFromServer() {
    this.http
      .get<Avance[]>(`${this.baseUrl}/avance/avances`)
      .pipe(
        tap((avances) => {
          this._avances$.next(avances);
        })
      )
      .subscribe();
  }

  debourser(mvts: Mouvement): void {
    this.http.post(this.baseUrl + '/avance/debours', mvts).subscribe();
  }

  add(avance: Avance): Observable<number> {
    return this.http.post<number>(this.baseUrl + '/avance/add', avance);
  }

  validate(id: number, deboursement: Deboursement): void {
    this.http
      .post(this.baseUrl + '/avance/validate/' + id.toString(), deboursement)
      .subscribe();
  }
}
