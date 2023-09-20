import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { StatusPret } from 'src/app/enums/statut-pret.enum';
import { Avance } from 'src/app/models/avance';
import { Deboursement } from 'src/app/models/deboursement.model';
import { Membre } from 'src/app/models/membre.model';
import { Mouvement } from 'src/app/models/mouvement';
import { TypeOperation } from 'src/app/models/typeoperation';
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
  avance!: Avance;
  membre$!: Observable<Membre>;
  deboursement$!: Observable<Deboursement>;
  mouvements$!: Observable<Mouvement[]>;

  status!: StatusPret;

  solde!: number;

  constructor(
    public membreService: MembreService,
    public deboursementService: DeboursementService,
    public compteService: CompteService
  ) {}

  ngOnInit(): void {
    this.initObservables();
  }

  private initObservables() {
    this.membre$ = this.membreService.getMembreById(+this.avance.membreId);
    this.deboursement$ = this.deboursementService.getDeboursementById(
      +this.avance.deboursementId
    );
    this.mouvements$ = this.compteService.getMouvementsAvance(+this.avance.id);
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
