import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCompteComptableComponent } from './page-compte-comptable.component';

describe('PageCompteComptableComponent', () => {
  let component: PageCompteComptableComponent;
  let fixture: ComponentFixture<PageCompteComptableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageCompteComptableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageCompteComptableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
