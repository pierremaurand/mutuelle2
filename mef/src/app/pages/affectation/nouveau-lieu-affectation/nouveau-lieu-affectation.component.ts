import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, map } from 'rxjs';
import { LieuAffectation } from 'src/app/models/lieuAffectation';
import { LieuAffectationService } from 'src/app/services/lieu-affectation.service';

@Component({
  selector: 'app-nouveau-lieu-affectation',
  templateUrl: './nouveau-lieu-affectation.component.html',
  styleUrls: ['./nouveau-lieu-affectation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NouveauLieuAffectationComponent implements OnInit {
  lieuAffectation!: LieuAffectation;
  idLieu$!: Observable<number>;

  lieuAffectation$!: Observable<LieuAffectation>;
  lieuxAffectations$!: Observable<LieuAffectation[]>;

  photo: string = '';

  lieuAffectationForm!: FormGroup;
  idLieuAffectationCtrl!: FormControl;
  nomLieuAffectationCtrl!: FormControl;
  codeLieuAffectationCtrl!: FormControl;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public lieuAffectationService: LieuAffectationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.photo = this.lieuAffectationService.getImageUrl();
    this.initFormControls();
    this.initForms();
    this.initObservables();
  }

  private initFormControls(): void {
    this.idLieuAffectationCtrl = this.fb.control(0, Validators.required);
    this.nomLieuAffectationCtrl = this.fb.control('', Validators.required);
    this.codeLieuAffectationCtrl = this.fb.control('', Validators.required);
  }

  private initForms(): void {
    this.lieuAffectationForm = this.fb.group({
      id: this.idLieuAffectationCtrl,
      lieu: this.nomLieuAffectationCtrl,
      code: this.codeLieuAffectationCtrl,
    });
  }

  private initObservables(): void {
    this.idLieu$ = this.route.params.pipe(
      map((params) => +params['lieuAffectationId'])
    );

    this.lieuxAffectations$ = this.lieuAffectationService.lieuxAffectations$;

    this.lieuAffectation$ = combineLatest([
      this.idLieu$,
      this.lieuxAffectations$,
    ]).pipe(
      map(
        ([id, lieuxAffectations]) =>
          lieuxAffectations.filter(
            (lieuAffectation) => lieuAffectation.id === id
          )[0]
      )
    );

    this.lieuAffectation$.subscribe((lieuAffectation) => {
      if (lieuAffectation) {
        this.idLieuAffectationCtrl.setValue(lieuAffectation.id);
        this.nomLieuAffectationCtrl.setValue(lieuAffectation.lieu);
        this.codeLieuAffectationCtrl.setValue(lieuAffectation.code);
        this.lieuAffectation = lieuAffectation;
      }
    });
  }

  enregistrer(): void {
    if (this.lieuAffectationForm.valid) {
      if (this.lieuAffectation) {
        this.lieuAffectationService.update(
          this.lieuAffectation.id,
          this.lieuAffectationForm.value
        );
      } else {
        this.lieuAffectationService.add(this.lieuAffectationForm.value);
      }
      this.cancel();
    }
  }

  cancel(): void {
    this.router.navigate(['/lieuaffectations']);
  }
}
