import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Operation } from '../models/operation';

@Injectable({
  providedIn: 'root',
})
export class OperationService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAll(id?: number): Observable<Operation[]> {
    return this.http.get<Operation[]>(
      this.baseUrl + '/operation/operations/' + id?.toString()
    );
  }

  add(id: number, operations: Operation[]): Observable<any> {
    return this.http.post(
      this.baseUrl + '/operation/add/' + id.toString(),
      operations
    );
  }
}
