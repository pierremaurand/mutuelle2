import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauGabaritComponent } from './nouveau-gabarit.component';

describe('NouveauGabaritComponent', () => {
  let component: NouveauGabaritComponent;
  let fixture: ComponentFixture<NouveauGabaritComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NouveauGabaritComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NouveauGabaritComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
