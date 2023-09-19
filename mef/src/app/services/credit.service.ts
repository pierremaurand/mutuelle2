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

  private _echeances$ = new BehaviorSubject<EcheanceCredit[]>([]);
  get echeances$(): Observable<EcheanceCredit[]> {
    return this._echeances$.asObservable();
  }

  private _debourses$ = new BehaviorSubject<CreditDebourse[]>([]);
  get debourses$(): Observable<CreditDebourse[]> {
    return this._debourses$.asObservable();
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

  getEcheancesFromServer() {
    this.http
      .get<EcheanceCredit[]>(`${this.baseUrl}/credit/echeances`)
      .pipe(
        tap((echeances) => {
          this._echeances$.next(echeances);
        })
      )
      .subscribe();
  }

  getDeboursesFromServer() {
    this.http
      .get<CreditDebourse[]>(`${this.baseUrl}/credit/debourses`)
      .pipe(
        tap((debourses) => {
          this._debourses$.next(debourses);
        })
      )
      .subscribe();
  }

  getCreditById(id: number): Observable<Credit> {
    return this.credits$.pipe(
      map((credits) => credits.filter((credit) => credit.id === id)[0])
    );
  }

  getDebourseById(id: number): Observable<CreditDebourse> {
    return this.debourses$.pipe(
      map((debourses) => debourses.filter((debourse) => debourse.id === id)[0])
    );
  }

  getEcheancesCredit(id: number): Observable<EcheanceCredit[]> {
    return this.echeances$.pipe(
      map((echeances) =>
        echeances.filter((echeance) => echeance.creditId === id)
      )
    );
  }

  //------------------------------------------------------------

  getAllEcheances(): Observable<EcheanceCredit[]> {
    return this.http.get<EcheanceCredit[]>(this.baseUrl + '/credit/echeances');
  }

  getDeboursement(creditId: number): Observable<CreditDebourse> {
    return this.http.get<CreditDebourse>(
      this.baseUrl + '/credit/deboursement/' + creditId.toString()
    );
  }

  getAllEcheancesCredit(creditId?: number): Observable<EcheanceCredit[]> {
    return this.http.get<EcheanceCredit[]>(
      this.baseUrl + '/credit/echeances/' + creditId?.toString()
    );
  }

  getAll(): Observable<Credit[]> {
    return this.http.get<Credit[]>(this.baseUrl + '/credit/credits');
  }

  getById(id: number): Observable<Credit> {
    return this.http.get<Credit>(this.baseUrl + '/credit/get/' + id.toString());
  }

  getMouvements(id: number): Observable<Mouvement[]> {
    return this.http.get<Mouvement[]>(
      this.baseUrl + '/credit/getmouvements/' + id.toString()
    );
  }

  getSolde(id: number): Observable<number> {
    return this.http.get<number>(
      this.baseUrl + '/credit/getsolde/' + id.toString()
    );
  }

  getStatus(id: number): Observable<string> {
    return this.http.get<string>(
      this.baseUrl + '/credit/getstatus/' + id.toString()
    );
  }

  getInfosCredit(id: number): Observable<InfosCredit> {
    return this.http.get<InfosCredit>(
      this.baseUrl + '/credit/getinfoscredit/' + id.toString()
    );
  }

  getEcheancier(id: number): Observable<EcheanceCredit[]> {
    return this.http.get<EcheanceCredit[]>(
      this.baseUrl + '/credit/getecheancier/' + id.toString()
    );
  }

  getPhotoUrl(photo?: string): string {
    if (photo && photo !== '') {
      return this.imagesUrl + '/assets/images/' + photo;
    }
    return this.imagesUrl + '/assets/images/default_man.jpg';
  }

  add(credit: Credit): Observable<Credit> {
    return this.http.post<Credit>(this.baseUrl + '/credit/add', credit);
  }

  debourserCredit(
    id: number,
    creditDebourse: CreditDebourse
  ): Observable<CreditDebourse> {
    return this.http.post<CreditDebourse>(
      this.baseUrl + '/credit/deboursercredit/' + id.toString(),
      creditDebourse
    );
  }

  rembourserEcheances(infos: InfosRbCredit): Observable<any> {
    return this.http.post<any>(
      this.baseUrl + '/credit/rembourserEcheances',
      infos
    );
  }

  update(id: number, creditDebourse: CreditDebourse): Observable<Credit> {
    return this.http.put<Credit>(
      this.baseUrl + '/credit/update/' + id.toString(),
      creditDebourse
    );
  }

  addApprobation(credit: CreditDebourse): Observable<CreditDebourse> {
    return this.http.post<CreditDebourse>(
      this.baseUrl + '/credit/addApprobation',
      credit
    );
  }

  addEcheancier(
    id: number,
    echeances: EcheanceCredit[]
  ): Observable<EcheanceCredit[]> {
    return this.http.post<EcheanceCredit[]>(
      this.baseUrl + '/credit/addecheancier/' + id.toString(),
      echeances
    );
  }

  addMvtComptes(mvts: MvtCompte[]): Observable<any> {
    return this.http.post<MvtCompte[]>(
      this.baseUrl + '/credit/addmvtcomptes',
      mvts
    );
  }
}
