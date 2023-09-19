import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailGabaritComponent } from './detail-gabarit.component';

describe('DetailGabaritComponent', () => {
  let component: DetailGabaritComponent;
  let fixture: ComponentFixture<DetailGabaritComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailGabaritComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailGabaritComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
