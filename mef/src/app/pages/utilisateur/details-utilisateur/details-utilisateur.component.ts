import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Membre } from 'src/app/models/membre.model';
import { Utilisateur } from 'src/app/models/utilisateur';
import { MembreService } from 'src/app/services/membre.service';

@Component({
  selector: 'app-details-utilisateur',
  templateUrl: './details-utilisateur.component.html',
  styleUrls: ['./details-utilisateur.component.scss'],
})
export class DetailsUtilisateurComponent implements OnInit {
  @Input()
  utilisateur!: Utilisateur;
  membre$!: Observable<Membre>;

  constructor(private membreService: MembreService) {}

  ngOnInit(): void {
    this.membre$ = this.membreService.getMembreById(this.utilisateur.membreId);
  }
}
