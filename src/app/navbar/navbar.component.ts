import { Component, NgModule, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendService } from '../services/backend.service';
import { VerContaCorrente } from '../interfaces/conta-corrente';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private service: BackendService) {}
  verCC: Observable<VerContaCorrente>;

  ngOnInit(): void {
    this.verContaCorrente();
  }

  verContaCorrente() {
    this.verCC = this.service.mostraContaCorrente({
      agencia: '0123',
      conta: '00587',
      dac: '1',
      senha: '123456',
    });
  }
}
