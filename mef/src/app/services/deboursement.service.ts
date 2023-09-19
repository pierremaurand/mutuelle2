import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Deboursement } from '../models/deboursement.model';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeboursementService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  private _deboursements$ = new BehaviorSubject<Deboursement[]>([]);
  get deboursements$(): Observable<Deboursement[]> {
    return this._deboursements$.asObservable();
  }

  getDeboursementsFromServer() {
    this.http
      .get<Deboursement[]>(`${this.baseUrl}/deboursement/list`)
      .pipe(
        tap((deboursements) => {
          this._deboursements$.next(deboursements);
        })
      )
      .subscribe();
  }

  getDeboursementById(id: number): Observable<Deboursement> {
    return this.deboursements$.pipe(
      map(
        (deboursements) =>
          deboursements.filter((deboursement) => deboursement.id === id)[0]
      )
    );
  }

  deboursementAvance(
    id: number,
    deboursement: Deboursement
  ): Observable<number> {
    return this.http.post<number>(
      this.baseUrl + '/deboursement/deboursementavance/' + id.toString(),
      deboursement
    );
  }
}
