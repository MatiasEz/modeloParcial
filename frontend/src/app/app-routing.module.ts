import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsuariosListarComponent} from "./components/usuarios-listar/usuarios-listar.component";
import {UsuariosIngresarComponent} from "./components/usuarios-ingresar/usuarios-ingresar.component";
import {UsuariosRegistrarComponent} from "./components/usuarios-registrar/usuarios-registrar.component";
import { UsuariosPrincipalComponent } from "./components/usuarios-principal/usuarios-principal.component";
import { UsuariosHomeComponent } from "./components/usuarios-home/usuarios-home.component";
import { AdminAbmComponent } from "./components/admin-abm/admin-abm.component";
import { AdminListarPedidosComponent } from "./components/admin-listar-pedidos/admin-listar-pedidos.component";
import {UsuariosCarritoComponent} from "./components/usuarios-carrito/usuarios-carrito.component";
import {UsuariosVerCarritoComponent} from "./components/usuarios-ver-carrito/usuarios-ver-carrito.component";
import {AuthGuard} from './auth.guard';
import { AdminGuard } from './admin-guard.guard';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'usuarios/principal',
		pathMatch: 'full'
	},
	{
		path: 'usuarios/listar',
		component: UsuariosListarComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'usuarios/ingresar',
		component: UsuariosIngresarComponent
	},
	{
		path: 'usuarios/registrar',
		component: UsuariosRegistrarComponent
	},
	{
		path: 'usuarios/principal',
		component: UsuariosPrincipalComponent
	},
	{
		path: 'usuarios/home',
		component: UsuariosHomeComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'admin/abm',
		component: AdminAbmComponent,
		canActivate: [AuthGuard,AdminGuard],
	},
	{
		path: 'admin/listar-pedidos',
		component: AdminListarPedidosComponent,
		canActivate: [AuthGuard,AdminGuard],
	},
	{
		path: 'usuarios/carrito',
		component: UsuariosCarritoComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'usuarios/carrito/verCarrito',
		component: UsuariosVerCarritoComponent,
		canActivate: [AuthGuard]
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
