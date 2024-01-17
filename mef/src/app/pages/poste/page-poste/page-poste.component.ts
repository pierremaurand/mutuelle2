import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { Poste } from 'src/app/models/poste';
import { PosteService } from 'src/app/services/poste.service';

@Component({
  selector: 'app-page-poste',
  templateUrl: './page-poste.component.html',
  styleUrls: ['./page-poste.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagePosteComponent implements OnInit {
  postes$!: Observable<Poste[]>;

  searchCtrl!: FormControl;

  constructor(
    private posteService: PosteService,
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

    this.postes$ = combineLatest([search$, this.posteService.postes$]).pipe(
      map(([search, postes]) =>
        postes.filter((poste) =>
          poste.libelle.toLowerCase().includes(search as string)
        )
      )
    );
  }

  newEvent(): void {
    this.navigate(0);
  }

  navigate(id: number): void {
    this.router.navigate(['home', 'nouveauposte', id.toString()]);
  }
}
