import { Component, Input, OnInit } from '@angular/core';
import { EcheanceCredit } from 'src/app/models/echeanceCredit';

@Component({
  selector: 'app-echeancier-credit',
  templateUrl: './echeancier-credit.component.html',
  styleUrls: ['./echeancier-credit.component.scss'],
})
export class EcheancierCreditComponent implements OnInit {
  @Input()
  echeancier: EcheanceCredit[] = [];
  @Input()
  nbrEcheances?: number = 0;

  constructor() {}

  ngOnInit(): void {}

  getEtatEcheance(echeance: EcheanceCredit): boolean {
    const montantEcheance = +echeance.capital + echeance.interet;
    if (echeance.montantPaye == montantEcheance) {
      return true;
    }
    return false;
  }
}
