import { Component, Input, OnInit } from '@angular/core';
import { EcheanceCredit } from 'src/app/models/echeanceCredit';

@Component({
  selector: 'app-decaler-echeances-credits',
  templateUrl: './decaler-echeances-credits.component.html',
  styleUrls: ['./decaler-echeances-credits.component.scss'],
})
export class DecalerEcheancesCreditsComponent implements OnInit {
  @Input()
  echeancier: EcheanceCredit[] = [];
  constructor() {}

  ngOnInit(): void {}
}
