import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Membre } from 'src/app/models/membre.model';
import { Utilisateur } from 'src/app/models/utilisateur';
import { MembreService } from 'src/app/services/membre.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-nouvel-utilisateur',
  templateUrl: './nouvel-utilisateur.component.html',
  styleUrls: ['./nouvel-utilisateur.component.scss'],
})
export class NouvelUtilisateurComponent implements OnInit {
  utilisateur!: Utilisateur;
  membre: Membre = new Membre();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private membreService: MembreService,
    private utilisateurService: UtilisateurService
  ) {}

  ngOnInit(): void {
    // this.membreService.getAll().subscribe((membres: Membre[]) => {
    //   this.membres = membres;
    //   const idUtilisateur = this.activatedRoute.snapshot.params['id'];
    //   if (idUtilisateur) {
    //     this.utilisateurService
    //       .getById(idUtilisateur)
    //       .subscribe((utilisateur: Utilisateur) => {
    //         this.utilisateur = utilisateur;
    //         this.changeMembre();
    //       });
    //   }
    // });
  }

  changeMembre(): void {
    this.membreService
      .getById(this.utilisateur.membreId)
      .subscribe((membre: Membre) => {
        this.membre = membre;
      });
  }

  enregistrerInfos(): void {
    if (this.validationFormulaire() == true) {
      if (this.utilisateur.id != 0) {
        this.utilisateurService
          .update(this.utilisateur, this.utilisateur.id)
          .subscribe((value: any) => {
            this.cancel();
          });
      } else {
        this.utilisateurService
          .add(this.utilisateur)
          .subscribe((id: number) => {
            this.cancel();
          });
      }
    }
  }

  initPassword(): void {
    if (this.utilisateur.id != 0) {
      this.utilisateurService
        .initPassword(this.utilisateur.id, this.utilisateur)
        .subscribe((value: any) => {
          this.cancel();
        });
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
}
