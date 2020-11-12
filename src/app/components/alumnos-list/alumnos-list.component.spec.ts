import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnosListComponent } from './alumnos-list.component';

describe('AlumnosListComponent', () => {
  let component: AlumnosListComponent;
  let fixture: ComponentFixture<AlumnosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumnosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
