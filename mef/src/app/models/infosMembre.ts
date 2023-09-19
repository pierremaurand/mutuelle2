import { MvtCompte } from './mvtCompte';
import { Cotisation } from './cotisation';
import { Avance } from './avance';
import { Credit } from './credit';

export class InfosMembre {
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
  cotisations: Cotisation[] = [];
  avances: Avance[] = [];
  credits: Credit[] = [];
}
