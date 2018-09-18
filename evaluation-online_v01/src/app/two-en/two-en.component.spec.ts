import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoEnComponent } from './two-en.component';

describe('TwoEnComponent', () => {
  let component: TwoEnComponent;
  let fixture: ComponentFixture<TwoEnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoEnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
