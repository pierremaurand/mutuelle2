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
    public membreService: MembreService,
    public compteService: CompteService,
    public cotisationService: CotisationService
  ) {}

  ngOnInit(): void {
    this.initObservables();
  }

  private initObservables(): void {
    this.membres$ = this.membreService.membres$;
    this.mouvements$ = this.compteService.mouvements$;
    this.cotisations$ = this.cotisationService.cotisations$;
  }

  public caisseMutuelle(mouvements: Mouvement[]): number {
    let solde = 0;
    mouvements.forEach((mouvement) => {
      if (
        mouvement.cotisationId &&
        mouvement.typeOperation === TypeOperation.Debit
      ) {
        solde += mouvement.montant ?? 0;
      }

      if (
        mouvement.creditId &&
        !mouvement.deboursementId &&
        mouvement.typeOperation === TypeOperation.Debit
      ) {
        solde += mouvement.montant ?? 0;
      }

      if (
        mouvement.membreId &&
        !mouvement.cotisationId &&
        !mouvement.avanceId &&
        !mouvement.creditId &&
        !mouvement.echeanceId &&
        !mouvement.deboursementId
      ) {
        if (mouvement.typeOperation === TypeOperation.Debit) {
          solde += mouvement.montant ?? 0;
        } else {
          solde -= mouvement.montant ?? 0;
        }
      }

      if (!mouvement.membreId) {
        if (mouvement.typeOperation === TypeOperation.Credit) {
          solde += mouvement.montant ?? 0;
        } else {
          solde -= mouvement.montant ?? 0;
        }
      }
    });
    return solde;
  }

  public nbrMembresTotal(membres: Membre[]): number {
    let total = 0;
    membres.forEach((membre) => {
      if (membre.estActif) {
        total += 1;
      }
    });
    return total;
  }

  public calculEncoursCredit(mouvements: Mouvement[]): number {
    let encours = 0;
    mouvements.forEach((mouvement) => {
      if (mouvement.creditId) {
        if (mouvement.typeOperation === TypeOperation.Debit)
          encours += mouvement.montant ?? 0;
      } else {
        encours -= mouvement.montant ?? 0;
      }
    });
    return encours;
  }

  public calculEncoursAvance(mouvements: Mouvement[]): number {
    let encours = 0;
    mouvements.forEach((mouvement) => {
      if (mouvement.avanceId) {
        if (mouvement.typeOperation === TypeOperation.Debit)
          encours += mouvement.montant ?? 0;
      } else {
        encours -= mouvement.montant ?? 0;
      }
    });
    return encours;
  }
}
