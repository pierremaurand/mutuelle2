export class MembreInfos {
  id!: number;
  nom!: string;
  sexe!: string;
  sexeId!: number;
  poste!: string;
  posteId!: number;
  lieu!: string;
  lieuAffectationId!: number;
  dateNaissance!: string;
  lieuNaissance!: string;
  dateAdhesion!: string;
  contact!: string;
  email!: string;
  estActif!: boolean;
  photo: string = 'default_man.jpg';
}
