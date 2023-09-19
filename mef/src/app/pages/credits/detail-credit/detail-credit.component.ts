import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { StatusPret } from 'src/app/enums/statut-pret.enum';
import { Membre } from 'src/app/models/membre.model';
import { Credit } from 'src/app/models/credit';
import { CreditDebourse } from 'src/app/models/creditDebourse';
import { EcheanceCredit } from 'src/app/models/echeanceCredit';
import { Mouvement } from 'src/app/models/mouvement';
import { CreditService } from 'src/app/services/credit.service';
import { MembreService } from 'src/app/services/membre.service';

@Component({
  selector: 'app-detail-credit',
  templateUrl: './detail-credit.component.html',
  styleUrls: ['./detail-credit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailCreditComponent implements OnInit {
  @Input()
  creditId!: number;
  credit!: Credit;
  creditDebourse!: CreditDebourse;
  mouvements!: Mouvement[];
  echeancier!: EcheanceCredit[];

  @Input()
  membreId!: number;
  membre!: Membre;

  status!: StatusPret;

  solde!: number;
  credit$!: Observable<Credit>;
  loadingCredits$!: Observable<boolean>;

  membre$!: Observable<Membre>;
  loadingMembres$!: Observable<boolean>;

  constructor(
    private membreService: MembreService,
    private creditService: CreditService
  ) {}

  ngOnInit(): void {
    this.initObservables();
    this.membreService.getMembresFromServer();
    this.creditService.getCreditsFromServer();
  }

  private initObservables() {
    this.credit$ = this.creditService.getCreditById(+this.creditId);

    this.membre$.subscribe((membre: Membre) => {
      this.membre = membre;
    });

    // this.credit$.subscribe((credit: Credit) => {
    //   this.credit = credit;
    //   this.creditDebourse = credit.creditDebourse;
    //   this.mouvements = credit.mouvements;
    //   this.echeancier = credit.echeancier;
    //   this.solde = credit.solde;
    //   this.status = credit.status;
    // });
  }

  getStatusString(): string {
    if (this.status === StatusPret.ENREGISTRE) {
      return 'Enregistré';
    } else {
      if (this.status === StatusPret.DEBOURSE) {
        return 'Déboursé';
      } else {
        if (this.status === StatusPret.ENCOURS) {
          return 'Encours';
        } else {
          return 'Soldé';
        }
      }
    }
  }
}
