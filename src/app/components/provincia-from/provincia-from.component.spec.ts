import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinciaFromComponent } from './provincia-from.component';

describe('ProvinciaFromComponent', () => {
  let component: ProvinciaFromComponent;
  let fixture: ComponentFixture<ProvinciaFromComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvinciaFromComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinciaFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
