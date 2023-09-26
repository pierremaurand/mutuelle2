import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Avance } from '../models/avance';
import { AvanceService } from '../services/avance.service';

@Injectable({
  providedIn: 'root',
})
export class AvanceResolver implements Resolve<Avance> {
  constructor(public avanceService: AvanceService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Avance> {
    const id = route.paramMap.get('avanceId') ?? 0;
    return this.avanceService.getAvanceById(+id);
  }
}
