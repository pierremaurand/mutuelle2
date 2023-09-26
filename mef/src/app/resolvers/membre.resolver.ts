import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Membre } from '../models/membre.model';
import { MembreService } from '../services/membre.service';

@Injectable({
  providedIn: 'root',
})
export class MembreResolver implements Resolve<Membre> {
  constructor(public membreService: MembreService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Membre> {
    const id = route.paramMap.get('membreId') ?? 0;
    return this.membreService.getMembreById(+id);
  }
}
