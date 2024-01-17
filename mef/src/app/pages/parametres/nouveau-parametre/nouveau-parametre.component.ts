import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, map, combineLatest } from 'rxjs';
import { Parametre } from 'src/app/models/parametre.model';
import { ParametreService } from 'src/app/services/parametre.service';

@Component({
  selector: 'app-nouveau-parametre',
  templateUrl: './nouveau-parametre.component.html',
  styleUrls: ['./nouveau-parametre.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NouveauParametreComponent implements OnInit {
  parametre!: Parametre;
  parametre$!: Observable<Parametre>;
  photo: string = '';
  idParametre$!: Observable<number>;

  parametreForm!: FormGroup;
  idParametreCtrl!: FormControl;
  libelleParametreCtrl!: FormControl;
  valeurParametreCtrl!: FormControl;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public parametreService: ParametreService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.photo = this.parametreService.getImageUrl();
    this.initFormControls();
    this.initForms();
    this.initObservables();
  }

  private initFormControls(): void {
    this.idParametreCtrl = this.fb.control(0, Validators.required);
    this.libelleParametreCtrl = this.fb.control('', Validators.required);
    this.valeurParametreCtrl = this.fb.control('', Validators.required);
  }

  private initForms(): void {
    this.parametreForm = this.fb.group({
      id: this.idParametreCtrl,
      libelle: this.libelleParametreCtrl,
      valeur: this.valeurParametreCtrl,
    });
  }

  private initObservables(): void {
    this.idParametre$ = this.route.params.pipe(
      map((params) => +params['parametreId'])
    );

    this.parametre$ = combineLatest([
      this.idParametre$,
      this.parametreService.parametres$,
    ]).pipe(
      map(
        ([id, parametres]) =>
          parametres.filter((parametre) => parametre.id === id)[0]
      )
    );

    this.parametre$.subscribe((parametre) => {
      if (parametre) {
        this.idParametreCtrl.setValue(parametre.id);
        this.libelleParametreCtrl.setValue(parametre.libelle);
        this.valeurParametreCtrl.setValue(parametre.valeur);
        this.parametre = parametre;
      }
    });
  }

  enregistrer(): void {
    if (this.parametreForm.valid) {
      if (this.parametre) {
        this.parametreService.update(
          this.parametre.id,
          this.parametreForm.value
        );
      } else {
        this.parametreService.add(this.parametreForm.value);
      }
      this.cancel();
    }
  }

  cancel(): void {
    this.router.navigate(['home', 'parametres']);
  }
}
