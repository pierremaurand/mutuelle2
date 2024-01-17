import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Sexe } from 'src/app/models/sexe';
import { SexeList } from 'src/app/models/sexeList';
import { SexeService } from 'src/app/services/sexe.service';

@Component({
  selector: 'app-page-sexe',
  templateUrl: './page-sexe.component.html',
  styleUrls: ['./page-sexe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSexeComponent implements OnInit {
  sexes$!: Observable<Sexe[]>;

  constructor(private sexeService: SexeService, private router: Router) {}

  ngOnInit(): void {
    this.initObservables();
  }

  initObservables(): void {
    this.sexes$ = this.sexeService.sexes$;
  }

  newEvent(): void {
    this.navigate(0);
  }

  navigate(id: number): void {
    this.router.navigate(['home', 'nouveausexe', id.toString()]);
  }
}
