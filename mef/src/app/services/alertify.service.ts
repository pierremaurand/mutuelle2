import { Injectable } from '@angular/core';
import * as alertyfy from 'alertifyjs';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor(
    private loaderService: LoaderService
  ) { }

  success(message: string) {
    this.loaderService.hide();
    alertyfy.success(message);
  }

  warning(message: string) {
    this.loaderService.hide();
    alertyfy.warning(message);
  }

  error(message: string) {
    this.loaderService.hide();
    alertyfy.error(message);
  }

}
