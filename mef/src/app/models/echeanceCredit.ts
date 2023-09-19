import { Credit } from './credit';
import { Mouvement } from './mouvement';

export class EcheanceCredit {
  id!: number;
  dateEcheance!: string | null;
  capital!: number;
  interet!: number;
  montantPaye!: number;
  creditId!: number;
  mouvements!: Mouvement[];
  montant!: number;
}
