import { Cotisation } from './cotisation';

export class InfosCotisation {
  id?: number;
  nom?: string;
  estActif?: boolean;
  sexe?: string;
  poste?: string;
  lieuAffectation?: string;
  photo?: string;
  contact?: string;
  email?: string;

  cotisations: Cotisation[] = [];
}
