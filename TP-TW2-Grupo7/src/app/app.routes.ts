import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { Signin } from './componentes/usuarios/signin/signin';
import { Signup } from './componentes/usuarios/signup/signup';
import { Recuperar } from './componentes/usuarios/recuperar/recuperar';


export const routes: Routes = [
     { path: '', redirectTo: 'signin', pathMatch: 'full' },
     { path: 'signin', component: Signin },
     { path: 'signup', component: Signup},
     { path: 'recuperar', component: Recuperar}
];
