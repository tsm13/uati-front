import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SaldoTotal } from '../shared/interfaces/saldo';
import { SaldoService } from '../shared/services/saldo.service';

@Component({
  selector: 'app-saldo',
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.scss'],
})
export class SaldoComponent implements OnInit {
  constructor(private saldoService: SaldoService) {}
  saldoTotal: Observable<SaldoTotal>;

  ngOnInit() {
    this.toDisplay = JSON.parse(localStorage.getItem('display')!);
    this.verSaldo();
  }

  toDisplay!: boolean;
  hide() {
    this.toDisplay = !this.toDisplay;
    localStorage.setItem('display', JSON.stringify(this.toDisplay));
  }

  public verSaldo() {
    this.saldoTotal = this.saldoService.mostraSaldo({
      agencia: '0123',
      conta: '01234',
      dac: '0',
    });
    return this.saldoTotal;
  }
}
