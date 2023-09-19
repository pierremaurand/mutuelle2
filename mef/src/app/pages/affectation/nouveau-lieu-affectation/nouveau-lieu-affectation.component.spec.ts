import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauLieuAffectationComponent } from './nouveau-lieu-affectation.component';

describe('NouveauLieuAffectationComponent', () => {
  let component: NouveauLieuAffectationComponent;
  let fixture: ComponentFixture<NouveauLieuAffectationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NouveauLieuAffectationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NouveauLieuAffectationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
