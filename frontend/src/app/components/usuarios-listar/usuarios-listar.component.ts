import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-usuarios-listar',
  templateUrl: './usuarios-listar.component.html',
  styleUrls: ['./usuarios-listar.component.css']
})
export class UsuariosListarComponent implements OnInit {
  usuarios: any = [];

  constructor(private usuariosService:UsuariosService, private router:Router) { }

  ngOnInit() {
    this.usuariosService.listarUsuarios().subscribe(
      res => {
        this.usuarios = res;
        console.log(res)
      },
      err => console.log(err)
    )
  }

  modificarUsuario(user:any){
    console.log('FE: Entre metod post modificarProducto!');
    console.log(user);
    //TEST:
    var newObj = JSON.parse(JSON.stringify(user)); 
    console.log(newObj);

    delete newObj.alta;
    //TEST:

    console.log(newObj);

    this.usuariosService.modificarUsuario(newObj).subscribe(
			res => {
			  let result:any=res;
			  console.log('RESPUESTA DEL BACKEN STATUS:');
			  console.log(result);
        this.ngOnInit();
			  // this.router.navigate(['usuarios/listar']);
			},
			err => {
			  console.log(err.error);}
		  );
  }

  eliminarUsuario(user:any){
    console.log('FE: Entre metod post eliminarProducto!');
    console.log(user);
    this.usuariosService.eliminarUsuario(user).subscribe(
      res => {
        let result:any=res;
        console.log(result.message);
        console.log(result);
        this.ngOnInit();
        // this.router.navigate(['admin/abm']);
      },
      err => {
        console.log(err.error.message);
        // this.reintentar=true;
        // this.mensaje=err.error.message;      
      }
    );
  }
}
