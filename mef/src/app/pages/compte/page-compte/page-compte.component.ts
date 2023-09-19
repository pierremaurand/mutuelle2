import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { Membre } from 'src/app/models/membre.model';
import { Mouvement } from 'src/app/models/mouvement';
import { CompteService } from 'src/app/services/compte.service';
import { MembreService } from 'src/app/services/membre.service';
import { SignalrService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-page-compte',
  templateUrl: './page-compte.component.html',
  styleUrls: ['./page-compte.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageCompteComponent implements OnInit {
  membres$!: Observable<Membre[]>;

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
        membres.filter((membre) =>
          membre.nom.toLowerCase().includes(search as string)
        )
      )
    );

    this.membres$.subscribe();
  }

  nouveauCompte(): void {
    this.router.navigate(['/nouveaucompte']);
  }

  navigate(id: number): void {
    this.router.navigate(['/nouveaucompte/' + id]);
  }
}
