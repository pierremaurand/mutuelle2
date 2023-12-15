import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { Membre } from 'src/app/models/membre.model';
import { Cotisation } from 'src/app/models/cotisation';
import { CotisationInfos } from 'src/app/models/cotisation-infos.model';
import { CotisationList } from 'src/app/models/cotisation-list';
import { CotisationService } from 'src/app/services/cotisation.service';
import { MembreService } from 'src/app/services/membre.service';
import { SignalrService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-page-cotisation',
  templateUrl: './page-cotisation.component.html',
  styleUrls: ['./page-cotisation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageCotisationComponent implements OnInit {
  membres: Membre[] = [];
  cotisationAdded$!: Observable<boolean>;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigate(id: number): void {
    this.router.navigate(['home', 'cotisationsmembre', id]);
  }

  importEvent(): void {
    this.router.navigate(['/importcotisations']);
  }

  membresFound(membres: Membre[]): void {
    this.membres = membres;
  }
}
