import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, map } from 'rxjs';
import { Sexe } from 'src/app/models/sexe';
import { LoaderService } from 'src/app/services/loader.service';
import { SexeService } from 'src/app/services/sexe.service';

@Component({
  selector: 'app-nouveau-sexe',
  templateUrl: './nouveau-sexe.component.html',
  styleUrls: ['./nouveau-sexe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NouveauSexeComponent implements OnInit {
  sexe!: Sexe;
  sexe$!: Observable<Sexe>;
  photo: string = '';
  idSexe$!: Observable<number>;

  sexeForm!: FormGroup;
  idSexeCtrl!: FormControl;
  nomSexeCtrl!: FormControl;
  symboleSexeCtrl!: FormControl;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sexeService: SexeService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.photo = this.sexeService.getImageUrl();
    this.initFormControls();
    this.initForms();
    this.initObservables();
  }

  private initFormControls(): void {
    this.idSexeCtrl = this.fb.control(0, Validators.required);
    this.nomSexeCtrl = this.fb.control('', Validators.required);
    this.symboleSexeCtrl = this.fb.control('', Validators.required);
  }

  private initForms(): void {
    this.sexeForm = this.fb.group({
      id: this.idSexeCtrl,
      nom: this.nomSexeCtrl,
      symbole: this.symboleSexeCtrl,
    });
  }

  private initObservables(): void {
    this.idSexe$ = this.route.params.pipe(map((params) => +params['sexeId']));

    this.sexe$ = combineLatest([this.idSexe$, this.sexeService.sexes$]).pipe(
      map(([id, sexes]) => sexes.filter((sexe) => sexe.id === id)[0])
    );

    this.sexe$.subscribe((sexe) => {
      if (sexe) {
        this.idSexeCtrl.setValue(sexe.id);
        this.nomSexeCtrl.setValue(sexe.nom);
        this.symboleSexeCtrl.setValue(sexe.symbole);
        this.sexe = sexe;
      }
    });
  }

  enregistrer(): void {
    if (this.sexeForm.valid) {
      if (this.sexe) {
        this.sexeService.update(this.sexe.id, this.sexeForm.value);
      } else {
        this.sexeService.add(this.sexeForm.value);
      }
      this.cancel();
    }
  }

  cancel(): void {
    this.router.navigate(['/sexes']);
  }
}
