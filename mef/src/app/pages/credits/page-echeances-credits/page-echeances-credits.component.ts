import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { EcheanceCredit } from 'src/app/models/echeanceCredit';
import { TypeOperation } from 'src/app/models/typeoperation';
import { CreditService } from 'src/app/services/credit.service';
import { SignalrService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-page-echeances-credits',
  templateUrl: './page-echeances-credits.component.html',
  styleUrls: ['./page-echeances-credits.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageEcheancesCreditsComponent implements OnInit {
  dateEcheance: string = '';
  echeancier: EcheanceCredit[] = [];
  formulaire: number = 1;

  loading$!: Observable<boolean>;
  echeances$!: Observable<EcheanceCredit[]>;
  echeanceAdded$!: Observable<boolean>;

  dateEcheanceCtrl!: FormControl;
  curDate!: string | undefined;

  constructor(
    private creditService: CreditService,
    public signalrService: SignalrService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.curDate = this.datePipe
      .transform(Date.now(), 'yyyy-MM-dd')
      ?.toString();
    this.initControls();
    this.initObservables();
  }

  private initControls(): void {
    this.dateEcheanceCtrl = this.fb.control('');
  }

  private initObservables(): void {
    const dateEcheance$ = this.dateEcheanceCtrl.valueChanges.pipe(
      startWith(this.dateEcheanceCtrl.value)
    );

    // this.echeances$ = combineLatest([
    //   dateEcheance$,
    //   this.creditService.echeances$,
    // ]).pipe(
    //   map(([dateEcheance, echeances]) =>
    //     echeances.filter(
    //       (echeance) =>
    //         echeance.dateEcheance?.includes(dateEcheance) &&
    //         this.getEtatPayement(echeance)
    //     )
    //   )
    // );
  }

  getEtatPayement(echeance: EcheanceCredit): boolean {
    const montantEcheance = +echeance.capital + echeance.interet;
    if (montantEcheance > echeance.montantPaye) {
      return true;
    }
    return false;
  }

  //-----------------------------------------

  effacer(): void {
    this.dateEcheanceCtrl.setValue('');
  }

  calculResteAPayer(echeance: EcheanceCredit): number {
    let solde = +echeance.capital + echeance.interet;
    echeance.mouvements.forEach((m) => {
      if (m.typeOperation == TypeOperation.Credit) {
        solde -= m.montant ?? 0;
      }
    });
    return solde;
  }

  addEcheance(echeance: EcheanceCredit): void {
    echeance.montant = this.calculResteAPayer(echeance);
    if (this.echeancier.find((e) => e.id == echeance.id)) {
      this.echeancier = this.echeancier.filter((e) => e.id != echeance.id);
    } else {
      this.echeancier.push(echeance);
    }
  }

  viderEcheancier(): void {
    this.echeancier.length = 0;
  }

  payer(): void {
    this.formulaire = 1;
  }

  decaler(): void {
    this.formulaire = 2;
  }
}
