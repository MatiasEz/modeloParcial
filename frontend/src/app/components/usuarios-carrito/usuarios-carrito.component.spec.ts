import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosCarritoComponent } from './usuarios-carrito.component';

describe('UsuariosCarritoComponent', () => {
  let component: UsuariosCarritoComponent;
  let fixture: ComponentFixture<UsuariosCarritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosCarritoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
