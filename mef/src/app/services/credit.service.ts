import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Credit } from '../models/credit';
import { EcheanceCredit } from '../models/echeanceCredit';
import { MvtCompte } from '../models/mvtCompte';
import { CreditDebourse } from '../models/creditDebourse';
import { Mouvement } from '../models/mouvement';
import { InfosCredit } from '../models/infosCredit';
import { CreditInfos } from '../models/credit-infos.model';
import { InfosRbCredit } from '../models/infos-rb-credit.model';
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

  debourser(mvts: Mouvement[]): void {
    console.log(mvts);
    this.http.post(this.baseUrl + '/credit/debours', mvts).subscribe();
  }

  validate(id: number, deboursement: Deboursement): void {
    console.log(deboursement);
    this.http
      .post(this.baseUrl + '/credit/validate/' + id.toString(), deboursement)
      .subscribe();
  }

  add(credit: Credit): Observable<Credit> {
    return this.http.post<Credit>(this.baseUrl + '/credit/add', credit);
  }
}
