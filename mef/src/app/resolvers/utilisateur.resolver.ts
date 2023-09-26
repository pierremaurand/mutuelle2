import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UtilisateurService } from '../services/utilisateur.service';
import { Utilisateur } from '../models/utilisateur';

@Injectable({
  providedIn: 'root',
})
export class UtilisateurResolver implements Resolve<Utilisateur> {
  constructor(public utilisateurService: UtilisateurService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Utilisateur> {
    const id = route.paramMap.get('utilisateurId') ?? 0;
    return this.utilisateurService.getUtilisateurById(+id);
  }
}
