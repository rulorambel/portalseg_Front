import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleQuejaComponent } from './detalle-queja.component';

describe('DetalleQuejaComponent', () => {
  let component: DetalleQuejaComponent;
  let fixture: ComponentFixture<DetalleQuejaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleQuejaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleQuejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
