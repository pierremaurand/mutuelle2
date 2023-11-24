import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { StatusPret } from 'src/app/enums/statut-pret.enum';
import { Avance } from 'src/app/models/avance';
import { Membre } from 'src/app/models/membre.model';
import { Mouvement } from 'src/app/models/mouvement';
import { TypeOperation } from 'src/app/models/typeoperation';
import { AvanceService } from 'src/app/services/avance.service';
import { CompteService } from 'src/app/services/compte.service';
import { DeboursementService } from 'src/app/services/deboursement.service';
import { MembreService } from 'src/app/services/membre.service';

@Component({
  selector: 'app-page-avance',
  templateUrl: './page-avance.component.html',
  styleUrls: ['./page-avance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageAvanceComponent implements OnInit {
  avances$!: Observable<Avance[]>;
  membres$!: Observable<Membre[]>;
  mouvements$!: Observable<Mouvement[]>;

  searchCtrl!: FormControl;
  statusPretCtrl!: FormControl;
  statusPretOptions!: {
    value: StatusPret;
    label: string;
  }[];

  constructor(
    public membreService: MembreService,
    public avanceService: AvanceService,
    public compteService: CompteService,
    public deboursementService: DeboursementService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initFormControls();
    this.initObservables();
  }

  private initFormControls() {
    this.searchCtrl = this.formBuilder.control('');
    this.statusPretCtrl = this.formBuilder.control('');
    this.statusPretOptions = [
      { value: StatusPret.ENREGISTRE, label: 'Enregistré' },
      { value: StatusPret.VALIDE, label: 'Validé' },
      { value: StatusPret.DEBOURSE, label: 'Déboursé' },
      { value: StatusPret.ENCOURS, label: 'Encours' },
      { value: StatusPret.SOLDE, label: 'Soldé' },
    ];
  }

  private initObservables(): void {
    this.avances$ = this.avanceService.avances$;
    this.membres$ = this.membreService.membres$;
    this.mouvements$ = this.compteService.mouvements$;

    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      map((value) => value.toLowerCase())
    );

    const statusPret$ = this.statusPretCtrl.valueChanges.pipe(
      startWith(StatusPret.AUCUN),
      map((value) => value)
    );

    this.avances$ = combineLatest([
      search$,
      statusPret$,
      this.membres$,
      this.avances$,
      this.mouvements$,
    ]).pipe(
      map(([search, statusPret, membres, avances, mouvements]) =>
        avances.filter(
          (avance) =>
            membres.find(
              (membre) =>
                membre.id === avance.membreId &&
                membre.nom.toLowerCase().includes(search as string)
            ) &&
            this.checkStatut(
              avance,
              statusPret,
              mouvements.filter((m) => m.avanceId === avance.id)
            )
        )
      )
    );
  }

  private checkStatut(
    avance: Avance,
    statutPret: StatusPret,
    mouvements: Mouvement[]
  ): boolean {
    const statut = this.getStatutPret(avance.deboursementId, mouvements);
    if (statut == statutPret || statutPret == StatusPret.AUCUN) {
      return true;
    }
    return false;
  }

  private getStatutPret(
    deboursementId: number,
    mouvements: Mouvement[]
  ): StatusPret {
    if (mouvements.length == 0) {
      if (deboursementId) {
        return StatusPret.VALIDE;
      }
      return StatusPret.ENREGISTRE;
    } else if (mouvements.length == 1) {
      return StatusPret.DEBOURSE;
    } else {
      const solde = this.calculSolde(mouvements);
      if (solde == 0) {
        return StatusPret.SOLDE;
      }
    }
    return StatusPret.ENCOURS;
  }

  private calculSolde(mouvements: Mouvement[]): number {
    let solde = 0;
    mouvements.forEach((m) => {
      if (m.typeOperation === TypeOperation.Debit) solde += m.montant ?? 0;
      else solde -= m.montant ?? 0;
    });
    return solde;
  }

  effacer(): void {
    this.statusPretCtrl.setValue(StatusPret.AUCUN);
  }

  //------------------------------------------

  newEvent(): void {
    this.navigate();
  }

  navigate(
    avanceId: number = 0,
    membreId: number = 0,
    deboursementId: number | null = 0
  ): void {
    this.router.navigate([
      '/nouvelleavance/' + avanceId + '/' + membreId + '/' + deboursementId,
    ]);
  }

  exportAvance(): void {}

  importAvance(): void {}
}
