import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Membre } from 'src/app/models/membre.model';
import { Utilisateur } from 'src/app/models/utilisateur';
import { MembreService } from 'src/app/services/membre.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-details-utilisateur',
  templateUrl: './details-utilisateur.component.html',
  styleUrls: ['./details-utilisateur.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsUtilisateurComponent implements OnInit {
  @Input()
  utilisateur!: Utilisateur;
  membre$!: Observable<Membre>;
  membre: Membre = new Membre();
  width: number = 64;
  size: string = 'h5';
  imagesUrl = environment.imagesUrl;

  constructor(public membreService: MembreService) {}

  ngOnInit(): void {
    this.membre$ = this.membreService.getMembreById(this.utilisateur.membreId);
    this.membre$.subscribe((membre: Membre) => {
      if (membre) {
        this.membre = membre;
      } else {
        this.membre.nom = 'Super Admin';
      }
    });
  }
}
