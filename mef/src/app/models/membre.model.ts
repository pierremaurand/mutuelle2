export class Membre {
  id: number = 0;
  nom: string = 'NOM DU MEMBRE';
  estActif: boolean = true;
  sexeId: number = 1;
  posteId: number = 1;
  lieuAffectationId: number = 1;
  photo: string = 'default_man.jpg';
  dateNaissance!: string | null;
  dateAdhesion!: string | null;
  lieuNaissance!: string;
  contact: string = 'CONTACT DU MEMBRE';
  email!: string;
}
