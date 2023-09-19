import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Membre } from 'src/app/models/membre.model';
import { LieuAffectation } from 'src/app/models/lieuAffectation';
import { MembreImporter } from 'src/app/models/membre-importer';
import { Poste } from 'src/app/models/poste';
import { Sexe } from 'src/app/models/sexe';
import { AlertifyService } from 'src/app/services/alertify.service';
import { LieuAffectationService } from 'src/app/services/lieu-affectation.service';
import { MembreService } from 'src/app/services/membre.service';
import { PosteService } from 'src/app/services/poste.service';
import { SexeService } from 'src/app/services/sexe.service';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-import-membres',
  templateUrl: './import-membres.component.html',
  styleUrls: ['./import-membres.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportMembresComponent implements OnInit {
  file: any;
  arrayBuffer!: any;
  membres!: MembreImporter[];
  worksheet!: any;
  fileReader: FileReader = new FileReader();
  estCharger: boolean = false;

  constructor(
    private posteService: PosteService,
    private sexeService: SexeService,
    private lieuService: LieuAffectationService,
    private membreService: MembreService,
    private datePipe: DatePipe,
    private router: Router,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit(): void {
    this.fileReader.onload = (e) => {
      this.arrayBuffer = this.fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();

      for (let i = 0; i !== data.length; i++) {
        arr[i] = String.fromCharCode(data[i]);
      }

      const bstr = arr.join('');
      const workbook = xlsx.read(bstr, { type: 'binary', cellDates: true });
      const first_sheet_name = workbook.SheetNames[0];

      const worksheet = workbook.Sheets[first_sheet_name];
      this.worksheet = xlsx.utils.sheet_to_json(worksheet, { raw: true });
    };
  }

  getFile(event: any): void {
    const file = event.target.files[0];
    this.reader(file);
  }

  private reader(file: any) {
    this.fileReader.readAsArrayBuffer(file);
    this.estCharger = true;
  }

  chargerInfos(): void {}

  importer(): void {
    // this.membres.forEach((x) => {
    //   let membre = new Membre();
    //   let sexe = new Sexe();
    //   let poste = new Poste();
    //   let lieu = new LieuAffectation();
    //   if (x.sexe != '') {
    //     sexe.symbole = x.sexe;
    //     if (x.sexe.trim() == 'M') {
    //       sexe.nom = 'Masculin';
    //     } else {
    //       sexe.nom = 'Féminin';
    //     }
    //   }
    //   if (x.titre != '') {
    //     poste.libelle = x.titre.trim();
    //   }
    //   if (x.libelle != '') {
    //     lieu.lieu = x.libelle.trim();
    //   }
    //   if (x.etat)
    //     this.sexeService.add(sexe).subscribe((id: number) => {
    //       membre.sexeId = id;
    //       this.posteService.add(poste).subscribe((id: number) => {
    //         membre.posteId = id;
    //         this.lieuService.add(lieu).subscribe((id: number) => {
    //           membre.lieuAffectationId = id;
    //           membre.nom = x.nom.trim();
    //           membre.estActif = x.etat.trim() == 'ACTIF' ? true : false;
    //           membre.lieuNaissance = x.lieu_naissance;
    //           membre.dateNaissance = this.datePipe.transform(
    //             x.date_naissance,
    //             'yyyy-MM-dd'
    //           );
    //           membre.dateAdhesion = this.datePipe.transform(
    //             x.date_embauche,
    //             'yyyy-MM-dd'
    //           );
    //           membre.contact = x.telephone;
    //           if (x.sexe.trim() == 'F') {
    //             membre.photo = 'default_woman.jpg';
    //           }
    //           this.membreService.add(membre);
    //         });
    //       });
    //     });
    // });
    // this.alertifyService.success('Membres importés avec succèss');
    // this.router.navigate(['/membres']);this.membres.forEach((x) => {
    //   let membre = new Membre();
    //   let sexe = new Sexe();
    //   let poste = new Poste();
    //   let lieu = new LieuAffectation();
    //   if (x.sexe != '') {
    //     sexe.symbole = x.sexe;
    //     if (x.sexe.trim() == 'M') {
    //       sexe.nom = 'Masculin';
    //     } else {
    //       sexe.nom = 'Féminin';
    //     }
    //   }
    //   if (x.titre != '') {
    //     poste.libelle = x.titre.trim();
    //   }
    //   if (x.libelle != '') {
    //     lieu.lieu = x.libelle.trim();
    //   }
    //   if (x.etat)
    //     this.sexeService.add(sexe).subscribe((id: number) => {
    //       membre.sexeId = id;
    //       this.posteService.add(poste).subscribe((id: number) => {
    //         membre.posteId = id;
    //         this.lieuService.add(lieu).subscribe((id: number) => {
    //           membre.lieuAffectationId = id;
    //           membre.nom = x.nom.trim();
    //           membre.estActif = x.etat.trim() == 'ACTIF' ? true : false;
    //           membre.lieuNaissance = x.lieu_naissance;
    //           membre.dateNaissance = this.datePipe.transform(
    //             x.date_naissance,
    //             'yyyy-MM-dd'
    //           );
    //           membre.dateAdhesion = this.datePipe.transform(
    //             x.date_embauche,
    //             'yyyy-MM-dd'
    //           );
    //           membre.contact = x.telephone;
    //           if (x.sexe.trim() == 'F') {
    //             membre.photo = 'default_woman.jpg';
    //           }
    //           this.membreService.add(membre);
    //         });
    //       });
    //     });
    // });
    // this.alertifyService.success('Membres importés avec succèss');
    // this.router.navigate(['/membres']);this.membres.forEach((x) => {
    //   let membre = new Membre();
    //   let sexe = new Sexe();
    //   let poste = new Poste();
    //   let lieu = new LieuAffectation();
    //   if (x.sexe != '') {
    //     sexe.symbole = x.sexe;
    //     if (x.sexe.trim() == 'M') {
    //       sexe.nom = 'Masculin';
    //     } else {
    //       sexe.nom = 'Féminin';
    //     }
    //   }
    //   if (x.titre != '') {
    //     poste.libelle = x.titre.trim();
    //   }
    //   if (x.libelle != '') {
    //     lieu.lieu = x.libelle.trim();
    //   }
    //   if (x.etat)
    //     this.sexeService.add(sexe).subscribe((id: number) => {
    //       membre.sexeId = id;
    //       this.posteService.add(poste).subscribe((id: number) => {
    //         membre.posteId = id;
    //         this.lieuService.add(lieu).subscribe((id: number) => {
    //           membre.lieuAffectationId = id;
    //           membre.nom = x.nom.trim();
    //           membre.estActif = x.etat.trim() == 'ACTIF' ? true : false;
    //           membre.lieuNaissance = x.lieu_naissance;
    //           membre.dateNaissance = this.datePipe.transform(
    //             x.date_naissance,
    //             'yyyy-MM-dd'
    //           );
    //           membre.dateAdhesion = this.datePipe.transform(
    //             x.date_embauche,
    //             'yyyy-MM-dd'
    //           );
    //           membre.contact = x.telephone;
    //           if (x.sexe.trim() == 'F') {
    //             membre.photo = 'default_woman.jpg';
    //           }
    //           this.membreService.add(membre);
    //         });
    //       });
    //     });
    // });
    // this.alertifyService.success('Membres importés avec succèss');
    // this.router.navigate(['/membres']);this.membres.forEach((x) => {
    //   let membre = new Membre();
    //   let sexe = new Sexe();
    //   let poste = new Poste();
    //   let lieu = new LieuAffectation();
    //   if (x.sexe != '') {
    //     sexe.symbole = x.sexe;
    //     if (x.sexe.trim() == 'M') {
    //       sexe.nom = 'Masculin';
    //     } else {
    //       sexe.nom = 'Féminin';
    //     }
    //   }
    //   if (x.titre != '') {
    //     poste.libelle = x.titre.trim();
    //   }
    //   if (x.libelle != '') {
    //     lieu.lieu = x.libelle.trim();
    //   }
    //   if (x.etat)
    //     this.sexeService.add(sexe).subscribe((id: number) => {
    //       membre.sexeId = id;
    //       this.posteService.add(poste).subscribe((id: number) => {
    //         membre.posteId = id;
    //         this.lieuService.add(lieu).subscribe((id: number) => {
    //           membre.lieuAffectationId = id;
    //           membre.nom = x.nom.trim();
    //           membre.estActif = x.etat.trim() == 'ACTIF' ? true : false;
    //           membre.lieuNaissance = x.lieu_naissance;
    //           membre.dateNaissance = this.datePipe.transform(
    //             x.date_naissance,
    //             'yyyy-MM-dd'
    //           );
    //           membre.dateAdhesion = this.datePipe.transform(
    //             x.date_embauche,
    //             'yyyy-MM-dd'
    //           );
    //           membre.contact = x.telephone;
    //           if (x.sexe.trim() == 'F') {
    //             membre.photo = 'default_woman.jpg';
    //           }
    //           this.membreService.add(membre);
    //         });
    //       });
    //     });
    // });
    // this.alertifyService.success('Membres importés avec succèss');
    // this.router.navigate(['/membres']);this.membres.forEach((x) => {
    //   let membre = new Membre();
    //   let sexe = new Sexe();
    //   let poste = new Poste();
    //   let lieu = new LieuAffectation();
    //   if (x.sexe != '') {
    //     sexe.symbole = x.sexe;
    //     if (x.sexe.trim() == 'M') {
    //       sexe.nom = 'Masculin';
    //     } else {
    //       sexe.nom = 'Féminin';
    //     }
    //   }
    //   if (x.titre != '') {
    //     poste.libelle = x.titre.trim();
    //   }
    //   if (x.libelle != '') {
    //     lieu.lieu = x.libelle.trim();
    //   }
    //   if (x.etat)
    //     this.sexeService.add(sexe).subscribe((id: number) => {
    //       membre.sexeId = id;
    //       this.posteService.add(poste).subscribe((id: number) => {
    //         membre.posteId = id;
    //         this.lieuService.add(lieu).subscribe((id: number) => {
    //           membre.lieuAffectationId = id;
    //           membre.nom = x.nom.trim();
    //           membre.estActif = x.etat.trim() == 'ACTIF' ? true : false;
    //           membre.lieuNaissance = x.lieu_naissance;
    //           membre.dateNaissance = this.datePipe.transform(
    //             x.date_naissance,
    //             'yyyy-MM-dd'
    //           );
    //           membre.dateAdhesion = this.datePipe.transform(
    //             x.date_embauche,
    //             'yyyy-MM-dd'
    //           );
    //           membre.contact = x.telephone;
    //           if (x.sexe.trim() == 'F') {
    //             membre.photo = 'default_woman.jpg';
    //           }
    //           this.membreService.add(membre);
    //         });
    //       });
    //     });
    // });
    // this.alertifyService.success('Membres importés avec succèss');
    // this.router.navigate(['/membres']);this.membres.forEach((x) => {
    //   let membre = new Membre();
    //   let sexe = new Sexe();
    //   let poste = new Poste();
    //   let lieu = new LieuAffectation();
    //   if (x.sexe != '') {
    //     sexe.symbole = x.sexe;
    //     if (x.sexe.trim() == 'M') {
    //       sexe.nom = 'Masculin';
    //     } else {
    //       sexe.nom = 'Féminin';
    //     }
    //   }
    //   if (x.titre != '') {
    //     poste.libelle = x.titre.trim();
    //   }
    //   if (x.libelle != '') {
    //     lieu.lieu = x.libelle.trim();
    //   }
    //   if (x.etat)
    //     this.sexeService.add(sexe).subscribe((id: number) => {
    //       membre.sexeId = id;
    //       this.posteService.add(poste).subscribe((id: number) => {
    //         membre.posteId = id;
    //         this.lieuService.add(lieu).subscribe((id: number) => {
    //           membre.lieuAffectationId = id;
    //           membre.nom = x.nom.trim();
    //           membre.estActif = x.etat.trim() == 'ACTIF' ? true : false;
    //           membre.lieuNaissance = x.lieu_naissance;
    //           membre.dateNaissance = this.datePipe.transform(
    //             x.date_naissance,
    //             'yyyy-MM-dd'
    //           );
    //           membre.dateAdhesion = this.datePipe.transform(
    //             x.date_embauche,
    //             'yyyy-MM-dd'
    //           );
    //           membre.contact = x.telephone;
    //           if (x.sexe.trim() == 'F') {
    //             membre.photo = 'default_woman.jpg';
    //           }
    //           this.membreService.add(membre);
    //         });
    //       });
    //     });
    // });
    // this.alertifyService.success('Membres importés avec succèss');
    // this.router.navigate(['/membres']);this.membres.forEach((x) => {
    //   let membre = new Membre();
    //   let sexe = new Sexe();
    //   let poste = new Poste();
    //   let lieu = new LieuAffectation();
    //   if (x.sexe != '') {
    //     sexe.symbole = x.sexe;
    //     if (x.sexe.trim() == 'M') {
    //       sexe.nom = 'Masculin';
    //     } else {
    //       sexe.nom = 'Féminin';
    //     }
    //   }
    //   if (x.titre != '') {
    //     poste.libelle = x.titre.trim();
    //   }
    //   if (x.libelle != '') {
    //     lieu.lieu = x.libelle.trim();
    //   }
    //   if (x.etat)
    //     this.sexeService.add(sexe).subscribe((id: number) => {
    //       membre.sexeId = id;
    //       this.posteService.add(poste).subscribe((id: number) => {
    //         membre.posteId = id;
    //         this.lieuService.add(lieu).subscribe((id: number) => {
    //           membre.lieuAffectationId = id;
    //           membre.nom = x.nom.trim();
    //           membre.estActif = x.etat.trim() == 'ACTIF' ? true : false;
    //           membre.lieuNaissance = x.lieu_naissance;
    //           membre.dateNaissance = this.datePipe.transform(
    //             x.date_naissance,
    //             'yyyy-MM-dd'
    //           );
    //           membre.dateAdhesion = this.datePipe.transform(
    //             x.date_embauche,
    //             'yyyy-MM-dd'
    //           );
    //           membre.contact = x.telephone;
    //           if (x.sexe.trim() == 'F') {
    //             membre.photo = 'default_woman.jpg';
    //           }
    //           this.membreService.add(membre);
    //         });
    //       });
    //     });
    // });
    // this.alertifyService.success('Membres importés avec succèss');
    // this.router.navigate(['/membres']);
  }
}
