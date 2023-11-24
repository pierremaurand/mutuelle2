import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Echeance } from 'src/app/models/echeance.model';
import { Mouvement } from 'src/app/models/mouvement';
import { TypeOperation } from 'src/app/models/typeoperation';
import { EcheanceService } from 'src/app/services/echeance.service';

@Component({
  selector: 'app-payer-echeances-credits',
  templateUrl: './payer-echeances-credits.component.html',
  styleUrls: ['./payer-echeances-credits.component.scss'],
})
export class PayerEcheancesCreditsComponent implements OnInit {
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
      mouvement.creditId = echeance.creditId ?? 0;
      mouvement.membreId = echeance.membreId;
      mouvement.echeanceId = echeance.id;
      mouvement.dateMvt =
        this.dateMouvement != '' ? this.dateMouvement : echeance.dateEcheance;
      mouvement.montant = echeance.montantEcheance;
      mouvement.libelle =
        'Remboursement échéance credit n° ' + echeance.creditId;
      mouvement.typeOperation = TypeOperation.Credit;
      this.mouvements.push(mouvement);
    });
    this.echeanceService.enregistrerMouvements(this.mouvements);
    this.echeancesPayer.emit();
  }
}
