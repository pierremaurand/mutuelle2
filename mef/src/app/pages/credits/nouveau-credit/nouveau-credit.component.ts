import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { StatusPret } from 'src/app/enums/statut-pret.enum';
import { Membre } from 'src/app/models/membre.model';
import { Credit } from 'src/app/models/credit';
import { Mouvement } from 'src/app/models/mouvement';
import { CreditService } from 'src/app/services/credit.service';
import { MembreService } from 'src/app/services/membre.service';
import { Deboursement } from 'src/app/models/deboursement.model';
import { Echeance } from 'src/app/models/echeance.model';
import { CompteService } from 'src/app/services/compte.service';
import { DeboursementService } from 'src/app/services/deboursement.service';
import { EcheanceService } from 'src/app/services/echeance.service';
import { TypeOperation } from 'src/app/models/typeoperation';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-nouveau-credit',
  templateUrl: './nouveau-credit.component.html',
  styleUrls: ['./nouveau-credit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NouveauCreditComponent implements OnInit {
  status!: StatusPret;
  creditDebourse: boolean = false;

  solde!: number;
  montant!: number;
  soldeCompte: number = 0;

  deboursement!: Deboursement;
  deboursement$!: Observable<Deboursement | undefined>;

  echeancier!: Echeance[];
  nbrEcheances: number = 0;
  echeancierGenerer: boolean = false;
  aEcheancier: boolean = false;
  echeancier$!: Observable<Echeance[] | undefined>;

  debug: any;
  mouvements!: Mouvement[];
  mouvements$!: Observable<Mouvement[] | undefined>;
  mouvementsMembre$!: Observable<Mouvement[] | undefined>;

  membre!: Membre;
  membre$!: Observable<Membre | undefined>;

  credit!: Credit;
  credit$!: Observable<Credit | undefined>;

  creditForm!: FormGroup;
  montantSolliciteCtrl!: FormControl;
  dureeSolliciteCtrl!: FormControl;
  dateDemandeCtrl!: FormControl;
  idMembreCtrl!: FormControl;
  idCreditCtrl!: FormControl;

  deboursementForm!: FormGroup;
  montantAccordeCtrl!: FormControl;
  dureeAccordeeCtrl!: FormControl;
  montantCommissionCtrl!: FormControl;
  montantInteretCtrl!: FormControl;
  dateDecaissementCtrl!: FormControl;
  idDeboursementCtrl!: FormControl;

  searchCtrl!: FormControl;

  search!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private creditService: CreditService,
    private membreService: MembreService,
    private compteService: CompteService,
    private deboursementService: DeboursementService,
    private echeanceService: EcheanceService,
    private datePipe: DatePipe,
    private alertify: AlertifyService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initFormControls();
    this.initForm();
    this.initObservables();
  }

  private initForm() {
    this.creditForm = this.fb.group({
      id: this.idCreditCtrl,
      montantSollicite: this.montantSolliciteCtrl,
      dureeSollicite: this.dureeSolliciteCtrl,
      dateDemande: this.dateDemandeCtrl,
      membreId: this.idMembreCtrl,
    });

    this.deboursementForm = this.fb.group({
      id: this.idDeboursementCtrl,
      membreId: this.idMembreCtrl,
      montantAccorde: this.montantAccordeCtrl,
      dureeAccordee: this.dureeAccordeeCtrl,
      montantCommission: this.montantCommissionCtrl,
      montantInteret: this.montantInteretCtrl,
      dateDecaissement: this.dateDecaissementCtrl,
    });
  }

  private initFormControls() {
    this.idCreditCtrl = this.fb.control(0, Validators.required);
    this.montantSolliciteCtrl = this.fb.control('', Validators.required);
    this.dureeSolliciteCtrl = this.fb.control('', Validators.required);
    this.dateDemandeCtrl = this.fb.control('', Validators.required);

    this.searchCtrl = this.fb.control('');

    this.idDeboursementCtrl = this.fb.control(0, Validators.required);
    this.montantAccordeCtrl = this.fb.control('', Validators.required);
    this.dureeAccordeeCtrl = this.fb.control('', Validators.required);
    this.montantInteretCtrl = this.fb.control('', Validators.required);
    this.montantCommissionCtrl = this.fb.control('', Validators.required);
    this.dateDecaissementCtrl = this.fb.control('', Validators.required);

    this.idMembreCtrl = this.fb.control('', Validators.required);
  }

  private initObservables() {
    const idCredit$ = this.route.params.pipe(
      map((params) => +params['creditId'])
    );

    const idMembre$ = this.idMembreCtrl.valueChanges.pipe(
      startWith(this.idMembreCtrl.value),
      map((value) => value)
    );

    this.credit$ = combineLatest([idCredit$, this.creditService.credits$]).pipe(
      map(([id, credits]) => credits.find((credit) => credit.id === id))
    );

    this.membre$ = combineLatest([
      idCredit$,
      this.creditService.credits$,
      this.membreService.membres$,
    ]).pipe(
      map(([id, credits, membres]) =>
        membres.find((membre) =>
          credits.find(
            (credit) => credit.id === id && credit.membreId === membre.id
          )
        )
      )
    );

    this.deboursement$ = combineLatest([
      idCredit$,
      this.creditService.credits$,
      this.deboursementService.deboursements$,
    ]).pipe(
      map(([id, credits, deboursements]) =>
        deboursements.find((deboursement) =>
          credits.find(
            (credit) =>
              credit.id === id &&
              credit.deboursementId &&
              deboursement.id === credit.deboursementId
          )
        )
      )
    );

    this.echeancier$ = combineLatest([
      idCredit$,
      this.echeanceService.echeances$,
    ]).pipe(
      map(([id, echeances]) =>
        echeances.filter((echeance) => echeance.creditId === id)
      )
    );

    this.mouvements$ = combineLatest([
      idCredit$,
      this.compteService.mouvements$,
    ]).pipe(
      map(([id, mouvements]) =>
        mouvements.filter((mouvement) => mouvement.creditId === id)
      )
    );

    this.mouvementsMembre$ = combineLatest([
      idMembre$,
      this.compteService.mouvements$,
    ]).pipe(
      map(([id, mouvements]) =>
        mouvements.filter((mouvement) => mouvement.membreId === id)
      )
    );

    this.membre$.subscribe((membre) => {
      if (membre) {
        this.idMembreCtrl.setValue(membre.id);
        this.membre = membre;
      }
    });

    this.credit$.subscribe((credit) => {
      if (credit) {
        this.credit = credit;
        this.creditForm.patchValue({
          id: credit.id,
          montantSollicite: credit.montantSollicite,
          dureeSollicite: credit.dureeSollicite,
          dateDemande: credit.dateDemande,
        });
      }
    });

    this.deboursement$.subscribe((deboursement) => {
      if (deboursement) {
        this.deboursementForm.patchValue({
          id: deboursement.id,
          montantAccorde: deboursement.montantAccorde,
          dureeAccordee: deboursement.dureeAccordee,
          dateDecaissement: deboursement.dateDecaissement,
          montantInteret: deboursement.montantInteret,
          montantCommission: deboursement.montantCommission,
          membreId: deboursement.membreId,
        });
        this.deboursement = deboursement;
      }
    });

    this.echeancier$.subscribe((echeancier) => {
      if (echeancier && echeancier.length != 0) {
        this.echeancier = echeancier;
        this.nbrEcheances = echeancier.length;
        this.aEcheancier = true;
      }
    });

    this.mouvements$.subscribe((mouvements) => {
      if (mouvements && mouvements.length != 0) {
        this.mouvements = mouvements;
        this.solde = this.calculSolde();
        this.creditDebourse = true;
      }
    });

    this.mouvementsMembre$.subscribe((mouvements: Mouvement[] | undefined) => {
      if (mouvements) {
        this.soldeCompte = this.calculSoldeCompte(mouvements);
      }
    });
  }

  private calculSoldeCompte(mouvements: Mouvement[]): number {
    let solde = 0;
    mouvements.forEach((mouvement) => {
      if (mouvement.typeOperation === TypeOperation.Credit) {
        solde += mouvement.montant ?? 0;
      } else {
        solde -= mouvement.montant ?? 0;
      }
    });

    return solde;
  }

  membreChoisie(membre: Membre) {
    this.idMembreCtrl.setValue(membre.id);
    this.membre = membre;
  }

  private calculSolde(): number {
    let solde = 0;
    if (this.mouvements) {
      this.mouvements.forEach((mouvement) => {
        if (mouvement.typeOperation === TypeOperation.Debit) {
          solde += mouvement.montant;
        } else {
          solde -= mouvement.montant;
        }
      });
    }

    return solde;
  }

  enregistrerDemande(): void {
    if (
      this.creditForm.valid &&
      this.idCreditCtrl.value == 0 &&
      this.soldeCompte > this.montantSolliciteCtrl.value
    ) {
      if (this.dureeSolliciteCtrl.value <= 24) {
        this.creditService.add(this.creditForm.value).subscribe(() => {
          this.onGoBack();
        });
      } else {
        this.alertify.error(
          'La durée sollicitée doit être inférieur ou égale à 24 mois!'
        );
      }
    } else {
      this.alertify.error(
        'Le montant sollicité doit être inférieur à ' + this.soldeCompte
      );
    }
  }

  enregistrerAccord(): void {
    if (
      this.deboursementForm.valid &&
      this.idDeboursementCtrl.value === 0 &&
      this.soldeCompte >
        this.montantAccordeCtrl.value +
          this.montantCommissionCtrl.value +
          this.montantInteretCtrl.value
    ) {
      if (this.dureeAccordeeCtrl.value <= 24) {
        this.creditService
          .validate(this.idCreditCtrl.value, this.deboursementForm.value)
          .subscribe(() => {
            this.reload(this.idCreditCtrl.value);
          });
      } else {
        this.alertify.error(
          'La durée accordée doit être inférieure ou égale à 24 mois!'
        );
      }
    } else {
      this.alertify.error(
        'Le montant accordé doit être inférieur à ' + this.soldeCompte
      );
    }
  }

  enregistrerEcheancier(): void {
    if (this.echeancier.length != 0) {
      this.echeanceService.addEcheances(this.echeancier).subscribe(() => {
        this.onGoBack();
      });
    }
  }

  debourser(): void {
    if (this.deboursementForm.valid) {
      let mouvements = [];
      let deboursement = new Mouvement();
      let prelevementInt = new Mouvement();
      let prelevementCom = new Mouvement();

      deboursement.membreId = this.idMembreCtrl.value;
      deboursement.creditId = this.idCreditCtrl.value;
      deboursement.deboursementId = this.idDeboursementCtrl.value;
      deboursement.dateMvt = this.dateDecaissementCtrl.value;
      deboursement.typeOperation = TypeOperation.Debit;
      deboursement.montant = this.montantAccordeCtrl.value;
      deboursement.libelle =
        'Décaissement crédit n° ' + this.idCreditCtrl.value;
      mouvements.push(deboursement);

      prelevementInt.membreId = this.idMembreCtrl.value;
      prelevementInt.creditId = this.idCreditCtrl.value;
      prelevementInt.dateMvt = this.dateDecaissementCtrl.value;
      prelevementInt.typeOperation = TypeOperation.Debit;
      prelevementInt.montant = this.montantInteretCtrl.value;
      prelevementInt.libelle =
        'Prélèvement des intérêts du crédit n° ' + this.idCreditCtrl.value;
      mouvements.push(prelevementInt);

      prelevementCom.membreId = this.idMembreCtrl.value;
      prelevementCom.creditId = this.idCreditCtrl.value;
      prelevementCom.dateMvt = this.dateDecaissementCtrl.value;
      prelevementCom.typeOperation = TypeOperation.Debit;
      prelevementCom.montant = this.montantCommissionCtrl.value;
      prelevementCom.libelle =
        'Prélèvement des commission du crédit n° ' + this.idCreditCtrl.value;
      mouvements.push(prelevementCom);

      this.creditService.debourser(mouvements).subscribe(() => {
        this.onGoBack();
      });
    }
  }

  onGoBack(): void {
    this.router.navigate(['home', 'credits']);
  }

  reload(creditId: number): void {
    this.router.navigate(['home', 'nouveaucredit', creditId]);
  }

  genererEcheancier(): void {
    let dateDebut = new Date();
    let curDate = new Date();
    let montantEcheance: number | undefined = 0;
    let montant: number | undefined = 0;
    let nbrEcheances: number | undefined = 0;
    let reste: number | undefined = 0;

    if (this.deboursementForm.valid) {
      dateDebut = new Date(this.dateDecaissementCtrl.value);
      nbrEcheances = this.dureeAccordeeCtrl.value;
      montant = this.montantAccordeCtrl.value;
      montant += this.montantInteretCtrl.value;
      montant += this.montantCommissionCtrl.value;
      if (montant && nbrEcheances) {
        reste = montant % nbrEcheances;
        montantEcheance = (montant - reste) / nbrEcheances;
      }

      this.nbrEcheances = nbrEcheances ?? 0;

      if (nbrEcheances && nbrEcheances <= 24 && nbrEcheances > 0) {
        this.echeancier = [];
        curDate = dateDebut;
        if (curDate.getDay() > 15) {
          curDate.setMonth(curDate.getMonth() + 1);
        }
        if (nbrEcheances) {
          for (let i = 1; i <= nbrEcheances; i++) {
            let echeance: Echeance = new Echeance();
            echeance.creditId = this.idCreditCtrl.value;
            echeance.membreId = this.idMembreCtrl.value;
            echeance.dateEcheance = this.datePipe.transform(
              curDate,
              'yyyy-MM-dd'
            );
            echeance.montantEcheance = montantEcheance;
            if (reste !== 0) {
              echeance.montantEcheance = montantEcheance + 1;
              reste -= 1;
            }

            this.echeancier.push(echeance);
            if (curDate.getMonth() == 11) {
              curDate.setFullYear(curDate.getFullYear() + 1);
              curDate.setMonth(0);
            } else {
              curDate.setMonth(curDate.getMonth() + 1);
            }
          }
        }
      }
    }
    this.echeancierGenerer = true;
  }

  calculInteret(): void {
    if (
      this.montantAccordeCtrl &&
      this.montantAccordeCtrl.value != 0 &&
      this.dureeAccordeeCtrl &&
      this.dureeAccordeeCtrl.value != 0
    ) {
      this.montantInteretCtrl.setValue(
        Math.round(
          (this.montantAccordeCtrl.value * 2 * this.dureeAccordeeCtrl.value) /
            1200
        )
      );
      this.montantCommissionCtrl.setValue(
        Math.round(this.montantAccordeCtrl.value / 100)
      );
      if (this.montantCommissionCtrl.value < 1000) {
        this.montantCommissionCtrl.setValue(1000);
      }
    }
  }
}
