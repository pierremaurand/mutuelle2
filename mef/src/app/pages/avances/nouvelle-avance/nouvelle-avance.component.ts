import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, map } from 'rxjs';
import { StatusPret } from 'src/app/enums/statut-pret.enum';
import { Membre } from 'src/app/models/membre.model';
import { Avance } from 'src/app/models/avance';
import { Deboursement } from 'src/app/models/deboursement.model';
import { Mouvement } from 'src/app/models/mouvement';
import { AvanceService } from 'src/app/services/avance.service';
import { CompteService } from 'src/app/services/compte.service';
import { DeboursementService } from 'src/app/services/deboursement.service';
import { EcheanceService } from 'src/app/services/echeance.service';
import { Echeance } from 'src/app/models/echeance.model';
import { TypeOperation } from 'src/app/models/typeoperation';
import { MembreService } from 'src/app/services/membre.service';

@Component({
  selector: 'app-nouvelle-avance',
  templateUrl: './nouvelle-avance.component.html',
  styleUrls: ['./nouvelle-avance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NouvelleAvanceComponent implements OnInit {
  echeancier: Echeance[] = [];
  nbrEcheances: number = 0;
  mouvements: Mouvement[] = [];
  status!: StatusPret;
  avanceFormDisabled: boolean = false;
  deboursementFormDisabled: boolean = false;
  echeancierDisabled: boolean = false;
  mouvementsDisabled: boolean = false;

  solde!: number;
  montant!: number;
  membre: Membre = new Membre();
  avance$!: Observable<Avance>;
  idAvance$!: Observable<number>;
  membre$!: Observable<Membre>;
  idMembre$!: Observable<number>;
  deboursement$!: Observable<Deboursement>;
  idDeboursement$!: Observable<number>;
  echeancier$!: Observable<Echeance[]>;
  mouvements$!: Observable<Mouvement[]>;

  avanceForm!: FormGroup;
  montantSolliciteCtrl!: FormControl;
  nombreEcheancesSolliciteCtrl!: FormControl;
  dateDemandeCtrl!: FormControl;
  membreIdCtrl!: FormControl;
  idAvanceCtrl!: FormControl;

  debourForm!: FormGroup;
  montantAccordeCtrl!: FormControl;
  dureeAccordeeCtrl!: FormControl;
  dateDecaissementCtrl!: FormControl;
  idDebourCtrl!: FormControl;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private membreService: MembreService,
    private avanceService: AvanceService,
    private deboursementService: DeboursementService,
    private echeanceService: EcheanceService,
    private compteService: CompteService,
    private datePipe: DatePipe,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initFormControls();
    this.initForm();
    this.initObservables();
  }

  private initForm() {
    this.avanceForm = this.fb.group({
      id: this.idAvanceCtrl,
      montantSollicite: this.montantSolliciteCtrl,
      nombreEcheancesSollicite: this.nombreEcheancesSolliciteCtrl,
      dateDemande: this.dateDemandeCtrl,
      membreId: this.membreIdCtrl,
    });

    this.debourForm = this.fb.group({
      id: this.idDebourCtrl,
      membreId: this.membreIdCtrl,
      montantAccorde: this.montantAccordeCtrl,
      dureeAccordee: this.dureeAccordeeCtrl,
      dateDecaissement: this.dateDecaissementCtrl,
    });
  }

  private initFormControls() {
    this.idAvanceCtrl = this.fb.control(0, Validators.required);
    this.montantSolliciteCtrl = this.fb.control('', Validators.required);
    this.nombreEcheancesSolliciteCtrl = this.fb.control(
      '',
      Validators.required
    );
    this.dateDemandeCtrl = this.fb.control('', Validators.required);
    this.membreIdCtrl = this.fb.control('', Validators.required);

    this.idDebourCtrl = this.fb.control(0, Validators.required);
    this.montantAccordeCtrl = this.fb.control('', Validators.required);
    this.dureeAccordeeCtrl = this.fb.control('', Validators.required);
    this.dateDecaissementCtrl = this.fb.control('', Validators.required);
  }

  private initObservables() {
    const idAvance$ = this.route.params.pipe(
      map((params) => +params['avanceId'])
    );

    const idMembre$ = this.route.params.pipe(
      map((params) => +params['membreId'])
    );

    const idDeboursement$ = this.route.params.pipe(
      map((params) => +params['deboursementId'])
    );

    this.avance$ = combineLatest([idAvance$, this.avanceService.avances$]).pipe(
      map(([id, avances]) => avances.filter((avance) => avance.id === id)[0])
    );

    this.membre$ = combineLatest([idMembre$, this.membreService.membres$]).pipe(
      map(([id, membres]) => membres.filter((membre) => membre.id === id)[0])
    );

    this.deboursement$ = combineLatest([
      idDeboursement$,
      this.deboursementService.deboursements$,
    ]).pipe(
      map(
        ([id, deboursements]) =>
          deboursements.filter((deboursement) => deboursement.id === id)[0]
      )
    );

    this.echeancier$ = combineLatest([
      idAvance$,
      this.echeanceService.echeances$,
    ]).pipe(
      map(([id, echeances]) =>
        echeances.filter((echeance) => echeance.avanceId === id)
      )
    );

    this.mouvements$ = combineLatest([
      idAvance$,
      this.compteService.mouvements$,
    ]).pipe(
      map(([id, mouvements]) =>
        mouvements.filter((mouvement) => mouvement.avanceId === id)
      )
    );

    this.membre$.subscribe((membre: Membre) => {
      if (membre) {
        this.membreIdCtrl.setValue(membre.id);
        this.membre = membre;
      }
    });

    this.avance$.subscribe((avance: Avance) => {
      if (avance.id != 0) this.avanceFormDisabled = true;
      this.avanceForm.patchValue({
        id: avance.id,
        membreId: avance.membreId,
        montantSollicite: avance.montantSollicite,
        nombreEcheancesSollicite: avance.nombreEcheancesSollicite,
        dateDemande: avance.dateDemande,
      });
    });

    this.deboursement$.subscribe((deboursement) => {
      if (deboursement.id != 0) this.deboursementFormDisabled = true;

      this.debourForm.patchValue({
        id: deboursement.id,
        montantAccorde: deboursement.montantAccorde,
        dureeAccordee: deboursement.dureeAccordee,
        dateDecaissement: deboursement.dateDecaissement,
        membreId: deboursement.membreId,
      });
    });

    this.echeancier$.subscribe((echeancier: Echeance[]) => {
      if (echeancier.length != 0) this.echeancierDisabled = true;

      this.echeancier = echeancier;
      this.nbrEcheances = echeancier.length;
    });

    this.mouvements$.subscribe((mouvements: Mouvement[]) => {
      if (mouvements.length != 0) this.mouvementsDisabled = true;

      this.mouvements = mouvements;
      this.solde = this.calculSolde();
    });
  }

  membreChoisie(membre: Membre) {
    this.membreIdCtrl.setValue(membre.id);
    this.membre = membre;
  }

  private calculSolde(): number {
    let solde = 0;
    this.mouvements.forEach((mouvement) => {
      if (mouvement.typeOperation === TypeOperation.Debit) {
        solde += mouvement.montant;
      } else {
        solde -= mouvement.montant;
      }
    });

    return solde;
  }

  //-----------------------------------------------------

  debourser(): void {
    if (this.debourForm.valid) {
      let mouvement = new Mouvement();
      mouvement.membreId = this.membreIdCtrl.value;
      mouvement.avanceId = this.idAvanceCtrl.value;
      mouvement.deboursementId = this.idDebourCtrl.value;
      mouvement.dateMvt = this.dateDecaissementCtrl.value;
      mouvement.typeOperation = TypeOperation.Debit;
      mouvement.montant = this.montantAccordeCtrl.value;
      mouvement.libelle = 'Décaissement avance n° ' + this.idAvanceCtrl.value;
      this.avanceService.enregistrerMouvement(mouvement);
    }

    this.onGoBack();
  }

  enregistrerAvance(): void {
    if (this.avanceForm.valid && this.idAvanceCtrl.value == 0) {
      this.avanceService.add(this.avanceForm.value).subscribe();
    }

    this.onGoBack();
  }

  enregistrerDecision(): void {
    if (this.debourForm.valid && this.idDebourCtrl.value == 0) {
      this.deboursementService
        .deboursementAvance(this.idAvanceCtrl.value, this.debourForm.value)
        .subscribe();
    }

    this.onGoBack();
  }

  enregistrerEcheancier(): void {
    if (this.debourForm.valid && this.echeancier.length != 0) {
      this.echeanceService.addEcheances(this.echeancier).subscribe();
    }

    this.onGoBack();
  }

  onGoBack(): void {
    this.router.navigate(['/avances']);
  }

  navigate(avanceId: number, membreId: number, deboursementId: number): void {
    this.router.navigate([
      '/nouvelleavance/' + avanceId + '/' + membreId + '/' + deboursementId,
    ]);
  }

  genererEcheancier(): void {
    let dateDebut = new Date();
    let curDate = new Date();
    let montantEcheance: number | undefined = 0;
    let montant: number | undefined = 0;
    let nbrEcheances: number | undefined = 0;
    let reste: number | undefined = 0;

    if (this.debourForm.valid) {
      dateDebut = new Date(this.dateDecaissementCtrl.value);
      nbrEcheances = this.dureeAccordeeCtrl.value;
      montant = this.montantAccordeCtrl.value;
      if (montant && nbrEcheances) {
        reste = montant % nbrEcheances;
        montantEcheance = (montant - reste) / nbrEcheances;
      }

      this.nbrEcheances = nbrEcheances ?? 0;

      if (nbrEcheances && nbrEcheances <= 9 && nbrEcheances > 0) {
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
            let echeance: Echeance = new Echeance();
            echeance.avanceId = this.idAvanceCtrl.value;
            echeance.membreId = this.membreIdCtrl.value;
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
          }
        }
      }
    }
  }
}
