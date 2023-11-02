import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Mouvement } from 'src/app/models/mouvement';
import { TypeOperation } from 'src/app/models/typeoperation';

@Component({
  selector: 'app-mouvement',
  templateUrl: './mouvement.component.html',
  styleUrls: ['./mouvement.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MouvementComponent implements OnInit {
  @Input()
  index!: number;
  @Input()
  mouvement!: Mouvement;
  @Input()
  mouvements!: Mouvement[];

  constructor() {}

  ngOnInit(): void {}

  estDebit(): boolean {
    if (this.mouvement.typeOperation == TypeOperation.Credit) {
      return false;
    }
    return true;
  }

  getSolde(): number {
    let solde = 0;
    this.mouvements.forEach((m) => {
      if (m.typeOperation == TypeOperation.Debit) {
        solde -= m.montant ?? 0;
      } else {
        solde += m.montant ?? 0;
      }
    });
    return solde;
  }
}
