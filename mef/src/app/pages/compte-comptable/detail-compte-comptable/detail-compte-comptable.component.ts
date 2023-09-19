import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompteComptable } from 'src/app/models/comptecomptable';
import { CompteComptableService } from 'src/app/services/compte-comptable.service';

@Component({
  selector: 'app-detail-compte-comptable',
  templateUrl: './detail-compte-comptable.component.html',
  styleUrls: ['./detail-compte-comptable.component.scss'],
})
export class DetailCompteComptableComponent implements OnInit {
  @Input()
  compte?: CompteComptable;
  photo: string = '';
  @Input() hideIcons: boolean = false;

  constructor(
    private router: Router,
    private compteComptableService: CompteComptableService
  ) {}

  ngOnInit(): void {
    this.photo = this.compteComptableService.getImageUrl();
  }

  modifier(): void {
    this.router.navigate(['/nouveaucomptecomptable', this.compte?.id]);
  }
}
