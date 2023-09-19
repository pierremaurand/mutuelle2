import { StatusPret } from '../enums/statut-pret.enum';
import { AvanceDebourse } from './avanceDebourse';
import { EcheanceAvance } from './echeanceAvance';
import { Mouvement } from './mouvement';

export class AvanceInfos {
  id!: number;
  membreId!: number;
  nom!: string;
  montantSollicite!: number;
  nombreEcheancesSollicite!: number;
  dateDemande!: string;
  avanceDebourse!: AvanceDebourse;
  mouvements!: Mouvement[];
  echeancier!: EcheanceAvance[];
  status!: StatusPret;
  solde!: number;
}
