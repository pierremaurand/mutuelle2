import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { Cotisation } from 'src/app/models/cotisation';
import { Membre } from 'src/app/models/membre.model';
import { CotisationService } from 'src/app/services/cotisation.service';

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

    this.cotisations$ = combineLatest([
      this.cotisationService.cotisations$,
    ]).pipe(
      map(([cotisations]) =>
        cotisations.filter(
          (cotisation) => cotisation.membreId === this.membre.id
        )
      )
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
