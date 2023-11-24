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

  mouvement!: Mouvement;
  mouvements!: Mouvement[];
  mouvementsAvance$!: Observable<Mouvement[]>;
  mouvements$!: Observable<Mouvement[]>;

  membre!: Membre;
  membre$!: Observable<Membre>;
  membres$!: Observable<Membre[]>;

  avance!: Avance;
  avance$!: Observable<Avance>;
  avances$!: Observable<Avance[]>;

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
    this.idMembreCtrl = this.fb.control('', Validators.required);

    this.idDeboursementCtrl = this.fb.control(0, Validators.required);
    this.montantAccordeCtrl = this.fb.control('', Validators.required);
    this.dureeAccordeeCtrl = this.fb.control('', Validators.required);
    this.dateDecaissementCtrl = this.fb.control('', Validators.required);
  }

  private initObservables() {
    this.avances$ = this.avanceService.avances$;
    this.membres$ = this.membreService.membres$;
    this.deboursements$ = this.deboursementService.deboursements$;
    this.echeances$ = this.echeanceService.echeances$;
    this.mouvements$ = this.compteService.mouvements$;

    const idAvance$ = this.route.params.pipe(
      map((params) => +params['avanceId'])
    );

    const idMembre$ = this.route.params.pipe(
      map((params) => +params['membreId'])
    );

    const idDeboursement$ = this.route.params.pipe(
      map((params) => +params['deboursementId'])
    );

    this.avance$ = combineLatest([idAvance$, this.avances$]).pipe(
      map(([id, avances]) => avances.filter((avance) => avance.id === id)[0])
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

    this.echeancier$ = combineLatest([idAvance$, this.echeances$]).pipe(
      map(([id, echeances]) =>
        echeances.filter((echeance) => echeance.avanceId === id)
      )
    );

    this.mouvementsAvance$ = combineLatest([idAvance$, this.mouvements$]).pipe(
      map(([id, mouvements]) =>
        mouvements.filter((mouvement) => mouvement.avanceId === id)
      )
    );

    this.membre$.subscribe((membre: Membre) => {
      if (membre) {
        this.idMembreCtrl.setValue(membre.id);
        this.membre = membre;
      }
    });

    this.avance$.subscribe((avance: Avance) => {
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

    this.deboursement$.subscribe((deboursement) => {
      if (deboursement) {
        this.debourForm.patchValue({
          id: deboursement.id,
          montantAccorde: deboursement.montantAccorde,
          dureeAccordee: deboursement.dureeAccordee,
          dateDecaissement: deboursement.dateDecaissement,
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

    this.mouvementsAvance$.subscribe((mouvements: Mouvement[]) => {
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
      this.avanceService.debourser(this.mouvement);
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
    if (this.debourForm.valid && this.idDeboursementCtrl.value == 0) {
      this.avanceService.validate(
        this.idAvanceCtrl.value,
        this.debourForm.value
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
          }
        }
      }
    }
    this.echeancierGenerer = true;
  }
}
