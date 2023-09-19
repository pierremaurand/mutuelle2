import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { StatusPret } from 'src/app/enums/statut-pret.enum';
import { Membre } from 'src/app/models/membre.model';
import { Avance } from 'src/app/models/avance';
import { AvanceInfos } from 'src/app/models/avance-infos.model';
import { MembreInfos } from 'src/app/models/membreInfos.model';
import { MembreService } from 'src/app/services/membre.service';
import { AvanceService } from 'src/app/services/avance.service';
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
  mouvements$!: Observable<Mouvement[]>;
  mouvements: Mouvement[] = [];
  solde!: number;
  status!: number;

  constructor(
    public membreService: MembreService,
    public compteService: CompteService
  ) {}

  ngOnInit(): void {
    this.initObservable();
  }

  private initObservable(): void {
    this.membre$ = this.membreService.getMembreById(this.avance.membreId);
    this.mouvements$ = this.compteService.getMouvementsAvance(this.avance.id);
    this.mouvements$.subscribe((mouvements) => {
      this.mouvements = mouvements;
      this.calculSolde();
    });
  }

  getStatusString(): string {
    if (this.solde === 0 && this.mouvements.length === 0) {
      this.status = 0;
      return 'Enregistrée';
    } else if (this.solde === 0 && this.mouvements.length !== 0) {
      this.status = 3;
      return 'Soldée';
    } else if (this.solde !== 0 && this.mouvements.length === 1) {
      this.status = 1;
      return 'Décaissée';
    }
    this.status = 2;
    return 'Encours';
  }

  private calculSolde(): void {
    this.solde = 0;
    this.mouvements.forEach((m) => {
      if (m.typeOperation == TypeOperation.Credit) {
        this.solde -= m.montant ?? 0;
      } else {
        this.solde += m.montant ?? 0;
      }
    });
  }
}
