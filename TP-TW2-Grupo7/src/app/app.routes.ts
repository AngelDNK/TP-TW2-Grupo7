import { Routes } from '@angular/router';
import { Component } from '@angular/core';

//COSAS DE USUARIO
import { Signin } from './componentes/usuarios/signin/signin';
import { Signup } from './componentes/usuarios/signup/signup';
import { Recuperar } from './componentes/usuarios/recuperar/recuperar';
import { ResetPassword } from './componentes/usuarios/reset-password/reset-password';

//COSAS DE PRODUCTOS
import { ListadoProductos } from './componentes/productos/listado-productos/listado-productos';
import { DetalleProducto } from './componentes/productos/detalle-producto/detalle-producto';
import { NuevoProducto } from './componentes/productos/nuevo-producto/nuevo-producto';
import {EditarProducto} from './componentes/productos/editar-producto/editar-producto'
import { CarritoComponent } from './componentes/carrito/carrito';


export const routes: Routes = [
     { path: '', redirectTo: 'productos', pathMatch: 'full' },
     { path: 'signin', component: Signin },
     { path: 'signup', component: Signup},
     { path: 'recuperar', component: Recuperar},
     { path: 'reset-password', component: ResetPassword },
     { path: 'productos', component: ListadoProductos},
     { path: 'producto/:id', component: DetalleProducto},
     { path: 'nuevo-producto', component: NuevoProducto},
     { path: 'editar-producto', component: EditarProducto},
     { path: 'carrito', component: CarritoComponent}
];
