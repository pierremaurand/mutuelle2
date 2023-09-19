import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HeaderState } from '../models/header';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private headerSubject = new Subject<HeaderState>();
  headerState = this.headerSubject.asObservable();

  constructor() {}

  search(search: string): void {
    this.headerSubject.next({ search: search });
  }
}
