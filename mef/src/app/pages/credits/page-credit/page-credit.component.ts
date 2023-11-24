import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { StatusPret } from 'src/app/enums/statut-pret.enum';
import { Avance } from 'src/app/models/avance';
import { Credit } from 'src/app/models/credit';
import { CreditInfos } from 'src/app/models/credit-infos.model';
import { Membre } from 'src/app/models/membre.model';
import { Mouvement } from 'src/app/models/mouvement';
import { TypeOperation } from 'src/app/models/typeoperation';
import { CompteService } from 'src/app/services/compte.service';
import { CreditService } from 'src/app/services/credit.service';
import { DeboursementService } from 'src/app/services/deboursement.service';
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
  membres$!: Observable<Membre[]>;
  mouvements$!: Observable<Mouvement[]>;
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
    private compteService: CompteService,
    private deboursementService: DeboursementService,
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
      { value: StatusPret.VALIDE, label: 'Validé' },
      { value: StatusPret.DEBOURSE, label: 'Déboursé' },
      { value: StatusPret.ENCOURS, label: 'Encours' },
      { value: StatusPret.SOLDE, label: 'Soldé' },
    ];
  }

  private initObservables(): void {
    this.credits$ = this.creditService.credits$;
    this.membres$ = this.membreService.membres$;
    this.mouvements$ = this.compteService.mouvements$;

    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      map((value) => value.toLowerCase())
    );

    const statusPret$ = this.statusPretCtrl.valueChanges.pipe(
      startWith(StatusPret.AUCUN),
      map((value) => value.toString())
    );

    this.credits$ = combineLatest([
      search$,
      statusPret$,
      this.membres$,
      this.credits$,
      this.mouvements$,
    ]).pipe(
      map(([search, statusPret, membres, credits, mouvements]) =>
        credits.filter(
          (credit) =>
            membres.find(
              (membre) =>
                membre.id === credit.membreId &&
                membre.nom.toLowerCase().includes(search as string)
            ) &&
            this.checkStatut(
              credit,
              statusPret,
              mouvements.filter((m) => m.creditId === credit.id)
            )
        )
      )
    );
  }

  private checkStatut(
    credit: Credit,
    statutPret: StatusPret,
    mouvements: Mouvement[]
  ): boolean {
    const statut = this.getStatutPret(credit.deboursementId, mouvements);
    if (statut == statutPret || statutPret == StatusPret.AUCUN) {
      return true;
    }
    return false;
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

  //--------------------------------------

  newEvent(): void {
    this.navigate(0, 0, 0);
  }

  navigate(
    creditId: number = 0,
    membreId: number = 0,
    deboursementId: number | null = 0
  ): void {
    this.router.navigate([
      '/nouveaucredit/' + creditId + '/' + membreId + '/' + deboursementId,
    ]);
  }

  exportCredits(): void {}

  importCredits(): void {}

  effacer(): void {
    this.statusPretCtrl.setValue('');
  }
}
