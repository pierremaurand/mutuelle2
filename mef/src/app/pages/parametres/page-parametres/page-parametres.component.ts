import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, startWith, map, combineLatest } from 'rxjs';
import { Parametre } from 'src/app/models/parametre.model';
import { ParametreService } from 'src/app/services/parametre.service';

@Component({
  selector: 'app-page-parametres',
  templateUrl: './page-parametres.component.html',
  styleUrls: ['./page-parametres.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageParametresComponent implements OnInit {
  parametres$!: Observable<Parametre[]>;

  searchCtrl!: FormControl;

  constructor(
    private parametreService: ParametreService,
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

    this.parametres$ = combineLatest([
      search$,
      this.parametreService.parametres$,
    ]).pipe(
      map(([search, parametres]) =>
        parametres.filter((parametre) =>
          parametre.libelle.toLowerCase().includes(search as string)
        )
      )
    );
  }

  newEvent(): void {
    this.navigate(0);
  }

  navigate(id: number): void {
    this.router.navigate(['home', 'nouveauparametre', id.toString()]);
  }
}
