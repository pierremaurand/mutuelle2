import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { Membre } from 'src/app/models/membre.model';
import { MembreService } from 'src/app/services/membre.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-liste-choix-membre',
  templateUrl: './liste-choix-membre.component.html',
  styleUrls: ['./liste-choix-membre.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListeChoixMembreComponent implements OnInit {
  membres: Membre[] = [];
  @Output()
  membreChoisie = new EventEmitter<Membre>();

  imagesUrl = environment.imagesUrl;

  constructor() {}

  ngOnInit(): void {}

  sendMembre(membre: Membre): void {
    this.membreChoisie.emit(membre);
  }

  membresFound(membres: Membre[]): void {
    this.membres = membres;
  }
}
