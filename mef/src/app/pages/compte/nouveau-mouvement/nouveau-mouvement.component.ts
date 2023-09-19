import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, map, switchMap } from 'rxjs';
import { Membre } from 'src/app/models/membre.model';
import { Gabarit } from 'src/app/models/gabarit';
import { CompteService } from 'src/app/services/compte.service';
import { GabaritService } from 'src/app/services/gabarit.service';
import { MembreService } from 'src/app/services/membre.service';

@Component({
  selector: 'app-nouveau-mouvement',
  templateUrl: './nouveau-mouvement.component.html',
  styleUrls: ['./nouveau-mouvement.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NouveauMouvementComponent implements OnInit {
  solde!: number;
  id!: number;
  membre$!: Observable<Membre>;
  gabarits$!: Observable<Gabarit[]>;

  mainForm!: FormGroup;
  idCtrl!: FormControl;
  membreIdCtrl!: FormControl;
  dateMvtCtrl!: FormControl;
  typeOperationCtrl!: FormControl;
  // gabaritIdCtrl!: FormControl;
  libelleCtrl!: FormControl;
  montantCtrl!: FormControl;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gabaritService: GabaritService,
    private compteService: CompteService,
    private membreService: MembreService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initFormControls();
    this.initForm();
    this.initObservables();
  }

  private initForm(): void {
    this.mainForm = this.formBuilder.group({
      id: this.idCtrl,
      membreId: this.membreIdCtrl,
      dateMvt: this.dateMvtCtrl,
      // gabaritId: this.gabaritIdCtrl,
      typeOperation: this.typeOperationCtrl,
      libelle: this.libelleCtrl,
      montant: this.montantCtrl,
    });
  }

  private initFormControls(): void {
    this.idCtrl = this.formBuilder.control(0, Validators.required);
    this.membreIdCtrl = this.formBuilder.control(0, Validators.required);
    this.dateMvtCtrl = this.formBuilder.control('', Validators.required);
    this.typeOperationCtrl = this.formBuilder.control('', Validators.required);
    // this.gabaritIdCtrl = this.formBuilder.control(1, Validators.required);
    this.libelleCtrl = this.formBuilder.control('', Validators.required);
    this.montantCtrl = this.formBuilder.control('', Validators.required);
  }

  private initObservables(): void {
    this.membre$ = this.route.params.pipe(
      switchMap((params) => this.membreService.getMembreById(+params['id']))
    );

    this.membre$.subscribe((membre) => {
      this.id = membre.id;
      this.membreIdCtrl.setValue(membre.id);
    });

    this.montantCtrl.valueChanges.subscribe((value) => {
      this.solde = value;
    });

    this.gabarits$ = this.gabaritService.gabarits$;
  }

  enregistrer(): void {
    if (this.mainForm.valid) {
      this.compteService.enregistrerMouvement(this.mainForm.value);
      this.onGoBack();
    }
  }

  onGoBack(): void {
    this.router.navigate(['/nouveaucompte/' + this.id]);
  }

  resetForm(): void {
    this.idCtrl.setValue(0);
    this.idCtrl.setValue(this.id);
    this.dateMvtCtrl.setValue('');
    this.typeOperationCtrl.setValue('');
    // this.gabaritIdCtrl.setValue(1);
    this.libelleCtrl.setValue('');
    this.montantCtrl.setValue('');
  }
}
