import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { InfosStats } from 'src/app/models/infosStats';

@Component({
  selector: 'app-infos-stats',
  templateUrl: './infos-stats.component.html',
  styleUrls: ['./infos-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfosStatsComponent implements OnInit {
  @Input()
  infos: InfosStats = {
    title: 'cotisations',
    color: 'primary',
    icon: 'comments',
    total: 0,
  };
  @Input()
  value: number = 0;

  constructor() {}

  ngOnInit(): void {}
}
