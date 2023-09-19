import { Avance } from './avance';
import { AvanceDebourse } from './avanceDebourse';
import { EcheanceAvance } from './echeanceAvance';

export class InfosAvanceDebourse {
  avance: Avance = new Avance();
  avanceDebourse: AvanceDebourse = new AvanceDebourse();
  echeancier: EcheanceAvance[] = [];
}
