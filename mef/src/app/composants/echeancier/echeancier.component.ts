import { Component, Input, OnInit } from '@angular/core';
import { Echeance } from 'src/app/models/echeance.model';

@Component({
  selector: 'app-echeancier',
  templateUrl: './echeancier.component.html',
  styleUrls: ['./echeancier.component.scss'],
})
export class EcheancierComponent implements OnInit {
  @Input()
  echeancier: Echeance[] = [];
  @Input()
  nbrEcheances?: number = 0;

  constructor() {}

  ngOnInit(): void {}
}
