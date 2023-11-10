import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, map } from 'rxjs';
import { Membre } from 'src/app/models/membre.model';
import { Utilisateur } from 'src/app/models/utilisateur';
import { MembreService } from 'src/app/services/membre.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-nouvel-utilisateur',
  templateUrl: './nouvel-utilisateur.component.html',
  styleUrls: ['./nouvel-utilisateur.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NouvelUtilisateurComponent implements OnInit {
  utilisateur: Utilisateur = new Utilisateur();
  membre: Membre = new Membre();
  membre$!: Observable<Membre>;
  utilisateur$!: Observable<Utilisateur>;

  idUtilisateur$!: Observable<number>;
  idMembre$!: Observable<number>;

  userForm!: FormGroup;
  idUtilisateurCtrl!: FormControl;
  membreIdCtrl!: FormControl;
  nomUtilisateurCtrl!: FormControl;
  typeCtrl!: FormControl;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private utilisateurService: UtilisateurService,
    private membreService: MembreService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.intiFormControls();
    this.initForms();
    this.initObservable();
  }

  private intiFormControls(): void {
    this.idUtilisateurCtrl = this.fb.control(0, Validators.required);
    this.membreIdCtrl = this.fb.control('', Validators.required);
    this.nomUtilisateurCtrl = this.fb.control('', Validators.required);
    this.typeCtrl = this.fb.control('', Validators.required);
  }

  private initForms(): void {
    this.userForm = this.fb.group({
      id: this.idUtilisateurCtrl,
      membreId: this.membreIdCtrl,
      nomUtilisateur: this.nomUtilisateurCtrl,
      type: this.typeCtrl,
    });
  }

  private initObservable(): void {
    this.idUtilisateur$ = this.route.params.pipe(
      map((params) => +params['utilisateurId'])
    );

    this.idMembre$ = this.route.params.pipe(
      map((params) => +params['membreId'])
    );

    this.utilisateur$ = combineLatest([
      this.idUtilisateur$,
      this.utilisateurService.utilisateurs$,
    ]).pipe(
      map(
        ([id, utilisateurs]) =>
          utilisateurs.filter((utilisateur) => utilisateur.id === id)[0]
      )
    );

    this.membre$ = combineLatest([
      this.idMembre$,
      this.membreService.membres$,
    ]).pipe(
      map(([id, membres]) => membres.filter((membre) => membre.id === id)[0])
    );

    this.utilisateur$.subscribe((utilisateur: Utilisateur) => {
      if (utilisateur) {
        this.idUtilisateurCtrl.setValue(utilisateur.id);
        this.nomUtilisateurCtrl.setValue(utilisateur.nomUtilisateur);
        this.typeCtrl.setValue(utilisateur.type);
        this.utilisateur = utilisateur;
      }
    });

    this.membre$.subscribe((membre: Membre) => {
      if (membre) {
        this.membreIdCtrl.setValue(membre.id);
        this.membre = membre;
      }
    });
  }

  enregistrerInfos(): void {
    if (this.userForm.valid) {
      if (this.utilisateur.id) {
        this.utilisateurService.update(
          this.utilisateur.id,
          this.userForm.value
        );
      } else {
        this.utilisateurService.add(this.userForm.value);
      }
      this.cancel();
    }
  }

  initPassword(): void {
    if (this.utilisateur.id) {
      this.utilisateurService.initPassword(
        this.utilisateur.id,
        this.utilisateur
      );
    }
  }

  validationFormulaire(): boolean {
    if (this.utilisateur.membreId == 0) {
      return false;
    }
    if (this.utilisateur.nomUtilisateur == '') {
      return false;
    }
    if (this.utilisateur.type == 0) {
      return false;
    }
    return true;
  }

  cancel(): void {
    this.router.navigate(['/utilisateurs']);
  }

  membreChoisie(membre: Membre) {
    this.membreIdCtrl.setValue(membre.id);
    this.membre = membre;
  }
}
