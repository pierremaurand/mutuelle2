import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SexeList } from 'src/app/models/sexeList';
import { SexeService } from 'src/app/services/sexe.service';

@Component({
  selector: 'app-page-sexe',
  templateUrl: './page-sexe.component.html',
  styleUrls: ['./page-sexe.component.scss'],
})
export class PageSexeComponent implements OnInit {
  sexes: SexeList[] = [];

  constructor(private sexeService: SexeService, private router: Router) {}

  ngOnInit(): void {
    this.sexeService.getAll().subscribe((data) => {
      this.sexes = data;
    });
  }

  nouveauSexe(): void {
    this.router.navigate(['/nouveausexe']);
  }

  navigate(id: number): void {
    this.router.navigate(['/nouveausexe/' + id.toString()]);
  }

  importSexes(): void {}

  exportSexes(): void {}
}
