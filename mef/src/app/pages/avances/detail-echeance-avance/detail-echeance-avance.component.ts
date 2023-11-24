import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, combineLatest, map, of } from 'rxjs';
import { Avance } from 'src/app/models/avance';
import { Membre } from 'src/app/models/membre.model';
import { AvanceService } from 'src/app/services/avance.service';
import { environment } from 'src/environments/environment';
import { Echeance } from 'src/app/models/echeance.model';
import { Mouvement } from 'src/app/models/mouvement';
import { CompteService } from 'src/app/services/compte.service';
import { TypeOperation } from 'src/app/models/typeoperation';

@Component({
  selector: 'app-detail-echeance-avance',
  templateUrl: './detail-echeance-avance.component.html',
  styleUrls: ['./detail-echeance-avance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailEcheanceAvanceComponent implements OnInit {
  @Input()
  echeance!: Echeance;
  @Input()
  index!: number;
  @Output()
  echeanceChoisie = new EventEmitter<Echeance>();
  mouvements: Mouvement[] = [];
  solde: number = 0;
  status: string = '';
  imagesUrl = environment.imagesUrl;
  selected: boolean = false;

  avance$!: Observable<Avance>;
  membre$!: Observable<Membre>;
  mouvements$!: Observable<Mouvement[]>;

  constructor(
    public compteService: CompteService,
    public avanceService: AvanceService
  ) {}

  ngOnInit(): void {
    this.initObservable();
  }

  private initObservable(): void {
    const idEcheance$ = of(this.echeance.id);
    const idAvance$ = of(this.echeance.avanceId ?? 0);

    this.mouvements$ = combineLatest([
      idEcheance$,
      this.compteService.mouvements$,
    ]).pipe(
      map(([id, mouvements]) =>
        mouvements.filter((mouvement) => mouvement.echeanceId === id)
      )
    );

    this.avance$ = combineLatest([idAvance$, this.avanceService.avances$]).pipe(
      map(([id, avances]) => avances.filter((avance) => avance.id === id)[0])
    );

    this.mouvements$.subscribe((mouvements) => {
      this.calculSolde(mouvements);
    });
  }

  private calculSolde(mouvements: Mouvement[]): void {
    mouvements.forEach((m) => {
      if (m.typeOperation === TypeOperation.Credit) {
        this.echeance.montantEcheance -= m.montant ?? 0;
      }
    });
  }

  sendEcheance(): void {
    this.selected = !this.selected;
    this.echeanceChoisie.emit(this.echeance);
  }

  montantEcheance(): number {
    let total = this.echeance.montantEcheance ?? 0;
    this.mouvements
      .filter((m) => m.id === this.echeance.id)
      .forEach((m) => {
        if (m.typeOperation === TypeOperation.Credit) {
          total -= m.montant ?? 0;
        }
      });
    return total;
  }
}
