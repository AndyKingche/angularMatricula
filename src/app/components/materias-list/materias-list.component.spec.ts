import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriasListComponent } from './materias-list.component';

describe('MateriasListComponent', () => {
  let component: MateriasListComponent;
  let fixture: ComponentFixture<MateriasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MateriasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
