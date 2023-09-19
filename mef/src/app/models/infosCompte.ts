import { MvtCompte } from './mvtCompte';

export class InfosCompte {
  id?: number;
  nom?: string;
  estActif?: boolean;
  sexe?: string;
  poste?: string;
  lieuAffectation?: string;
  photo?: string;
  contact?: string;
  email?: string;

  mvtComptes: MvtCompte[] = [];
}
