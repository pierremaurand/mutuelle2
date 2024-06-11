import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Membre } from 'src/app/models/membre.model';

@Component({
  selector: 'app-liste-membres',
  templateUrl: './liste-membres.component.html',
  styleUrls: ['./liste-membres.component.scss'],
})
export class ListeMembresComponent implements OnInit {
  membres: Membre[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigate(id: number): void {
    this.router.navigate(['home', 'nouveaumembre', id]);
  }

  details(id: number): void {
    this.router.navigate(['home', 'details-membre', id]);
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
