import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCategoriaListComponent } from './tipo-categoria-list.component';

describe('TipoCategoriaListComponent', () => {
  let component: TipoCategoriaListComponent;
  let fixture: ComponentFixture<TipoCategoriaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoCategoriaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoCategoriaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
