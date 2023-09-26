import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { Utilisateur } from 'src/app/models/utilisateur';
import { MembreService } from 'src/app/services/membre.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-page-utilisateur',
  templateUrl: './page-utilisateur.component.html',
  styleUrls: ['./page-utilisateur.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageUtilisateurComponent implements OnInit {
  utilisateurs$!: Observable<Utilisateur[]>;

  searchCtrl!: FormControl;

  constructor(
    private router: Router,
    public utilisateurService: UtilisateurService,
    public membreService: MembreService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.initObservables();
  }

  private initForm() {
    this.searchCtrl = this.formBuilder.control('');
  }

  private initObservables(): void {
    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      map((value) => value.toLowerCase())
    );

    this.utilisateurs$ = combineLatest([
      search$,
      this.utilisateurService.utilisateurs$,
      this.membreService.membres$,
    ]).pipe(
      map(([search, utilisateurs, membres]) =>
        utilisateurs.filter(
          (utilisateur) =>
            (utilisateur.membreId &&
              membres.find(
                (membre) =>
                  membre.id === utilisateur.membreId &&
                  membre.nom.toLowerCase().includes(search as string)
              )) ||
            !utilisateur.membreId
        )
      )
    );
  }

  newEvent(): void {
    this.navigate(0, 0);
  }

  navigate(utilisateurId: number, membreId: number): void {
    this.router.navigate([
      '/nouvelutilisateur/' + utilisateurId + '/' + membreId,
    ]);
  }
}
