import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCompteComptableComponent } from './detail-compte-comptable.component';

describe('DetailCompteComptableComponent', () => {
  let component: DetailCompteComptableComponent;
  let fixture: ComponentFixture<DetailCompteComptableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCompteComptableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailCompteComptableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
