import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-usuarios-registrar',
  templateUrl: './usuarios-registrar.component.html',
  styleUrls: ['./usuarios-registrar.component.css']
})
export class UsuariosRegistrarComponent implements OnInit {
  user={  nombre:"", email:"", password:"",repassword:""};
  reintentar:boolean=false;
  mensaje:string="";
  errorNombre=0;
  errrorPassword=0;
  errorRePassrword=0;
  errorEmail=0;
  registroOk:boolean=false;
  registroEnv:boolean=false;

	constructor(private usuariosService: UsuariosService, private router:Router) { }

  ngOnInit(): void {
  }
  registrar(){
		console.log("Sign Up");
    console.log(this.user);
    this.registroEnv=true;
		console.log("Sign Up");
    console.log(this.user);
    this.usuariosService.registrar(this.user).subscribe(
      res => {
        let result:any=res;
        this.mensaje=result.message;
        console.log(result.message);
        this.registroOk=true;
      },
      err => {
        console.log(err.error.message);
        this.mensaje=err.error.message;
        this.registroOk=false;
      }
    )
	}

  verificarForm():boolean{
    this.errorNombre=this.verificarNombre(this.user.nombre);
    this.errrorPassword=this.verificarPassword(this.user.password);
    this.errorRePassrword=this.verificarRePassword(this.user.password, this.user.repassword);
    this.errorEmail=this.verificarEmail(this.user.email);
    if(  (this.errorNombre+this.errrorPassword+this.errorRePassrword+this.errorEmail)>0){
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
  
  verificarPassword(password:any): number {
    // const patron=/^[a-zA-Z0-9]+$/;
    // const patron= /[0-9]{1,}[A-Za-z]{1,}/g;
    const patron = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,6}$/;
    /*
    La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.
    NO puede tener otros símbolos.
    Ejemplo:
    w3Unpocodet0d0
    */
    if(password.length==0)
      return 1;
    if(password.length>20)
      return 2;
    if(!patron.test(password))
      return 3;
    return 0;
  }
  
  verificarRePassword(password:any, repassword:any): number {
    if(password!=repassword){
      return 1;
    }
    return 0;
  }
  
  verificarEmail(email:any): number {
    const patron=/[a-z0-9]{1,10}@[a-z0-9]{1,10}.[a-z]{2,3}/;
    if(email.length==0)
      return 1;
    if(email.length>20)
      return 2;
    if(!patron.test(email))
      return 3;
    return 0;
  }

  limpiarNombre() {
    if (this.errorNombre > 0) {
      console.log("Limpiar nombre");
      this.user.nombre = "";
      this.errorNombre = 0;
    }
  }

  limpiarPassword() {
    if (this.errrorPassword > 0) {
      console.log("Limpiar password");
      this.user.password = "";
      this.errrorPassword = 0;
    }
  }

  limpiarRePassword() {
    if (this.errorRePassrword > 0) {
      console.log("Limpiar repassword");
      this.user.repassword = "";
      this.errorRePassrword = 0;
    }

  }

  limpiarEmail() {
    if(this.errorEmail>0){
      console.log("Limpiar email");
      this.user.email = "";
      this.errorEmail = 0;
    }
  }

  reintentarReg(){
  this.mensaje="";
  this.registroEnv=false;
  this.user={  nombre:"", email:"", password:"",repassword:""};
  this.router.navigate(['usuarios/registrar']);
  }
  iniciarSesion(){
  this.mensaje="";
  this.registroEnv=false;
  this.router.navigate(['usuarios/ingresar']);
  }

  recargarForm(){
    this.reintentar=false;
    this.user.nombre="";
    this.user.email="";
    this.user.password="";
    this.user.repassword="";
	this.mensaje="";
  }
}
 