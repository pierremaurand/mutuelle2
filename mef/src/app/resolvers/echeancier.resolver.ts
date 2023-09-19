import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Echeance } from '../models/echeance.model';
import { EcheanceService } from '../services/echeance.service';

@Injectable({
  providedIn: 'root',
})
export class EcheancierResolver implements Resolve<Echeance[]> {
  constructor(public echeanceService: EcheanceService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Echeance[]> {
    const idAvance = route.paramMap.get('avanceId');
    const idCredit = route.paramMap.get('creditId');
    if (idAvance) {
      return this.echeanceService.getEcheancierAvance(+idAvance);
    }

    if (idCredit) {
      return this.echeanceService.getEcheancierCredit(+idCredit);
    }
    return of([]);
  }
}
