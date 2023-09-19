import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  membre: Membre = new Membre();
  @Input()
  width: number = 64;
  @Input()
  size: string = 'h5';
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
    this.sexe$ = this.sexeService.getSexeById(this.membre.sexeId);
    this.poste$ = this.posteService.getPosteById(this.membre.posteId);
    this.lieu$ = this.lieuService.getLieuById(this.membre.lieuAffectationId);
  }
}
