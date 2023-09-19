import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSexeComponent } from './page-sexe.component';

describe('PageSexeComponent', () => {
  let component: PageSexeComponent;
  let fixture: ComponentFixture<PageSexeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageSexeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageSexeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
