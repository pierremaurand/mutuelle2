import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LieuAffectation } from '../models/lieuAffectation';

@Injectable({
  providedIn: 'root',
})
export class LieuAffectationService {
  baseUrl = environment.baseUrl;
  imagesUrl = environment.imagesUrl;

  constructor(private http: HttpClient) {}

  private _lieux$ = new BehaviorSubject<LieuAffectation[]>([]);
  get lieux$(): Observable<LieuAffectation[]> {
    return this._lieux$.asObservable();
  }

  getLieuxFromServer() {
    this.http
      .get<LieuAffectation[]>(
        `${this.baseUrl}/lieuaffectation/lieuaffectations`
      )
      .pipe(
        tap((lieux) => {
          this._lieux$.next(lieux);
        })
      )
      .subscribe();
  }

  getLieuById(id: number): Observable<LieuAffectation> {
    return this.lieux$.pipe(
      map((lieux) => lieux.filter((lieu) => lieu.id === id)[0])
    );
  }

  //-------------------------------------------------

  getAll(): Observable<LieuAffectation[]> {
    return this.http.get<LieuAffectation[]>(
      this.baseUrl + '/lieuaffectation/lieuaffectations'
    );
  }

  getById(id?: number): Observable<LieuAffectation> {
    return this.http.get<LieuAffectation>(
      this.baseUrl + '/lieuaffectation/get/' + id?.toString()
    );
  }

  add(lieuaffectation: LieuAffectation): Observable<number> {
    return this.http.post<number>(
      this.baseUrl + '/lieuaffectation/add',
      lieuaffectation
    );
  }

  update(lieuaffectation: LieuAffectation, id: number): Observable<any> {
    return this.http.put(
      this.baseUrl + '/lieuaffectation/update/' + id.toString(),
      lieuaffectation
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(
      this.baseUrl + '/lieuaffectation/delete/' + id.toString()
    );
  }

  getImageUrl(): string {
    return this.imagesUrl + '/assets/images/building.png';
  }
}
