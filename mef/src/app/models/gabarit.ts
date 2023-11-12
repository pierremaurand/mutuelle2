import { Operation } from './operation';

export class Gabarit {
  id: number = 0;
  libelle: string = '';
  estActif: boolean = false;
  operations: Operation[] = [];
}
