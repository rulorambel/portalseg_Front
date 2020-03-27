import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AltaQuejaAUXComponent } from './alta-queja-aux.component';

describe('AltaQuejaAuxComponent', () => {
  let component: AltaQuejaAUXComponent;
  let fixture: ComponentFixture<AltaQuejaAUXComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaQuejaAUXComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaQuejaAUXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
