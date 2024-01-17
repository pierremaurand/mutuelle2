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
  utilisateur: Utilisateur | undefined = undefined;
  utilisateur$!: Observable<Utilisateur | undefined>;

  membre: Membre | undefined = undefined;
  membre$!: Observable<Membre | undefined>;

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
    const idUtilisateur$ = this.route.params.pipe(
      map((params) => +params['utilisateurId'])
    );

    this.utilisateur$ = combineLatest([
      idUtilisateur$,
      this.utilisateurService.utilisateurs$,
    ]).pipe(
      map(([id, utilisateurs]) =>
        utilisateurs.find((utilisateur) => utilisateur.id === id)
      )
    );

    this.membre$ = combineLatest([
      idUtilisateur$,
      this.utilisateurService.utilisateurs$,
      this.membreService.membres$,
    ]).pipe(
      map(([id, utilisateurs, membres]) =>
        membres.find((membre) =>
          utilisateurs.find(
            (utilisateur) =>
              utilisateur.id === id && membre.id === utilisateur.membreId
          )
        )
      )
    );

    this.utilisateur$.subscribe((utilisateur) => {
      if (utilisateur) {
        this.idUtilisateurCtrl.setValue(utilisateur.id);
        this.nomUtilisateurCtrl.setValue(utilisateur.nomUtilisateur);
        this.typeCtrl.setValue(utilisateur.type);
        this.utilisateur = utilisateur;
      }
    });

    this.membre$.subscribe((membre) => {
      if (membre) {
        this.membreIdCtrl.setValue(membre.id);
        this.membre = membre;
      }
    });
  }

  enregistrerInfos(): void {
    if (this.userForm.valid) {
      if (this.utilisateur && this.utilisateur.id) {
        this.utilisateurService
          .update(this.utilisateur.id, this.userForm.value)
          .subscribe(() => {
            this.cancel();
          });
      } else {
        this.utilisateurService.add(this.userForm.value).subscribe(() => {
          this.cancel();
        });
      }
    }
  }

  initPassword(): void {
    if (this.utilisateur && this.utilisateur.id) {
      this.utilisateurService
        .initPassword(this.utilisateur.id, this.utilisateur)
        .subscribe();
    }
  }

  validationFormulaire(): boolean {
    if (this.utilisateur) {
      if (this.utilisateur.membreId == 0) {
        return false;
      }
      if (this.utilisateur.nomUtilisateur == '') {
        return false;
      }
      if (this.utilisateur.type == 0) {
        return false;
      }
    }
    return true;
  }

  cancel(): void {
    this.router.navigate(['home', 'utilisateurs']);
  }

  membreChoisie(membre: Membre) {
    this.membreIdCtrl.setValue(membre.id);
    this.membre = membre;
  }
}
