import { Cotisation } from './cotisation';

export class CotisationMembre {
  id!: number;
  nom!: string;
  estActif!: boolean;
  cotisations!: Cotisation[];
  solde!: number;
}
