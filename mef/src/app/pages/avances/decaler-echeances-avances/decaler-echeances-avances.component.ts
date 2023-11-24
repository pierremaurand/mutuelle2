import { Component, Input, OnInit } from '@angular/core';
import { Echeance } from 'src/app/models/echeance.model';

@Component({
  selector: 'app-decaler-echeances-avances',
  templateUrl: './decaler-echeances-avances.component.html',
  styleUrls: ['./decaler-echeances-avances.component.scss'],
})
export class DecalerEcheancesAvancesComponent implements OnInit {
  @Input()
  echeancier: Echeance[] = [];
  constructor() {}

  ngOnInit(): void {}
}
