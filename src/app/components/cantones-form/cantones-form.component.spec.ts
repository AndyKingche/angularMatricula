import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CantonesFormComponent } from './cantones-form.component';

describe('CantonesFormComponent', () => {
  let component: CantonesFormComponent;
  let fixture: ComponentFixture<CantonesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CantonesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CantonesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
