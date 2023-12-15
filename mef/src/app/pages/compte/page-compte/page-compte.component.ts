import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Membre } from 'src/app/models/membre.model';

@Component({
  selector: 'app-page-compte',
  templateUrl: './page-compte.component.html',
  styleUrls: ['./page-compte.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageCompteComponent implements OnInit {
  membres: Membre[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  nouveauCompte(): void {
    this.router.navigate(['/nouveaucompte']);
  }

  navigate(id: number): void {
    this.router.navigate(['home', 'nouveaucompte', id]);
  }

  membresFound(membres: Membre[]): void {
    this.membres = membres;
  }
}
