import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { PedidoService } from '../../servicios/pedido';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './pedidos.html'
})
export class Pedidos {

  pedidos$: Observable<any[]>;

  constructor(private pedidoService: PedidoService) {
    this.pedidos$ = this.pedidoService.listar();
  }
  imgError(event: Event, nombre: string) {
  const img = event.target as HTMLImageElement;
  img.src = `https://placehold.co/60x60/333/ccc?text=${nombre.substring(0,3)}`;
}

}
