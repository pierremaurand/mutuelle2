import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  combineLatest,
  map,
  Observable,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { Membre } from 'src/app/models/membre.model';
import { LieuAffectation } from 'src/app/models/lieuAffectation';
import { MembreInfos } from 'src/app/models/membreInfos.model';
import { Poste } from 'src/app/models/poste';
import { Sexe } from 'src/app/models/sexe';
import { UploadImage } from 'src/app/models/uploadImage';
import { LieuAffectationService } from 'src/app/services/lieu-affectation.service';
import { MembreService } from 'src/app/services/membre.service';
import { PosteService } from 'src/app/services/poste.service';
import { SexeService } from 'src/app/services/sexe.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nouveau-membre',
  templateUrl: './nouveau-membre.component.html',
  styleUrls: ['./nouveau-membre.component.scss'],
})
export class NouveauMembreComponent implements OnInit {
  errors: string[] = [];
  photo: string = '';
  dateNaissance!: string | null;
  image!: string;
  uploadImage!: UploadImage;
  imagesUrl = environment.imagesUrl;
  id!: number;

  membre$!: Observable<Membre>;
  sexes$!: Observable<Sexe[]>;
  sexe$!: Observable<Sexe>;
  postes$!: Observable<Poste[]>;
  lieux$!: Observable<LieuAffectation[]>;

  mainForm!: FormGroup;
  idCtrl!: FormControl;
  nomCtrl!: FormControl;
  sexeIdCtrl!: FormControl;
  dateNaissanceCtrl!: FormControl;
  lieuNaissanceCtrl!: FormControl;
  contactCtrl!: FormControl;
  emailCtrl!: FormControl;
  photoCtrl!: FormControl;
  estActifCtrl!: FormControl;
  posteIdCtrl!: FormControl;
  lieuAffectationIdCtrl!: FormControl;
  dateAdhesionCtrl!: FormControl;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private membreService: MembreService,
    private sexeService: SexeService,
    private posteService: PosteService,
    private lieuAffectationService: LieuAffectationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initFormControls();
    this.initMainForm();
    this.initObservables();
    this.photo = this.imagesUrl + '/assets/images/' + this.photoCtrl.value;
  }

  private initMainForm(): void {
    this.mainForm = this.formBuilder.group({
      id: this.idCtrl,
      nom: this.nomCtrl,
      sexeId: this.sexeIdCtrl,
      dateNaissance: this.dateNaissanceCtrl,
      lieuNaissance: this.lieuNaissanceCtrl,
      contact: this.contactCtrl,
      email: this.emailCtrl,
      photo: this.photoCtrl,
      estActif: this.estActifCtrl,
      posteId: this.posteIdCtrl,
      lieuAffectationId: this.lieuAffectationIdCtrl,
      dateAdhesion: this.dateAdhesionCtrl,
    });
  }

  private initFormControls(): void {
    this.idCtrl = this.formBuilder.control(0, Validators.required);
    this.nomCtrl = this.formBuilder.control('', Validators.required);
    this.sexeIdCtrl = this.formBuilder.control('', Validators.required);
    this.dateNaissanceCtrl = this.formBuilder.control('', Validators.required);
    this.lieuNaissanceCtrl = this.formBuilder.control('', Validators.required);
    this.contactCtrl = this.formBuilder.control('', Validators.required);
    this.emailCtrl = this.formBuilder.control('');
    this.photoCtrl = this.formBuilder.control('default_man.jpg');
    this.estActifCtrl = this.formBuilder.control(true);
    this.posteIdCtrl = this.formBuilder.control('', Validators.required);
    this.lieuAffectationIdCtrl = this.formBuilder.control(
      '',
      Validators.required
    );
    this.dateAdhesionCtrl = this.formBuilder.control('', Validators.required);
  }

  private initObservables(): void {
    this.sexes$ = this.sexeService.sexes$;
    this.postes$ = this.posteService.postes$;
    this.lieux$ = this.lieuAffectationService.lieux$;

    // this.membre$ = this.route.params.pipe(
    //   switchMap((params) =>
    //     this.membreService.getMembreById(+params['membreId'])
    //   )
    // );

    this.membre$ = this.route.data.pipe(map((data) => data['membre']));

    this.membre$.subscribe((membre: Membre) => {
      this.mainForm.patchValue({
        id: membre.id,
        nom: membre.nom,
        sexeId: membre.sexeId,
        posteId: membre.posteId,
        lieuAffectationId: membre.lieuAffectationId,
        dateNaissance: membre.dateNaissance,
        lieuNaissance: membre.lieuNaissance,
        contact: membre.contact,
        email: membre.email,
        photo: membre.photo,
        estActif: membre.estActif,
        dateAdhesion: membre.dateAdhesion,
      });

      this.photo = this.imagesUrl + '/assets/images/' + membre.photo;
    });

    this.sexe$ = this.sexeIdCtrl.valueChanges.pipe(
      startWith(this.sexeIdCtrl.value),
      switchMap((sexeId) => this.sexeService.getSexeById(+sexeId))
    );

    this.sexe$.subscribe((sexe: Sexe) => {
      if (this.photo.includes('default_')) {
        if (sexe.symbole == 'M') {
          this.photoCtrl.setValue('default_man.jpg');
        } else {
          this.photoCtrl.setValue('default_woman.jpg');
        }
        this.photo = this.imagesUrl + '/assets/images/' + this.photoCtrl.value;
      }
    });
  }

  //-------------------------------------

  enregistrerMembre(): void {
    if (this.mainForm.valid) {
      this.initImage();
      if (this.idCtrl.value === 0) {
        this.add();
      } else {
        this.update();
      }
      this.onGoBack();
    }
  }

  private update(): void {
    this.membreService.update(this.mainForm.value, this.uploadImage);
  }

  private add(): void {
    this.membreService.add(this.mainForm.value, this.uploadImage);
  }

  private initImage(): void {
    if (this.image) {
      this.uploadImage = new UploadImage();
      this.uploadImage.image = this.image.substring(22);
      this.uploadImage.type = 'png';
    }
  }

  onGoBack(): void {
    this.router.navigate(['/membres']);
  }

  photoChange(photo: string): void {
    this.photo = photo;
    this.image = photo;
  }

  activer(): void {
    const estActif = !this.estActifCtrl.value;
    this.estActifCtrl.setValue(estActif);
  }

  transformData(): void {}
}
