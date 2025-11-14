import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarritoService, ItemCarrito } from '../../servicios/carrito';
import { PedidoService } from '../../servicios/pedido';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, CurrencyPipe],
  templateUrl: './compra.html'
})
export class Compra implements OnInit {
  step = 1;

  compra = {
    metodoPago: '',
    tipoEntrega: '',
    datosEntrega: null as any
  };

  tarjetaForm: FormGroup;
  direccionForm: FormGroup;


  cartItems$: Observable<ItemCarrito[]>;
  total$: Observable<number>;

  private cartItems: ItemCarrito[] = [];
  private cartSubscription: Subscription | undefined;

  constructor(
    private fb: FormBuilder,
    private carrito: CarritoService,
    private pedidoService: PedidoService,
    private router: Router
  ) {
    this.cartItems$ = this.carrito.items$;
    this.total$ = this.carrito.calcularTotal();

    this.tarjetaForm = this.fb.group({
      numero: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      nombre: ['', Validators.required],
      cvc: ['', Validators.required]
    });

    this.direccionForm = this.fb.group({
      direccion: ['', Validators.required],
      ciudad: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.cartSubscription = this.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  ngOnDestroy() {
    this.cartSubscription?.unsubscribe();
  }


 elegirPago(metodo: string) {
  this.compra.metodoPago = metodo;

  if (metodo === 'efectivo') {
    // Solo retiro disponible
    this.compra.tipoEntrega = 'retiro';
    this.step = 4; // va directo a elegir sucursal
  } else {
    // Tarjeta → puede elegir envío o retiro
    this.step = 3;
  }
}


  procesarTarjeta() {
    if (this.tarjetaForm.valid) {
      this.step = 3;
    }
  }

  elegirEntrega(tipo: string) {
    this.compra.tipoEntrega = tipo;
    if (tipo === 'retiro') {
      this.step = 4;
    } else {
      this.step = 5;
    }
  }

  elegirSucursal(sucursal: string) {
    this.compra.datosEntrega = { lugar: sucursal };
    this.step = 6;
  }

  guardarDireccion() {
    if (this.direccionForm.valid) {
      this.compra.datosEntrega = this.direccionForm.value;
      this.step = 6;
    }
  }

  finalizar() {
    const items = this.cartItems.map(i => ({
      producto_id: i.producto.id,
      cantidad: i.cantidad
    }));

    const pedido = {
      items,
      metodo_pago: this.compra.metodoPago,
      tipo_entrega: this.compra.tipoEntrega,
      datos_entrega: this.compra.datosEntrega
    };

    this.pedidoService.crear(pedido).subscribe(() => {
      alert('¡Compra realizada!');
      this.carrito.limpiarCarrito();
      this.router.navigate(['/pedidos']);
    });
  }
}
