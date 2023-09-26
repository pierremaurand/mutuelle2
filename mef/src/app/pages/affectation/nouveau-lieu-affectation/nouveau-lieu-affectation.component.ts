import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { LieuAffectation } from 'src/app/models/lieuAffectation';
import { LieuAffectationService } from 'src/app/services/lieu-affectation.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-nouveau-lieu-affectation',
  templateUrl: './nouveau-lieu-affectation.component.html',
  styleUrls: ['./nouveau-lieu-affectation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NouveauLieuAffectationComponent implements OnInit {
  lieuAffectation!: LieuAffectation;
  lieuAffectation$!: Observable<LieuAffectation>;
  photo: string = '';

  lieuAffectationForm!: FormGroup;
  idLieuAffectationCtrl!: FormControl;
  nomLieuAffectationCtrl!: FormControl;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private lieuAffectationService: LieuAffectationService,
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
  }

  private initForms(): void {
    this.lieuAffectationForm = this.fb.group({
      id: this.idLieuAffectationCtrl,
      lieu: this.nomLieuAffectationCtrl,
    });
  }

  private initObservables(): void {
    this.lieuAffectation$ = this.route.data.pipe(
      map((data) => data['lieuAffectation'])
    );

    this.lieuAffectation$.subscribe((lieuAffectation) => {
      if (lieuAffectation) {
        this.idLieuAffectationCtrl.setValue(lieuAffectation.id);
        this.nomLieuAffectationCtrl.setValue(lieuAffectation.lieu);
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
