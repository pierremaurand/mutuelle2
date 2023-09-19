import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cotisation } from '../models/cotisation';
import { Membre } from '../models/membre.model';
import { Mois } from '../models/mois';
import { CotisationList } from '../models/cotisation-list';

@Injectable({
  providedIn: 'root',
})
export class CotisationService {
  baseUrl = environment.baseUrl;
  imagesUrl = environment.imagesUrl;

  constructor(private http: HttpClient) {}

  private _cotisations$ = new BehaviorSubject<Cotisation[]>([]);
  get cotisations$(): Observable<Cotisation[]> {
    return this._cotisations$.asObservable();
  }

  private _mois$ = new BehaviorSubject<Mois[]>([]);
  get mois$(): Observable<Mois[]> {
    return this._mois$.asObservable();
  }

  getCotisationsFromServer() {
    this.http
      .get<Cotisation[]>(`${this.baseUrl}/cotisation/cotisations`)
      .pipe(
        tap((cotisations) => {
          this._cotisations$.next(cotisations);
        })
      )
      .subscribe();
  }

  getCotisationsMembre(id: number): Observable<Cotisation[]> {
    return this.cotisations$.pipe(
      map((cotisations) =>
        cotisations.filter((cotisation) => cotisation.membreId === id)
      )
    );
  }

  getMoisFromServer() {
    this.http
      .get<Mois[]>(`${this.baseUrl}/cotisation/mois`)
      .pipe(
        tap((mois) => {
          this._mois$.next(mois);
        })
      )
      .subscribe();
  }

  getMoisById(id: number): Observable<Mois> {
    return this.mois$.pipe(map((mois) => mois.filter((m) => m.id === id)[0]));
  }

  getCotisationById(id: number): Observable<Cotisation> {
    return this.cotisations$.pipe(
      map(
        (cotisation) =>
          cotisation.filter((cotisation) => cotisation.id === id)[0]
      )
    );
  }

  ajoutCotisation(id: number, cotisation: Cotisation): void {
    this.addCotisation(id, cotisation).subscribe(() => {});
  }

  //----------------------------------------------

  getAllCotisations(): Observable<CotisationList[]> {
    return this.http.get<CotisationList[]>(
      this.baseUrl + '/cotisation/cotisations'
    );
  }

  getSoldeMembre(id: number): Observable<number> {
    return this.http.get<number>(
      this.baseUrl + '/cotisation/getSolde/' + id.toString()
    );
  }

  getAllMois(): Observable<Mois[]> {
    return this.http.get<Mois[]>(this.baseUrl + '/cotisation/mois');
  }

  getById(id?: number): Observable<Membre> {
    return this.http.get<Membre>(
      this.baseUrl + '/cotisation/get/' + id?.toString()
    );
  }

  addCotisation(id: number, cotisations: Cotisation): Observable<any> {
    return this.http.post(
      this.baseUrl + '/cotisation/addcotisation/' + id.toString(),
      cotisations
    );
  }
}
