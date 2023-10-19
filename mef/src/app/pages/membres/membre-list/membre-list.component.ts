import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Membre } from 'src/app/models/membre.model';

@Component({
  selector: 'app-membre-list',
  templateUrl: './membre-list.component.html',
  styleUrls: ['./membre-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MembreListComponent implements OnInit {
  membres: Membre[] = [];
  width: number = 64;

  constructor(private router: Router) {}

  ngOnInit(): void {}

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

  membresFound(membres: Membre[]): void {
    this.membres = membres;
  }
}
