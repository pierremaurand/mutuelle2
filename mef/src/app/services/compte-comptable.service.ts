import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CompteComptable } from '../models/comptecomptable';

@Injectable({
  providedIn: 'root',
})
export class CompteComptableService {
  baseUrl = environment.baseUrl;
  imagesUrl = environment.imagesUrl;

  constructor(private http: HttpClient) {}

  private _comptes$ = new BehaviorSubject<CompteComptable[]>([]);
  get comptes$(): Observable<CompteComptable[]> {
    return this._comptes$.asObservable();
  }

  getCompteComptablesFromServer() {
    this.http
      .get<CompteComptable[]>(`${this.baseUrl}/compteComptable/comptes`)
      .pipe(
        tap((comptes) => {
          this._comptes$.next(comptes);
        })
      )
      .subscribe();
  }

  getCompteComptableById(id: number): Observable<CompteComptable> {
    return this.comptes$.pipe(
      map((comptes) => comptes.filter((compte) => compte.id === id)[0])
    );
  }

  //-------------------------------------------------------

  getAll(): Observable<CompteComptable[]> {
    return this.http.get<CompteComptable[]>(
      this.baseUrl + '/compteComptable/comptes'
    );
  }

  getById(id: number): Observable<CompteComptable> {
    return this.http.get<CompteComptable>(
      this.baseUrl + '/compteComptable/get/' + id.toString()
    );
  }

  add(compte: CompteComptable): void {
    this.http
      .post(this.baseUrl + '/compteComptable/addcompte', compte)
      .subscribe();
  }

  update(id: number, compte: CompteComptable): void {
    this.http
      .put(this.baseUrl + '/compteComptable/update/' + id.toString(), compte)
      .subscribe();
  }

  delete(id: number): Observable<any> {
    return this.http.delete(
      this.baseUrl + '/compteComptable/delete/' + id.toString()
    );
  }

  getImageUrl(): string {
    return this.imagesUrl + '/assets/images/compte_comptable_image.png';
  }
}
