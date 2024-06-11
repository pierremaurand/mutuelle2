import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, map } from 'rxjs';
import { InfosStats } from 'src/app/models/infosStats';
import { Membre } from 'src/app/models/membre.model';
import { Mouvement } from 'src/app/models/mouvement';
import { TypeOperation } from 'src/app/models/typeoperation';
import { AvanceService } from 'src/app/services/avance.service';
import { CompteService } from 'src/app/services/compte.service';
import { CotisationService } from 'src/app/services/cotisation.service';
import { CreditService } from 'src/app/services/credit.service';
import { MembreService } from 'src/app/services/membre.service';

@Component({
  selector: 'app-fiche-details-membre',
  templateUrl: './fiche-details-membre.component.html',
  styleUrls: ['./fiche-details-membre.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FicheDetailsMembreComponent implements OnInit {
  membre!: Membre;
  membre$!: Observable<Membre>;
  idMembre$!: Observable<number>;

  avances$!: Observable<Mouvement[]>;
  credits$!: Observable<Mouvement[]>;
  cotisations$!: Observable<Mouvement[]>;

  cotisations: InfosStats = {
    title: 'cotisations',
    color: 'success',
    icon: 'comments',
    total: 0,
  };
  avances: InfosStats = {
    title: 'avances',
    color: 'warning',
    icon: 'comments',
    total: 0,
  };
  credits: InfosStats = {
    title: 'credits',
    color: 'danger',
    icon: 'comments',
    total: 0,
  };

  totalCotisations: number = 0;
  totalCredits: number = 0;
  totalAvances: number = 0;

  constructor(
    private route: ActivatedRoute,
    public membreService: MembreService,
    public cotisationService: CotisationService,
    public avanceService: AvanceService,
    public creditService: CreditService,
    public compteService: CompteService
  ) {}

  ngOnInit(): void {
    this.initObservables();
  }

  initObservables(): void {
    this.idMembre$ = this.route.params.pipe(map((params) => +params['id']));

    this.membre$ = combineLatest([
      this.idMembre$,
      this.membreService.membres$,
    ]).pipe(
      map(([id, membres]) => membres.filter((membre) => membre.id === id)[0])
    );

    this.cotisations$ = combineLatest([this.compteService.mouvements$]).pipe(
      map(([mouvements]) =>
        mouvements.filter(
          (mouvement) =>
            mouvement.membreId === this.membre.id &&
            mouvement.avanceId &&
            !mouvement.echeanceId
        )
      )
    );

    this.avances$ = combineLatest([
      this.idMembre$,
      this.avanceService.avances$,
      this.compteService.mouvements$,
    ]).pipe(
      map(([id, avances, mouvements]) =>
        mouvements.filter((mouvement) =>
          avances.filter(
            (avance) =>
              avance.membreId === id && mouvement.avanceId === avance.id
          )
        )
      )
    );

    this.credits$ = combineLatest([
      this.idMembre$,
      this.creditService.credits$,
      this.compteService.mouvements$,
    ]).pipe(
      map(([id, credits, mouvements]) =>
        mouvements.filter((mouvement) =>
          credits.filter(
            (credit) =>
              credit.membreId === id && mouvement.avanceId === credit.id
          )
        )
      )
    );

    this.cotisations$.subscribe((mouvements: Mouvement[]) => {
      var total = 0;
      mouvements.forEach((mouvement) => {
        // alert('t:' + mouvement.typeOperation + ',m:' + mouvement.montant);
        if (mouvement.typeOperation === TypeOperation.Credit)
          total += mouvement.montant ? mouvement.montant : 0;
        else total -= mouvement.montant ? mouvement.montant : 0;
      });
      this.cotisations.total = total;
    });

    this.membre$.subscribe((membre: Membre) => {
      if (membre) {
        this.membre = membre;
      }
    });

    this.membre$.subscribe((membre: Membre) => {
      if (membre) {
        this.membre = membre;
      }
    });

    this.membre$.subscribe((membre: Membre) => {
      if (membre) {
        this.membre = membre;
      }
    });
  }
}
