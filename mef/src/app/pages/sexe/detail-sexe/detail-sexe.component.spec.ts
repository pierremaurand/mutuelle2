import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSexeComponent } from './detail-sexe.component';

describe('DetailSexeComponent', () => {
  let component: DetailSexeComponent;
  let fixture: ComponentFixture<DetailSexeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailSexeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailSexeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
