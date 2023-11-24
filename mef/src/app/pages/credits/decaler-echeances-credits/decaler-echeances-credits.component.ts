import { Component, Input, OnInit } from '@angular/core';
import { Echeance } from 'src/app/models/echeance.model';

@Component({
  selector: 'app-decaler-echeances-credits',
  templateUrl: './decaler-echeances-credits.component.html',
  styleUrls: ['./decaler-echeances-credits.component.scss'],
})
export class DecalerEcheancesCreditsComponent implements OnInit {
  @Input()
  echeancier: Echeance[] = [];
  constructor() {}

  ngOnInit(): void {}
}
