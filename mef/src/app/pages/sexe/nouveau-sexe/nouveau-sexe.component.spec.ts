import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauSexeComponent } from './nouveau-sexe.component';

describe('NouveauSexeComponent', () => {
  let component: NouveauSexeComponent;
  let fixture: ComponentFixture<NouveauSexeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NouveauSexeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NouveauSexeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
