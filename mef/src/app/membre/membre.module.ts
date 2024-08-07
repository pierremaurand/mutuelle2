import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembreRoutingModule } from './membre-routing.module';
import { MembreListComponent } from './components/membre-list/membre-list.component';


@NgModule({
  declarations: [
    MembreListComponent
  ],
  imports: [
    CommonModule,
    MembreRoutingModule
  ]
})
export class MembreModule { }
