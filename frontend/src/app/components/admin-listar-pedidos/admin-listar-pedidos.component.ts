import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-listar-pedidos',
  templateUrl: './admin-listar-pedidos.component.html',
  styleUrls: ['./admin-listar-pedidos.component.css']
})
export class AdminListarPedidosComponent implements OnInit {
  pedidos: any = [];

  constructor(private usuariosService: UsuariosService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.rol=='user'){
      this.router.navigate(['usuarios/home']);
      console.log('USTED NO ES ADMIN');

    }
    else{
    this.usuariosService.adminListarPedidos().subscribe(
      res => {
        this.pedidos = res;
        let result: any = res;
        // console.log(result.message);
        console.log('ENTRE EN EL SUBCRIBE DE CARRITO!');
        console.log(result);
      },
      err => console.log(err))
    }
  }
}
