import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/models/menu';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss'],
})
export class MenuLateralComponent implements OnInit {
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

  constructor(private router: Router) {}

  ngOnInit(): void {}

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
      this.router.navigate([menu.url]);
    }
  }
}
