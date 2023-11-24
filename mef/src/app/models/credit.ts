import { Membre } from './membre.model';

export class Credit {
  id!: number;
  membreId!: number;
  membre!: Membre;
  montantSollicite!: number;
  dureeSollicite!: number;
  dateDemande!: string;
  deboursementId!: number;
}
