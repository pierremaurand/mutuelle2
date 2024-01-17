import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Credit } from '../models/credit';
import { Mouvement } from '../models/mouvement';
import { Deboursement } from '../models/deboursement.model';

@Injectable({
  providedIn: 'root',
})
export class CreditService {
  baseUrl = environment.baseUrl;
  imagesUrl = environment.imagesUrl;

  constructor(private http: HttpClient) {}

  private _credits$ = new BehaviorSubject<Credit[]>([]);
  get credits$(): Observable<Credit[]> {
    return this._credits$.asObservable();
  }

  getCreditsFromServer() {
    this.http
      .get<Credit[]>(`${this.baseUrl}/credit/credits`)
      .pipe(
        tap((credits) => {
          this._credits$.next(credits);
        })
      )
      .subscribe();
  }

  debourser(mvts: Mouvement[]): Observable<any> {
    return this.http.post(this.baseUrl + '/credit/debours', mvts);
  }

  validate(id: number, deboursement: Deboursement): Observable<any> {
    return this.http.post(
      this.baseUrl + '/credit/validate/' + id.toString(),
      deboursement
    );
  }

  add(credit: Credit): Observable<Credit> {
    return this.http.post<Credit>(this.baseUrl + '/credit/add', credit);
  }
}
