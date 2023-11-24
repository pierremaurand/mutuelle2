import { Component, Input, OnInit } from '@angular/core';
import { Observable, combineLatest, map, of } from 'rxjs';
import { Membre } from 'src/app/models/membre.model';
import { LieuAffectation } from 'src/app/models/lieuAffectation';
import { Poste } from 'src/app/models/poste';
import { Sexe } from 'src/app/models/sexe';
import { LieuAffectationService } from 'src/app/services/lieu-affectation.service';
import { PosteService } from 'src/app/services/poste.service';
import { SexeService } from 'src/app/services/sexe.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-details-membre',
  templateUrl: './details-membre.component.html',
  styleUrls: ['./details-membre.component.scss'],
})
export class DetailsMembreComponent implements OnInit {
  @Input()
  membre!: Membre;
  @Input()
  width: number = 64;
  @Input()
  size: string = 'h5';
  imagesUrl = environment.imagesUrl;

  sexe$!: Observable<Sexe>;
  sexes$!: Observable<Sexe[]>;

  poste$!: Observable<Poste>;
  postes$!: Observable<Poste[]>;

  lieu$!: Observable<LieuAffectation>;
  lieux$!: Observable<LieuAffectation[]>;

  constructor(
    public sexeService: SexeService,
    public posteService: PosteService,
    public lieuService: LieuAffectationService
  ) {}

  ngOnInit(): void {
    this.initObervables();
  }

  private initObervables(): void {
    const idSexe$ = of(this.membre.sexeId);
    const idLieu$ = of(this.membre.lieuAffectationId);
    const idPoste$ = of(this.membre.posteId);

    this.sexes$ = this.sexeService.sexes$;
    this.lieux$ = this.lieuService.lieuxAffectations$;
    this.postes$ = this.posteService.postes$;

    this.sexe$ = combineLatest([idSexe$, this.sexes$]).pipe(
      map(([id, sexes]) => sexes.filter((sexe) => sexe.id === id)[0])
    );

    this.poste$ = combineLatest([idSexe$, this.postes$]).pipe(
      map(([id, postes]) => postes.filter((poste) => poste.id === id)[0])
    );

    this.lieu$ = combineLatest([idLieu$, this.lieux$]).pipe(
      map(([id, lieux]) => lieux.filter((lieu) => lieu.id === id)[0])
    );
  }
}
