import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuarioModel';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class UsuariosService {
	API_URI = 'http://localhost:3000/user';
	API_URI_CARRITO = 'http://localhost:3000/comprar';
	API_URI_ADMIN = 'http://localhost:3000/admin';
	//API_URI_ARTICULO = 'http://localhost:3000/articulo';
	// API_URI = 'https://servidor-02.herokuapp.com/user';

	logued$ = new EventEmitter<string>();

	constructor(private http: HttpClient, private router:Router) { }

	listarUsuarios() {
		//para expandir/especializar las variables usamos ` y no ' o "
		//Las variables salen pintadas de otro color diferente del de texto
		return this.http.get(`${this.API_URI}/list`);
		//si no funciona usar 
		//return this.http.get(this.API_URI+'/list'); 
	}

	buscarUsuario(id: string) {
		return this.http.get(`${this.API_URI}/find/${id}`);
	}

	guardarUsuario(usuario: Usuario) {
		return this.http.post(`${this.API_URI}/create`, usuario);
	}

	eleminarUsuario(id: string) {
		return this.http.delete(`${this.API_URI}/delete/${id}`);
	}

	actualizarUsuario(id: string, actualizaUsuario: Usuario): Observable<Usuario> {
		return this.http.put(`${this.API_URI}/update/${id}`, actualizaUsuario);
	}
	ingresar(usuario: any) {
		return this.http.post(`${this.API_URI}/signin`, usuario);
	}

	registrar(usuario: any) {
		return this.http.post(`${this.API_URI}/signup`, usuario);
	}
	isLoggedIn():Boolean{
		return !!localStorage.getItem('token'); //Si existe token retorna true
		//es el equivalente de testearlo con if pero ahora en una sola linea.
	}
	
	logOut(){
		// localStorage.removeItem('token');
		localStorage.clear();
		this.router.navigate(['usuarios/principal']);
	}
	getToken(){//Obtenemos el token que despues enviara el interceptor x cada req
		return localStorage.getItem('token');
	}

	listarProductos() {
		return this.http.get(`${this.API_URI_ADMIN}/abmproductos`);
	}
	eliminarProductos(producto:any){
		console.log('FE: Metodo servicio Eliminar:')
		console.log(producto.id);
		return this.http.delete(`${this.API_URI_ADMIN}/delete/${producto.id}`, producto);
	}

	modificarProducto(producto:any){
		console.log('FE: Metodo servicio Modificar:')
		console.log(producto.id);
		return this.http.post(`${this.API_URI_ADMIN}/modificarProductos`, producto);
	}

	agregarProducto(prod:any){
		console.log('FE: Metodo servicio Modificar:')
		console.log(prod.id);
		return this.http.post(`${this.API_URI_ADMIN}/agregarProductos`, prod);
	}

	verCarrito(){
		console.log('FE: Metodo SERVICIO ver Carrito:')
		return this.http.get(`${this.API_URI_CARRITO}/carrito`);
	}

	grabarPedido(direccion:any,carrito:any){
		console.log('FE: Metodo servicio Grabar pedido:')
		console.log(direccion);
		console.log('Separo direccion de carrito');
		console.log(carrito);
		return this.http.post(`${this.API_URI_CARRITO}/grabarPedido`, {direccion,carrito});
	}
	adminListarPedidos() {
		return this.http.get(`${this.API_URI_ADMIN}/listarpedidos`);
	}
	modificarUsuario(usuario:any){
		console.log('FE: Metodo servicio Modificar Usuarios:')
		console.log(usuario);
		return this.http.post(`${this.API_URI}/signMod`, usuario);
	}
	eliminarUsuario(usuario:any){
		console.log('FE: Metodo servicio Eliminar Usuario:')
		console.log(usuario.id);
		return this.http.delete(`${this.API_URI}/delete/${usuario.id}`, usuario); // El service devuelve "usuario" tal vez se puede usar para mostrar un mensaje.
	}
}
