import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauCompteComptableComponent } from './nouveau-compte-comptable.component';

describe('NouveauCompteComptableComponent', () => {
  let component: NouveauCompteComptableComponent;
  let fixture: ComponentFixture<NouveauCompteComptableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NouveauCompteComptableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NouveauCompteComptableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
