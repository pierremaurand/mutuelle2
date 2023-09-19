import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { AvanceService } from 'src/app/services/avance.service';
import { CompteComptableService } from 'src/app/services/compte-comptable.service';
import { CompteService } from 'src/app/services/compte.service';
import { CotisationService } from 'src/app/services/cotisation.service';
import { CreditService } from 'src/app/services/credit.service';
import { DeboursementService } from 'src/app/services/deboursement.service';
import { EcheanceService } from 'src/app/services/echeance.service';
import { GabaritService } from 'src/app/services/gabarit.service';
import { LieuAffectationService } from 'src/app/services/lieu-affectation.service';
import { MembreService } from 'src/app/services/membre.service';
import { PosteService } from 'src/app/services/poste.service';
import { SexeService } from 'src/app/services/sexe.service';
import { SignalrService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccueilComponent implements OnInit {
  constructor(
    public signalrService: SignalrService,
    public membreService: MembreService,
    public sexeService: SexeService,
    public posteService: PosteService,
    public lieuService: LieuAffectationService,
    public compteService: CompteService,
    public cotisationService: CotisationService,
    public avanceService: AvanceService,
    public creditService: CreditService,
    public deboursementService: DeboursementService,
    public echeanceService: EcheanceService,
    public gabaritService: GabaritService,
    public compteComptableService: CompteComptableService
  ) {}

  ngOnInit(): void {
    this.signalrService.startConnection();

    this.signalrService.addMembreAddListener();

    this.signalrService.addSexeAddListener();

    this.signalrService.addPosteAddListener();

    this.signalrService.addLieuAddListener();

    this.signalrService.addMouvementAddListener();

    this.signalrService.addCotisationAddListener();

    this.signalrService.addAvanceAddListener();

    this.signalrService.addDeboursementAddListener();

    this.signalrService.addEcheanceAddListener();

    this.cotisationService.getMoisFromServer();

    this.initObservables();
  }

  private initObservables(): void {
    this.signalrService.membreAdd$.subscribe(() => {
      this.membreService.getMembresFromServer();
    });

    this.signalrService.sexeAdd$.subscribe(() => {
      this.sexeService.getSexesFromServer();
    });

    this.signalrService.posteAdd$.subscribe(() => {
      this.posteService.getPostesFromServer();
    });

    this.signalrService.lieuAdd$.subscribe(() => {
      this.lieuService.getLieuxFromServer();
    });

    this.signalrService.mouvementAdd$.subscribe(() => {
      this.compteService.getMouvementsFromServer();
    });

    this.signalrService.cotisationAdd$.subscribe(() => {
      this.cotisationService.getCotisationsFromServer();
    });

    this.signalrService.avanceAdd$.subscribe(() => {
      this.avanceService.getAvancesFromServer();
    });

    this.signalrService.creditAdd$.subscribe(() => {
      this.creditService.getCreditsFromServer();
    });

    this.signalrService.deboursementAdd$.subscribe(() => {
      this.deboursementService.getDeboursementsFromServer();
    });

    this.signalrService.echeanceAdd$.subscribe(() => {
      this.echeanceService.getEcheancesFromServer();
    });
  }
}
