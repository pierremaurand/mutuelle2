import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, combineLatest, map, of } from 'rxjs';
import { Credit } from 'src/app/models/credit';
import { Membre } from 'src/app/models/membre.model';
import { CreditService } from 'src/app/services/credit.service';
import { environment } from 'src/environments/environment';
import { Echeance } from 'src/app/models/echeance.model';
import { Mouvement } from 'src/app/models/mouvement';
import { TypeOperation } from 'src/app/models/typeoperation';
import { CompteService } from 'src/app/services/compte.service';

@Component({
  selector: 'app-detail-echeance-credit',
  templateUrl: './detail-echeance-credit.component.html',
  styleUrls: ['./detail-echeance-credit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailEcheanceCreditComponent implements OnInit {
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

  constructor() {}

  ngOnInit(): void {}

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
