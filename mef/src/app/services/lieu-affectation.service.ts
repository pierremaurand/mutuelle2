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

  private _lieuxAffectations$ = new BehaviorSubject<LieuAffectation[]>([]);
  get lieuxAffectations$(): Observable<LieuAffectation[]> {
    return this._lieuxAffectations$.asObservable();
  }

  getLieuxAffectationsFromServer() {
    this.http
      .get<LieuAffectation[]>(
        `${this.baseUrl}/lieuAffectation/lieuxAffectations`
      )
      .pipe(
        tap((lieuxAffectations) => {
          this._lieuxAffectations$.next(lieuxAffectations);
        })
      )
      .subscribe();
  }

  getLieuAffectationById(id: number): Observable<LieuAffectation> {
    return this.lieuxAffectations$.pipe(
      map(
        (lieuxAffectations) =>
          lieuxAffectations.filter(
            (lieuAffectation) => lieuAffectation.id === id
          )[0]
      )
    );
  }

  //-------------------------------------------------

  add(lieuaffectation: LieuAffectation): void {
    this.http
      .post(this.baseUrl + '/lieuaffectation/add', lieuaffectation)
      .subscribe();
  }

  update(id: number, lieuaffectation: LieuAffectation): void {
    this.http
      .put(
        this.baseUrl + '/lieuaffectation/update/' + id.toString(),
        lieuaffectation
      )
      .subscribe();
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
