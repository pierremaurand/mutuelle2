import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable, combineLatest, map, of } from 'rxjs';
import { Membre } from 'src/app/models/membre.model';
import { Avance } from 'src/app/models/avance';
import { MembreService } from 'src/app/services/membre.service';
import { CompteService } from 'src/app/services/compte.service';
import { Mouvement } from 'src/app/models/mouvement';
import { TypeOperation } from 'src/app/models/typeoperation';

@Component({
  selector: 'app-infos-avance',
  templateUrl: './infos-avance.component.html',
  styleUrls: ['./infos-avance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfosAvanceComponent implements OnInit {
  @Input()
  avance!: Avance;

  membre$!: Observable<Membre>;
  membres$!: Observable<Membre[]>;

  mouvements$!: Observable<Mouvement[]>;
  mouvementsAvance$!: Observable<Mouvement[]>;

  solde!: number;
  status!: number;
  statusString!: string;

  constructor(
    public membreService: MembreService,
    public compteService: CompteService
  ) {}

  ngOnInit(): void {
    this.initObservable();
  }

  private initObservable(): void {
    const idMembre$ = of(this.avance.membreId);
    const idAvance$ = of(this.avance.id);
    this.membres$ = this.membreService.membres$;
    this.mouvements$ = this.compteService.mouvements$;

    this.membre$ = combineLatest([idMembre$, this.membres$]).pipe(
      map(([id, membres]) => membres.filter((membre) => membre.id === id)[0])
    );

    this.mouvementsAvance$ = combineLatest([idAvance$, this.mouvements$]).pipe(
      map(([id, mouvements]) =>
        mouvements.filter((mouvement) => mouvement.avanceId === id)
      )
    );

    this.mouvementsAvance$.subscribe((mouvements) => {
      this.solde = this.calculSolde(mouvements);
      this.statusString = this.getStatusString(mouvements);
    });
  }

  getStatusString(mouvements: Mouvement[]): string {
    if (this.solde === 0 && mouvements.length === 0) {
      return 'Enregistrée';
    } else if (this.solde === 0 && mouvements.length !== 0) {
      return 'Soldée';
    } else if (this.solde !== 0 && mouvements.length === 1) {
      return 'Décaissée';
    }
    return 'Encours';
  }

  private calculSolde(mouvements: Mouvement[]): number {
    let solde = 0;
    mouvements.forEach((m) => {
      if (m.typeOperation == TypeOperation.Credit) {
        solde -= m.montant ?? 0;
      } else {
        solde += m.montant ?? 0;
      }
    });
    return solde;
  }
}
