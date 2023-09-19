import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Membre } from 'src/app/models/membre.model';
import { Credit } from 'src/app/models/credit';
import { MembreService } from 'src/app/services/membre.service';

@Component({
  selector: 'app-infos-credit',
  templateUrl: './infos-credit.component.html',
  styleUrls: ['./infos-credit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfosCreditComponent implements OnInit {
  @Input()
  credit!: Credit;
  loading$!: Observable<boolean>;
  membre$!: Observable<Membre>;
  constructor(private membreService: MembreService) {}

  ngOnInit(): void {
    this.initObservable();
  }

  private initObservable(): void {}

  getStatusString(): string {
    // if (this.credit.status === StatusPret.ENREGISTRE) {
    //   return 'Enregistré';
    // } else {
    //   if (this.credit.status === StatusPret.DEBOURSE) {
    //     return 'Déboursé';
    //   } else {
    //     if (this.credit.status === StatusPret.ENCOURS) {
    //       return 'Encours';
    //     } else {
    //       return 'Soldé';
    //     }
    //   }
    // }
    return 'OK';
  }
}
