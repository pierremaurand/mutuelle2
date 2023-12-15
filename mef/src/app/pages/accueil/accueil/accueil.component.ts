import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, map, tap } from 'rxjs';
import { Membre } from 'src/app/models/membre.model';
import { Menu } from 'src/app/models/menu';
import { Mouvement } from 'src/app/models/mouvement';
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
import { OperationService } from 'src/app/services/operation.service';
import { PosteService } from 'src/app/services/poste.service';
import { SexeService } from 'src/app/services/sexe.service';
import { SignalrService } from 'src/app/services/signalr.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccueilComponent implements OnInit {
  public menuProperties: Menu[] = [
    {
      id: '1',
      titre: 'Tableau de bord',
      icon: 'fas fa-fw fa-chart-line',
      url: '',
      sousMenu: [
        {
          id: '11',
          titre: "Vue d'ensemble",
          icon: 'fas fa-fw fa-chart-pie',
          url: '',
        },
        {
          id: '12',
          titre: 'Statistiques',
          icon: 'fas fa-fw fa-chart-bar',
          url: 'statistiques',
        },
      ],
    },
    {
      id: '2',
      titre: 'Membres',
      icon: 'fas fa-fw fa-users',
      url: '',
      sousMenu: [
        {
          id: '21',
          titre: 'Membres',
          icon: 'fas fa-fw fa-users',
          url: 'membres',
        },
        {
          id: '22',
          titre: 'Comptes',
          icon: 'fa fa-fw fa-money-check',
          url: 'comptes',
        },
        {
          id: '23',
          titre: 'Cotisations',
          icon: 'fa fa-fw fa-coins',
          url: 'cotisations',
        },
      ],
    },
    {
      id: '3',
      titre: 'Avances',
      icon: 'fab fa-fw fa-stack-overflow',
      url: '',
      sousMenu: [
        {
          id: '31',
          titre: 'Avances',
          icon: 'fab fa-fw fa-stack-overflow',
          url: 'avances',
        },
        {
          id: '32',
          titre: 'Echéances Avances',
          icon: 'fa fa-fw fa-money-check',
          url: 'echeancesAvances',
        },
      ],
    },
    {
      id: '4',
      titre: 'Credits',
      icon: 'fa fa-fw fa-money-check',
      url: '',
      sousMenu: [
        {
          id: '41',
          titre: 'Credits',
          icon: 'fa fa-fw fa-money-check',
          url: 'credits',
        },
        {
          id: '42',
          titre: 'Echéances Credits',
          icon: 'fa fa-fw fa-money-check',
          url: 'echeancesCredits',
        },
      ],
    },
    // {
    //   id: '5',
    //   titre: 'Comptabilité',
    //   icon: 'fa fa-fw fa-money-check',
    //   url: '',
    //   sousMenu: [],
    // },
    {
      id: '6',
      titre: 'Paramétrages',
      icon: 'fas fa-fw fa-cogs',
      url: '',
      sousMenu: [
        {
          id: '61',
          titre: 'Utilisateurs',
          icon: 'fas fa-fw fa-users-cog',
          url: 'utilisateurs',
        },
        {
          id: '62',
          titre: 'Sexes',
          icon: 'fas fa-fw fa-venus-mars',
          url: 'sexes',
        },
        {
          id: '63',
          titre: 'Postes',
          icon: 'fa fa-fw fa-list',
          url: 'postes',
        },
        {
          id: '64',
          titre: 'Comptes comptables',
          icon: 'fa fa-fw fa-map',
          url: 'comptecomptables',
        },
        {
          id: '65',
          titre: 'Gabarits',
          icon: 'fa fa-fw fa-list',
          url: 'gabarits',
        },
        {
          id: '66',
          titre: 'Lieu Affectation',
          icon: 'far fa-fw fa-building',
          url: 'lieuaffectations',
        },
      ],
    },
  ];

  private lastSelectedMenu: Menu | undefined;
  private lastSelectedSousMenu: Menu | undefined;

  constructor(
    private router: Router,
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
    public operationService: OperationService,
    public compteComptableService: CompteComptableService,
    public utilisateurService: UtilisateurService
  ) {}

  ngOnInit(): void {
    this.signalrService.startConnection();

    this.signalrService.addUtilisateurAddListener();

    this.signalrService.addMembreAddListener();

    this.signalrService.addSexeAddListener();

    this.signalrService.addPosteAddListener();

    this.signalrService.addLieuAffectationAddListener();

    this.signalrService.addMouvementAddListener();

    this.signalrService.addCotisationAddListener();

    this.signalrService.addAvanceAddListener();

    this.signalrService.addCreditAddListener();

    this.signalrService.addDeboursementAddListener();

    this.signalrService.addEcheanceAddListener();

    this.signalrService.addCompteComptableAddListener();

    this.signalrService.addGabaritAddListener();

    this.signalrService.addOperationAddListener();

    this.cotisationService.getMoisFromServer();

    this.initObservables();
  }

  private initObservables(): void {
    this.signalrService.utilisateurAdd$.subscribe(() => {
      this.utilisateurService.getUtilisateursFromServer();
    });

    this.signalrService.membreAdd$.subscribe(() => {
      this.membreService.getMembresFromServer();
    });

    this.signalrService.sexeAdd$.subscribe(() => {
      this.sexeService.getSexesFromServer();
    });

    this.signalrService.posteAdd$.subscribe(() => {
      this.posteService.getPostesFromServer();
    });

    this.signalrService.lieuAffectationAdd$.subscribe(() => {
      this.lieuService.getLieuxAffectationsFromServer();
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

    this.signalrService.compteComptableAdd$.subscribe(() => {
      this.compteComptableService.getCompteComptablesFromServer();
    });

    this.signalrService.gabaritAdd$.subscribe(() => {
      this.gabaritService.getGabaritsFromServer();
    });
  }

  navigate(menu: Menu, niveau: number): void {
    if (this.lastSelectedSousMenu && niveau == 2) {
      this.lastSelectedSousMenu.active = false;
    }

    if (this.lastSelectedMenu && niveau == 1) {
      this.lastSelectedMenu.active = false;
    }

    menu.active = true;
    if (niveau == 1) {
      this.lastSelectedMenu = menu;
    } else {
      this.lastSelectedSousMenu = menu;
      this.router.navigate(['home', menu.url]);
    }
  }
}
