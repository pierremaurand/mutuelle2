import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EcheanceCredit } from 'src/app/models/echeanceCredit';
import { InfosRbCredit } from 'src/app/models/infos-rb-credit.model';
import { InfosRemboursements } from 'src/app/models/infosRemboursements';
import { TypeOperation } from 'src/app/models/typeoperation';
import { CreditService } from 'src/app/services/credit.service';

@Component({
  selector: 'app-payer-echeances-credits',
  templateUrl: './payer-echeances-credits.component.html',
  styleUrls: ['./payer-echeances-credits.component.scss'],
})
export class PayerEcheancesCreditsComponent implements OnInit {
  @Input()
  echeancier: EcheanceCredit[] = [];
  dateMouvement: string = '';
  @Output()
  echeancesPayer = new EventEmitter();

  constructor(
    private creditService: CreditService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {}

  totalCapital(): number {
    let total = 0;
    this.echeancier.forEach((e) => {
      if (e.capital) {
        total += e.capital;
      }
    });

    return total;
  }

  calculReste(echeance: EcheanceCredit): number {
    let reste = +echeance.capital + echeance.interet;
    echeance.mouvements.forEach((m) => {
      if (m.typeOperation == TypeOperation.Credit) {
        reste -= m.montant ?? 0;
      }
    });
    return reste;
  }

  totalInteret(): number {
    let total = 0;
    this.echeancier.forEach((e) => {
      if (e.interet) {
        total += e.interet;
      }
    });

    return total;
  }

  enregistrer(): void {
    const infos = new InfosRbCredit();
    infos.dateMouvement =
      this.dateMouvement != ''
        ? this.dateMouvement
        : this.datePipe.transform(Date.now(), 'yyyy-MM-dd')?.toString() ?? '';
    infos.echeancier = this.echeancier;
    this.creditService.rembourserEcheances(infos).subscribe(() => {
      this.echeancesPayer.emit();
    });
  }
}
