import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Cotisation } from 'src/app/models/cotisation';
import { Mois } from 'src/app/models/mois';
import { CotisationService } from 'src/app/services/cotisation.service';

@Component({
  selector: 'app-cotisation',
  templateUrl: './cotisation.component.html',
  styleUrls: ['./cotisation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CotisationComponent implements OnInit {
  @Input()
  cotisation!: Cotisation;
  @Input()
  index!: number;
  mois$!: Observable<Mois>;

  constructor(private cotisationService: CotisationService) {}

  ngOnInit(): void {
    this.initObservables();
  }

  private initObservables(): void {
    this.mois$ = this.cotisationService.getMoisById(this.cotisation.moisId);
  }
}
