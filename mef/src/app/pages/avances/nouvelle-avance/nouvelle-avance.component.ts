import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, map, startWith } from 'rxjs';
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
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-nouvelle-avance',
  templateUrl: './nouvelle-avance.component.html',
  styleUrls: ['./nouvelle-avance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NouvelleAvanceComponent implements OnInit {
  status!: StatusPret;
  avanceDebourse: boolean = false;

  solde!: number;
  montant!: number;
  soldeCompte: number = 0;

  deboursement!: Deboursement;
  deboursement$!: Observable<Deboursement | undefined>;

  echeancier!: Echeance[];
  nbrEcheances: number = 0;
  aEcheancier: boolean = false;
  echeancierGenerer: boolean = false;
  echeances$!: Observable<Echeance[] | undefined>;

  mouvement!: Mouvement;
  mouvements!: Mouvement[];
  mouvements$!: Observable<Mouvement[] | undefined>;
  mouvementsMembre$!: Observable<Mouvement[] | undefined>;

  membre!: Membre;
  membre$!: Observable<Membre | undefined>;

  avance!: Avance;
  avance$!: Observable<Avance | undefined>;

  avanceForm!: FormGroup;
  montantSolliciteCtrl!: FormControl;
  nombreEcheancesSolliciteCtrl!: FormControl;
  dateDemandeCtrl!: FormControl;
  idMembreCtrl!: FormControl;
  idAvanceCtrl!: FormControl;

  debourForm!: FormGroup;
  montantAccordeCtrl!: FormControl;
  dureeAccordeeCtrl!: FormControl;
  dateDecaissementCtrl!: FormControl;
  idDeboursementCtrl!: FormControl;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public membreService: MembreService,
    public avanceService: AvanceService,
    public deboursementService: DeboursementService,
    public echeanceService: EcheanceService,
    public compteService: CompteService,
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private alertify: AlertifyService
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
      membreId: this.idMembreCtrl,
    });

    this.debourForm = this.fb.group({
      id: this.idDeboursementCtrl,
      membreId: this.idMembreCtrl,
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
    this.idMembreCtrl = this.fb.control(0, Validators.required);

    this.idDeboursementCtrl = this.fb.control(0, Validators.required);
    this.montantAccordeCtrl = this.fb.control('', Validators.required);
    this.dureeAccordeeCtrl = this.fb.control('', Validators.required);
    this.dateDecaissementCtrl = this.fb.control('', Validators.required);
  }

  private initObservables() {
    const idAvance$ = this.route.params.pipe(
      map((params) => +params['avanceId'])
    );

    const idMembre$ = this.idMembreCtrl.valueChanges.pipe(
      startWith(this.idMembreCtrl.value),
      map((value) => value)
    );

    this.avance$ = combineLatest([idAvance$, this.avanceService.avances$]).pipe(
      map(([id, avances]) => avances.find((avance) => avance.id === id))
    );

    this.membre$ = combineLatest([
      idAvance$,
      this.avanceService.avances$,
      this.membreService.membres$,
    ]).pipe(
      map(([id, avances, membres]) =>
        membres.find((membre) =>
          avances.find(
            (avance) => avance.id === id && avance.membreId === membre.id
          )
        )
      )
    );

    this.deboursement$ = combineLatest([
      idAvance$,
      this.avanceService.avances$,
      this.deboursementService.deboursements$,
    ]).pipe(
      map(([id, avances, deboursements]) =>
        deboursements.find((deboursement) =>
          avances.find(
            (avance) =>
              avance.id === id &&
              avance.deboursementId &&
              avance.deboursementId === deboursement.id
          )
        )
      )
    );

    this.echeances$ = combineLatest([
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

    this.mouvementsMembre$ = combineLatest([
      idMembre$,
      this.compteService.mouvements$,
    ]).pipe(
      map(([id, mouvements]) =>
        mouvements.filter((mouvement) => mouvement.membreId === id)
      )
    );

    this.membre$.subscribe((membre: Membre | undefined) => {
      if (membre) {
        this.idMembreCtrl.setValue(membre.id);
        this.membre = membre;
      }
    });

    this.avance$.subscribe((avance: Avance | undefined) => {
      if (avance) {
        this.avance = avance;
        this.avanceForm.patchValue({
          id: avance.id,
          membreId: avance.membreId,
          montantSollicite: avance.montantSollicite,
          nombreEcheancesSollicite: avance.nombreEcheancesSollicite,
          dateDemande: avance.dateDemande,
        });
      }
    });

    this.deboursement$.subscribe((deboursement: Deboursement | undefined) => {
      if (deboursement) {
        this.deboursement = deboursement;
        this.debourForm.patchValue({
          id: deboursement.id,
          montantAccorde: deboursement.montantAccorde,
          dureeAccordee: deboursement.dureeAccordee,
          dateDecaissement: deboursement.dateDecaissement,
          membreId: deboursement.membreId,
        });
      }
    });

    this.echeances$.subscribe((echeancier: Echeance[] | undefined) => {
      if (echeancier) {
        this.echeancier = echeancier;
        this.nbrEcheances = echeancier.length;
        this.aEcheancier = true;
      }
    });

    this.mouvements$.subscribe((mouvements: Mouvement[] | undefined) => {
      if (mouvements) {
        this.mouvements = mouvements;
        this.solde = this.calculSolde();
        this.avanceDebourse = true;
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

  //-----------------------------------------------------

  debourser(): void {
    if (this.debourForm.valid) {
      this.mouvement = new Mouvement();
      this.mouvement.membreId = this.idMembreCtrl.value;
      this.mouvement.avanceId = this.idAvanceCtrl.value;
      this.mouvement.deboursementId = this.idDeboursementCtrl.value;
      this.mouvement.dateMvt = this.dateDecaissementCtrl.value;
      this.mouvement.typeOperation = TypeOperation.Debit;
      this.mouvement.montant = this.montantAccordeCtrl.value;
      this.mouvement.libelle =
        'Décaissement avance n° ' + this.idAvanceCtrl.value;
      this.avanceService.debourser(this.mouvement).subscribe(() => {
        this.onGoBack();
      });
    }
  }

  enregistrerAvance(): void {
    if (
      this.avanceForm.valid &&
      this.idAvanceCtrl.value == 0 &&
      this.soldeCompte > this.montantSolliciteCtrl.value
    ) {
      if (this.nombreEcheancesSolliciteCtrl.value <= 9) {
        this.avanceService.add(this.avanceForm.value).subscribe(() => {
          this.onGoBack();
        });
      } else {
        this.alertify.error(
          'La durée sollicitée doit être inférieur ou égal à 9 mois!'
        );
      }
    } else {
      this.alertify.error(
        'Le montant sollicité doit être inférieur à ' + this.soldeCompte
      );
    }
  }

  enregistrerDecision(): void {
    if (
      this.debourForm.valid &&
      this.idDeboursementCtrl.value == 0 &&
      this.soldeCompte > this.montantAccordeCtrl.value
    ) {
      if (this.dureeAccordeeCtrl.value <= 9) {
        this.avanceService
          .validate(this.idAvanceCtrl.value, this.debourForm.value)
          .subscribe(() => {
            this.reload(this.idAvanceCtrl.value);
          });
      } else {
        this.alertify.error(
          'La dur&e accordée doit être inférieur ou égal à 9 mois!'
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

  onGoBack(): void {
    this.router.navigate(['home', 'avances']);
  }

  reload(avanceId: number): void {
    this.router.navigate(['home', 'nouvelleavance', avanceId]);
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
        if (dateDebut.getDay() > 15) {
          curDate.setMonth(curDate.getMonth() + 1);
        }
        if (nbrEcheances) {
          for (let i = 1; i <= nbrEcheances; i++) {
            let echeance: Echeance = new Echeance();
            echeance.avanceId = this.idAvanceCtrl.value;
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
}
