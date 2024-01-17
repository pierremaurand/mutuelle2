import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Echeance } from 'src/app/models/echeance.model';
import { Mouvement } from 'src/app/models/mouvement';
import { TypeOperation } from 'src/app/models/typeoperation';

@Component({
  selector: 'app-echeancier',
  templateUrl: './echeancier.component.html',
  styleUrls: ['./echeancier.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EcheancierComponent implements OnInit {
  @Input()
  echeancier!: Echeance[];
  @Input()
  nbrEcheances?: number = 0;
  @Input()
  mouvements!: Mouvement[];

  constructor() {}

  ngOnInit(): void {}

  montantEcheance(echance: Echeance): number {
    return echance.montantEcheance;
  }

  montantPaye(echeance: Echeance): number {
    let montant = 0;
    if (this.mouvements) {
      const mouvements = this.mouvements.filter(
        (mouvement) => mouvement.echeanceId === echeance.id
      );
      mouvements.forEach((mouvement) => {
        if (mouvement.typeOperation === TypeOperation.Credit) {
          montant += mouvement.montant;
        }
      });
    }
    return montant;
  }

  soldeEcheance(echeance: Echeance): number {
    return this.montantEcheance(echeance) - this.montantPaye(echeance);
  }

  checkEtat(echeance: Echeance): string {
    return 'solde';
  }
}
