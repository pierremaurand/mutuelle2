import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompteComptable } from 'src/app/models/comptecomptable';
import { CompteComptableService } from 'src/app/services/compte-comptable.service';

@Component({
  selector: 'app-page-compte-comptable',
  templateUrl: './page-compte-comptable.component.html',
  styleUrls: ['./page-compte-comptable.component.scss'],
})
export class PageCompteComptableComponent implements OnInit {
  comptes: CompteComptable[] = [];

  constructor(
    private compteService: CompteComptableService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.compteService.getAll().subscribe((data) => {
      this.comptes = data;
    });
  }

  nouveauCompte(): void {
    this.router.navigate(['/nouveaucomptecomptable']);
  }

  navigate(id: number): void {
    this.router.navigate(['/nouveaucomptecomptable/' + id.toString()]);
  }

  exportComptes(): void {}

  importComptes(): void {}
}
