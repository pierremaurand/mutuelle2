import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, map } from 'rxjs';
import { Poste } from 'src/app/models/poste';
import { PosteService } from 'src/app/services/poste.service';

@Component({
  selector: 'app-nouveau-poste',
  templateUrl: './nouveau-poste.component.html',
  styleUrls: ['./nouveau-poste.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NouveauPosteComponent implements OnInit {
  poste!: Poste;
  poste$!: Observable<Poste>;
  photo: string = '';
  idPoste$!: Observable<number>;

  posteForm!: FormGroup;
  idPosteCtrl!: FormControl;
  libellePosteCtrl!: FormControl;
  codePosteCtrl!: FormControl;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public posteService: PosteService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.photo = this.posteService.getImageUrl();
    this.initFormControls();
    this.initForms();
    this.initObservables();
  }

  private initFormControls(): void {
    this.idPosteCtrl = this.fb.control(0, Validators.required);
    this.libellePosteCtrl = this.fb.control('', Validators.required);
    this.codePosteCtrl = this.fb.control('', Validators.required);
  }

  private initForms(): void {
    this.posteForm = this.fb.group({
      id: this.idPosteCtrl,
      libelle: this.libellePosteCtrl,
      code: this.codePosteCtrl,
    });
  }

  private initObservables(): void {
    this.idPoste$ = this.route.params.pipe(map((params) => +params['posteId']));

    this.poste$ = combineLatest([
      this.idPoste$,
      this.posteService.postes$,
    ]).pipe(
      map(([id, postes]) => postes.filter((poste) => poste.id === id)[0])
    );

    this.poste$.subscribe((poste) => {
      if (poste) {
        this.idPosteCtrl.setValue(poste.id);
        this.libellePosteCtrl.setValue(poste.libelle);
        this.codePosteCtrl.setValue(poste.code);
        this.poste = poste;
      }
    });
  }

  enregistrer(): void {
    if (this.posteForm.valid) {
      if (this.poste) {
        this.posteService.update(this.poste.id, this.posteForm.value);
      } else {
        this.posteService.add(this.posteForm.value);
      }
      this.cancel();
    }
  }

  cancel(): void {
    this.router.navigate(['/postes']);
  }
}
