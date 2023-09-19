import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { combineLatest, map, Observable, startWith, switchMap } from 'rxjs';
import { StatusPret } from 'src/app/enums/statut-pret.enum';
import { Membre } from 'src/app/models/membre.model';
import { Credit } from 'src/app/models/credit';
import { CreditInfos } from 'src/app/models/credit-infos.model';
import { EcheanceCredit } from 'src/app/models/echeanceCredit';
import { MembreInfos } from 'src/app/models/membreInfos.model';
import { Mouvement } from 'src/app/models/mouvement';
import { CreditService } from 'src/app/services/credit.service';
import { MembreService } from 'src/app/services/membre.service';

@Component({
  selector: 'app-nouveau-credit',
  templateUrl: './nouveau-credit.component.html',
  styleUrls: ['./nouveau-credit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NouveauCreditComponent implements OnInit {
  membre: Membre = new Membre();
  echeancier: EcheanceCredit[] = [];
  nbrEcheances?: number = 0;
  mouvements!: Mouvement[];
  status!: StatusPret;
  creditFormDisabled: boolean = false;
  debourFormDisabled: boolean = false;

  solde!: number;
  credit$!: Observable<Credit>;
  loadingCredits$!: Observable<boolean>;

  membre$!: Observable<Membre>;
  membres$!: Observable<Membre[]>;
  membres: Membre[] = [];

  creditForm!: FormGroup;
  montantSolliciteCtrl!: FormControl;
  dureeSolliciteCtrl!: FormControl;
  dateDemandeCtrl!: FormControl;
  membreIdCtrl!: FormControl;
  idCreditCtrl!: FormControl;

  debourForm!: FormGroup;
  montantAccordeCtrl!: FormControl;
  dureeAccordeeCtrl!: FormControl;
  montantCommissionCtrl!: FormControl;
  montantInteretCtrl!: FormControl;
  dateDecaissementCtrl!: FormControl;
  creditIdCtrl!: FormControl;
  idDebourCtrl!: FormControl;

  searchCtrl!: FormControl;

  search!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private creditService: CreditService,
    private membreService: MembreService,
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
      membreId: this.membreIdCtrl,
    });

    this.debourForm = this.fb.group({
      id: this.idDebourCtrl,
      creditId: this.creditIdCtrl,
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
    this.membreIdCtrl = this.fb.control('', Validators.required);

    this.searchCtrl = this.fb.control('');

    this.idDebourCtrl = this.fb.control(0, Validators.required);
    this.creditIdCtrl = this.fb.control(0, Validators.required);
    this.montantAccordeCtrl = this.fb.control('', Validators.required);
    this.dureeAccordeeCtrl = this.fb.control('', Validators.required);
    this.montantInteretCtrl = this.fb.control('', Validators.required);
    this.montantCommissionCtrl = this.fb.control('', Validators.required);
    this.dateDecaissementCtrl = this.fb.control('', Validators.required);
  }

  private initObservables() {
    this.credit$ = this.route.params.pipe(
      switchMap((params) =>
        this.creditService.getCreditById(+params['creditId'])
      )
    );

    this.credit$.subscribe((credit: Credit) => {
      this.creditIdCtrl.setValue(credit.id);
      this.creditForm.patchValue({
        id: credit.id,
        membreId: credit.membreId,
        // nom: credit.nom,
        montantSollicite: credit.montantSollicite,
        dureeSollicite: credit.dureeSollicite,
        dateDemande: credit.dateDemande,
      });

      // if (credit.creditDebourse) {
      //   this.debourForm.patchValue({
      //     id: credit.creditDebourse.id,
      //     creditId: credit.id,
      //     montantAccorde: credit.creditDebourse.montantAccorde,
      //     dureeAccordee: credit.creditDebourse.dureeAccordee,
      //     montantCommission: credit.creditDebourse.montantCommission,
      //     montantInteret: credit.creditDebourse.montantInteret,
      //     dateDecaissement: credit.creditDebourse.dateDecaissement,
      //   });
      //   this.nbrEcheances = credit.creditDebourse.dureeAccordee;
      // }

      // if (credit.echeancier) {
      //   this.echeancier = credit.echeancier;
      // }
      // this.solde = credit.solde;
      this.debourFormDisabled = this.dDebourFormInfos();
      this.creditFormDisabled = this.dCreditFormInfos();
      // this.membreChoisie(credit.membreId);
    });

    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      map((value) => value.toLowerCase())
    );
  }

  membreChoisie(membre: Membre) {
    // this.membre$.subscribe((membre) => {
    //   this.membre = membre;
    //   this.membreIdCtrl.setValue(id);
    // });
  }

  dCreditFormInfos(): boolean {
    if (this.idCreditCtrl.value == 0) {
      return false;
    }
    return true;
  }

  dDebourFormInfos(): boolean {
    if (this.idDebourCtrl.value == 0) {
      return false;
    }
    return true;
  }

  //--------------------------------------------------------

  enregistrer(): void {
    if (this.creditForm.valid && this.idCreditCtrl.value == 0) {
      this.creditService.add(this.creditForm.value).subscribe();
    }

    if (this.debourForm.valid && this.idDebourCtrl.value == 0) {
      this.creditService
        .debourserCredit(this.idCreditCtrl.value, this.debourForm.value)
        .subscribe();
    }

    if (this.debourForm.valid && this.checkEcheancier()) {
      this.creditService
        .addEcheancier(this.creditIdCtrl.value, this.echeancier)
        .subscribe();
    }

    this.onGoBack();
  }

  checkEcheancier(): boolean {
    let test = true;
    if (this.echeancier.length == 0) {
      test = false;
    } else {
      this.echeancier.forEach((e) => {
        if (e.id == 0) {
          test = true;
        }
      });
    }

    return test;
  }

  onGoBack(): void {
    this.router.navigate(['/credits']);
  }

  genererEcheancier(): void {
    let dateDebut = new Date();
    let curDate = new Date();
    let capital: number | undefined = 0;
    let interet: number | undefined = 0;
    let montantCapital: number | undefined = 0;
    let montantInteret: number | undefined = 0;
    let nbrEcheances: number | undefined = 0;
    let resteCapital: number | undefined = 0;
    let resteInteret: number | undefined = 0;

    if (this.debourForm.valid) {
      dateDebut = new Date(this.dateDecaissementCtrl.value);
      nbrEcheances = this.dureeAccordeeCtrl.value;
      montantCapital = this.montantAccordeCtrl.value;
      montantInteret =
        this.montantInteretCtrl.value + this.montantCommissionCtrl.value;

      if (montantCapital && montantInteret && nbrEcheances) {
        capital = Math.round(montantCapital / nbrEcheances);
        resteCapital = montantCapital - capital * nbrEcheances;
        interet = Math.round(montantInteret / nbrEcheances);
        resteInteret = montantInteret - interet * nbrEcheances;
      }

      this.nbrEcheances = nbrEcheances;

      if (nbrEcheances && nbrEcheances <= 24 && nbrEcheances > 0) {
        this.echeancier = [];
        curDate = dateDebut;
        if (nbrEcheances) {
          for (let i = 1; i <= nbrEcheances; i++) {
            if (curDate.getMonth() == 11) {
              curDate.setFullYear(curDate.getFullYear() + 1);
              curDate.setMonth(0);
            } else {
              curDate.setMonth(curDate.getMonth() + 1);
            }
            let echeance: EcheanceCredit = new EcheanceCredit();
            echeance.dateEcheance = this.datePipe.transform(
              curDate,
              'yyyy-MM-dd'
            );
            echeance.capital = capital;
            echeance.interet = interet;
            if (i === 1) {
              echeance.capital = capital + resteCapital;
              echeance.interet = interet + resteInteret;
            }
            this.echeancier.push(echeance);
          }
        }
      }
    }
  }

  getSolde(): void {
    // this.creditService
    //   .getInfosCredit(this.credit.id)
    //   .subscribe((infos: InfosCredit) => {
    //     this.solde = infos.solde;
    //     this.status = infos.status;
    //   });
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
