import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompteComptable } from 'src/app/models/comptecomptable';
import { Gabarit } from 'src/app/models/gabarit';
import { Operation } from 'src/app/models/operation';
import { TypeMouvement } from 'src/app/models/typeMouvement';
import { CompteComptableService } from 'src/app/services/compte-comptable.service';
import { GabaritService } from 'src/app/services/gabarit.service';
import { LoaderService } from 'src/app/services/loader.service';
import { OperationService } from 'src/app/services/operation.service';

@Component({
  selector: 'app-nouveau-gabarit',
  templateUrl: './nouveau-gabarit.component.html',
  styleUrls: ['./nouveau-gabarit.component.scss'],
})
export class NouveauGabaritComponent implements OnInit {
  gabaritId?: number;
  gabarit: Gabarit = new Gabarit();
  operation: Operation = new Operation();
  comptes: CompteComptable[] = [];
  operations: Operation[] = [];
  photo: string = '';
  SortbyParam = 'typeOperation';
  SortDirection = 'asc';
  @ViewChild('closeModal') modalClose: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private gabaritService: GabaritService,
    private compteComptableService: CompteComptableService,
    private operationService: OperationService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.gabaritId = this.activatedRoute.snapshot.params['id'];
    this.photo = this.gabaritService.getImageUrl();
    this.compteComptableService
      .getAll()
      .subscribe((comptes: CompteComptable[]) => {
        this.comptes = comptes;
        this.chargementGabarit();
      });
  }

  enregistrerGabarit(): void {
    if (this.checkGabaritInfo()) {
      if (this.gabarit.id != 0 && this.gabaritId) {
        this.gabaritService
          .update(this.gabarit, this.gabaritId)
          .subscribe((value: any) => {
            this.cancel();
          });
      } else {
        this.gabaritService.add(this.gabarit).subscribe((id: number) => {
          this.operationService.add(id, this.operations).subscribe(() => {
            this.cancel();
          });
        });
      }
    }
  }

  checkGabaritInfo(): boolean {
    if (this.operations.length === 0 || this.gabarit.libelle == '') {
      alert('Les informations ne sont pas valides!');
      return false;
    }

    let credit = 100;
    let debit = 100;
    this.operations.map((operation) => {
      if (operation.typeOperation == 0) {
        debit -= operation.taux;
      } else {
        credit -= operation.taux;
      }
    });
    if (debit != 0 || credit != 0) {
      alert('Ecriture non équilibré!');
      return false;
    }

    return true;
  }

  checkOperationInfos(): boolean {
    if (this.operation.compteComptableId == 0) {
      return false;
    }

    if (this.operation.taux == 0) {
      return false;
    }

    return true;
  }

  ajouterOperation(): void {
    if (this.checkOperationInfos()) {
      if (this.operations) {
        this.operations.push(this.operation);
        this.resetForm();
      }
    }
  }

  resetForm(): void {
    this.operation = new Operation();
  }

  cancel(): void {
    this.router.navigate(['/gabarits']);
  }

  getNumCompte(id?: number): string {
    let compte = '';
    this.comptes.map((cmp) => {
      if (cmp.id == id) {
        compte = cmp.compte;
      }
    });
    return compte;
  }

  getLibelleCompte(id?: number): string {
    let libelle = '';
    this.comptes.map((cmp) => {
      if (cmp.id == id) {
        libelle = cmp.libelle;
      }
    });
    return libelle;
  }

  chargementGabarit(): void {
    if (this.gabaritId) {
      this.gabaritService
        .getById(this.gabaritId)
        .subscribe((gabarit: Gabarit) => {
          this.gabarit = gabarit;
          this.operationService
            .getAll(this.gabaritId)
            .subscribe((operations: Operation[]) => {
              this.operations = operations;
            });
        });
    }
  }

  activer(): void {
    this.gabarit.estActif = !this.gabarit.estActif;
  }
}
