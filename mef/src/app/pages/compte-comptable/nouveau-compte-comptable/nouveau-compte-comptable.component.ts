import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, map } from 'rxjs';
import { CompteComptable } from 'src/app/models/comptecomptable';
import { CompteComptableService } from 'src/app/services/compte-comptable.service';

@Component({
  selector: 'app-nouveau-compte-comptable',
  templateUrl: './nouveau-compte-comptable.component.html',
  styleUrls: ['./nouveau-compte-comptable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NouveauCompteComptableComponent implements OnInit {
  compte!: CompteComptable;
  compte$!: Observable<CompteComptable>;
  photo: string = '';
  idCompte$!: Observable<number>;

  compteForm!: FormGroup;
  idCompteCtrl!: FormControl;
  numeroCompteCtrl!: FormControl;
  libelleCompteCtrl!: FormControl;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private compteService: CompteComptableService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.photo = this.compteService.getImageUrl();
    this.initFormControls();
    this.initForms();
    this.initObservables();
  }

  private initFormControls(): void {
    this.idCompteCtrl = this.fb.control(0, Validators.required);
    this.numeroCompteCtrl = this.fb.control('', Validators.required);
    this.libelleCompteCtrl = this.fb.control('', Validators.required);
  }

  private initForms(): void {
    this.compteForm = this.fb.group({
      id: this.idCompteCtrl,
      compte: this.numeroCompteCtrl,
      libelle: this.libelleCompteCtrl,
    });
  }

  private initObservables(): void {
    this.idCompte$ = this.route.params.pipe(
      map((params) => +params['compteComptableId'])
    );

    this.compte$ = combineLatest([
      this.idCompte$,
      this.compteService.comptes$,
    ]).pipe(
      map(([id, comptes]) => comptes.filter((compte) => compte.id === id)[0])
    );

    this.compte$.subscribe((compte) => {
      if (compte) {
        this.idCompteCtrl.setValue(compte.id);
        this.numeroCompteCtrl.setValue(compte.compte);
        this.libelleCompteCtrl.setValue(compte.libelle);
        this.compte = compte;
      }
    });
  }

  enregistrer(): void {
    if (this.compteForm.valid) {
      if (this.compte) {
        this.compteService.update(this.compte.id, this.compteForm.value);
      } else {
        this.compteService.add(this.compteForm.value);
      }
      this.cancel();
    }
  }

  cancel(): void {
    this.router.navigate(['home', 'comptecomptables']);
  }
}
