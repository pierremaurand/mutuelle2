import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Avance } from '../models/avance';
import { EcheanceAvance } from '../models/echeanceAvance';
import { MvtCompte } from '../models/mvtCompte';
import { AvanceDebourse } from '../models/avanceDebourse';
import { Mouvement } from '../models/mouvement';
import { InfosAvance } from '../models/infosAvance';
import { InfosRemboursements } from '../models/infosRemboursements';

@Injectable({
  providedIn: 'root',
})
export class AvanceService {
  baseUrl = environment.baseUrl;
  imagesUrl = environment.imagesUrl;

  constructor(private http: HttpClient) {}

  private _avances$ = new BehaviorSubject<Avance[]>([]);
  get avances$(): Observable<Avance[]> {
    return this._avances$.asObservable();
  }

  private _echeances$ = new BehaviorSubject<EcheanceAvance[]>([]);
  get echeances$(): Observable<EcheanceAvance[]> {
    return this._echeances$.asObservable();
  }

  private _debourses$ = new BehaviorSubject<AvanceDebourse[]>([]);
  get debourses$(): Observable<AvanceDebourse[]> {
    return this._debourses$.asObservable();
  }

  getAvancesFromServer() {
    this.http
      .get<Avance[]>(`${this.baseUrl}/avance/avances`)
      .pipe(
        tap((avances) => {
          this._avances$.next(avances);
        })
      )
      .subscribe();
  }

  getEcheancesFromServer() {
    this.http
      .get<EcheanceAvance[]>(`${this.baseUrl}/avance/echeances`)
      .pipe(
        tap((echeances) => {
          this._echeances$.next(echeances);
        })
      )
      .subscribe();
  }

  getDeboursesFromServer() {
    this.http
      .get<AvanceDebourse[]>(`${this.baseUrl}/avance/debourses`)
      .pipe(
        tap((debourses) => {
          this._debourses$.next(debourses);
        })
      )
      .subscribe();
  }

  getDebourseAvance(id: number): Observable<AvanceDebourse> {
    return this.debourses$.pipe(
      map(
        (debourses) =>
          debourses.filter((debourse) => debourse.avanceId === id)[0]
      )
    );
  }

  getAvanceById(id: number): Observable<Avance> {
    return this.avances$.pipe(
      map((avances) => avances.filter((avance) => avance.id === id)[0])
    );
  }

  getAvanceDebourseById(id: number): Observable<AvanceDebourse> {
    return this.debourses$.pipe(
      map((debourses) => debourses.filter((debourse) => debourse.id === id)[0])
    );
  }

  getAvanceEcheances(id: number): Observable<EcheanceAvance[]> {
    return this.echeances$.pipe(
      map((echeances) =>
        echeances.filter((echeance) => echeance.avanceId === id)
      )
    );
  }

  enregistrerMouvement(mvts: Mouvement): void {
    this.http.post(this.baseUrl + '/avance/debourser', mvts).subscribe();
  }

  //----------------------------------------

  getAllEcheances(): Observable<EcheanceAvance[]> {
    return this.http.get<EcheanceAvance[]>(this.baseUrl + '/avance/echeances');
  }

  getDeboursement(avanceId: number): Observable<AvanceDebourse> {
    return this.http.get<AvanceDebourse>(
      this.baseUrl + '/avance/deboursement/' + avanceId.toString()
    );
  }

  getAllEcheancesAvance(avanceId?: number): Observable<EcheanceAvance[]> {
    return this.http.get<EcheanceAvance[]>(
      this.baseUrl + '/avance/echeances/' + avanceId?.toString()
    );
  }

  getAll(): Observable<Avance[]> {
    return this.http.get<Avance[]>(this.baseUrl + '/avance/avances');
  }

  getById(id: number): Observable<Avance> {
    return this.http.get<Avance>(this.baseUrl + '/avance/get/' + id.toString());
  }

  getMouvements(id: number): Observable<Mouvement[]> {
    return this.http.get<Mouvement[]>(
      this.baseUrl + '/avance/getmouvements/' + id.toString()
    );
  }

  getSolde(id: number): Observable<number> {
    return this.http.get<number>(
      this.baseUrl + '/avance/getsolde/' + id.toString()
    );
  }

  getStatus(id: number): Observable<string> {
    return this.http.get<string>(
      this.baseUrl + '/avance/getstatus/' + id.toString()
    );
  }

  getInfosAvance(id: number): Observable<InfosAvance> {
    return this.http.get<InfosAvance>(
      this.baseUrl + '/avance/getinfosavance/' + id.toString()
    );
  }

  getEcheancier(id: number): Observable<EcheanceAvance[]> {
    return this.http.get<EcheanceAvance[]>(
      this.baseUrl + '/avance/getecheancier/' + id.toString()
    );
  }

  getPhotoUrl(photo?: string): string {
    if (photo && photo !== '') {
      return this.imagesUrl + '/assets/images/' + photo;
    }
    return this.imagesUrl + '/assets/images/default_man.jpg';
  }

  add(avance: Avance): Observable<number> {
    return this.http.post<number>(this.baseUrl + '/avance/add', avance);
  }

  rembourserEcheances(infos: InfosRemboursements): Observable<any> {
    return this.http.post<any>(
      this.baseUrl + '/avance/rembourserEcheances',
      infos
    );
  }

  update(id: number, avanceDebourse: AvanceDebourse): Observable<Avance> {
    return this.http.put<Avance>(
      this.baseUrl + '/avance/update/' + id.toString(),
      avanceDebourse
    );
  }

  addApprobation(avance: AvanceDebourse): Observable<AvanceDebourse> {
    return this.http.post<AvanceDebourse>(
      this.baseUrl + '/avance/addApprobation',
      avance
    );
  }

  addMvtComptes(mvts: MvtCompte[]): Observable<any> {
    return this.http.post<MvtCompte[]>(
      this.baseUrl + '/avance/addmvtcomptes',
      mvts
    );
  }
}
