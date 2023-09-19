import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGabaritComponent } from './page-gabarit.component';

describe('PageGabaritComponent', () => {
  let component: PageGabaritComponent;
  let fixture: ComponentFixture<PageGabaritComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageGabaritComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageGabaritComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
