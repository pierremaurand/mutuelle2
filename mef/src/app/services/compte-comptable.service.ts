import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CompteComptable } from '../models/comptecomptable';

@Injectable({
  providedIn: 'root',
})
export class CompteComptableService {
  baseUrl = environment.baseUrl;
  imagesUrl = environment.imagesUrl;

  constructor(private http: HttpClient) {}

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

  add(compte: CompteComptable): Observable<any> {
    return this.http.post(this.baseUrl + '/compteComptable/addcompte', compte);
  }

  update(compte: any, id: number): Observable<any> {
    return this.http.put(
      this.baseUrl + '/compteComptable/update/' + id.toString(),
      compte
    );
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
