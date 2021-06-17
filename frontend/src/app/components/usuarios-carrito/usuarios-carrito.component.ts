import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios-carrito',
  templateUrl: './usuarios-carrito.component.html',
  styleUrls: ['./usuarios-carrito.component.css']
})
export class UsuariosCarritoComponent implements OnInit {
  productos: any = [];
  reintentar: boolean = false;
  mensaje: string = "";
  carrito: any = [];
  swapCarrito:any = [];
  total:number=0;
  // carrito: {[key: number]: any}| any;

  constructor(private usuariosService: UsuariosService, private router: Router) { }

  ngOnInit(): void {
    this.usuariosService.listarProductos().subscribe(
      res => {
        this.productos = res;
        let result: any = res;
        // console.log(result.message);
        console.log('ENTRE EN EL SUBCRIBE DE CARRITO!');
        console.log(result);
        if(localStorage.carrito){
        this.carrito = JSON.parse(localStorage.carrito);
        this.total = JSON.parse(localStorage.total);
        }
      },
      err => {
        console.log(err);
        console.log('ERROR CARRITO NO EXISTE:');
      })
  }

  agregarCarrito(producto: any) {
    console.log('FE: Entre metod post agregarProducto!');
    console.log(producto);
    if (producto.cantidad > 0) {
      console.log('ENTRE AL IF DE CARRITO LLENO!');
      this.carrito.push({
        "id": producto.id,
        "nombre": producto.nombre,
        "precio": producto.precio,
        "cantidad": producto.cantidad,
        "subtotal": producto.cantidad * producto.precio
      });
      this.total += producto.cantidad * producto.precio;
     
      // console.log(localStorage.carrito=JSON.stringify(this.carrito));
      // this.swapCarrito = JSON.parse(localStorage.carrito);
      console.log('IMPRIMO CARRITO LOCAL PARCEADO:');
      console.log(this.swapCarrito);
      localStorage.setItem('total',JSON.stringify(this.total));
      // Inicializo local.carrito aca para poder conservar los item en caso de salir de la pantalla. Se guardan mas arriba en ngOnInit:
      localStorage.setItem('carrito',JSON.stringify(this.carrito));
      console.log('ACA ROMPO');
      console.log(localStorage.carrito);
      this.ngOnInit();
    }
    else{
    console.log('TIENE QUE INGRESAR UNA CANTIDAD!');
    console.log(this.carrito);
    }
  }

  verCarrito(){
    console.log('FE: Entre metod post modificarProducto!');
  }

}
