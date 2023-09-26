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
export class MouvementsAvanceResolver implements Resolve<Mouvement[]> {
  constructor(public compteService: CompteService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Mouvement[]> {
    const idAvance = route.paramMap.get('avanceId') ?? 0;
    return this.compteService.getMouvementsAvance(+idAvance);
  }
}
