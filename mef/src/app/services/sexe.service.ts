import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sexe } from '../models/sexe';

@Injectable({
  providedIn: 'root',
})
export class SexeService {
  baseUrl = environment.baseUrl;
  imagesUrl = environment.imagesUrl;

  constructor(private http: HttpClient) {}

  private _sexes$ = new BehaviorSubject<Sexe[]>([]);
  get sexes$(): Observable<Sexe[]> {
    return this._sexes$.asObservable();
  }

  getSexesFromServer() {
    this.http
      .get<Sexe[]>(`${this.baseUrl}/sexe/sexes`)
      .pipe(
        tap((sexes) => {
          this._sexes$.next(sexes);
        })
      )
      .subscribe();
  }

  getSexeById(id: number): Observable<Sexe> {
    return this.sexes$.pipe(
      map((sexes) => sexes.filter((sexe) => sexe.id === id)[0])
    );
  }

  //-------------------------------------------------------

  getAll(): Observable<Sexe[]> {
    return this.http.get<Sexe[]>(this.baseUrl + '/sexe/sexes');
  }

  getById(id?: number): Observable<Sexe> {
    return this.http.get<Sexe>(this.baseUrl + '/sexe/get/' + id?.toString());
  }

  add(sexe: Sexe): void {
    this.http.post(this.baseUrl + '/sexe/add', sexe).subscribe();
  }

  update(id: number, sexe: Sexe): void {
    this.http
      .put(this.baseUrl + '/sexe/update/' + id.toString(), sexe)
      .subscribe();
  }

  deleteSexe(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/sexe/delete/' + id.toString());
  }

  getImageUrl(): string {
    return this.imagesUrl + '/assets/images/gender_image.png';
  }
}
