import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, map } from 'rxjs';
import { Membre } from 'src/app/models/membre.model';
import { Mouvement } from 'src/app/models/mouvement';
import { TypeOperation } from 'src/app/models/typeoperation';
import { CompteService } from 'src/app/services/compte.service';
import { MembreService } from 'src/app/services/membre.service';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-nouveau-compte',
  templateUrl: './nouveau-compte.component.html',
  styleUrls: ['./nouveau-compte.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NouveauCompteComponent implements OnInit {
  id!: number;
  SortbyParam = 'dateMvt';
  SortDirection = 'desc';
  solde!: number;
  membre$!: Observable<Membre>;
  idMembre$!: Observable<number>;
  mouvements$!: Observable<Mouvement[]>;
  mouvements!: Mouvement[];
  membre!: Membre;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private compteService: CompteService,
    private membreService: MembreService
  ) {}

  ngOnInit(): void {
    this.initObservables();
  }

  private initObservables(): void {
    this.idMembre$ = this.route.params.pipe(map((params) => +params['id']));

    this.membre$ = combineLatest([
      this.idMembre$,
      this.membreService.membres$,
    ]).pipe(
      map(([id, membres]) => membres.filter((membre) => membre.id === id)[0])
    );

    this.mouvements$ = combineLatest([
      this.idMembre$,
      this.compteService.mouvements$,
    ]).pipe(
      map(([id, mouvements]) =>
        mouvements.filter((mouvement) => mouvement.membreId === id)
      )
    );

    this.mouvements$.subscribe((mouvements) => {
      this.mouvements = mouvements;
      this.solde = this.calculSolde(this.mouvements);
    });

    this.membre$.subscribe((membre) => {
      this.membre = membre;
    });
  }

  addMouvement(): void {
    this.router.navigate([`/addmouvement/${this.membre.id}`]);
  }

  //------------------------------------------------------------

  private calculSolde(mouvements: Mouvement[]): number {
    let solde = 0;
    mouvements.map((mouvement) => {
      if (mouvement.typeOperation == TypeOperation.Credit) {
        solde += mouvement.montant ? mouvement.montant : 0;
      } else {
        solde -= mouvement.montant ? mouvement.montant : 0;
      }
    });
    return solde;
  }

  getMouvements(mouvements: Mouvement[], index: number): Mouvement[] {
    return mouvements.slice(index);
  }

  onGoBack(): void {
    this.router.navigate(['/comptes']);
  }

  generatePdf(): void {
    const documentDefinition = {
      content: {
        text: 'relevé de compte',
      },
    };
    pdfMake.createPdf(documentDefinition).open();
  }
}
