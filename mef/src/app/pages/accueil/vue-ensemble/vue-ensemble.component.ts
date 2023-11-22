import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cotisation } from 'src/app/models/cotisation';
import { Membre } from 'src/app/models/membre.model';
import { Mouvement } from 'src/app/models/mouvement';
import { TypeOperation } from 'src/app/models/typeoperation';
import { CompteService } from 'src/app/services/compte.service';
import { CotisationService } from 'src/app/services/cotisation.service';
import { MembreService } from 'src/app/services/membre.service';

@Component({
  selector: 'app-vue-ensemble',
  templateUrl: './vue-ensemble.component.html',
  styleUrls: ['./vue-ensemble.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VueEnsembleComponent implements OnInit {
  membres$!: Observable<Membre[]>;
  mouvements$!: Observable<Mouvement[]>;
  cotisations$!: Observable<Cotisation[]>;

  constructor(
    private membreService: MembreService,
    private compteService: CompteService,
    private cotisationService: CotisationService
  ) {}

  ngOnInit(): void {
    this.initObservables();
  }

  private initObservables(): void {
    this.membres$ = this.membreService.membres$;
    this.mouvements$ = this.compteService.mouvements$;
    this.cotisations$ = this.cotisationService.cotisations$;
  }

  public montantMobilise(mouvements: Mouvement[]): number {
    let solde = 0;
    mouvements.forEach((mouvement) => {
      if (mouvement.typeOperation === TypeOperation.Credit) {
        solde += mouvement.montant ?? 0;
      } else {
        solde -= mouvement.montant ?? 0;
      }
    });
    return solde;
  }

  public montantCotise(cotisations: Cotisation[]): number {
    let solde: number = 0;
    cotisations.forEach((cotisation) => {
      solde += cotisation.montant;
    });
    return solde;
  }

  public nbrMembresInactifs(membres: Membre[]): number {
    let total = 0;
    membres.forEach((membre) => {
      if (!membre.estActif) {
        total++;
      }
    });
    return total;
  }

  public nbrMembresTotal(membres: Membre[]): number {
    return membres.length;
  }
}
