import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Action } from 'src/app/models/action';
import { InfosPage } from 'src/app/models/infosPage';

@Component({
  selector: 'app-bouton-action',
  templateUrl: './bouton-action.component.html',
  styleUrls: ['./bouton-action.component.scss'],
})
export class BoutonActionComponent implements OnInit {
  @Output()
  newEvent = new EventEmitter();
  @Output()
  importEvent = new EventEmitter();
  @Output()
  exportEvent = new EventEmitter();

  @Input()
  afficheNew: boolean = false;
  @Input()
  afficheImport: boolean = false;
  @Input()
  afficheExport: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  nouveauEvent(): void {
    this.newEvent.emit();
  }

  importerEvent(): void {
    this.importEvent.emit();
  }

  exporterEvent(): void {
    this.exportEvent.emit();
  }
}
