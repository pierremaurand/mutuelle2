import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Gabarit } from '../models/gabarit';
import { Operation } from '../models/operation';

@Injectable({
  providedIn: 'root',
})
export class GabaritService {
  baseUrl = environment.baseUrl;
  imagesUrl = environment.imagesUrl;

  constructor(private http: HttpClient) {}

  private _loading$ = new BehaviorSubject<boolean>(false);
  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  private _gabarits$ = new BehaviorSubject<Gabarit[]>([]);
  get gabarits$(): Observable<Gabarit[]> {
    return this._gabarits$.asObservable();
  }

  private lastGabaritsLoad = 0;

  private setLoadingStatus(loading: boolean) {
    this._loading$.next(loading);
  }

  getGabaritsFromServer() {
    if (Date.now() - this.lastGabaritsLoad <= 300000) {
      return;
    }
    this.setLoadingStatus(true);
    this.http
      .get<Gabarit[]>(`${this.baseUrl}/gabarit/gabarits`)
      .pipe(
        tap((gabarits) => {
          this.lastGabaritsLoad = Date.now();
          this._gabarits$.next(gabarits);
          this.setLoadingStatus(false);
        })
      )
      .subscribe();
  }

  getGabaritById(id: number): Observable<Gabarit> {
    if (!this.lastGabaritsLoad) {
      this.getGabaritsFromServer();
    }
    return this.gabarits$.pipe(
      map((gabarits) => gabarits.filter((gabarit) => gabarit.id === id)[0])
    );
  }

  //--------------------------------------------------------

  getAll(): Observable<Gabarit[]> {
    return this.http.get<Gabarit[]>(this.baseUrl + '/gabarit/gabarits');
  }

  getAllOperations(): Observable<Operation[]> {
    return this.http.get<Operation[]>(this.baseUrl + '/gabarit/operations');
  }

  getAllOperationsGabarit(id: number): Observable<Operation[]> {
    return this.http.get<Operation[]>(
      this.baseUrl + '/gabarit/get/operations/' + id.toString()
    );
  }

  getById(id?: number): Observable<Gabarit> {
    return this.http.get<Gabarit>(
      this.baseUrl + '/gabarit/get/' + id?.toString()
    );
  }

  getAllActive(): Observable<Gabarit[]> {
    return this.http.get<Gabarit[]>(this.baseUrl + '/gabarit/active');
  }

  add(gabarit: Gabarit): Observable<number> {
    return this.http.post<number>(this.baseUrl + '/gabarit/add', gabarit);
  }

  update(gabarit: Gabarit, id: number): Observable<any> {
    return this.http.put(
      this.baseUrl + '/gabarit/update/' + id.toString(),
      gabarit
    );
  }

  deleteGabarit(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/gabarit/delete/' + id.toString());
  }

  getImageUrl(): string {
    return this.imagesUrl + '/assets/images/gabarit_image.png';
  }
}
