import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Membre } from 'src/app/models/membre.model';
import { Mois } from 'src/app/models/mois';
import { CotisationService } from 'src/app/services/cotisation.service';
import { MembreService } from 'src/app/services/membre.service';

@Component({
  selector: 'app-nouvelle-cotisation',
  templateUrl: './nouvelle-cotisation.component.html',
  styleUrls: ['./nouvelle-cotisation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NouvelleCotisationComponent implements OnInit {
  id!: number;
  solde!: number;
  membre$!: Observable<Membre>;

  anneeOptions: number[] = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

  mois$!: Observable<Mois[]>;

  mainForm!: FormGroup;
  idCtrl!: FormControl;
  moisIdCtrl!: FormControl;
  anneeCtrl!: FormControl;
  montantCtrl!: FormControl;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cotisationService: CotisationService,
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
      moisId: this.moisIdCtrl,
      annee: this.anneeCtrl,
      montant: this.montantCtrl,
    });
  }

  private initFormControls(): void {
    this.idCtrl = this.formBuilder.control(0, Validators.required);
    this.moisIdCtrl = this.formBuilder.control('', Validators.required);
    this.anneeCtrl = this.formBuilder.control('', Validators.required);
    this.montantCtrl = this.formBuilder.control('', Validators.required);
  }

  private initObservables(): void {
    this.membre$ = this.route.params.pipe(
      switchMap((params) => this.membreService.getMembreById(+params['id']))
    );

    this.membre$.subscribe((membre: Membre) => {
      this.id = membre.id;
    });

    this.montantCtrl.valueChanges.subscribe((value) => {
      this.solde = value;
    });

    this.mois$ = this.cotisationService.mois$;
  }

  //-----------------------------------------------

  enregistrer(): void {
    if (this.mainForm.valid) {
      this.cotisationService.addCotisation(this.id, this.mainForm.value);
      this.onGoBack();
    }
  }

  onGoBack(): void {
    this.router.navigate(['home', 'cotisationsmembre', this.id]);
  }

  resetForm(): void {
    this.idCtrl.setValue(0);
    this.moisIdCtrl.setValue('');
    this.anneeCtrl.setValue('');
    this.montantCtrl.setValue('');
  }
}
