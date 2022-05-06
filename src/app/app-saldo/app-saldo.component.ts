import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendService } from '../services/backend.service';
import { Saldo, SaldoTotal } from '../services/interfaces/saldo';

@Component({
  selector: 'app-saldo',
  templateUrl: './app-saldo.component.html',
  styleUrls: ['./app-saldo.component.scss'],
})
export class AppSaldoComponent implements OnInit {
  constructor(private service: BackendService) {}
  saldo: number = 2000; // < apagar depois
  saldoPOST: Observable<SaldoTotal>;

  ngOnInit() {
    this.toDisplay = JSON.parse(localStorage.getItem('display')!);
    this.verSaldo();
  }

  toDisplay!: boolean;
  hide() {
    this.toDisplay = !this.toDisplay;
    localStorage.setItem('display', JSON.stringify(this.toDisplay));
  }

  verSaldo() {
    this.saldoPOST = this.service.mostraSaldo({
      agencia: '0123',
      conta: '01234',
      dac: '0',
    });
  }
}
