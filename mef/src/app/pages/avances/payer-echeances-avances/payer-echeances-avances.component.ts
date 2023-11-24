import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Echeance } from 'src/app/models/echeance.model';
import { Mouvement } from 'src/app/models/mouvement';
import { TypeOperation } from 'src/app/models/typeoperation';
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
  mouvements: Mouvement[] = [];

  constructor(public echeanceService: EcheanceService) {}

  ngOnInit(): void {}

  enregistrer(): void {
    this.mouvements.length = 0;
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
      this.mouvements.push(mouvement);
    });
    this.echeanceService.enregistrerMouvements(this.mouvements);
    this.echeancesPayer.emit();
  }
}
