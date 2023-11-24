import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable, combineLatest, map, of } from 'rxjs';
import { StatusPret } from 'src/app/enums/statut-pret.enum';
import { Membre } from 'src/app/models/membre.model';
import { Credit } from 'src/app/models/credit';
import { CreditDebourse } from 'src/app/models/creditDebourse';
import { EcheanceCredit } from 'src/app/models/echeanceCredit';
import { Mouvement } from 'src/app/models/mouvement';
import { CreditService } from 'src/app/services/credit.service';
import { MembreService } from 'src/app/services/membre.service';
import { Deboursement } from 'src/app/models/deboursement.model';
import { DeboursementService } from 'src/app/services/deboursement.service';
import { CompteService } from 'src/app/services/compte.service';
import { TypeOperation } from 'src/app/models/typeoperation';

@Component({
  selector: 'app-detail-credit',
  templateUrl: './detail-credit.component.html',
  styleUrls: ['./detail-credit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailCreditComponent implements OnInit {
  @Input()
  idCredit!: number;
  credit!: Credit;
  credit$!: Observable<Credit>;
  membre$!: Observable<Membre>;
  deboursement$!: Observable<Deboursement>;
  deboursements$!: Observable<Deboursement[]>;
  credits$!: Observable<Credit[]>;
  mouvements$!: Observable<Mouvement[]>;
  membres$!: Observable<Membre[]>;

  status!: StatusPret;

  solde!: number;

  constructor(
    private creditService: CreditService,
    private membreService: MembreService,
    private deboursementService: DeboursementService,
    private compteService: CompteService
  ) {}

  ngOnInit(): void {
    this.initObservables();
  }

  private initObservables() {
    const idCredit$ = of(this.idCredit);

    this.membres$ = this.membreService.membres$;
    this.deboursements$ = this.deboursementService.deboursements$;
    this.mouvements$ = this.compteService.mouvements$;
    this.credits$ = this.creditService.credits$;

    this.membres$.subscribe();
    this.deboursements$.subscribe();
    this.mouvements$.subscribe();
    this.credits$.subscribe();

    this.credit$ = combineLatest([idCredit$, this.credits$]).pipe(
      map(([id, credits]) => credits.filter((credit) => credit.id === id)[0])
    );

    this.membre$ = combineLatest([this.credit$, this.membres$]).pipe(
      map(
        ([credit, membres]) =>
          membres.filter((membre) => membre.id === credit.membreId)[0]
      )
    );

    this.deboursement$ = combineLatest([
      this.credit$,
      this.deboursements$,
    ]).pipe(
      map(
        ([credit, deboursements]) =>
          deboursements.filter(
            (deboursement) => deboursement.id === credit.deboursementId
          )[0]
      )
    );

    this.mouvements$ = combineLatest([this.credit$, this.mouvements$]).pipe(
      map(([credit, mouvements]) =>
        mouvements.filter((mouvement) => mouvement.creditId === credit.id)
      )
    );

    this.credit$.subscribe((credit: Credit) => {
      this.credit = credit;
    });

    this.mouvements$.subscribe((mouvements: Mouvement[]) => {
      this.status = this.getStatutPret(this.credit.deboursementId, mouvements);
      this.solde = this.calculSolde(mouvements);
    });
  }

  private getStatutPret(
    deboursementId: number,
    mouvements: Mouvement[]
  ): StatusPret {
    if (mouvements.length == 0) {
      if (deboursementId) {
        return StatusPret.VALIDE;
      }
      return StatusPret.ENREGISTRE;
    } else if (mouvements.length == 1) {
      return StatusPret.DEBOURSE;
    } else {
      const solde = this.calculSolde(mouvements);
      if (solde == 0) {
        return StatusPret.SOLDE;
      }
    }
    return StatusPret.ENCOURS;
  }

  private calculSolde(mouvements: Mouvement[]): number {
    let solde = 0;
    mouvements.forEach((m) => {
      if (m.typeOperation === TypeOperation.Debit) solde += m.montant ?? 0;
      else solde -= m.montant ?? 0;
    });
    return solde;
  }

  getStatusString(): string {
    if (this.status === StatusPret.ENREGISTRE) {
      return 'Enregistré';
    } else if (this.status === StatusPret.VALIDE) {
      return 'Validé';
    } else if (this.status === StatusPret.DEBOURSE) {
      return 'Déboursé';
    } else if (this.status === StatusPret.ENCOURS) {
      return 'Encours';
    } else {
      return 'Soldé';
    }
  }
}
