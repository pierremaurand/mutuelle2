import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gabarit } from 'src/app/models/gabarit';
import { GabaritService } from 'src/app/services/gabarit.service';

@Component({
  selector: 'app-page-gabarit',
  templateUrl: './page-gabarit.component.html',
  styleUrls: ['./page-gabarit.component.scss'],
})
export class PageGabaritComponent implements OnInit {
  gabarits: Gabarit[] = [];

  constructor(private gabaritService: GabaritService, private router: Router) {}

  ngOnInit(): void {
    this.gabaritService.getAll().subscribe((data) => {
      this.gabarits = data;
    });
  }

  nouveauGabarit(): void {
    this.router.navigate(['/nouveaugabarit']);
  }

  navigate(id: number): void {
    this.router.navigate(['/nouveaugabarit/' + id.toString()]);
  }

  exportGabarits(): void {}

  importGabarits(): void {}
}
