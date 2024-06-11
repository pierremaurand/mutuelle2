import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable, combineLatest, map, of } from 'rxjs';
import { LieuAffectation } from 'src/app/models/lieuAffectation';
import { Membre } from 'src/app/models/membre.model';
import { Poste } from 'src/app/models/poste';
import { Sexe } from 'src/app/models/sexe';
import { LieuAffectationService } from 'src/app/services/lieu-affectation.service';
import { PosteService } from 'src/app/services/poste.service';
import { SexeService } from 'src/app/services/sexe.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-fiche-membre',
  templateUrl: './fiche-membre.component.html',
  styleUrls: ['./fiche-membre.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FicheMembreComponent implements OnInit {
  @Input()
  membre: Membre = new Membre();

  imagesUrl = environment.imagesUrl;

  sexe$!: Observable<Sexe>;
  poste$!: Observable<Poste>;
  lieu$!: Observable<LieuAffectation>;

  constructor(
    public sexeService: SexeService,
    public posteService: PosteService,
    public lieuService: LieuAffectationService
  ) {}

  ngOnInit(): void {
    this.initObervables();
  }

  private initObervables(): void {
    this.sexe$ = combineLatest([this.sexeService.sexes$]).pipe(
      map(
        ([sexes]) => sexes.filter((sexe) => sexe.id === this.membre.sexeId)[0]
      )
    );

    this.poste$ = combineLatest([this.posteService.postes$]).pipe(
      map(
        ([postes]) =>
          postes.filter((poste) => poste.id === this.membre.posteId)[0]
      )
    );

    this.lieu$ = combineLatest([this.lieuService.lieuxAffectations$]).pipe(
      map(
        ([lieux]) =>
          lieux.filter((lieu) => lieu.id === this.membre.lieuAffectationId)[0]
      )
    );
  }
}
