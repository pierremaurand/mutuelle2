import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LieuAffectation } from 'src/app/models/lieuAffectation';
import { LieuAffectationService } from 'src/app/services/lieu-affectation.service';

@Component({
  selector: 'app-page-lieu-affectation',
  templateUrl: './page-lieu-affectation.component.html',
  styleUrls: ['./page-lieu-affectation.component.scss'],
})
export class PageLieuAffectationComponent implements OnInit {
  lieuaffectations: LieuAffectation[] = [];

  constructor(
    private lieuaffectationService: LieuAffectationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.lieuaffectationService.getAll().subscribe((data) => {
      this.lieuaffectations = data;
    });
  }

  nouveauLieuAffectation(): void {
    this.router.navigate(['/nouveaulieuaffectation']);
  }

  navigate(id: number): void {
    this.router.navigate(['/nouveaulieuaffectation/' + id.toString()]);
  }

  importLieuAffectation(): void {}

  exportLieuAffectation(): void {}
}
