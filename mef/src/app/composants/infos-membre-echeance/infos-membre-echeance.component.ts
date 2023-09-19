import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Membre } from 'src/app/models/membre.model';
import { MembreInfos } from 'src/app/models/membreInfos.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-infos-membre-echeance',
  templateUrl: './infos-membre-echeance.component.html',
  styleUrls: ['./infos-membre-echeance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfosMembreEcheanceComponent implements OnInit {
  @Input()
  membre!: Membre;
  imagesUrl = environment.imagesUrl;

  constructor() {}

  ngOnInit(): void {}
}
