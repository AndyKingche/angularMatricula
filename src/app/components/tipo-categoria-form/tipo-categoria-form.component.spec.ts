import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCategoriaFormComponent } from './tipo-categoria-form.component';

describe('TipoCategoriaFormComponent', () => {
  let component: TipoCategoriaFormComponent;
  let fixture: ComponentFixture<TipoCategoriaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoCategoriaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoCategoriaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
