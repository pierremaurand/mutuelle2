import { Mouvement } from './mouvement';

export class CreditDebourse {
  id!: number;
  montantAccorde!: number;
  montantCommission!: number;
  montantInteret!: number;
  dureeAccordee!: number;
  dateDecaissement!: string;
  mouvement!: Mouvement;
}
