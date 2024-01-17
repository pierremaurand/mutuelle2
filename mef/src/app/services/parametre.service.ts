import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Parametre } from '../models/parametre.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ParametreService {
  baseUrl = environment.baseUrl;
  imagesUrl = environment.imagesUrl;

  constructor(private http: HttpClient) {}

  private _parametres$ = new BehaviorSubject<Parametre[]>([]);
  get parametres$(): Observable<Parametre[]> {
    return this._parametres$.asObservable();
  }

  getParametresFromServer() {
    this.http
      .get<Parametre[]>(`${this.baseUrl}/parametre/parametres`)
      .pipe(
        tap((parametres) => {
          this._parametres$.next(parametres);
        })
      )
      .subscribe();
  }

  getParametreById(id: number): Observable<Parametre> {
    return this.parametres$.pipe(
      map(
        (parametres) => parametres.filter((parametre) => parametre.id === id)[0]
      )
    );
  }

  //-------------------------------------

  getAll(): Observable<Parametre[]> {
    return this.http.get<Parametre[]>(this.baseUrl + '/parametre/parametres');
  }

  getById(id?: number): Observable<Parametre> {
    return this.http.get<Parametre>(
      this.baseUrl + '/parametre/get/' + id?.toString()
    );
  }

  add(parametre: Parametre): void {
    this.http.post(this.baseUrl + '/parametre/add', parametre).subscribe();
  }

  update(id: number, parametre: Parametre): void {
    this.http
      .put(this.baseUrl + '/parametre/update/' + id.toString(), parametre)
      .subscribe();
  }

  deleteParametre(id: number): Observable<any> {
    return this.http.delete(
      this.baseUrl + '/parametre/delete/' + id.toString()
    );
  }

  getImageUrl(): string {
    return this.imagesUrl + '/assets/images/gabarit_image.png';
  }
}
