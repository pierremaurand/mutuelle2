import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLieuAffectationComponent } from './page-lieu-affectation.component';

describe('PageLieuAffectationComponent', () => {
  let component: PageLieuAffectationComponent;
  let fixture: ComponentFixture<PageLieuAffectationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageLieuAffectationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageLieuAffectationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
