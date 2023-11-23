import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Membre } from 'src/app/models/membre.model';
import { LieuAffectation } from 'src/app/models/lieuAffectation';
import { Poste } from 'src/app/models/poste';
import { Sexe } from 'src/app/models/sexe';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

@Component({
  selector: 'app-infos-membre',
  templateUrl: './infos-membre.component.html',
  styleUrls: ['./infos-membre.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfosMembreComponent implements OnInit {
  @Input()
  membre: Membre = new Membre();
  @Input()
  sexe!: Sexe;
  @Input()
  poste!: Poste;
  @Input()
  lieu!: LieuAffectation;
  imagesUrl = environment.imagesUrl;

  constructor() {}

  ngOnInit(): void {
    this.initObervables();
  }

  private initObervables(): void {}
}
