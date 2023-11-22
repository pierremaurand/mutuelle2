import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Echeance } from 'src/app/models/echeance.model';
import { Mouvement } from 'src/app/models/mouvement';
import { TypeMouvement } from 'src/app/models/typeMouvement';
import { TypeOperation } from 'src/app/models/typeoperation';

@Component({
  selector: 'app-echeancier',
  templateUrl: './echeancier.component.html',
  styleUrls: ['./echeancier.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EcheancierComponent implements OnInit {
  @Input()
  echeancier: Echeance[] = [];
  @Input()
  nbrEcheances?: number = 0;
  @Input()
  mouvements: Mouvement[] = [];

  afficheCapital: boolean = true;
  afficheInteret: boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.afficheCapital = this.afficheColCapital();
    this.afficheInteret = this.afficheColInteret();
  }

  private afficheColInteret(): boolean {
    const echeancier = this.echeancier.filter((echeance) => {
      echeance.interet;
    });
    return echeancier.length !== 0 ? true : false;
  }

  private afficheColCapital(): boolean {
    const echeancier = this.echeancier.filter((echeance) => {
      echeance.capital;
    });
    return echeancier.length !== 0 ? true : false;
  }

  calculSolde(echance: Echeance): number {
    const mouvements = this.mouvements.filter((mouvement) => {
      mouvement.echeanceId === echance.id;
    });
    mouvements.forEach((mouvement) => {
      if (mouvement.typeOperation == TypeOperation.Credit) {
        echance.montantEcheance -= mouvement.montant;
      }
    });
    return echance.montantEcheance;
  }

  checkEtat(echeance: Echeance): string {
    return 'solde';
  }
}
