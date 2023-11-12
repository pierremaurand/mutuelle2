import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { Gabarit } from 'src/app/models/gabarit';
import { GabaritService } from 'src/app/services/gabarit.service';

@Component({
  selector: 'app-page-gabarit',
  templateUrl: './page-gabarit.component.html',
  styleUrls: ['./page-gabarit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageGabaritComponent implements OnInit {
  gabarits$!: Observable<Gabarit[]>;

  searchCtrl!: FormControl;

  constructor(
    private gabaritService: GabaritService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initFormControls();
    this.initObservables();
  }

  private initFormControls(): void {
    this.searchCtrl = this.fb.control('');
  }

  private initObservables(): void {
    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      map((value) => value.toLowerCase())
    );

    this.gabarits$ = combineLatest([
      search$,
      this.gabaritService.gabarits$,
    ]).pipe(
      map(([search, gabarits]) =>
        gabarits.filter((gabarit) =>
          gabarit.libelle.toLowerCase().includes(search as string)
        )
      )
    );
  }

  newEvent(): void {
    this.navigate(0);
  }

  navigate(id: number): void {
    this.router.navigate(['/nouveaugabarit/' + id.toString()]);
  }
}
