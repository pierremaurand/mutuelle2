import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauPosteComponent } from './nouveau-poste.component';

describe('NouveauPosteComponent', () => {
  let component: NouveauPosteComponent;
  let fixture: ComponentFixture<NouveauPosteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NouveauPosteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NouveauPosteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
