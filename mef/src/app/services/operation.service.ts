import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Operation } from '../models/operation';

@Injectable({
  providedIn: 'root',
})
export class OperationService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  private _operations$ = new BehaviorSubject<Operation[]>([]);
  get operations$(): Observable<Operation[]> {
    return this._operations$.asObservable();
  }

  getOperationsFromServer() {
    this.http
      .get<Operation[]>(`${this.baseUrl}/operation/operations`)
      .pipe(
        tap((operations) => {
          this._operations$.next(operations);
        })
      )
      .subscribe();
  }
}
