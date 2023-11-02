import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Membre } from 'src/app/models/membre.model';

@Component({
  selector: 'app-detail-membre',
  templateUrl: './detail-membre.component.html',
  styleUrls: ['./detail-membre.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailMembreComponent {
  @Input()
  membre!: Membre;
  @Input()
  width: number = 64;
}
