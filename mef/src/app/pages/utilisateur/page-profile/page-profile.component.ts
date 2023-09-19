import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Membre } from 'src/app/models/membre.model';
import { InfosPassword } from 'src/app/models/infosPassword';
import { MembreList } from 'src/app/models/membreList';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-page-profile',
  templateUrl: './page-profile.component.html',
  styleUrls: ['./page-profile.component.scss'],
})
export class PageProfileComponent implements OnInit {
  membre: Membre = new Membre();
  infos: InfosPassword = new InfosPassword();

  constructor(
    private utilisateurService: UtilisateurService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.utilisateurService.getMembre().subscribe((membre: Membre) => {
    //   this.membre = membre;
    // });
  }

  changePassword(): void {
    if (this.checkForm()) {
      this.utilisateurService.changePassword(this.infos).subscribe(() => {
        alert('Mot de passe changer avec success');
        this.infos.confirmPassword = '';
        this.infos.password = '';
      });
    }
  }

  checkForm(): boolean {
    if (this.infos.password == '') {
      return false;
    }

    if (this.infos.password != this.infos.confirmPassword) {
      return false;
    }

    return true;
  }

  cancel(): void {
    this.router.navigate(['']);
  }
}
