import { Mouvement } from './mouvement';

export class EcheanceAvance {
  id!: number;
  dateEcheance!: string | null;
  montantEcheance!: number;
  montantPaye!: number;
  avanceId!: number;
  mouvements!: Mouvement[];
  montant!: number;
}
