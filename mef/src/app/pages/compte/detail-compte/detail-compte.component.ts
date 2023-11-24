import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable, combineLatest, map, of } from 'rxjs';
import { Membre } from 'src/app/models/membre.model';
import { Mouvement } from 'src/app/models/mouvement';
import { TypeMouvement } from 'src/app/models/typeMouvement';
import { TypeOperation } from 'src/app/models/typeoperation';
import { CompteService } from 'src/app/services/compte.service';
import { MembreService } from 'src/app/services/membre.service';

@Component({
  selector: 'app-detail-compte',
  templateUrl: './detail-compte.component.html',
  styleUrls: ['./detail-compte.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailCompteComponent implements OnInit {
  @Input()
  membre!: Membre;
  mouvements$!: Observable<Mouvement[]>;
  mouvementsMembre$!: Observable<Mouvement[]>;
  solde!: number;

  constructor(
    public compteService: CompteService,
    public membreService: MembreService
  ) {}

  ngOnInit(): void {
    this.initObservables();
  }

  private initObservables(): void {
    const idMembre$ = of(this.membre.id);
    this.mouvements$ = this.compteService.mouvements$;
    this.mouvementsMembre$ = combineLatest([idMembre$, this.mouvements$]).pipe(
      map(([id, mouvements]) =>
        mouvements.filter((mouvement) => mouvement.membreId === id)
      )
    );

    this.mouvementsMembre$.subscribe((mouvements) => {
      this.solde = this.calculSolde(mouvements);
    });
  }

  calculSolde(mouvements: Mouvement[]): number {
    let solde = 0;
    mouvements.forEach((mouvement) => {
      if (mouvement.typeOperation === TypeOperation.Credit) {
        solde += mouvement.montant ?? 0;
      } else {
        solde -= mouvement.montant ?? 0;
      }
    });
    return solde;
  }
}
