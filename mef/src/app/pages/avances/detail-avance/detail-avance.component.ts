import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { StatusPret } from 'src/app/enums/statut-pret.enum';
import { Avance } from 'src/app/models/avance';
import { AvanceInfos } from 'src/app/models/avance-infos.model';
import { AvanceDebourse } from 'src/app/models/avanceDebourse';
import { Deboursement } from 'src/app/models/deboursement.model';
import { EcheanceAvance } from 'src/app/models/echeanceAvance';
import { Membre } from 'src/app/models/membre.model';
import { Mouvement } from 'src/app/models/mouvement';
import { AvanceService } from 'src/app/services/avance.service';
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

  status!: StatusPret;

  solde!: number;

  constructor(
    private membreService: MembreService,
    private deboursementService: DeboursementService
  ) {}

  ngOnInit(): void {
    this.initObservables();
  }

  private initObservables() {
    this.membre$ = this.membreService.getMembreById(+this.avance.membreId);
    this.deboursement$ = this.deboursementService.getDeboursementById(
      +this.avance.deboursementId
    );
  }

  getStatusString(): string {
    if (this.status === StatusPret.ENREGISTRE) {
      return 'Enregistré';
    } else {
      if (this.status === StatusPret.DEBOURSE) {
        return 'Déboursé';
      } else {
        if (this.status === StatusPret.ENCOURS) {
          return 'Encours';
        } else {
          return 'Soldé';
        }
      }
    }
  }
}
