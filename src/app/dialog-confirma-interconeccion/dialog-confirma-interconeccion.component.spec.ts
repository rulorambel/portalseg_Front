import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmaInterconeccionComponent } from './dialog-confirma-interconeccion.component';

describe('DialogConfirmaInterconeccionComponent', () => {
  let component: DialogConfirmaInterconeccionComponent;
  let fixture: ComponentFixture<DialogConfirmaInterconeccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogConfirmaInterconeccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfirmaInterconeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
