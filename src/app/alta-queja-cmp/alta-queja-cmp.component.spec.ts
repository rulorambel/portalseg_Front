import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaQuejaCMPComponent } from './alta-queja-cmp.component';

describe('AltaQuejaCMPComponent', () => {
  let component: AltaQuejaCMPComponent;
  let fixture: ComponentFixture<AltaQuejaCMPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaQuejaCMPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaQuejaCMPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
