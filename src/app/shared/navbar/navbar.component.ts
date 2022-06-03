import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { VerContaCorrente } from '../interfaces/conta-corrente';
import { ContaCorrenteService } from '../services/conta-corrente.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private ccService: ContaCorrenteService) {}
  verCC: Observable<VerContaCorrente>;

  ngOnInit(): void {
    this.verContaCorrente();
  }

  verContaCorrente() {
    this.verCC = this.ccService.mostraContaCorrente({
      agencia: '0123',
      conta: '00587',
      dac: '1',
      senha: '123456',
    });
  }
}
