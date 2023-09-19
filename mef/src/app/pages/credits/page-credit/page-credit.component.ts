import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { StatusPret } from 'src/app/enums/statut-pret.enum';
import { Credit } from 'src/app/models/credit';
import { CreditInfos } from 'src/app/models/credit-infos.model';
import { CreditService } from 'src/app/services/credit.service';
import { MembreService } from 'src/app/services/membre.service';
import { SignalrService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-page-credit',
  templateUrl: './page-credit.component.html',
  styleUrls: ['./page-credit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageCreditComponent implements OnInit {
  loading$!: Observable<boolean>;
  credits$!: Observable<Credit[]>;
  creditAdded$!: Observable<boolean>;

  searchCtrl!: FormControl;
  statusPretCtrl!: FormControl;
  statusPretOptions!: {
    value: StatusPret;
    label: string;
  }[];

  constructor(
    private creditService: CreditService,
    private membreService: MembreService,
    public signalrService: SignalrService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.initObservables();
  }

  private initForm() {
    this.searchCtrl = this.formBuilder.control('');
    this.statusPretCtrl = this.formBuilder.control('');
    this.statusPretOptions = [
      { value: StatusPret.ENREGISTRE, label: 'Enregistré' },
      { value: StatusPret.DEBOURSE, label: 'Déboursé' },
      { value: StatusPret.ENCOURS, label: 'Encours' },
      { value: StatusPret.SOLDE, label: 'Soldé' },
    ];
  }

  private initObservables(): void {
    this.credits$ = this.creditService.credits$;
    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      map((value) => value.toLowerCase())
    );

    const statusPret$ = this.statusPretCtrl.valueChanges.pipe(
      startWith(this.statusPretCtrl.value),
      map((value) => value.toString())
    );

    // this.credits$ = combineLatest([
    //   search$,
    //   statusPret$,
    //   this.creditService.credits$,
    // ]).pipe(
    //   map(([search, statusPret, credits]) =>
    //     credits.filter(
    //       (credit) =>
    //         credit.nom.toLowerCase().includes(search as string) &&
    //         credit.status.toString().includes(statusPret)
    //     )
    //   )
    // );

    this.creditAdded$ = this.signalrService.creditAdd$;
    this.creditAdded$.subscribe(() => {
      // this.creditService.getCreditsFromServer(true);
    });
  }

  //--------------------------------------

  newEvent(): void {
    this.router.navigate(['/nouveaucredit']);
  }

  navigate(creditId: number): void {
    this.router.navigate(['/nouveaucredit/' + creditId]);
  }

  exportCredits(): void {}

  importCredits(): void {}

  effacer(): void {
    this.statusPretCtrl.setValue('');
  }
}
