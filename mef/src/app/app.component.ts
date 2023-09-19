import { Component, OnInit } from '@angular/core';
import { Menu } from './models/menu';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-app';

  constructor(public loaderService: LoaderService) {}
  ngOnInit(): void {
    this.loaderService.isLoading.next(false);
  }
}
