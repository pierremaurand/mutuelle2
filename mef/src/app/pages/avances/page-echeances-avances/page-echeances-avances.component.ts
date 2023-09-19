import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable, combineLatest, map, startWith, tap } from 'rxjs';
import { Echeance } from 'src/app/models/echeance.model';
import { EcheanceAvance } from 'src/app/models/echeanceAvance';
import { Mouvement } from 'src/app/models/mouvement';
import { TypeOperation } from 'src/app/models/typeoperation';
import { AvanceService } from 'src/app/services/avance.service';
import { CompteService } from 'src/app/services/compte.service';
import { EcheanceService } from 'src/app/services/echeance.service';
import { MembreService } from 'src/app/services/membre.service';
import { SignalrService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-page-echeances-avances',
  templateUrl: './page-echeances-avances.component.html',
  styleUrls: ['./page-echeances-avances.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageEcheancesAvancesComponent implements OnInit {
  dateEcheance: string = '';
  mouvements: Mouvement[] = [];
  echeancier: Echeance[] = [];
  formulaire: number = 1;

  echeances$!: Observable<Echeance[]>;
  mouvements$!: Observable<Mouvement[]>;

  dateEcheanceCtrl!: FormControl;
  searchCtrl!: FormControl;

  constructor(
    public echeanceService: EcheanceService,
    public membreService: MembreService,
    public compteService: CompteService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initControls();
    this.initObservables();
  }

  private initControls(): void {
    this.dateEcheanceCtrl = this.fb.control('');
    this.searchCtrl = this.fb.control('');
  }

  private initObservables(): void {
    this.echeances$ = this.echeanceService.echeances$;
    this.mouvements$ = this.compteService.mouvements$;

    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      map((value) => value.toLowerCase())
    );

    const dateEcheance$ = this.dateEcheanceCtrl.valueChanges.pipe(
      startWith(this.dateEcheanceCtrl.value)
    );

    this.echeances$ = combineLatest([
      search$,
      dateEcheance$,
      this.echeanceService.echeances$,
      this.membreService.membres$,
    ]).pipe(
      map(([search, dateEcheance, echeances, membres]) =>
        echeances.filter((echeance) =>
          membres.find(
            (membre) =>
              membre.id === echeance.membreId &&
              membre.nom.toLowerCase().includes(search as string) &&
              echeance.dateEcheance?.includes(dateEcheance) &&
              this.getEtatPayement(echeance)
          )
        )
      )
    );

    this.mouvements$.subscribe((mouvements: Mouvement[]) => {
      this.mouvements = mouvements;
    });
  }

  getEtatPayement(echeance: Echeance): boolean {
    const solde = this.calculResteAPayer(echeance);
    if (solde > 0) {
      return true;
    }
    return false;
  }

  //-----------------------------------------

  effacer(): void {
    this.dateEcheanceCtrl.setValue('');
  }

  calculResteAPayer(echeance: Echeance): number {
    let solde = +echeance.montantEcheance;
    this.mouvements
      .filter((m) => m.id == echeance.id)
      .forEach((m) => {
        if (m.typeOperation == TypeOperation.Credit) {
          solde -= m.montant ?? 0;
        }
      });
    return solde;
  }

  addEcheance(echeance: Echeance): void {
    echeance.montantEcheance = this.calculResteAPayer(echeance);
    if (this.echeancier.find((e) => e.id == echeance.id)) {
      this.echeancier = this.echeancier.filter((e) => e.id != echeance.id);
    } else {
      this.echeancier.push(echeance);
    }
  }

  viderEcheancier(): void {
    // this.echeancier.length = 0;
  }

  payer(): void {
    this.formulaire = 1;
  }

  decaler(): void {
    this.formulaire = 2;
  }
}
