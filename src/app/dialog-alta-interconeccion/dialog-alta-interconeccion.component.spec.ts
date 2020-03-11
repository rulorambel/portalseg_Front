import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAltaInterconeccionComponent } from './dialog-alta-interconeccion.component';

describe('DialogAltaInterconeccionComponent', () => {
  let component: DialogAltaInterconeccionComponent;
  let fixture: ComponentFixture<DialogAltaInterconeccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAltaInterconeccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAltaInterconeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
