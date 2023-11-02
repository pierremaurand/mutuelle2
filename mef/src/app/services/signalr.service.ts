import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { InfosMembre } from '../models/infos-membre.model';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  baseUrl = environment.baseUrl1;

  constructor() {}

  private hubConnection!: signalR.HubConnection;

  private _membreAdd$ = new BehaviorSubject<boolean>(false);
  get membreAdd$(): Observable<boolean> {
    return this._membreAdd$.asObservable();
  }

  private _sexeAdd$ = new BehaviorSubject<boolean>(false);
  get sexeAdd$(): Observable<boolean> {
    return this._sexeAdd$.asObservable();
  }

  private _posteAdd$ = new BehaviorSubject<boolean>(false);
  get posteAdd$(): Observable<boolean> {
    return this._posteAdd$.asObservable();
  }

  private _lieuAffectationAdd$ = new BehaviorSubject<boolean>(false);
  get lieuAffectationAdd$(): Observable<boolean> {
    return this._lieuAffectationAdd$.asObservable();
  }

  private _mouvementAdd$ = new BehaviorSubject<boolean>(false);
  get mouvementAdd$(): Observable<boolean> {
    return this._mouvementAdd$.asObservable();
  }

  private _utilisateurAdd$ = new BehaviorSubject<boolean>(false);
  get utilisateurAdd$(): Observable<boolean> {
    return this._utilisateurAdd$.asObservable();
  }

  private _cotisationAdd$ = new BehaviorSubject<boolean>(false);
  get cotisationAdd$(): Observable<boolean> {
    return this._cotisationAdd$.asObservable();
  }

  private _creditAdd$ = new BehaviorSubject<boolean>(false);
  get creditAdd$(): Observable<boolean> {
    return this._creditAdd$.asObservable();
  }

  private _avanceAdd$ = new BehaviorSubject<boolean>(false);
  get avanceAdd$(): Observable<boolean> {
    return this._avanceAdd$.asObservable();
  }

  private _deboursementAdd$ = new BehaviorSubject<boolean>(false);
  get deboursementAdd$(): Observable<boolean> {
    return this._deboursementAdd$.asObservable();
  }

  private _echeanceAdd$ = new BehaviorSubject<boolean>(false);
  get echeanceAdd$(): Observable<boolean> {
    return this._echeanceAdd$.asObservable();
  }

  private _compteComptableAdd$ = new BehaviorSubject<boolean>(false);
  get compteComptableAdd$(): Observable<boolean> {
    return this._compteComptableAdd$.asObservable();
  }

  private _gabaritAdd$ = new BehaviorSubject<boolean>(false);
  get gabaritAdd$(): Observable<boolean> {
    return this._gabaritAdd$.asObservable();
  }

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.baseUrl}/signalrServer`)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log(`Error while starting connection: ${err}`));
  };

  public addMembreAddListener = () => {
    this.hubConnection.on('MembreAdded', () => {
      this._membreAdd$.next(true);
    });
  };

  public addSexeAddListener = () => {
    this.hubConnection.on('SexeAdded', () => {
      this._sexeAdd$.next(true);
    });
  };

  public addPosteAddListener = () => {
    this.hubConnection.on('PosteAdded', () => {
      this._posteAdd$.next(true);
    });
  };

  public addLieuAffectationAddListener = () => {
    this.hubConnection.on('LieuAffectationAdded', () => {
      this._lieuAffectationAdd$.next(true);
    });
  };

  public addMouvementAddListener = () => {
    this.hubConnection.on('MouvementAdded', () => {
      this._mouvementAdd$.next(true);
    });
  };

  public addUtilisateurAddListener = () => {
    this.hubConnection.on('UtilisateurAdded', () => {
      this._utilisateurAdd$.next(true);
    });
  };

  public addCotisationAddListener = () => {
    this.hubConnection.on('CotisationAdded', () => {
      this._cotisationAdd$.next(true);
    });
  };

  public addCreditAddListener = () => {
    this.hubConnection.on('CreditAdded', () => {
      this._creditAdd$.next(true);
    });
  };

  public addAvanceAddListener = () => {
    this.hubConnection.on('AvanceAdded', () => {
      this._avanceAdd$.next(true);
    });
  };

  public addDeboursementAddListener = () => {
    this.hubConnection.on('DeboursementAdded', () => {
      this._deboursementAdd$.next(true);
    });
  };

  public addEcheanceAddListener = () => {
    this.hubConnection.on('EcheanceAdded', () => {
      this._echeanceAdd$.next(true);
    });
  };

  public addCompteComptableAddListener = () => {
    this.hubConnection.on('CompteComptableAdded', () => {
      this._compteComptableAdd$.next(true);
    });
  };

  public addGabaritAddListener = () => {
    this.hubConnection.on('GabaritAdded', () => {
      this._gabaritAdd$.next(true);
    });
  };
}
