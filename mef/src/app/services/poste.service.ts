import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Poste } from '../models/poste';

@Injectable({
  providedIn: 'root',
})
export class PosteService {
  baseUrl = environment.baseUrl;
  imagesUrl = environment.imagesUrl;

  constructor(private http: HttpClient) {}

  private _postes$ = new BehaviorSubject<Poste[]>([]);
  get postes$(): Observable<Poste[]> {
    return this._postes$.asObservable();
  }

  getPostesFromServer() {
    this.http
      .get<Poste[]>(`${this.baseUrl}/poste/postes`)
      .pipe(
        tap((postes) => {
          this._postes$.next(postes);
        })
      )
      .subscribe();
  }

  getPosteById(id: number): Observable<Poste> {
    return this.postes$.pipe(
      map((postes) => postes.filter((poste) => poste.id === id)[0])
    );
  }

  //-------------------------------------

  getAll(): Observable<Poste[]> {
    return this.http.get<Poste[]>(this.baseUrl + '/poste/postes');
  }

  getById(id?: number): Observable<Poste> {
    return this.http.get<Poste>(this.baseUrl + '/poste/get/' + id?.toString());
  }

  add(poste: Poste): Observable<number> {
    return this.http.post<number>(this.baseUrl + '/poste/add', poste);
  }

  update(poste: Poste, id: number): Observable<any> {
    return this.http.put(
      this.baseUrl + '/poste/update/' + id.toString(),
      poste
    );
  }

  deletePoste(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/poste/delete/' + id.toString());
  }

  getImageUrl(): string {
    return this.imagesUrl + '/assets/images/poste_image.png';
  }
}
