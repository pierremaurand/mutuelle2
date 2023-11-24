import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Credit } from 'src/app/models/credit';
import { Membre } from 'src/app/models/membre.model';
import { CreditInfos } from 'src/app/models/credit-infos.model';
import { EcheanceCredit } from 'src/app/models/echeanceCredit';
import { MembreInfos } from 'src/app/models/membreInfos.model';
import { CreditService } from 'src/app/services/credit.service';
import { MembreService } from 'src/app/services/membre.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail-echeance-credit',
  templateUrl: './detail-echeance-credit.component.html',
  styleUrls: ['./detail-echeance-credit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailEcheanceCreditComponent implements OnInit {
  @Input()
  echeance!: EcheanceCredit;
  @Input()
  index!: number;
  @Output()
  echeanceChoisie = new EventEmitter<EcheanceCredit>();
  credit!: Credit;
  solde: number = 0;
  status: string = '';
  membre!: MembreInfos;
  imagesUrl = environment.imagesUrl;
  selected: boolean = false;

  credit$!: Observable<Credit>;
  membre$!: Observable<Membre>;

  constructor(
    private creditService: CreditService,
    private membreService: MembreService
  ) {}

  ngOnInit(): void {
    this.initObservable();
    this.creditService.getCreditsFromServer();
    this.membreService.getMembresFromServer();
  }

  private initObservable(): void {
    // this.credit$ = this.creditService.getCreditById(this.echeance.creditId);
    this.credit$.subscribe((credit) => {
      this.credit = credit;
    });
  }

  sendEcheance(): void {
    this.selected = !this.selected;
    this.echeanceChoisie.emit(this.echeance);
  }

  montantEcheance(): number {
    let total = (this.echeance.capital ?? 0) + (this.echeance.interet ?? 0);
    total -= this.echeance.montantPaye;
    return total;
  }
}
