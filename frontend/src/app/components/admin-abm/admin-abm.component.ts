import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-abm',
  templateUrl: './admin-abm.component.html',
  styleUrls: ['./admin-abm.component.css']
})
export class AdminAbmComponent implements OnInit {
  productos:any = [];
  prod={ nombre:"", precio:""};
  reintentar:boolean=false;
  mensaje:string="";
  alert:boolean=false;
  errorNombre=0;
  errorPrecio=0;

  constructor(private usuariosService:UsuariosService, private router:Router) { }

  ngOnInit(): void {
    if(localStorage.rol=='user'){
      this.router.navigate(['usuarios/home']);
      console.log('USTED NO ES ADMIN');
    }
    else{
      this.usuariosService.listarProductos().subscribe( 
        res => { 
          this.productos = res; 
          this.alert = false;
          console.log(res);
         },
         err => console.log(err) ) 
    }
  }

  eliminarProducto(producto:any){
    console.log('FE: Entre metod post eliminarProducto!');
    console.log(producto);
    this.usuariosService.eliminarProductos(producto).subscribe(
      res => {
        let result:any=res;
        console.log(result.message);
        console.log(result);
        this.ngOnInit();
        // this.router.navigate(['admin/abm']);
      },
      err => {
        console.log(err.error.message);
        this.reintentar=true;
        this.mensaje=err.error.message;      }
    );
  }

  modificarProducto(producto:any){
    console.log('FE: Entre metod post modificarProducto!');
    console.log(producto);
    console.log(this.prod);
    if(this.verificarNombre(producto.nombre)+this.verificarPrecio(producto.precio)>1){
      setTimeout(function(){ alert("Ingrese los datos correctamente"); }, 500);
      this.ngOnInit();
    }
    this.usuariosService.modificarProducto(producto).subscribe(
			res => {
			  let result:any=res;
			  console.log(result.message);
			  console.log(result);
        this.alert = true;
        setTimeout(function(){ alert("Producto modificado" + producto.nombre); }, 500);
			  // this.router.navigate(['admin/abm']);
        this.ngOnInit();
			},
			err => {
			  console.log(err.error);}
		  );
  }

  agregarProducto(){
    console.log('FE: Entre metod post agregarProducto!');
    console.log(this.prod);
    this.usuariosService.agregarProducto(this.prod).subscribe(
			res => {
			  let result:any=res;
			  console.log(result.message);
			  console.log(result);
			  localStorage.setItem('token',result.token);
			  // this.router.navigate(['admin/abm']);
        this.prod={ nombre:"", precio:""};
        this.ngOnInit();
			},
			err => {
			  console.log(err.error);}
		  );
  }

  verificarForm():boolean{
    this.errorNombre=this.verificarNombre(this.prod.nombre);
    this.errorPrecio=this.verificarPrecio(this.prod.precio);
    if(  (this.errorNombre+this.errorPrecio)>0){
      return false;
    }
    return true;
  }

  verificarNombre(nombre:string):number {
    const patron=/^[a-zA-Z]+$/;
    if(nombre.length==0)
      return 1;
    if(nombre.length>20)
      return 2;
    if(!patron.test(nombre))
      return 3;
    return 0;
  }

  verificarPrecio(precio:string):number {
    const patron=/^\d+$/;
    if(precio.length==0)
      return 1;
    if(precio.length>20)
      return 2;
    if(!patron.test(precio))
      return 3;
    return 0;
  }
}