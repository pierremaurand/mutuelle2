import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Utilisateur } from 'src/app/models/utilisateur';
import { UtilisateurList } from 'src/app/models/utilisateurList';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-page-utilisateur',
  templateUrl: './page-utilisateur.component.html',
  styleUrls: ['./page-utilisateur.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageUtilisateurComponent implements OnInit {
  utilisateurs$!: Observable<Utilisateur[]>;

  constructor(
    private router: Router,
    private utilisateurService: UtilisateurService
  ) {}

  ngOnInit(): void {
    this.initObservables();
  }

  private initObservables(): void {
    this.utilisateurs$ = this.utilisateurService.utilisateurs$;
  }

  nouvelUtilisateur(): void {
    this.router.navigate(['nouvelutilisateur']);
  }

  navigate(id: number): void {
    this.router.navigate(['/nouvelutilisateur/' + id]);
  }
}
