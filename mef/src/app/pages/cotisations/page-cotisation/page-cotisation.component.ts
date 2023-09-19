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
  membres$!: Observable<Membre[]>;
  cotisationAdded$!: Observable<boolean>;

  searchCtrl!: FormControl;

  constructor(
    private membreService: MembreService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.initObservables();
  }

  private initForm() {
    this.searchCtrl = this.formBuilder.control('');
  }

  private initObservables(): void {
    this.membres$ = this.membreService.membres$;

    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      map((value) => value.toLowerCase())
    );

    this.membres$ = combineLatest([search$, this.membreService.membres$]).pipe(
      map(([search, membres]) =>
        membres.filter(
          (membre) =>
            membre.nom.toLowerCase().includes(search as string) &&
            membre.estActif
        )
      )
    );

    // this.cotisationAdded$ = this.signalRService.cotisationAdd$;
    // this.cotisationAdded$.subscribe(() => {
    //   this.cotisationService.getCotisationsFromServer(true);
    // });
  }

  //--------------------------------------------
  navigate(id: number): void {
    this.router.navigate(['/cotisationsmembre/' + id]);
  }

  importEvent(): void {
    this.router.navigate(['/importcotisations']);
  }
}
