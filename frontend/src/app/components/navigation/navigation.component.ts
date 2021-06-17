import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  constructor(private usuariosService:UsuariosService) { }
  loginOkMostrar:boolean=false;

  ngOnInit(): void {
    // START: Ocultar items del navbar:
    this.usuariosService.logued$.subscribe(log => {
    this.loginOkMostrar = true;
    // this.sacarUsuario();
    });
    // END: Ocultar items del navbar:
    }
    logout(){
      //Es de notar que la redireccion del metodo logOut podria haberse hecho aqui y dejar el servicio lo mas acotado posible.
        this.usuariosService.logOut();
        this.loginOkMostrar=false;
      }
}
