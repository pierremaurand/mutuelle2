import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { Membre } from 'src/app/models/membre.model';
import { MembreService } from 'src/app/services/membre.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-liste-choix-membre',
  templateUrl: './liste-choix-membre.component.html',
  styleUrls: ['./liste-choix-membre.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListeChoixMembreComponent implements OnInit {
  membres$!: Observable<Membre[]>;
  @Output()
  membreChoisie = new EventEmitter<Membre>();

  imagesUrl = environment.imagesUrl;

  searchCtrl!: FormControl;

  search!: string;

  constructor(public membreService: MembreService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initControls();
    this.initObservables();
  }

  private initControls(): void {
    this.searchCtrl = this.fb.control('');
  }

  private initObservables(): void {
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
  }

  //---------------------------------------------

  sendMembre(membre: Membre): void {
    this.membreChoisie.emit(membre);
  }
}
