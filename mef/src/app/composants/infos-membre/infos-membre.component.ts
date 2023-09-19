import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Membre } from 'src/app/models/membre.model';
import { LieuAffectation } from 'src/app/models/lieuAffectation';
import { MembreInfos } from 'src/app/models/membreInfos.model';
import { Poste } from 'src/app/models/poste';
import { Sexe } from 'src/app/models/sexe';
import { LieuAffectationService } from 'src/app/services/lieu-affectation.service';
import { PosteService } from 'src/app/services/poste.service';
import { SexeService } from 'src/app/services/sexe.service';
import { environment } from 'src/environments/environment';
import { MembreService } from 'src/app/services/membre.service';

@Component({
  selector: 'app-infos-membre',
  templateUrl: './infos-membre.component.html',
  styleUrls: ['./infos-membre.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfosMembreComponent implements OnInit {
  @Input()
  membre!: Membre;
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
