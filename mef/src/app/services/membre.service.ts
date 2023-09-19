import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Membre } from '../models/membre.model';
import { MvtCompte } from '../models/mvtCompte';
import { MvtMembre } from '../models/mvtMembre';
import { UploadImage } from '../models/uploadImage';
import { MembreInfos } from '../models/membreInfos.model';

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
    this.http
      .get<Membre[]>(`${this.baseUrl}/membre/membres`)
      .pipe(
        tap((membres) => {
          this._membres$.next(membres);
        })
      )
      .subscribe();
  }

  addMembreToList(membre: Membre): void {
    this.membres$
      .pipe(
        tap((membres) => {
          const updatedMembres = [...membres, membre];
          this._membres$.next(updatedMembres);
        })
      )
      .subscribe();
  }

  getMembreById(id: number): Observable<Membre> {
    return this.membres$.pipe(
      map((membres) => membres.filter((membre) => membre.id === id)[0])
    );
  }

  update(membre: Membre, image?: UploadImage): void {
    this.http
      .put<MembreInfos>(`${this.baseUrl}/membre/update/${membre.id}`, membre)
      .subscribe(() => {
        if (image) {
          this.modifierImage(membre.id, image);
        } else {
          this.getMembresFromServer();
        }
      });
  }

  add(membre: Membre, image?: UploadImage): void {
    this.http
      .post<MembreInfos>(`${this.baseUrl}/membre/add`, membre)
      .subscribe((membre) => {
        if (image) {
          this.modifierImage(membre.id, image);
        } else {
          this.getMembresFromServer();
        }
      });
  }

  private modifierImage(id: number, image: UploadImage): void {
    image.membreId = id;
    this.addImage(image).subscribe(() => {
      this.getMembresFromServer();
    });
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

  addImage(uploadImage: UploadImage): Observable<MembreInfos> {
    return this.http.post<MembreInfos>(
      this.baseUrl + '/membre/addImage',
      uploadImage
    );
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
}
