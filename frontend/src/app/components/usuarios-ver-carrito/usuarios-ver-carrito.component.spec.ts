import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosVerCarritoComponent } from './usuarios-ver-carrito.component';

describe('UsuariosVerCarritoComponent', () => {
  let component: UsuariosVerCarritoComponent;
  let fixture: ComponentFixture<UsuariosVerCarritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosVerCarritoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosVerCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
