import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Sexe } from '../models/sexe';
import { SexeService } from '../services/sexe.service';

@Injectable({
  providedIn: 'root',
})
export class SexesResolver implements Resolve<Sexe[]> {
  constructor(public sexeService: SexeService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Sexe[]> {
    return this.sexeService.sexes$;
  }
}
