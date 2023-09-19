import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { Avance } from 'src/app/models/avance';
import { AvanceService } from 'src/app/services/avance.service';
import { MembreService } from 'src/app/services/membre.service';

@Component({
  selector: 'app-page-avance',
  templateUrl: './page-avance.component.html',
  styleUrls: ['./page-avance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageAvanceComponent implements OnInit {
  avances$!: Observable<Avance[]>;

  searchCtrl!: FormControl;
  statusPretCtrl!: FormControl;

  constructor(
    private membreService: MembreService,
    private avanceService: AvanceService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.initObservables();
  }

  private initForm() {
    this.searchCtrl = this.formBuilder.control('');
    this.statusPretCtrl = this.formBuilder.control('');
  }

  private initObservables(): void {
    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      map((value) => value.toLowerCase())
    );

    this.avances$ = combineLatest([
      search$,
      this.membreService.membres$,
      this.avanceService.avances$,
    ]).pipe(
      map(([search, membres, avances]) =>
        avances.filter((avance) =>
          membres.find(
            (membre) =>
              membre.id === avance.membreId &&
              membre.nom.toLowerCase().includes(search as string)
          )
        )
      )
    );
  }

  effacer(): void {
    this.statusPretCtrl.setValue('');
  }

  //------------------------------------------

  newEvent(): void {
    this.navigate();
  }

  navigate(
    avanceId: number = 0,
    membreId: number = 0,
    deboursementId: number | null = 0
  ): void {
    this.router.navigate([
      '/nouvelleavance/' + avanceId + '/' + membreId + '/' + deboursementId,
    ]);
  }

  exportAvance(): void {}

  importAvance(): void {}
}
