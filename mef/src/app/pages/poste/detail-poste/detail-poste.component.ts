import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Poste } from 'src/app/models/poste';
import { PosteService } from 'src/app/services/poste.service';

@Component({
  selector: 'app-detail-poste',
  templateUrl: './detail-poste.component.html',
  styleUrls: ['./detail-poste.component.scss'],
})
export class DetailPosteComponent implements OnInit {
  @Input()
  poste: Poste = new Poste();
  photo: string = '';

  constructor(private router: Router, private posteService: PosteService) {}

  ngOnInit(): void {
    this.photo = this.posteService.getImageUrl();
  }

  modifier(): void {
    this.router.navigate(['/nouveauposte', this.poste?.id]);
  }
}
