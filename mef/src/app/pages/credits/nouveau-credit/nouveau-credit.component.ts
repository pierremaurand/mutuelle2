import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { combineLatest, map, Observable } from 'rxjs';
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

@Component({
  selector: 'app-nouveau-credit',
  templateUrl: './nouveau-credit.component.html',
  styleUrls: ['./nouveau-credit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NouveauCreditComponent implements OnInit {
  status!: StatusPret;

  solde!: number;
  montant!: number;

  deboursement!: Deboursement;
  deboursement$!: Observable<Deboursement>;
  deboursements$!: Observable<Deboursement[]>;

  echeancier!: Echeance[];
  nbrEcheances: number = 0;
  echeancierGenerer: boolean = false;
  echeancier$!: Observable<Echeance[]>;
  echeances$!: Observable<Echeance[]>;

  debug: any;
  mouvements!: Mouvement[];
  mouvementsCredit$!: Observable<Mouvement[]>;
  mouvements$!: Observable<Mouvement[]>;

  membre!: Membre;
  membre$!: Observable<Membre>;
  membres$!: Observable<Membre[]>;

  credit!: Credit;
  credit$!: Observable<Credit>;
  credits$!: Observable<Credit[]>;

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
    this.credits$ = this.creditService.credits$;
    this.membres$ = this.membreService.membres$;
    this.deboursements$ = this.deboursementService.deboursements$;
    this.echeances$ = this.echeanceService.echeances$;
    this.mouvements$ = this.compteService.mouvements$;

    const idCredit$ = this.route.params.pipe(
      map((params) => +params['creditId'])
    );

    const idMembre$ = this.route.params.pipe(
      map((params) => +params['membreId'])
    );

    const idDeboursement$ = this.route.params.pipe(
      map((params) => +params['deboursementId'])
    );

    this.credit$ = combineLatest([idCredit$, this.credits$]).pipe(
      map(([id, credits]) => credits.filter((credit) => credit.id === id)[0])
    );

    this.membre$ = combineLatest([idMembre$, this.membres$]).pipe(
      map(([id, membres]) => membres.filter((membre) => membre.id === id)[0])
    );

    this.deboursement$ = combineLatest([
      idDeboursement$,
      this.deboursements$,
    ]).pipe(
      map(
        ([id, deboursements]) =>
          deboursements.filter((deboursement) => deboursement.id === id)[0]
      )
    );

    this.echeancier$ = combineLatest([idCredit$, this.echeances$]).pipe(
      map(([id, echeances]) =>
        echeances.filter((echeance) => echeance.creditId === id)
      )
    );

    this.mouvementsCredit$ = combineLatest([idCredit$, this.mouvements$]).pipe(
      map(([id, mouvements]) =>
        mouvements.filter((mouvement) => mouvement.creditId === id)
      )
    );

    this.membre$.subscribe((membre: Membre) => {
      if (membre) {
        this.idMembreCtrl.setValue(membre.id);
        this.membre = membre;
      }
    });

    this.credit$.subscribe((credit: Credit) => {
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
      console.log(deboursement);
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

    this.echeancier$.subscribe((echeancier: Echeance[]) => {
      if (echeancier.length != 0) {
        this.echeancier = echeancier;
        this.nbrEcheances = echeancier.length;
      }
    });

    this.mouvementsCredit$.subscribe((mouvements: Mouvement[]) => {
      if (mouvements.length != 0) {
        this.mouvements = mouvements;
        this.solde = this.calculSolde();
      }
    });
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
    if (this.creditForm.valid) {
      this.creditService.add(this.creditForm.value).subscribe();
      this.onGoBack();
    }
  }

  enregistrerAccord(): void {
    if (this.deboursementForm.valid) {
      this.creditService.validate(
        this.idCreditCtrl.value,
        this.deboursementForm.value
      );
      this.onGoBack();
    }
  }

  enregistrerEcheancier(): void {
    if (this.echeancier.length != 0) {
      this.echeanceService.addEcheances(this.echeancier).subscribe();
    }

    this.onGoBack();
  }

  debourser(): void {
    if (this.deboursementForm.valid) {
      let mouvements = [];
      let mouvement = new Mouvement();
      mouvement.membreId = this.idMembreCtrl.value;
      mouvement.creditId = this.idCreditCtrl.value;
      mouvement.deboursementId = this.idDeboursementCtrl.value;
      mouvement.dateMvt = this.dateDecaissementCtrl.value;
      mouvement.typeOperation = TypeOperation.Debit;
      mouvement.montant = this.montantAccordeCtrl.value;
      mouvement.libelle = 'Décaissement crédit n° ' + this.idCreditCtrl.value;
      mouvements.push(mouvement);

      mouvement = new Mouvement();
      mouvement.membreId = this.idMembreCtrl.value;
      mouvement.creditId = this.idCreditCtrl.value;
      mouvement.dateMvt = this.dateDecaissementCtrl.value;
      mouvement.typeOperation = TypeOperation.Debit;
      mouvement.montant = this.montantInteretCtrl.value;
      mouvement.libelle =
        'Prélèvement des intérêts du crédit n° ' + this.idCreditCtrl.value;
      mouvements.push(mouvement);

      mouvement = new Mouvement();
      mouvement.membreId = this.idMembreCtrl.value;
      mouvement.creditId = this.idCreditCtrl.value;
      mouvement.dateMvt = this.dateDecaissementCtrl.value;
      mouvement.typeOperation = TypeOperation.Debit;
      mouvement.montant = this.montantCommissionCtrl.value;
      mouvement.libelle =
        'Prélèvement des commission du crédit n° ' + this.idCreditCtrl.value;
      mouvements.push(mouvement);

      this.creditService.debourser(mouvements);
    }

    this.onGoBack();
  }

  onGoBack(): void {
    this.router.navigate(['/credits']);
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
        if (nbrEcheances) {
          for (let i = 1; i <= nbrEcheances; i++) {
            let echeance: Echeance = new Echeance();
            echeance.creditId = this.idCreditCtrl.value;
            echeance.membreId = this.idMembreCtrl.value;
            echeance.dateEcheance = this.datePipe.transform(
              curDate,
              'yyyy-MM-25'
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
