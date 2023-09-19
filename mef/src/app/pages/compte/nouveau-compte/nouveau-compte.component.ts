import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, map, switchMap } from 'rxjs';
import { Membre } from 'src/app/models/membre.model';
import { Mouvement } from 'src/app/models/mouvement';
import { TypeOperation } from 'src/app/models/typeoperation';
import { CompteService } from 'src/app/services/compte.service';
import { MembreService } from 'src/app/services/membre.service';

@Component({
  selector: 'app-nouveau-compte',
  templateUrl: './nouveau-compte.component.html',
  styleUrls: ['./nouveau-compte.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NouveauCompteComponent implements OnInit {
  id!: number;
  SortbyParam = 'dateMvt';
  SortDirection = 'desc';
  solde!: number;
  membre$!: Observable<Membre>;
  mouvements$!: Observable<Mouvement[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private compteService: CompteService,
    private membreService: MembreService
  ) {}

  ngOnInit(): void {
    this.initObservables();
  }

  private initObservables(): void {
    this.membre$ = this.route.params.pipe(
      switchMap((params) => this.membreService.getMembreById(+params['id']))
    );

    this.mouvements$ = combineLatest([
      this.membre$,
      this.compteService.mouvements$,
    ]).pipe(
      map(([membre, mouvements]) =>
        mouvements.filter((mouvement) => mouvement.membreId == membre.id)
      )
    );

    this.mouvements$.subscribe((mouvements) => {
      this.solde = this.calculSolde(mouvements);
    });

    this.membre$.subscribe((membre) => {
      this.id = membre.id;
    });
  }

  addMouvement(): void {
    this.router.navigate([`/addmouvement/${this.id}`]);
  }

  //------------------------------------------------------------

  private calculSolde(mouvements: Mouvement[]): number {
    let solde = 0;
    mouvements.map((mouvement) => {
      if (mouvement.typeOperation == TypeOperation.Credit) {
        solde += mouvement.montant ? mouvement.montant : 0;
      } else {
        solde -= mouvement.montant ? mouvement.montant : 0;
      }
    });
    return solde;
  }

  onGoBack(): void {
    this.router.navigate(['/comptes']);
  }
}
