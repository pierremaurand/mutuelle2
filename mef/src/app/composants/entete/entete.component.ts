import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, combineLatest, map, switchMap, take, tap } from 'rxjs';
import { Membre } from 'src/app/models/membre.model';
import { Utilisateur } from 'src/app/models/utilisateur';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { MembreService } from 'src/app/services/membre.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-entete',
  templateUrl: './entete.component.html',
  styleUrls: ['./entete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnteteComponent implements OnInit {
  membre$!: Observable<Membre>;
  utilisateur$!: Observable<Utilisateur>;
  imagesUrl = environment.imagesUrl;

  constructor(
    public utilisateurService: UtilisateurService,
    public membreService: MembreService,
    private alertityService: AlertifyService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.utilisateurService.getUtilisateursFromServer();
    this.membreService.getMembresFromServer();
    this.initInfos();
  }

  private initInfos(): void {
    const id = this.authService.getUserId();
    this.utilisateur$ = this.utilisateurService.getUtilisateurById(id);
    const membreId = this.authService.getMembreId();
    this.membre$ = this.membreService.getMembreById(membreId);
  }

  logout(): void {
    localStorage.clear();
    this.alertityService.success('Vous êtes déconnecté');
    this.router.navigate(['login']);
  }

  goProfile(): void {
    this.router.navigate(['profile']);
  }
}
