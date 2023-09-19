import { TypeOperation } from './typeoperation';

export class Mouvement {
  id!: number;
  typeOperation!: TypeOperation;
  gabaritId!: number;
  libelle!: string;
  montant!: number;
  dateMvt!: string | null;

  membreId!: number;
  cotisationId!: number;
  avanceId!: number;
  creditId!: number;
  deboursementId!: number;
  echeanceId!: number;
}
