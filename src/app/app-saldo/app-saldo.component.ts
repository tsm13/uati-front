import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendService } from '../services/backend.service';
import { SaldoTotal } from '../interfaces/saldo';

@Component({
  selector: 'app-saldo',
  templateUrl: './app-saldo.component.html',
  styleUrls: ['./app-saldo.component.scss'],
})
export class AppSaldoComponent implements OnInit {
  constructor(private service: BackendService) {}
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
    this.saldoTotal = this.service.mostraSaldo({
      agencia: '0123',
      conta: '01234',
      dac: '0',
    });
    return this.saldoTotal;
  }
}
