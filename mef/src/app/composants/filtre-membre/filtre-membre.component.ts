import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { Membre } from 'src/app/models/membre.model';
import { MembreService } from 'src/app/services/membre.service';

@Component({
  selector: 'app-filtre-membre',
  templateUrl: './filtre-membre.component.html',
  styleUrls: ['./filtre-membre.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltreMembreComponent implements OnInit {
  membres$!: Observable<Membre[]>;
  results$!: Observable<Membre[]>;

  @Output()
  membresFound = new EventEmitter<Membre[]>();

  searchCtrl!: FormControl;

  constructor(public membreService: MembreService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.initObservables();
  }

  private initForm(): void {
    this.searchCtrl = this.fb.control('');
  }

  private initObservables(): void {
    this.membres$ = this.membreService.membres$;

    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      map((value) => value.toLowerCase())
    );

    this.results$ = combineLatest([search$, this.membres$]).pipe(
      map(([search, membres]) =>
        membres.filter((membre) =>
          membre.nom.toLowerCase().includes(search as string)
        )
      )
    );

    this.results$.subscribe((membres: Membre[]) => {
      this.membresFound.emit(membres);
    });
  }
}
