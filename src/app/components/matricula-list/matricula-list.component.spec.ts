import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatriculaListComponent } from './matricula-list.component';

describe('MatriculaListComponent', () => {
  let component: MatriculaListComponent;
  let fixture: ComponentFixture<MatriculaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatriculaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatriculaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
