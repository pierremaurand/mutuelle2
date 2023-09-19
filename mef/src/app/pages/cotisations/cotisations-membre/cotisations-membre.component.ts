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
    this.membre$ = this.route.params.pipe(
      switchMap((params) => this.membreService.getMembreById(+params['id']))
    );

    this.cotisations$ = combineLatest([
      this.membre$,
      this.cotisationService.cotisations$,
    ]).pipe(
      map(([membre, cotisations]) =>
        cotisations.filter((cotisation) => cotisation.membreId == membre.id)
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
