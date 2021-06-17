import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios-ver-carrito',
  templateUrl: './usuarios-ver-carrito.component.html',
  styleUrls: ['./usuarios-ver-carrito.component.css']
})
export class UsuariosVerCarritoComponent implements OnInit {

productos:any = [];
total:number = 0;
direccion={  calle:"", altura:"",total:0};

  constructor(private usuariosService: UsuariosService, private router: Router) { }

  ngOnInit(): void {
    console.log(localStorage.carrito);
    if(localStorage.carrito)
    this.productos = JSON.parse(localStorage.carrito);
    console.log('IMPRIMO CARRITO LOCAL PARCEADO:');
    console.log(this.productos);
    if(localStorage.total)
    this.total = JSON.parse(localStorage.total);
    // TOTAL:   for (let i = 0; i < localStorage.carrito.length; i++)
    // TOTAL:   {
    // TOTAL:     this.total += localStorage.carrito[i].subtotal;
    // TOTAL:     console.log('IMPRIMO LOS SUBTOTALES DEL LOCAL CARRITO:');
    // TOTAL:     console.log(localStorage.carrito[i].subtotal);
    // TOTAL:   }
    // TOTAL:   console.log(this.total);
    // TOTAL:   console.log(this.total);
    // TOTAL:   console.log(this.total);
    // TOTAL:   console.log(this.total);
    // TOTAL:   console.log(this.total);
    // TOTAL:   console.log(this.total);
  }

  grabarPedido(){

    this.direccion.total=localStorage.total;
    this.usuariosService.grabarPedido(this.direccion,JSON.parse(localStorage.carrito)).subscribe(
      res => {
        localStorage.removeItem('carrito');
        localStorage.removeItem('total');
        this.router.navigate(['usuarios/home']);
      },
      err => console.log(err))
  }
  
}