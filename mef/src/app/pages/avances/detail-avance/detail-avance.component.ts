import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable, combineLatest, map, of } from 'rxjs';
import { StatusPret } from 'src/app/enums/statut-pret.enum';
import { Avance } from 'src/app/models/avance';
import { Deboursement } from 'src/app/models/deboursement.model';
import { Membre } from 'src/app/models/membre.model';
import { Mouvement } from 'src/app/models/mouvement';
import { TypeOperation } from 'src/app/models/typeoperation';
import { AvanceService } from 'src/app/services/avance.service';
import { CompteService } from 'src/app/services/compte.service';
import { DeboursementService } from 'src/app/services/deboursement.service';
import { MembreService } from 'src/app/services/membre.service';

@Component({
  selector: 'app-detail-avance',
  templateUrl: './detail-avance.component.html',
  styleUrls: ['./detail-avance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailAvanceComponent implements OnInit {
  @Input()
  idAvance!: number;
  avance!: Avance;
  avance$!: Observable<Avance>;
  membre$!: Observable<Membre>;
  deboursement$!: Observable<Deboursement>;
  deboursements$!: Observable<Deboursement[]>;
  mouvements$!: Observable<Mouvement[]>;
  membres$!: Observable<Membre[]>;

  status!: StatusPret;

  solde!: number;

  constructor(
    private avanceService: AvanceService,
    private membreService: MembreService,
    private deboursementService: DeboursementService,
    private compteService: CompteService
  ) {}

  ngOnInit(): void {
    this.initObservables();
  }

  private initObservables() {
    const idAvance$ = of(this.idAvance);

    this.membres$ = this.membreService.membres$;
    this.deboursements$ = this.deboursementService.deboursements$;
    this.mouvements$ = this.compteService.mouvements$;

    this.membres$.subscribe();
    this.deboursements$.subscribe();
    this.mouvements$.subscribe();

    this.avance$ = combineLatest([idAvance$, this.avanceService.avances$]).pipe(
      map(([id, avances]) => avances.filter((avance) => avance.id === id)[0])
    );

    this.membre$ = combineLatest([this.avance$, this.membres$]).pipe(
      map(
        ([avance, membres]) =>
          membres.filter((membre) => membre.id === avance.membreId)[0]
      )
    );

    this.deboursement$ = combineLatest([
      this.avance$,
      this.deboursements$,
    ]).pipe(
      map(
        ([avance, deboursements]) =>
          deboursements.filter(
            (deboursement) => deboursement.id === avance.deboursementId
          )[0]
      )
    );

    this.mouvements$ = combineLatest([this.avance$, this.mouvements$]).pipe(
      map(([avance, mouvements]) =>
        mouvements.filter((mouvement) => mouvement.avanceId === avance.id)
      )
    );

    this.avance$.subscribe((avance: Avance) => {
      this.avance = avance;
    });

    this.mouvements$.subscribe((mouvements: Mouvement[]) => {
      this.status = this.getStatutPret(this.avance.deboursementId, mouvements);
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
