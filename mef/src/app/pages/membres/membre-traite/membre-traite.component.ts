import { Component, Input, OnInit } from '@angular/core';
import { MembreImporter } from 'src/app/models/membre-importer';

@Component({
  selector: 'app-membre-traite',
  templateUrl: './membre-traite.component.html',
  styleUrls: ['./membre-traite.component.scss'],
})
export class MembreTraiteComponent implements OnInit {
  @Input()
  membres!: MembreImporter[];
  constructor() {}

  ngOnInit(): void {}
}
