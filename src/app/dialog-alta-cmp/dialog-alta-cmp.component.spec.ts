import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAltaCmpComponent } from './dialog-alta-cmp.component';

describe('DialogAltaCmpComponent', () => {
  let component: DialogAltaCmpComponent;
  let fixture: ComponentFixture<DialogAltaCmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAltaCmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAltaCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
