import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Avance } from '../models/avance';
import { Mouvement } from '../models/mouvement';
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

  debourser(mvts: Mouvement): Observable<any> {
    return this.http.post(this.baseUrl + '/avance/debours', mvts);
  }

  add(avance: Avance): Observable<any> {
    return this.http.post<number>(this.baseUrl + '/avance/add', avance);
  }

  validate(id: number, deboursement: Deboursement): Observable<any> {
    return this.http.post(
      this.baseUrl + '/avance/validate/' + id.toString(),
      deboursement
    );
  }
}
