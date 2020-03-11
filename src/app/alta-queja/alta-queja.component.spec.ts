import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaQuejaComponent } from './alta-queja.component';

describe('AltaQuejaComponent', () => {
  let component: AltaQuejaComponent;
  let fixture: ComponentFixture<AltaQuejaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaQuejaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaQuejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
