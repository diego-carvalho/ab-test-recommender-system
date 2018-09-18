import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeEnComponent } from './three-en.component';

describe('ThreeEnComponent', () => {
  let component: ThreeEnComponent;
  let fixture: ComponentFixture<ThreeEnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeEnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
