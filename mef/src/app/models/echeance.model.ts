import { Mouvement } from './mouvement';

export class Echeance {
  id!: number;
  dateEcheance!: string | null;
  montantEcheance!: number;
  membreId!: number;
  capital?: number;
  interet?: number;
  avanceId?: number;
  creditId?: number;
}
