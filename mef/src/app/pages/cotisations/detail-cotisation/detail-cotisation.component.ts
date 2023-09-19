import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cotisation } from 'src/app/models/cotisation';
import { LieuAffectation } from 'src/app/models/lieuAffectation';
import { Membre } from 'src/app/models/membre.model';
import { MembreInfos } from 'src/app/models/membreInfos.model';
import { Poste } from 'src/app/models/poste';
import { Sexe } from 'src/app/models/sexe';
import { CotisationService } from 'src/app/services/cotisation.service';
import { LieuAffectationService } from 'src/app/services/lieu-affectation.service';
import { MembreService } from 'src/app/services/membre.service';
import { PosteService } from 'src/app/services/poste.service';
import { SexeService } from 'src/app/services/sexe.service';

@Component({
  selector: 'app-detail-cotisation',
  templateUrl: './detail-cotisation.component.html',
  styleUrls: ['./detail-cotisation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailCotisationComponent implements OnInit {
  @Input()
  membre!: Membre;
  cotisations$!: Observable<Cotisation[]>;
  solde!: number;

  constructor(private cotisationService: CotisationService) {}

  ngOnInit(): void {
    this.initObservables();
  }

  private initObservables() {
    this.cotisations$ = this.cotisationService.getCotisationsMembre(
      +this.membre.id
    );

    this.cotisations$.subscribe((cotisations) => {
      this.solde = this.calculSolde(cotisations);
    });
  }

  private calculSolde(cotisations: Cotisation[]): number {
    let solde: number = 0;
    cotisations.forEach((cotisation) => {
      solde += cotisation.montant;
    });
    return solde;
  }
}
