import { StatusPret } from '../enums/statut-pret.enum';
import { Membre } from './membre.model';
import { CreditDebourse } from './creditDebourse';
import { EcheanceCredit } from './echeanceCredit';
import { Mouvement } from './mouvement';

export class CreditInfos {
  id!: number;
  membreId!: number;
  nom!: string;
  montantSollicite!: number;
  dureeSollicite!: number;
  dateDemande!: string;
  creditDebourse!: CreditDebourse;
  mouvements!: Mouvement[];
  echeancier!: EcheanceCredit[];
  status!: StatusPret;
  solde!: number;
}
