import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { UsuariosIngresarComponent } from './components/usuarios-ingresar/usuarios-ingresar.component';
import { UsuariosRegistrarComponent } from './components/usuarios-registrar/usuarios-registrar.component';
import { UsuariosListarComponent } from './components/usuarios-listar/usuarios-listar.component';
import {UsuariosService} from './services/usuarios.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import {FormsModule} from '@angular/forms';
import { UsuariosPrincipalComponent } from './components/usuarios-principal/usuarios-principal.component';
import { UsuariosHomeComponent } from './components/usuarios-home/usuarios-home.component';
import {AuthGuard} from './auth.guard';
import {TokenInterceptorService} from './services/token-interceptor.service';
import { AdminAbmComponent } from './components/admin-abm/admin-abm.component';
import { UsuariosCarritoComponent } from './components/usuarios-carrito/usuarios-carrito.component';
import { UsuariosVerCarritoComponent } from './components/usuarios-ver-carrito/usuarios-ver-carrito.component';
import { AdminListarPedidosComponent } from './components/admin-listar-pedidos/admin-listar-pedidos.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    UsuariosIngresarComponent,
    UsuariosRegistrarComponent,
    UsuariosListarComponent,
    UsuariosPrincipalComponent,
    UsuariosHomeComponent,
    AdminAbmComponent,
    UsuariosCarritoComponent,
    UsuariosVerCarritoComponent,
    AdminListarPedidosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    UsuariosService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
