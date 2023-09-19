import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Search } from 'src/app/models/search';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  @Input() singular: string = '';
  @Input() count: number = 0;
  @Input() search: string = '';
  @Input() searchCount: number = 0;
  @Output() searchChange = new EventEmitter<string>();
  plural: string = '';

  constructor() {}

  ngOnInit(): void {}

  plurialize(count: number, singular: string, plural?: string): string {
    plural ??= singular + 's';
    const str = count === 1 ? singular : plural;
    return count + ' ' + str;
  }

  onFilter(): void {
    this.searchChange.emit(this.search);
  }

  onChange(): void {
    alert('ok');
  }
}
