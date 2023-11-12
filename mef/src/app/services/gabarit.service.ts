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

  private _gabarits$ = new BehaviorSubject<Gabarit[]>([]);
  get gabarits$(): Observable<Gabarit[]> {
    return this._gabarits$.asObservable();
  }

  getGabaritsFromServer() {
    this.http
      .get<Gabarit[]>(`${this.baseUrl}/gabarit/gabarits`)
      .pipe(
        tap((gabarits) => {
          this._gabarits$.next(gabarits);
        })
      )
      .subscribe();
  }

  getGabaritById(id: number): Observable<Gabarit> {
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

  add(gabarit: Gabarit): void {
    this.http.post<number>(this.baseUrl + '/gabarit/add', gabarit).subscribe();
  }

  update(id: number, gabarit: Gabarit): void {
    this.http
      .put(this.baseUrl + '/gabarit/update/' + id.toString(), gabarit)
      .subscribe();
  }

  deleteGabarit(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/gabarit/delete/' + id.toString());
  }

  getImageUrl(): string {
    return this.imagesUrl + '/assets/images/gabarit_image.png';
  }
}
