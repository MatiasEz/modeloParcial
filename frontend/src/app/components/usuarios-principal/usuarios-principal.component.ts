import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios-principal',
  templateUrl: './usuarios-principal.component.html',
  styleUrls: ['./usuarios-principal.component.css']
})
export class UsuariosPrincipalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // TEST:
    console.log(localStorage.length);
    // END TEST.
  }

}
