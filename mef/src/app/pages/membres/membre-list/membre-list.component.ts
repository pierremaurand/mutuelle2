import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { Membre } from 'src/app/models/membre.model';
import { LieuAffectationService } from 'src/app/services/lieu-affectation.service';
import { MembreService } from 'src/app/services/membre.service';
import { PosteService } from 'src/app/services/poste.service';
import { SexeService } from 'src/app/services/sexe.service';

@Component({
  selector: 'app-membre-list',
  templateUrl: './membre-list.component.html',
  styleUrls: ['./membre-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MembreListComponent implements OnInit {
  membres$!: Observable<Membre[]>;

  width: number = 64;

  searchCtrl!: FormControl;

  constructor(
    private membreService: MembreService,
    private sexeService: SexeService,
    private posteService: PosteService,
    private lieuAffectationService: LieuAffectationService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.initObservables();
  }

  navigate(id: number): void {
    this.router.navigate(['/nouveaumembre/' + id]);
  }

  newEvent(): void {
    this.navigate(0);
  }

  exportEvent(): void {}

  importEvent(): void {
    this.router.navigate(['/importmembres']);
  }

  private initForm() {
    this.searchCtrl = this.formBuilder.control('');
  }

  private initObservables(): void {
    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      map((value) => value.toLowerCase())
    );

    this.membres$ = combineLatest([
      search$,
      this.membres$,
      this.sexeService.sexes$,
      this.posteService.postes$,
      this.lieuAffectationService.lieuxAffectations$,
    ]).pipe(
      map(([search, membres]) =>
        membres.filter((membre) =>
          membre.nom.toLowerCase().includes(search as string)
        )
      )
    );
  }
}
