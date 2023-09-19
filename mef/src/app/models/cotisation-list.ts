import { Cotisation } from './cotisation';

export class CotisationList {
  id!: number;
  nom!: string;
  estActif!: boolean;
  cotisations!: Cotisation[];
  solde!: number;
}
