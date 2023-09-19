import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Poste } from 'src/app/models/poste';
import { PosteService } from 'src/app/services/poste.service';

@Component({
  selector: 'app-page-poste',
  templateUrl: './page-poste.component.html',
  styleUrls: ['./page-poste.component.scss'],
})
export class PagePosteComponent implements OnInit {
  postes: Poste[] = [];

  constructor(private posteService: PosteService, private router: Router) {}

  ngOnInit(): void {
    this.posteService.getAll().subscribe((data) => {
      this.postes = data;
    });
  }

  nouveauPoste(): void {
    this.router.navigate(['/nouveauposte']);
  }

  navigate(id: number): void {
    this.router.navigate(['/nouveauposte/' + id.toString()]);
  }

  importPostes(): void {}

  exportPostes(): void {}
}
