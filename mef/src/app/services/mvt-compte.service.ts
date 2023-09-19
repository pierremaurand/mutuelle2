import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MvtCompte } from '../models/mvtCompte';

@Injectable({
  providedIn: 'root',
})
export class MvtCompteService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<MvtCompte[]> {
    return this.http.get<MvtCompte[]>(this.baseUrl + '/mvtcompte/mvtcomptes');
  }

  getByCompte(id?: number): Observable<MvtCompte[]> {
    return this.http.get<MvtCompte[]>(
      this.baseUrl + '/mvtcompte/mvtcomptes/' + id?.toString()
    );
  }

  getById(id?: number): Observable<MvtCompte> {
    return this.http.get<MvtCompte>(
      this.baseUrl + '/mvtcompte/get/' + id?.toString()
    );
  }

  add(mvtcompte: MvtCompte): Observable<any> {
    return this.http.post(this.baseUrl + '/mvtcompte/add', mvtcompte);
  }

  addMvtComptes(id: number, mvtcomptes: MvtCompte[]): Observable<any> {
    return this.http.post(
      this.baseUrl + '/mvtcompte/addmvtcomptes/' + id.toString(),
      mvtcomptes
    );
  }

  update(mvtcompte: MvtCompte, id: number): Observable<any> {
    return this.http.put(
      this.baseUrl + '/mvtcompte/update/' + id.toString(),
      mvtcompte
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(
      this.baseUrl + '/mvtcompte/delete/' + id.toString()
    );
  }
}
