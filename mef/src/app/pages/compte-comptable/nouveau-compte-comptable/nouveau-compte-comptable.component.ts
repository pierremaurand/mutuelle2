import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompteComptable } from 'src/app/models/comptecomptable';
import { CompteComptableService } from 'src/app/services/compte-comptable.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-nouveau-compte-comptable',
  templateUrl: './nouveau-compte-comptable.component.html',
  styleUrls: ['./nouveau-compte-comptable.component.scss'],
})
export class NouveauCompteComptableComponent implements OnInit {
  compte: CompteComptable = new CompteComptable();
  photo: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private compteService: CompteComptableService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    const idCompte = this.activatedRoute.snapshot.params['id'];
    this.photo = this.compteService.getImageUrl();
    if (idCompte) {
      this.compteService
        .getById(idCompte)
        .subscribe((compte: CompteComptable) => {
          this.compte = compte;
          console.log(this.compte);
        });
    }
  }

  enregistrerCompte(): void {
    if (this.compte.id) {
      this.compteService
        .update(this.compte, this.compte.id)
        .subscribe((value: any) => {
          this.loaderService.hide();
          this.cancel();
        });
    } else {
      this.compteService.add(this.compte).subscribe((id: number) => {
        this.loaderService.hide();
        this.cancel();
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/comptecomptables']);
  }
}
