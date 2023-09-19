import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { EcheanceService } from '../services/echeance.service';
import { Echeance } from '../models/echeance.model';

@Injectable({
  providedIn: 'root',
})
export class EcheancierAvanceResolver implements Resolve<Echeance[]> {
  constructor(public echeanceService: EcheanceService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Echeance[]> {
    const idAvance = route.paramMap.get('avanceId');
    if (idAvance) {
      return this.echeanceService.getEcheancierAvance(+idAvance);
    }
    return of([]);
  }
}
