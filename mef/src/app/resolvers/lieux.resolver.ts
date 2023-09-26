import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { LieuAffectation } from '../models/lieuAffectation';
import { LieuAffectationService } from '../services/lieu-affectation.service';

@Injectable({
  providedIn: 'root',
})
export class LieuxResolver implements Resolve<LieuAffectation> {
  constructor(public lieuAffectationService: LieuAffectationService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<LieuAffectation> {
    const id = route.paramMap.get('lieuAffectationId') ?? 0;
    return this.lieuAffectationService.getLieuAffectationById(+id);
  }
}
