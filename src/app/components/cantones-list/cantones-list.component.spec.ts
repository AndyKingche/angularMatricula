import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CantonesListComponent } from './cantones-list.component';

describe('CantonesListComponent', () => {
  let component: CantonesListComponent;
  let fixture: ComponentFixture<CantonesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CantonesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CantonesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
