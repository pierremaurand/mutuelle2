import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Gabarit } from 'src/app/models/gabarit';
import { GabaritService } from 'src/app/services/gabarit.service';

@Component({
  selector: 'app-detail-gabarit',
  templateUrl: './detail-gabarit.component.html',
  styleUrls: ['./detail-gabarit.component.scss'],
})
export class DetailGabaritComponent implements OnInit {
  @Input()
  gabarit: Gabarit = new Gabarit();
  photo: string = '';
  @Input() hideIcons: boolean = false;

  constructor(private router: Router, private gabaritService: GabaritService) {}

  ngOnInit(): void {
    this.photo = this.gabaritService.getImageUrl();
  }

  modifier(): void {
    this.router.navigate(['/nouveaugabarit', this.gabarit?.id]);
  }
}
