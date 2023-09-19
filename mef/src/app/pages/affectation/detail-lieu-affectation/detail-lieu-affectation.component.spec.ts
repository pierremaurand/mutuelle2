import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailLieuAffectationComponent } from './detail-lieu-affectation.component';

describe('DetailLieuAffectationComponent', () => {
  let component: DetailLieuAffectationComponent;
  let fixture: ComponentFixture<DetailLieuAffectationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailLieuAffectationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailLieuAffectationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
