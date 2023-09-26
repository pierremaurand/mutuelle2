import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { LieuAffectation } from 'src/app/models/lieuAffectation';
import { LieuAffectationService } from 'src/app/services/lieu-affectation.service';

@Component({
  selector: 'app-page-lieu-affectation',
  templateUrl: './page-lieu-affectation.component.html',
  styleUrls: ['./page-lieu-affectation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLieuAffectationComponent implements OnInit {
  lieuxAffectations$!: Observable<LieuAffectation[]>;

  searchCtrl!: FormControl;

  constructor(
    private lieuAffectationService: LieuAffectationService,
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

    this.lieuxAffectations$ = combineLatest([
      search$,
      this.lieuAffectationService.lieuxAffectations$,
    ]).pipe(
      map(([search, lieuxAffectations]) =>
        lieuxAffectations.filter((lieuAffectation) =>
          lieuAffectation.lieu.toLowerCase().includes(search as string)
        )
      )
    );
  }

  newEvent(): void {
    this.navigate(0);
  }

  navigate(id: number): void {
    this.router.navigate(['/nouveaulieuaffectation/' + id.toString()]);
  }

  importLieuAffectation(): void {}

  exportLieuAffectation(): void {}
}
