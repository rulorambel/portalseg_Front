import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaQuejaComponent } from './consulta-queja.component';

describe('ConsultaQuejaComponent', () => {
  let component: ConsultaQuejaComponent;
  let fixture: ComponentFixture<ConsultaQuejaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaQuejaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaQuejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
