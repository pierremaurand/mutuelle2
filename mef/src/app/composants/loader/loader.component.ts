import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderState } from 'src/app/models/loader';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit, OnDestroy {
  show = false;

  subscription!: Subscription;

  constructor(public loaderService: LoaderService) {}

  ngOnInit(): void {
    this.subscription = this.loaderService.loaderState.subscribe(
      (state: LoaderState) => {
        this.show = state.show;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
