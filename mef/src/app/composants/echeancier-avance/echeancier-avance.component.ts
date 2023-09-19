import { Component, Input, OnInit } from '@angular/core';
import { Echeance } from 'src/app/models/echeance.model';
import { EcheanceAvance } from 'src/app/models/echeanceAvance';

@Component({
  selector: 'app-echeancier-avance',
  templateUrl: './echeancier-avance.component.html',
  styleUrls: ['./echeancier-avance.component.scss'],
})
export class EcheancierAvanceComponent implements OnInit {
  @Input()
  echeancier: Echeance[] = [];
  @Input()
  nbrEcheances?: number = 0;

  constructor() {}

  ngOnInit(): void {}
}
