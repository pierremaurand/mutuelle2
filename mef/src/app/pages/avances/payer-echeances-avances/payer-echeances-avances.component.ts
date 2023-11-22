import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Echeance } from 'src/app/models/echeance.model';
import { EcheanceAvance } from 'src/app/models/echeanceAvance';
import { InfosRbAvance } from 'src/app/models/infos-rb-avance.model';
import { Mouvement } from 'src/app/models/mouvement';
import { TypeOperation } from 'src/app/models/typeoperation';
import { AvanceService } from 'src/app/services/avance.service';
import { CompteService } from 'src/app/services/compte.service';
import { EcheanceService } from 'src/app/services/echeance.service';

@Component({
  selector: 'app-payer-echeances-avances',
  templateUrl: './payer-echeances-avances.component.html',
  styleUrls: ['./payer-echeances-avances.component.scss'],
})
export class PayerEcheancesAvancesComponent implements OnInit {
  @Input()
  echeancier: Echeance[] = [];
  dateMouvement: string = '';
  @Output()
  echeancesPayer = new EventEmitter();

  constructor(
    private echeanceService: EcheanceService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {}

  enregistrer(): void {
    this.echeancier.forEach((echeance) => {
      let mouvement = new Mouvement();
      mouvement.avanceId = echeance.avanceId ?? 0;
      mouvement.membreId = echeance.membreId;
      mouvement.echeanceId = echeance.id;
      mouvement.dateMvt =
        this.dateMouvement != '' ? this.dateMouvement : echeance.dateEcheance;
      mouvement.montant = echeance.montantEcheance;
      mouvement.libelle =
        'Remboursement échéance avance n° ' + echeance.avanceId;
      mouvement.typeOperation = TypeOperation.Credit;
      this.echeanceService.enregistrerMouvement(mouvement);
    });
    this.echeancesPayer.emit();
  }
}
