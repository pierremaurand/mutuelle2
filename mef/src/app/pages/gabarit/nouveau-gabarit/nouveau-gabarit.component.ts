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
  operation!: Operation;
  comptes$!: Observable<CompteComptable[]>;
  comptes: CompteComptable[] = [];
  operations$!: Observable<Operation[]>;
  operations: Operation[] = [];

  gabarit!: Gabarit;
  gabarit$!: Observable<Gabarit>;
  photo: string = '';
  idGabarit$!: Observable<number>;

  gabaritForm!: FormGroup;
  idGabaritCtrl!: FormControl;
  libelleGabaritCtrl!: FormControl;
  estActifGabaritCtrl!: FormControl;

  operationForm!: FormGroup;
  idOperationCtrl!: FormControl;
  compteComptableIdOperationCtrl!: FormControl;
  typeOperationOperationCtrl!: FormControl;
  tauxOperationCtrl!: FormControl;

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

  private initOperationControls(): void {
    this.idOperationCtrl = this.fb.control(0, Validators.required);
    this.compteComptableIdOperationCtrl = this.fb.control(
      '',
      Validators.required
    );
    this.typeOperationOperationCtrl = this.fb.control('', Validators.required);
    this.tauxOperationCtrl = this.fb.control('', Validators.required);
  }

  private initForms(): void {
    this.gabaritForm = this.fb.group({
      id: this.idGabaritCtrl,
      libelle: this.libelleGabaritCtrl,
      estActif: this.estActifGabaritCtrl,
    });
  }

  private initOperationForm(): void {
    this.operationForm = this.fb.group({
      id: this.idOperationCtrl,
      gabaritId: this.idGabaritCtrl,
      compteComptableId: this.compteComptableIdOperationCtrl,
      typeOperation: this.typeOperationOperationCtrl,
      taux: this.tauxOperationCtrl,
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
    });
  }

  enregistrer(): void {}

  checkGabaritInfo(): boolean {
    // if (this.operations.length === 0 || this.gabarit.libelle == '') {
    //   alert('Les informations ne sont pas valides!');
    //   return false;
    // }

    // let credit = 100;
    // let debit = 100;
    // this.operations.map((operation) => {
    //   if (operation.typeOperation == 0) {
    //     debit -= operation.taux;
    //   } else {
    //     credit -= operation.taux;
    //   }
    // });
    // if (debit != 0 || credit != 0) {
    //   alert('Ecriture non équilibré!');
    //   return false;
    // }

    return true;
  }

  checkOperationInfos(): boolean {
    if (this.operation.compteComptableId == 0) {
      return false;
    }

    if (this.operation.taux == 0) {
      return false;
    }

    return true;
  }

  ajouterOperation(): void {
    // if (this.checkOperationInfos()) {
    //   if (this.operations) {
    //     this.operations.push(this.operation);
    //     this.resetForm();
    //   }
    // }
  }

  resetForm(): void {
    this.operation = new Operation();
  }

  cancel(): void {
    this.router.navigate(['/gabarits']);
  }

  getNumCompte(id?: number): string {
    let compte = '';
    // this.comptes.map((cmp) => {
    //   if (cmp.id == id) {
    //     compte = cmp.compte;
    //   }
    // });
    return compte;
  }

  getLibelleCompte(id?: number): string {
    let libelle = '';
    // this.comptes.map((cmp) => {
    //   if (cmp.id == id) {
    //     libelle = cmp.libelle;
    //   }
    // });
    return libelle;
  }

  chargementGabarit(): void {
    // if (this.gabaritId) {
    //   this.gabaritService
    //     .getById(this.gabaritId)
    //     .subscribe((gabarit: Gabarit) => {
    //       this.gabarit = gabarit;
    //       this.operationService
    //         .getAll(this.gabaritId)
    //         .subscribe((operations: Operation[]) => {
    //           this.operations = operations;
    //         });
    //     });
    // }
  }

  newOperation(): void {
    this.initOperationControls();
    this.initOperationForm();
  }

  activer(): void {
    const estActif = this.estActifGabaritCtrl.value;
    this.estActifGabaritCtrl.setValue(!estActif);
  }
}
