import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MembreInfos } from 'src/app/models/membreInfos.model';

@Component({
  selector: 'app-detail-membre',
  templateUrl: './detail-membre.component.html',
  styleUrls: ['./detail-membre.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailMembreComponent {
  @Input()
  membre!: MembreInfos;
  @Input()
  width: number = 64;
}
