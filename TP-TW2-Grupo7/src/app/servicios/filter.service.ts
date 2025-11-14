import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Filtros {
  search: string;
  categoria: string;
  precioMax: number;
}

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private STORAGE_KEY = 'filtros_productos';

  private filtrosIniciales: Filtros = this.cargarFiltrosGuardados();

  private filtrosSubject = new BehaviorSubject<Filtros>(this.filtrosIniciales);
  filtros$ = this.filtrosSubject.asObservable();

  constructor() {}

  private cargarFiltrosGuardados(): Filtros {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) return JSON.parse(data);

    return { search: '', categoria: '', precioMax: 0 };
  }

  guardarFiltros(filtros: Filtros) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtros));
    this.filtrosSubject.next(filtros);
  }

  limpiarFiltros() {
    localStorage.removeItem(this.STORAGE_KEY);
    const vacios = { search: '', categoria: '', precioMax: 0 };
    this.filtrosSubject.next(vacios);
  }
}