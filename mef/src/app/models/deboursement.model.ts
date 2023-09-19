export class Deboursement {
  id!: number;
  montantAccorde!: number;
  dureeAccordee!: number;
  dateDecaissement!: string | null;
  membreId!: number;
  montantCommission?: number;
  montantInteret?: number;
}
