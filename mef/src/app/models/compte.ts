import { Mouvement } from './mouvement';

export class Compte {
  id!: number;
  nom!: string;
  estActif!: boolean;
  mouvements!: Mouvement[];
  solde!: number;
}
