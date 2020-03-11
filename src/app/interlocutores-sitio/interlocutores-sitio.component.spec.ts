import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterlocutoresSitioComponent } from './interlocutores-sitio.component';

describe('InterlocutoresSitioComponent', () => {
  let component: InterlocutoresSitioComponent;
  let fixture: ComponentFixture<InterlocutoresSitioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterlocutoresSitioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterlocutoresSitioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
