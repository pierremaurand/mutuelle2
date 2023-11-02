import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Membre } from '../models/membre.model';
import { MvtCompte } from '../models/mvtCompte';
import { MvtMembre } from '../models/mvtMembre';
import { PhotoMembre } from '../models/photo-membre.model';
import { MembreInfos } from '../models/membreInfos.model';
import { Mouvement } from '../models/mouvement';
import { TypeOperation } from '../models/typeoperation';
import { Cotisation } from '../models/cotisation';
import { DonneesMembre } from '../models/donnees-membre.model';

@Injectable({
  providedIn: 'root',
})
export class MembreService {
  [x: string]: any;
  baseUrl = environment.baseUrl;
  imagesUrl = environment.imagesUrl;

  private _membres$ = new BehaviorSubject<Membre[]>([]);
  get membres$(): Observable<Membre[]> {
    return this._membres$.asObservable();
  }

  constructor(private http: HttpClient) {}

  getMembresFromServer() {
    console.log('Chargement des membres');
    this.http
      .get<Membre[]>(`${this.baseUrl}/membre/membres`)
      .pipe(
        tap((membres) => {
          this._membres$.next(membres);
        })
      )
      .subscribe();
  }

  addMembreToList(infos: any): void {
    if (infos.id && infos.membre) {
      infos.membre.id = infos.id;
    }
    this.membres$
      .pipe(
        tap((membres) => {
          const updatedMembres = [...membres, infos.membre];
          this._membres$.next(updatedMembres);
        })
      )
      .subscribe();
  }

  updateMembreInfos(infos: any): void {
    if (infos.membre && infos.id) {
      infos.membre.id = infos.id;
    }
    this.membres$
      .pipe(
        take(1),
        map((membres) =>
          membres.map((membre) =>
            membre.id === infos.id ? infos.membre : membre
          )
        ),
        tap((membres) => {
          this._membres$.next(membres);
        })
      )
      .subscribe();
  }

  getMembreById(id: number): Observable<Membre> {
    return this.membres$.pipe(
      map((membres) => membres.filter((membre) => membre.id === id)[0])
    );
  }

  update(membre: Membre): void {
    this.http
      .put(`${this.baseUrl}/membre/update/${membre.id}`, membre)
      .subscribe();
  }

  add(membre: Membre): void {
    this.http.post(`${this.baseUrl}/membre/add`, membre).subscribe();
  }

  addImage(id: number, image: PhotoMembre): void {
    this.http.post(`${this.baseUrl}/membre/addImage/${id}`, image).subscribe();
  }

  //--------------------------------------------------------------------

  getAll(): Observable<Membre[]> {
    return this.http.get<Membre[]>(this.baseUrl + '/membre/membres');
  }

  addMvtCompte(id: number, mvtComptes: MvtCompte[]): Observable<any> {
    return this.http.post<any>(
      this.baseUrl + '/membre/addMvtComptes/' + id.toString(),
      mvtComptes
    );
  }

  getById(id?: number): Observable<Membre> {
    return this.http.get<Membre>(
      this.baseUrl + '/membre/get/' + id?.toString()
    );
  }

  getMvtMembre(id?: number): Observable<MvtMembre> {
    return this.http.get<MvtMembre>(
      this.baseUrl + '/membre/get/mvtmembre/' + id?.toString()
    );
  }

  getInfosMembre(id: number): Observable<MembreInfos> {
    return this.http.get<MembreInfos>(
      this.baseUrl + '/membre/get/infos/' + id.toString()
    );
  }

  import(membres: Membre[]): Observable<any> {
    return this.http.post(this.baseUrl + '/membre/import', membres);
  }

  deleteMembre(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/membre/delete/' + id.toString());
  }

  getPhotoUrl(photo?: string): string {
    if (photo && photo !== '') {
      return this.imagesUrl + '/assets/images/' + photo;
    }
    return this.imagesUrl + '/assets/images/default_man.jpg';
  }

  public updateSoldeToutCompte(membre: Membre, mouvements: Mouvement[]): void {
    this.addMembreToList(membre);
  }

  public updateSoldeCotisation(
    membre: Membre,
    cotisations: Cotisation[]
  ): void {
    this.addMembreToList(membre);
  }

  private calculSoldeCompte(mouvements: Mouvement[]): number {
    let solde = 0;
    mouvements.map((mouvement) => {
      if (mouvement.typeOperation == TypeOperation.Credit) {
        solde += mouvement.montant ?? 0;
      } else {
        solde -= mouvement.montant ?? 0;
      }
    });
    return solde;
  }

  private calculSoldeCotisation(cotisations: Cotisation[]): number {
    let solde = 0;
    cotisations.map((cotisation) => {
      solde += cotisation.montant;
    });
    return solde;
  }
}
