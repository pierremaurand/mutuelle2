import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CompteService } from '../services/compte.service';
import { Mouvement } from '../models/mouvement';

@Injectable({
  providedIn: 'root',
})
export class MouvementsResolver implements Resolve<Mouvement[]> {
  constructor(public compteService: CompteService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Mouvement[]> {
    const idAvance = route.paramMap.get('avanceId');
    const idCredit = route.paramMap.get('creditId');
    const idMembre = route.paramMap.get('membreId');
    const idCotisation = route.paramMap.get('cotisationId');
    const idDeboursement = route.paramMap.get('deboursementId');
    const idEcheance = route.paramMap.get('echeanceId');

    if (idAvance) {
      return this.compteService.getMouvementsAvance(+idAvance);
    }

    if (idCredit) {
      return this.compteService.getMouvementsCredit(+idCredit);
    }

    if (idMembre) {
      return this.compteService.getMouvementsMembre(+idMembre);
    }

    if (idCotisation) {
      return this.compteService.getMouvementsCotisation(+idCotisation);
    }

    if (idDeboursement) {
      return this.compteService.getMouvementsDeboursement(+idDeboursement);
    }

    if (idEcheance) {
      return this.compteService.getMouvementsEcheance(+idEcheance);
    }

    return of([]);
  }
}
