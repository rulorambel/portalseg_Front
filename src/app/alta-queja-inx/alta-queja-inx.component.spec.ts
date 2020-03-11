import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaQuejaInxComponent } from './alta-queja-inx.component';

describe('AltaQuejaInxComponent', () => {
  let component: AltaQuejaInxComponent;
  let fixture: ComponentFixture<AltaQuejaInxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaQuejaInxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaQuejaInxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
