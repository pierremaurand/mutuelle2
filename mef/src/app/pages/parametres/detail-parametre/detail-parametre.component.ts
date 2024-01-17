import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Parametre } from 'src/app/models/parametre.model';
import { ParametreService } from 'src/app/services/parametre.service';

@Component({
  selector: 'app-detail-parametre',
  templateUrl: './detail-parametre.component.html',
  styleUrls: ['./detail-parametre.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailParametreComponent implements OnInit {
  @Input()
  parametre: Parametre = new Parametre();
  photo: string = '';

  constructor(
    private router: Router,
    public parametreService: ParametreService
  ) {}

  ngOnInit(): void {
    this.photo = this.parametreService.getImageUrl();
  }

  modifier(): void {
    this.router.navigate(['/nouveauparametre', this.parametre?.id]);
  }
}
