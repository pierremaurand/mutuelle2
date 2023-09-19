import { StatusPret } from '../enums/statut-pret.enum';

export class CreditList {
  id!: number;
  nom!: string;
  status!: StatusPret;
  solde!: number;
}
