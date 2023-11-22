import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, map } from 'rxjs';
import { CompteComptable } from 'src/app/models/comptecomptable';
import { Gabarit } from 'src/app/models/gabarit';
import { Operation } from 'src/app/models/operation';
import { TypeMouvement } from 'src/app/models/typeMouvement';
import { CompteComptableService } from 'src/app/services/compte-comptable.service';
import { GabaritService } from 'src/app/services/gabarit.service';
import { LoaderService } from 'src/app/services/loader.service';
import { OperationService } from 'src/app/services/operation.service';

@Component({
  selector: 'app-nouveau-gabarit',
  templateUrl: './nouveau-gabarit.component.html',
  styleUrls: ['./nouveau-gabarit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NouveauGabaritComponent implements OnInit {
  comptes$!: Observable<CompteComptable[]>;
  comptes: CompteComptable[] = [];
  operations$!: Observable<Operation[]>;
  operations: Operation[] = [];
  operationOk: boolean = false;

  gabarit!: Gabarit;
  gabarit$!: Observable<Gabarit>;
  photo: string = '';
  idGabarit$!: Observable<number>;

  gabaritForm!: FormGroup;
  idGabaritCtrl!: FormControl;
  libelleGabaritCtrl!: FormControl;
  estActifGabaritCtrl!: FormControl;

  SortbyParam = 'typeOperation';
  SortDirection = 'asc';
  @ViewChild('closeModal') modalClose: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gabaritService: GabaritService,
    private compteComptableService: CompteComptableService,
    private operationService: OperationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.photo = this.gabaritService.getImageUrl();
    this.initFormControls();
    this.initForms();
    this.initObservables();
  }

  private initFormControls(): void {
    this.idGabaritCtrl = this.fb.control(0, Validators.required);
    this.libelleGabaritCtrl = this.fb.control('', Validators.required);
    this.estActifGabaritCtrl = this.fb.control(false, Validators.required);
  }

  private initForms(): void {
    this.gabaritForm = this.fb.group({
      id: this.idGabaritCtrl,
      libelle: this.libelleGabaritCtrl,
      estActif: this.estActifGabaritCtrl,
    });
  }

  private initObservables(): void {
    this.comptes$ = this.compteComptableService.comptes$;

    this.comptes$.subscribe((comptes) => {
      this.comptes = comptes;
    });

    this.idGabarit$ = this.route.params.pipe(
      map((params) => +params['gabaritId'])
    );

    this.gabarit$ = combineLatest([
      this.idGabarit$,
      this.gabaritService.gabarits$,
    ]).pipe(
      map(
        ([id, gabarits]) => gabarits.filter((gabarit) => gabarit.id === id)[0]
      )
    );

    this.operations$ = combineLatest([
      this.idGabarit$,
      this.operationService.operations$,
    ]).pipe(
      map(([id, operations]) =>
        operations.filter((operation) => operation.gabaritId === id)
      )
    );

    this.gabarit$.subscribe((gabarit) => {
      if (gabarit) {
        this.idGabaritCtrl.setValue(gabarit.id);
        this.libelleGabaritCtrl.setValue(gabarit.libelle);
        this.estActifGabaritCtrl.setValue(gabarit.estActif);
        this.gabarit = gabarit;
      }
    });

    this.operations$.subscribe((operations) => {
      this.operations = operations;
      this.checkOperations();
    });
  }

  enregistrer(): void {
    if (this.gabaritForm.valid) {
      if (this.gabarit) {
        this.gabaritService.update(this.gabarit.id, this.gabaritForm.value);
      } else {
        this.gabaritService.add(this.gabaritForm.value, this.operations);
      }
      this.cancel();
    }
  }

  private checkOperations(): void {
    this.operationOk = false;
    if (this.operations.length === 0) {
      return;
    }

    let credit = 100;
    let debit = 100;
    this.operations.map((operation) => {
      if (operation.typeOperation == 0) {
        debit -= operation.taux;
      } else {
        credit -= operation.taux;
      }
    });
    if (debit != 0 || credit != 0) {
      return;
    }

    this.operationOk = true;
  }

  ajouterOperation(operation: Operation): void {
    if (this.operations) {
      this.operations.push(operation);
      this.checkOperations();
    }
  }

  cancel(): void {
    this.router.navigate(['/gabarits']);
  }

  getNumCompte(id: number): string {
    let compte = '';
    this.comptes.map((cmp) => {
      if (cmp.id === id) {
        compte = cmp.compte;
      }
    });
    return compte;
  }

  getLibelleCompte(id: number): string {
    let libelle = '';
    this.comptes.map((cmp) => {
      if (cmp.id === id) {
        libelle = cmp.libelle;
      }
    });
    return libelle;
  }

  activer(): void {
    const estActif = this.estActifGabaritCtrl.value;
    this.estActifGabaritCtrl.setValue(!estActif);
  }
}
