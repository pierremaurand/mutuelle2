import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Membre } from 'src/app/models/membre.model';
import { MembreInfos } from 'src/app/models/membreInfos.model';
import { MembreService } from 'src/app/services/membre.service';

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
