import { DatePipe } from '@angular/common';
import { TypeOperation } from './typeoperation';

export class MvtCompte {
  id: number = 0;
  typeOperation: TypeOperation = TypeOperation.Debit;
  gabaritId: number = 0;
  libelle: string = '';
  montant: number = 0;
  dateMvt: string = '';
}
