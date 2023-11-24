import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { Credit } from 'src/app/models/credit';
import { Echeance } from 'src/app/models/echeance.model';
import { EcheanceCredit } from 'src/app/models/echeanceCredit';
import { Membre } from 'src/app/models/membre.model';
import { Mouvement } from 'src/app/models/mouvement';
import { TypeOperation } from 'src/app/models/typeoperation';
import { CreditService } from 'src/app/services/credit.service';
import { CompteService } from 'src/app/services/compte.service';
import { EcheanceService } from 'src/app/services/echeance.service';
import { MembreService } from 'src/app/services/membre.service';

@Component({
  selector: 'app-page-echeances-credits',
  templateUrl: './page-echeances-credits.component.html',
  styleUrls: ['./page-echeances-credits.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageEcheancesCreditsComponent implements OnInit {
  dateEcheance: string = '';
  mouvements: Mouvement[] = [];
  echeancier: Echeance[] = [];
  formulaire: number = 1;

  echeances$!: Observable<Echeance[]>;
  mouvements$!: Observable<Mouvement[]>;
  membres$!: Observable<Membre[]>;
  credits$!: Observable<Credit[]>;

  dateEcheanceCtrl!: FormControl;
  searchCtrl!: FormControl;

  constructor(
    public echeanceService: EcheanceService,
    public creditService: CreditService,
    public membreService: MembreService,
    public compteService: CompteService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initControls();
    this.initObservables();
  }

  private initControls(): void {
    this.dateEcheanceCtrl = this.fb.control('');
    this.searchCtrl = this.fb.control('');
  }

  private initObservables(): void {
    this.echeances$ = this.echeanceService.echeances$;
    this.mouvements$ = this.compteService.mouvements$;
    this.membres$ = this.membreService.membres$;
    this.credits$ = this.creditService.credits$;

    this.mouvements$.subscribe();
    this.echeances$.subscribe();
    this.membres$.subscribe();
    this.credits$.subscribe();

    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      map((value) => value.toLowerCase())
    );

    const dateEcheance$ = this.dateEcheanceCtrl.valueChanges.pipe(
      startWith(this.dateEcheanceCtrl.value)
    );

    this.echeances$ = combineLatest([
      search$,
      dateEcheance$,
      this.echeances$,
      this.membres$,
      this.credits$,
      this.mouvements$,
    ]).pipe(
      map(([search, dateEcheance, echeances, membres, credits, mouvements]) =>
        echeances.filter(
          (echeance) =>
            membres.find(
              (membre) =>
                membre.id === echeance.membreId &&
                membre.nom.toLowerCase().includes(search as string) &&
                echeance.dateEcheance?.includes(dateEcheance)
            ) &&
            credits.find(
              (a) => a.id == echeance.creditId && a.deboursementId
            ) &&
            this.getEtatPayement(
              echeance.montantEcheance,
              mouvements.filter((m) => m.echeanceId == echeance.id)
            )
        )
      )
    );

    this.mouvements$.subscribe((mouvements: Mouvement[]) => {
      this.mouvements = mouvements;
    });
  }

  getEtatPayement(montantEcheance: number, mouvements: Mouvement[]): boolean {
    const solde = this.calculResteAPayer(montantEcheance, mouvements);
    if (solde > 0) {
      return true;
    }
    return false;
  }

  private calculResteAPayer(montant: number, mouvements: Mouvement[]): number {
    let solde = montant;
    mouvements.forEach((m) => {
      if (m.typeOperation === TypeOperation.Credit) {
        solde -= m.montant ?? 0;
      }
    });
    return solde;
  }

  addEcheance(echeance: Echeance): void {
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
