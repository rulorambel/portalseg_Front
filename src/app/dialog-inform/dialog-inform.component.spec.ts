import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInformComponent } from './dialog-inform.component';

describe('DialogInformComponent', () => {
  let component: DialogInformComponent;
  let fixture: ComponentFixture<DialogInformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogInformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogInformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
