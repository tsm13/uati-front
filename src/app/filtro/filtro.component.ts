import { Component, OnInit } from '@angular/core';
import { MatTabelaComponent } from '../mat-tabela/mat-tabela.component';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss'],
})
export class FiltroComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  /*   filtroBusca(event: Event, dataSource: MatTabelaComponent) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  } */
}
