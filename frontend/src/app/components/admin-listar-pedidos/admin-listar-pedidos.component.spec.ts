import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListarPedidosComponent } from './admin-listar-pedidos.component';

describe('AdminListarPedidosComponent', () => {
  let component: AdminListarPedidosComponent;
  let fixture: ComponentFixture<AdminListarPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminListarPedidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListarPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
