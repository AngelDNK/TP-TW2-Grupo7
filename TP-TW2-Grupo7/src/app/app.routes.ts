import { Routes } from '@angular/router';
import { Component } from '@angular/core';

//COSAS DE USUARIO
import { Signin } from './componentes/usuarios/signin/signin';
import { Signup } from './componentes/usuarios/signup/signup';
import { Recuperar } from './componentes/usuarios/recuperar/recuperar';

//COSAS DE PRODUCTOS
import { ListadoProductos } from './componentes/productos/listado-productos/listado-productos';
import { DetalleProducto } from './componentes/productos/detalle-producto/detalle-producto';
import { NuevoProducto } from './componentes/productos/nuevo-producto/nuevo-producto';


export const routes: Routes = [
     { path: '', redirectTo: 'signin', pathMatch: 'full' },
     { path: 'signin', component: Signin },
     { path: 'signup', component: Signup},
     { path: 'recuperar', component: Recuperar},
     { path: 'productos', component: ListadoProductos},
     { path: 'producto/:id', component: DetalleProducto},
     { path: 'nuevo-producto', component: NuevoProducto}
];
