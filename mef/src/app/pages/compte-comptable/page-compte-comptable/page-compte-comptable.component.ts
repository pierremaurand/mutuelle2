import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { CompteComptable } from 'src/app/models/comptecomptable';
import { CompteComptableService } from 'src/app/services/compte-comptable.service';

@Component({
  selector: 'app-page-compte-comptable',
  templateUrl: './page-compte-comptable.component.html',
  styleUrls: ['./page-compte-comptable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageCompteComptableComponent implements OnInit {
  compteComptables$!: Observable<CompteComptable[]>;

  searchCtrl!: FormControl;

  constructor(
    private compteService: CompteComptableService,
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

    this.compteComptables$ = combineLatest([
      search$,
      this.compteService.comptes$,
    ]).pipe(
      map(([search, comptes]) =>
        comptes.filter((compte) =>
          compte.libelle.toLowerCase().includes(search as string)
        )
      )
    );
  }

  newEvent(): void {
    this.navigate(0);
  }

  navigate(id: number): void {
    this.router.navigate(['home', 'nouveaucomptecomptable', id.toString()]);
  }

  exportComptes(): void {}

  importComptes(): void {}
}
