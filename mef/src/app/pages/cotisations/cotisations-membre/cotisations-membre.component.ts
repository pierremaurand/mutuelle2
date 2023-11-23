import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, map, switchMap } from 'rxjs';
import { Membre } from 'src/app/models/membre.model';
import { Cotisation } from 'src/app/models/cotisation';
import { CotisationService } from 'src/app/services/cotisation.service';
import { MembreService } from 'src/app/services/membre.service';

@Component({
  selector: 'app-cotisations-membre',
  templateUrl: './cotisations-membre.component.html',
  styleUrls: ['./cotisations-membre.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CotisationsMembreComponent implements OnInit {
  id!: number;
  solde!: number;

  membre$!: Observable<Membre>;
  membres$!: Observable<Membre[]>;

  allCotisations$!: Observable<Cotisation[]>;
  cotisations$!: Observable<Cotisation[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cotisationService: CotisationService,
    private membreService: MembreService
  ) {}

  ngOnInit(): void {
    this.initObservables();
  }

  private initObservables(): void {
    const idMembre$ = this.route.params.pipe(map((params) => +params['id']));
    this.membres$ = this.membreService.membres$;
    this.membre$ = combineLatest([idMembre$, this.membres$]).pipe(
      map(([id, membres]) => membres.filter((membre) => membre.id === id)[0])
    );

    this.cotisations$ = combineLatest([
      idMembre$,
      this.cotisationService.cotisations$,
    ]).pipe(
      map(([id, cotisations]) =>
        cotisations.filter((cotisation) => cotisation.membreId === id)
      )
    );

    this.cotisations$.subscribe((cotisations) => {
      this.solde = this.calculSolde(cotisations);
    });

    this.membre$.subscribe((membre) => {
      this.id = membre.id;
    });
  }

  private calculSolde(cotisations: Cotisation[]): number {
    let solde: number = 0;
    cotisations.forEach((cotisation) => {
      solde += cotisation.montant;
    });
    return solde;
  }

  onGoBack(): void {
    this.router.navigate(['/cotisations']);
  }

  addCotisation(): void {
    this.router.navigate([`/addcotisation/${this.id}`]);
  }
}
